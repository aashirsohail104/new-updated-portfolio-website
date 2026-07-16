import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { profile } from '../../data/profile'
import Container from '../layout/Container'

const links = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <Container className="py-12 2xl:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 border border-primary/30 text-primary font-bold">
                A
              </span>
              <span className="text-white font-semibold">{profile.name}</span>
            </div>
            <p className="mt-3 text-sm text-muted max-w-xs">
              Agentic AI Engineer and Full Stack Developer building intelligent,
              fast, and accessible software.
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-2 md:justify-self-center">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-muted hover:text-white transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3 md:justify-self-end">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-line text-muted hover:text-white hover:border-primary/50 transition-colors"
            >
              <FaGithub size={16} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-line text-muted hover:text-white hover:border-primary/50 transition-colors"
            >
              <FaLinkedin size={16} />
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-line text-muted hover:text-white hover:border-primary/50 transition-colors"
            >
              <MdEmail size={16} />
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-line flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between text-xs text-muted">
          <span>© 2026 {profile.name}. All rights reserved.</span>
          <span>Built with React, Vite, Tailwind & Framer Motion.</span>
        </div>
      </Container>
    </footer>
  )
}
