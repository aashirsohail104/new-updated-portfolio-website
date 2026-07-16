import { motion } from 'framer-motion'
import Section from '../layout/Section'
import Grid from '../layout/Grid'
import SectionTitle from '../ui/SectionTitle'
import Card from '../ui/Card'
import { profile } from '../../data/profile'

const springTransition = {
  type: 'spring',
  stiffness: 100,
  damping: 30,
  mass: 0.8,
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: springTransition,
  },
}

export default function About() {
  return (
    <Section id="about">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <SectionTitle
          eyebrow="About"
          title="Designing systems that combine web and intelligence."
          description={profile.about}
        />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="mt-12"
      >
        <Grid cols={4}>
          {profile.quickInfo.map((item) => (
            <motion.div key={item.label} variants={cardVariants}>
              <Card
                interactive
                className="group relative overflow-hidden transition-all duration-500 hover:border-primary/40 hover:shadow-[0_0_30px_-8px_rgba(34,211,238,0.2)]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted transition-colors duration-300 group-hover:text-primary/80">
                  {item.label}
                </p>
                <p className="mt-2 text-lg 2xl:text-xl text-white font-semibold transition-all duration-300">
                  {item.value}
                </p>
              </Card>
            </motion.div>
          ))}
        </Grid>
      </motion.div>
    </Section>
  )
}
