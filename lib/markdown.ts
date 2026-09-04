import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";


export type MarkdownFile = {
  filename: string;
  filepath: string;
  slug: string;
  data: Record<string, unknown>;
  body: string;
};

export function contentDir(...segments: string[]): string {
  return path.join(process.cwd(), "content", ...segments);
}

export function listMarkdownFiles(subdir: string): string[] {
  const dir = contentDir(subdir);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith(".md") && !name.startsWith("."))
    .map((name) => path.join(dir, name));
}

export function readMarkdownFile(filepath: string): MarkdownFile {
  const filename = path.basename(filepath);
  if (!fs.existsSync(filepath)) {
    throw new Error(`File markdown non trovato: ${filename}`);
  }
  const raw = fs.readFileSync(filepath, "utf8");
  const parsed = matter(raw);
  const slug = filename.replace(/\.md$/i, "");
  return {
    filename,
    filepath,
    slug,
    data: parsed.data as Record<string, unknown>,
    body: parsed.content.trim(),
  };
}

export function loadMarkdownDir(subdir: string): MarkdownFile[] {
  return listMarkdownFiles(subdir).map(readMarkdownFile);
}

export function fieldError(file: string, field: string, hint?: string): Error {
  const extra = hint ? ` (${hint})` : "";
  return new Error(
    `content/${file}: campo obbligatorio "${field}" mancante o non valido${extra}`,
  );
}

export function requireString(
  data: Record<string, unknown>,
  field: string,
  file: string,
): string {
  const value = data[field];
  if (typeof value !== "string" || value.trim() === "") {
    throw fieldError(file, field, "attesa una stringa non vuota");
  }
  return value.trim();
}

export function optionalString(
  data: Record<string, unknown>,
  field: string,
): string | null {
  const value = data[field];
  if (value === undefined || value === null || value === "") return null;
  if (typeof value !== "string") {
    throw fieldError(
      path.basename(String(data.slug ?? field)),
      field,
      "attesa una stringa o null",
    );
  }
  const trimmed = value.trim();
  return trimmed === "" ? null : trimmed;
}

export function requireNumber(
  data: Record<string, unknown>,
  field: string,
  file: string,
): number {
  const value = data[field];
  if (typeof value !== "number" || Number.isNaN(value)) {
    throw fieldError(file, field, "atteso un numero");
  }
  return value;
}

export function requireDate(
  data: Record<string, unknown>,
  field: string,
  file: string,
): string {
  const value = data[field];
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value.trim())) {
    return value.trim().slice(0, 10);
  }
  throw fieldError(file, field, "atteso YYYY-MM-DD");
}

export function requireEnum<T extends string>(
  data: Record<string, unknown>,
  field: string,
  file: string,
  allowed: readonly T[],
): T {
  const value = data[field];
  if (typeof value !== "string" || !allowed.includes(value as T)) {
    throw fieldError(file, field, `valori ammessi: ${allowed.join(" | ")}`);
  }
  return value as T;
}

export function requireStringArray(
  data: Record<string, unknown>,
  field: string,
  file: string,
): string[] {
  const value = data[field];
  if (value === undefined || value === null) {
    throw fieldError(file, field, "atteso un array di stringhe");
  }
  if (!Array.isArray(value)) {
    throw fieldError(file, field, "atteso un array di stringhe");
  }
  return value.map((item, index) => coerceListString(item, field, index, file));
}

export function optionalStringArray(
  data: Record<string, unknown>,
  field: string,
  file: string,
): string[] {
  const value = data[field];
  if (value === undefined || value === null) return [];
  if (!Array.isArray(value)) {
    throw fieldError(file, field, "atteso un array di stringhe");
  }
  return value.map((item, index) => coerceListString(item, field, index, file));
}

function coerceListString(
  item: unknown,
  field: string,
  index: number,
  file: string,
): string {
  if (typeof item === "number") return String(item);
  if (typeof item === "string" && item.trim() !== "") return item.trim();
  // Unquoted YAML `Foo: bar` becomes { Foo: "bar" }.
  if (item && typeof item === "object" && !Array.isArray(item)) {
    const entries = Object.entries(item as Record<string, unknown>);
    if (entries.length === 1 && typeof entries[0][1] === "string") {
      return `${entries[0][0]}: ${entries[0][1]}`;
    }
  }
  throw fieldError(file, `${field}[${index}]`, "attesa una stringa");
}

export function requireSlugMatch(
  data: Record<string, unknown>,
  fileSlug: string,
  file: string,
): string {
  const slug = requireString(data, "slug", file);
  if (slug !== fileSlug) {
    throw new Error(
      `content/${file}: slug "${slug}" non coincide con il filename "${fileSlug}"`,
    );
  }
  return slug;
}

type SourceItem = { title: string; url: string };

export function requireSources(
  data: Record<string, unknown>,
  file: string,
): SourceItem[] {
  const value = data.sources;
  if (value === undefined || value === null) {
    throw fieldError(file, "sources", "atteso un array");
  }
  if (!Array.isArray(value)) {
    throw fieldError(file, "sources", "atteso un array");
  }
  return value.map((item, index) => {
    if (!item || typeof item !== "object") {
      throw fieldError(file, `sources[${index}]`, "atteso { title, url }");
    }
    const row = item as Record<string, unknown>;
    const title = row.title;
    const url = row.url;
    if (typeof title !== "string" || title.trim() === "") {
      throw fieldError(file, `sources[${index}].title`);
    }
    if (typeof url !== "string" || url.trim() === "") {
      throw fieldError(file, `sources[${index}].url`);
    }
    return { title: title.trim(), url: url.trim() };
  });
}

export type FaqItem = { q: string; a: string };

export function requireFaq(
  data: Record<string, unknown>,
  file: string,
): FaqItem[] {
  const value = data.faq;
  if (value === undefined || value === null) {
    throw fieldError(file, "faq", "atteso un array");
  }
  if (!Array.isArray(value)) {
    throw fieldError(file, "faq", "atteso un array");
  }
  return value.map((item, index) => {
    if (!item || typeof item !== "object") {
      throw fieldError(file, `faq[${index}]`, "atteso { q, a }");
    }
    const row = item as Record<string, unknown>;
    const q = row.q;
    const a = row.a;
    if (typeof q !== "string" || q.trim() === "") {
      throw fieldError(file, `faq[${index}].q`);
    }
    if (typeof a !== "string" || a.trim() === "") {
      throw fieldError(file, `faq[${index}].a`);
    }
    return { q: q.trim(), a: a.trim() };
  });
}

export function optionalReviewer(
  data: Record<string, unknown>,
  file: string,
): string | null {
  const value = data.reviewer;
  if (value === undefined || value === null || value === "") return null;
  if (typeof value !== "string") {
    throw fieldError(file, "reviewer", "attesa una stringa o null");
  }
  const trimmed = value.trim();
  return trimmed === "" ? null : trimmed;
}
