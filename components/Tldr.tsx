export function Tldr({ children }: { children: string }) {
  return (
    <aside className="mt-6 rounded-2xl border border-accent/25 bg-white/75 p-5 shadow-sm backdrop-blur">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal">
        In breve
      </p>
      <p className="mt-2 text-base leading-relaxed text-deep/80">{children}</p>
    </aside>
  );
}
