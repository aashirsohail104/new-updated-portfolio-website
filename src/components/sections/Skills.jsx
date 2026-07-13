import { motion } from 'framer-motion'
import Section from '../layout/Section'
import Grid from '../layout/Grid'
import SectionTitle from '../ui/SectionTitle'
import Card from '../ui/Card'
import { skillCategories } from '../../data/skills'

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.5, ease: 'easeOut' },
}

// Per-card entrance + hover, layered on top of the existing <Card> styles.
// GPU-only properties: transform (translateY, scale), opacity, box-shadow.
// Border glow is achieved with a CSS ring (no paint thrash).
function SkillCard({ children, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
      whileHover={{ y: -3, scale: 1.02 }}
      className="h-full"
    >
      <div className="h-full transition-[box-shadow,border-color] duration-300 ease-out hover:shadow-[0_0_0_1px_rgba(34,211,238,0.35),0_10px_30px_-10px_rgba(34,211,238,0.25)]">
        <Card className="h-full hover:border-primary/50">
          {children}
        </Card>
      </div>
    </motion.div>
  )
}

export default function Skills() {
  return (
    <Section id="skills">
      <motion.div {...fadeUp}>
        <SectionTitle
          eyebrow="Skills"
          title="The tools and languages I work with."
          description="A categorized view of the stack I reach for day to day."
        />
      </motion.div>

      <Grid cols={3} className="mt-12">
        {skillCategories.map((cat, i) => (
          <SkillCard key={cat.name} index={i}>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              {cat.name}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {cat.items.map((skill) => (
                <span
                  key={skill}
                  className="text-xs px-3 py-1 rounded-full border border-line text-muted"
                >
                  {skill}
                </span>
              ))}
            </div>
          </SkillCard>
        ))}
      </Grid>
    </Section>
  )
}
