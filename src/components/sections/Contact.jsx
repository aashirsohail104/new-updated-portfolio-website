import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { MdEmail, MdContentCopy, MdCheck } from 'react-icons/md'
import Section from '../layout/Section'
import SectionTitle from '../ui/SectionTitle'
import Button from '../ui/Button'
import { profile } from '../../data/profile'

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.5, ease: 'easeOut' },
}

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // ignore
    }
  }

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(
      `Hello from ${form.name || 'your portfolio'}`
    )
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name} (${form.email})`
    )
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setSent(true)
    setTimeout(() => setSent(false), 2500)
  }

  return (
    <Section id="contact" className="bg-bg/30">
      <motion.div {...fadeUp}>
        <SectionTitle
          eyebrow="Contact"
          title="Have an idea, project, or collaboration in mind?"
          description="Let's build something impactful together."
        />
      </motion.div>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <motion.div
          {...fadeUp}
          className="rounded-xl border border-line bg-bg/40 p-6 flex flex-col gap-5"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Email
            </p>
            <div className="mt-2 flex items-center gap-2">
              <a
                href={`mailto:${profile.email}`}
                className="text-white hover:text-primary transition-colors break-all"
              >
                {profile.email}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                aria-label="Copy email"
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-line text-muted hover:text-white hover:border-primary/50 transition-colors"
              >
                {copied ? <MdCheck size={14} /> : <MdContentCopy size={14} />}
              </button>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Find me on
            </p>
            <div className="mt-2 flex items-center gap-3">
              <Button
                href={profile.github}
                external
                variant="outline"
                size="md"
                ariaLabel="GitHub"
              >
                <FaGithub size={14} /> GitHub
              </Button>
              <Button
                href={profile.linkedin}
                external
                variant="outline"
                size="md"
                ariaLabel="LinkedIn"
              >
                <FaLinkedin size={14} /> LinkedIn
              </Button>
              <Button
                href={`mailto:${profile.email}`}
                variant="outline"
                size="md"
                ariaLabel="Email"
              >
                <MdEmail size={14} /> Email
              </Button>
            </div>
          </div>

          <p className="text-sm text-muted leading-relaxed">
            Open to full-time roles, contract work, and interesting
            collaborations in AI engineering and full stack development.
          </p>
        </motion.div>

        <motion.form
          {...fadeUp}
          onSubmit={onSubmit}
          className="rounded-xl border border-line bg-bg/40 p-6 flex flex-col gap-4"
        >
          <label className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Name
            </span>
            <input
              required
              name="name"
              value={form.name}
              onChange={onChange}
              className="rounded-lg border border-line bg-bg/60 px-4 py-2.5 text-sm text-white placeholder:text-muted focus:border-primary focus:outline-none transition-colors"
              placeholder="Your name"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Email
            </span>
            <input
              required
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              className="rounded-lg border border-line bg-bg/60 px-4 py-2.5 text-sm text-white placeholder:text-muted focus:border-primary focus:outline-none transition-colors"
              placeholder="you@example.com"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Message
            </span>
            <textarea
              required
              name="message"
              rows={5}
              value={form.message}
              onChange={onChange}
              className="rounded-lg border border-line bg-bg/60 px-4 py-2.5 text-sm text-white placeholder:text-muted focus:border-primary focus:outline-none transition-colors resize-none"
              placeholder="Tell me about your project..."
            />
          </label>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted">
              {sent ? 'Opening your email client...' : 'Submits via your email client.'}
            </span>
            <Button type="submit" size="md">
              Send Message
            </Button>
          </div>
        </motion.form>
      </div>
    </Section>
  )
}
