import { useState, useEffect } from 'react'
import { FaBars, FaTimes, FaDownload, FaGithub, FaLinkedin } from 'react-icons/fa'
import { profile } from '../../data/profile'
import Container from '../layout/Container'

// All 7 section links — used for the desktop nav and the mobile drawer.
const navLinks = [
  { href: '#top', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

/*
  Navbar — simplest possible structure.

  One Container, one flex row, three children at >= xl (1280px):
    [Logo]    [Nav (7 links)]    [Download CV]
  justify-between puts the three children at the left edge, center,
  and right edge — so the nav is geometrically centered by flexbox
  itself, no justify-center trick needed.

  At < xl the nav and Download CV collapse into a hamburger drawer.
*/

export default function Navbar() {
  const [open, setOpen] = useState(false)

  // Close drawer on link click.
  const close = () => setOpen(false)

  // Close drawer on Escape.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Lock body scroll while drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-bg/80 backdrop-blur border-b border-line">
        <Container>
          <div className="h-[60px] xl:h-16 flex items-center justify-between gap-4">
            {/* Logo — always visible, left edge */}
            <a
              href="#top"
              className="flex items-center gap-2 text-white font-semibold"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 border border-primary/30 text-primary font-bold text-sm">
                AS
              </span>
              <span className="hidden xl:inline whitespace-nowrap">
                {profile.name}
              </span>
            </a>

            {/* Desktop nav (>= xl) — geometrically centered by justify-between */}
            <nav
              aria-label="Primary"
              className="hidden xl:flex items-center gap-1"
            >
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="px-3 py-1.5 text-sm text-muted hover:text-white transition-colors rounded-md"
                >
                  {l.label}
                </a>
              ))}
            </nav>

            {/* Download CV (>= xl) — right edge */}
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="hidden xl:inline-flex items-center gap-2 bg-primary text-bg px-4 py-2 text-sm font-medium rounded-md hover:bg-primary/90 transition-colors"
            >
              <FaDownload size={13} />
              Download CV
            </a>

            {/* Hamburger (< xl) */}
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="xl:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-line text-white"
            >
              {open ? <FaTimes size={16} /> : <FaBars size={16} />}
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile / tablet drawer (< xl) */}
      {open && (
        <div
          id="mobile-menu"
          className="xl:hidden fixed inset-x-0 top-[60px] z-40 bg-bg/95 backdrop-blur border-b border-line"
        >
          <Container className="py-6 flex flex-col gap-1">
            <nav aria-label="Mobile primary" className="flex flex-col">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={close}
                  className="py-3 text-base text-white border-b border-line/60"
                >
                  {l.label}
                </a>
              ))}
            </nav>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="GitHub"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line text-muted hover:text-white"
              >
                <FaGithub size={16} />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="LinkedIn"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line text-muted hover:text-white"
              >
                <FaLinkedin size={16} />
              </a>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer noopener"
                onClick={close}
                className="ml-auto inline-flex items-center gap-2 bg-primary text-bg px-4 py-2 text-sm font-medium rounded-md hover:bg-primary/90"
              >
                <FaDownload size={13} />
                Download CV
              </a>
            </div>
          </Container>
        </div>
      )}
    </>
  )
}
