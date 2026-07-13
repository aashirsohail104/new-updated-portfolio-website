import { motion } from 'framer-motion'
import Section from '../layout/Section'
import Grid from '../layout/Grid'
import SectionTitle from '../ui/SectionTitle'
import Card from '../ui/Card'
import { profile } from '../../data/profile'

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.5, ease: 'easeOut' },
}

export default function About() {
  return (
    <Section id="about">
      <motion.div {...fadeUp}>
        <SectionTitle
          eyebrow="About"
          title="Designing systems that combine web and intelligence."
          description={profile.about}
        />
      </motion.div>

      <Grid cols={4} className="mt-12">
        {profile.quickInfo.map((item) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <Card>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                {item.label}
              </p>
              <p className="mt-2 text-lg text-white font-semibold">
                {item.value}
              </p>
            </Card>
          </motion.div>
        ))}
      </Grid>
    </Section>
  )
}
