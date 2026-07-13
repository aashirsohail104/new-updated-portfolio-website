import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { MdEmail, MdArrowOutward } from 'react-icons/md'
import Section from '../layout/Section'
import Button from '../ui/Button'
import { profile } from '../../data/profile'

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.5, ease: 'easeOut' },
}

// Titles rotated in place of the static profession text.
const rotatingTitles = [
  'AI Engineer',
  'Full-Stack Developer',
  'Chatbot Developer',
  'Prompt Engineer',
  'Problem Solver',
]

// Speed knobs (ms). Typing is slower than deleting — natural keyboard feel.
const TYPE_DELAY = 65
const DELETE_DELAY = 35
const HOLD_DELAY = 2200
const PAUSE_DELAY = 350

// Typewriter: types each title letter by letter, holds, deletes letter by
// letter, pauses briefly, then advances to the next title. Loops forever.
// Width is locked via an inline-grid sizer holding the longest title, so the
// parent eyebrow line never shifts while characters appear/disappear.
function RotatingText() {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [phase, setPhase] = useState('typing') // 'typing' | 'holding' | 'deleting' | 'pausing'
  const [caretOn, setCaretOn] = useState(true)

  const longest = rotatingTitles.reduce((a, b) => (a.length >= b.length ? a : b))
  const current = rotatingTitles[index]

  // Drive the state machine. Each phase schedules the next transition.
  useEffect(() => {
    let delay
    if (phase === 'typing') {
      if (text.length < current.length) {
        delay = TYPE_DELAY
      } else {
        delay = HOLD_DELAY
      }
    } else if (phase === 'holding') {
      delay = HOLD_DELAY
    } else if (phase === 'deleting') {
      if (text.length > 0) {
        delay = DELETE_DELAY
      } else {
        delay = PAUSE_DELAY
      }
    } else {
      // pausing
      delay = PAUSE_DELAY
    }

    const id = setTimeout(() => {
      if (phase === 'typing') {
        if (text.length < current.length) {
          setText(current.slice(0, text.length + 1))
        } else {
          setPhase('holding')
        }
      } else if (phase === 'holding') {
        setPhase('deleting')
      } else if (phase === 'deleting') {
        if (text.length > 0) {
          setText(current.slice(0, text.length - 1))
        } else {
          setIndex((i) => (i + 1) % rotatingTitles.length)
          setText('')
          setPhase('typing')
        }
      } else {
        // pausing → start typing the next title
        setIndex((i) => (i + 1) % rotatingTitles.length)
        setText('')
        setPhase('typing')
      }
    }, delay)

    return () => clearTimeout(id)
  }, [text, phase, current, index])

  // Blinking cursor — toggles every 500ms, independent of the typewriter.
  useEffect(() => {
    const id = setInterval(() => setCaretOn((v) => !v), 500)
    return () => clearInterval(id)
  }, [])

  return (
    <span
      className="inline-grid align-baseline"
      aria-label={current}
    >
      {/* Visually hidden, announced once per full title. */}
      <span className="sr-only" aria-live="polite">
        {current}
      </span>

      {/* Sizer: holds the longest title in the same grid cell so width is stable. */}
      <span aria-hidden className="invisible col-start-1 row-start-1">
        {longest}
      </span>

      {/* Animated typewriter cell, stacked over the sizer. */}
      <span aria-hidden className="col-start-1 row-start-1 whitespace-pre">
        {text}
        <span
          className="inline-block w-[0.55em] -mb-[0.05em]"
          style={{ opacity: caretOn ? 1 : 0 }}
        >
          |
        </span>
      </span>
    </span>
  )
}

// AI-inspired constellation: a small fixed budget of DOM nodes, all
// animated with transform / opacity (GPU-composited, no paint, no blur).
// 1 grid background (static), 1 soft glow (static), 6 drifting nodes
// (CSS @keyframes transform), 4 SVG connection lines (CSS stroke-dashoffset).
// Total: ~12 nodes. No WebGL, no canvas, no filter:blur, no mousemove.
const nodes = [
  { x: 22, y: 28, r: 3, delay: 0 },
  { x: 78, y: 22, r: 2.5, delay: 1.2 },
  { x: 68, y: 70, r: 3.5, delay: 0.6 },
  { x: 28, y: 74, r: 2, delay: 1.8 },
  { x: 50, y: 50, r: 4, delay: 0.3 }, // center, slightly larger
  { x: 88, y: 52, r: 2, delay: 2.1 },
]

// Edges (i, j) draw a thin line + animate dashoffset for a "data flow" feel.
const edges = [
  [0, 4],
  [1, 4],
  [2, 4],
  [3, 4],
  [1, 5],
]

function HeroOrb() {
  return (
    <div
      aria-hidden
      className="relative mx-auto w-full max-w-[360px] aspect-square overflow-hidden rounded-2xl border border-line/60 bg-bg/40"
    >
      {/* Layer 1 — digital grid (static, 1 div). */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(148,163,184,0.08) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage:
            'radial-gradient(circle at center, black 30%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(circle at center, black 30%, transparent 75%)',
        }}
      />

      {/* Layer 2 — soft glow (static, no filter:blur, no animation). */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(34,211,238,0.18), rgba(168,85,247,0.10) 45%, rgba(5,8,22,0) 70%)',
        }}
      />

      {/* Layer 3 — SVG connection lines (4 lines, 1 DOM node). */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {edges.map(([a, b], i) => {
          const A = nodes[a]
          const B = nodes[b]
          return (
            <line
              key={i}
              x1={A.x}
              y1={A.y}
              x2={B.x}
              y2={B.y}
              stroke="rgba(34,211,238,0.35)"
              strokeWidth="0.3"
              strokeDasharray="6 4"
              style={{
                animation: `dataflow 4s linear ${i * 0.6}s infinite`,
              }}
            />
          )
        })}
      </svg>

      {/* Layer 4 — drifting nodes (6 dots, transform-only animation). */}
      {nodes.map((n, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-primary"
          style={
            n.r === 4
              ? {
                  // center node — large, ringed, pulses softly
                  left: `${n.x}%`,
                  top: `${n.y}%`,
                  width: `${n.r * 2}px`,
                  height: `${n.r * 2}px`,
                  transform: 'translate(-50%, -50%)',
                  boxShadow: '0 0 18px 2px rgba(34,211,238,0.35)',
                  animation: `nodedrift 6s ease-in-out ${n.delay}s infinite alternate`,
                }
              : {
                  left: `${n.x}%`,
                  top: `${n.y}%`,
                  width: `${n.r * 2}px`,
                  height: `${n.r * 2}px`,
                  transform: 'translate(-50%, -50%)',
                  opacity: 0.85,
                  animation: `nodedrift 6s ease-in-out ${n.delay}s infinite alternate`,
                }
          }
        />
      ))}

      {/* Center label — unchanged. */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-5xl font-bold text-white tracking-tight">
          AI
        </span>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <Section id="top" className="pt-32 md:pt-40">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div {...fadeUp} className="flex flex-col gap-6">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            <RotatingText />
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
            Building Intelligent AI Systems That{' '}
            <span className="text-primary">Think</span>,{' '}
            <span className="text-secondary">Automate</span>, and Scale.
          </h1>
          <p className="text-base md:text-lg text-muted leading-relaxed max-w-xl">
            I'm {profile.name}, an Agentic AI Engineer and Full Stack Developer
            focused on creating AI-powered applications, modern web experiences,
            and automation solutions. I enjoy solving complex problems through
            clean architecture, thoughtful design, and intelligent software.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-2">
            <Button href="#projects" size="lg">
              View Projects
              <MdArrowOutward size={18} />
            </Button>
            <Button href="#contact" variant="outline" size="lg">
              Get in Touch
            </Button>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-muted hover:text-white hover:border-primary/50 transition-colors"
            >
              <FaGithub size={18} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-muted hover:text-white hover:border-primary/50 transition-colors"
            >
              <FaLinkedin size={18} />
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-muted hover:text-white hover:border-primary/50 transition-colors"
            >
              <MdEmail size={18} />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <HeroOrb />
        </motion.div>
      </div>
    </Section>
  )
}
