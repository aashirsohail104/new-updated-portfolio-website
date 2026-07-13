// SectionTitle is the only place section headings are defined.
// Ensures consistent typography and alignment across every section.
export default function SectionTitle({
  eyebrow,
  title,
  description,
  align = 'left',
}) {
  const alignment =
    align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'
  return (
    <div className={`flex flex-col gap-3 max-w-2xl ${alignment}`}>
      {eyebrow && (
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
        {title}
      </h2>
      {description && (
        <p className="text-muted text-base md:text-lg leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}
