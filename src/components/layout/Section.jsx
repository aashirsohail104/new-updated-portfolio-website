import Container from './Container'

// Section is the SINGLE source of vertical rhythm between sections.
// Mobile 72px, Tablet 96px, Desktop 120px. Nothing else adds page padding.
export default function Section({ id, children, className = '' }) {
  return (
    <section id={id} className={`py-[72px] md:py-24 lg:py-[120px] 2xl:py-[160px] ${className}`}>
      <Container>{children}</Container>
    </section>
  )
}
