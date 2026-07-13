import { motion } from 'framer-motion'
import Section from '../layout/Section'
import Grid from '../layout/Grid'
import SectionTitle from '../ui/SectionTitle'
import Card from '../ui/Card'
import { services } from '../../data/services'

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.5, ease: 'easeOut' },
}

export default function Services() {
  return (
    <Section id="services" className="bg-bg/30">
      <motion.div {...fadeUp}>
        <SectionTitle
          eyebrow="Services"
          title="What I build"
          description="Four areas of focus, applied to real products and the people who use them."
        />
      </motion.div>

      <Grid cols={2} className="mt-12">
        {services.map((s) => (
          <Card key={s.title} interactive>
            <div className="flex flex-col gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 border border-primary/30 text-primary text-sm font-bold">
                {s.title
                  .split(' ')
                  .map((w) => w[0])
                  .join('')
                  .slice(0, 2)}
              </span>
              <h3 className="text-xl font-semibold text-white">{s.title}</h3>
              <p className="text-muted text-sm md:text-base leading-relaxed">
                {s.description}
              </p>
            </div>
          </Card>
        ))}
      </Grid>
    </Section>
  )
}
