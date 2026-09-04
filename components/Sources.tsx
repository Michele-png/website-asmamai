export function Sources({ items }: { items: { title: string; url: string }[] }) {
  if (items.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="font-display text-2xl text-deep sm:text-3xl">Fonti</h2>
      <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-deep/75">
        {items.map((item) => (
          <li key={item.url}>
            <a
              href={item.url}
              className="text-teal underline decoration-accent/40 underline-offset-2 hover:text-teal-dark"
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.title}
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
