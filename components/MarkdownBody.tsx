import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prose } from "@/components/Prose";

export function MarkdownBody({ content }: { content: string }) {
  if (!content.trim()) return null;

  return (
    <Prose>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </Prose>
  );
}
