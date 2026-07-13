import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { profile } from '../../data/profile'

/*
  Loader — premium startup screen, shown once on first mount.

  Timeline (≈ 1.8s total):
    0.00s  overlay + logo fade in
    0.20s  bar fades in
    0.40s  bar fill starts (left → right)
    1.40s  bar reaches 100%
    1.70s  300ms hold
    2.00s  overlay fades out
    ~2.2s  parent <main> reveals (it has no enter animation — it was
           already in the DOM, just covered by the overlay)
*/

const BAR_FILL_MS = 1000
const HOLD_MS = 300
const ENTER_MS = 350
const EXIT_MS = 400

// Subtle scale only — never above 1.02 per spec.
const enterTransition = { duration: ENTER_MS / 1000, ease: 'easeOut' }
const exitTransition = { duration: EXIT_MS / 1000, ease: 'easeInOut' }

export default function Loader() {
  const [visible, setVisible] = useState(true)
  const [fill, setFill] = useState(0)

  // Drive the fill, then the hold, then the exit.
  useEffect(() => {
    // Slight delay so the bar fades in before it starts filling.
    const fillStart = setTimeout(() => setFill(1), 400)
    // When the fill CSS transition finishes, hold briefly then unmount.
    const finish = setTimeout(() => setVisible(false), 400 + BAR_FILL_MS + HOLD_MS)
    return () => {
      clearTimeout(fillStart)
      clearTimeout(finish)
    }
  }, [])

  // Lock body scroll while the loader is visible — prevents the user
  // from scrolling the hidden page behind it.
  useEffect(() => {
    if (!visible) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          role="status"
          aria-label={`${profile.name} portfolio loading`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={enterTransition}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-bg"
        >
          {/* Stack: logo on top, bar directly beneath. */}
          <div className="flex flex-col items-center gap-8">
            {/* Logo — identical to the navbar mark. */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={enterTransition}
              className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 border border-primary/30 text-primary font-bold text-lg"
            >
              AS
            </motion.div>

            {/* Loading bar — track + animated fill. */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={enterTransition}
              className="h-[6px] w-[260px] overflow-hidden rounded-full bg-line/60"
            >
              <div
                className="h-full rounded-full bg-primary"
                style={{
                  width: `${fill * 100}%`,
                  transition: `width ${BAR_FILL_MS}ms cubic-bezier(0.22, 0.61, 0.36, 1)`,
                  willChange: 'width',
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
