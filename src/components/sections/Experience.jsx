import { motion } from 'framer-motion'
import { FaBriefcase, FaCube, FaCode } from 'react-icons/fa'
import { GiArtificialIntelligence } from 'react-icons/gi'
import Section from '../layout/Section'
import SectionTitle from '../ui/SectionTitle'
import { experience } from '../../data/experience'

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.5, ease: 'easeOut' },
}

const iconMap = {
  briefcase: FaBriefcase,
  cube: FaCube,
  code: FaCode,
  ai: GiArtificialIntelligence,
}

export default function Experience() {
  return (
    <Section id="experience" className="bg-bg/30">
      <motion.div {...fadeUp}>
        <SectionTitle
          eyebrow="Experience"
          title="Where my work comes from."
          description="Three streams of practice that shape how I approach problems."
        />
      </motion.div>

      <div className="mt-12 flex flex-col gap-4">
        {experience.map((item, i) => {
          const Icon = iconMap[item.icon] || FaCode
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.12 }}
              whileHover={{ x: 4 }}
              className="rounded-xl border border-line bg-bg/40 p-6 border-l-2 border-l-primary/60 transition-[box-shadow,border-color] duration-300 ease-out hover:border-primary/60 hover:shadow-[0_8px_30px_-12px_rgba(34,211,238,0.25)]"
            >
              <div className="flex items-start gap-4">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 border border-primary/30 text-primary">
                  <Icon size={18} />
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="text-muted text-sm md:text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}
