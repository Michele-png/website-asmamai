export function Faq({ items }: { items: { q: string; a: string }[] }) {
  if (items.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="font-display text-2xl text-deep sm:text-3xl">Domande frequenti</h2>
      <div className="mt-5 space-y-3">
        {items.map((item) => (
          <details
            key={item.q}
            className="rounded-xl border border-deep/10 bg-white/70 px-4 py-3 open:border-accent/30"
          >
            <summary className="cursor-pointer list-none font-medium text-deep marker:content-none">
              <span className="flex items-start justify-between gap-3">
                <span>{item.q}</span>
                <span aria-hidden className="text-teal">
                  +
                </span>
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-deep/75">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
