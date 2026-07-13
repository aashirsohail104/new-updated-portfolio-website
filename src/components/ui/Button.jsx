import { motion } from 'framer-motion'

const variants = {
  primary:
    'bg-primary text-bg hover:bg-primary/90',
  outline:
    'border border-line text-white hover:border-primary hover:text-primary',
  ghost:
    'text-muted hover:text-white',
}

const sizes = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  type = 'button',
  className = '',
  ariaLabel,
  external = false,
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg'
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`

  const inner = (
    <motion.span
      whileHover={{ y: -1 }}
      whileTap={{ y: 0, scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className="inline-flex items-center gap-2"
    >
      {children}
    </motion.span>
  )

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        aria-label={ariaLabel}
        className={cls}
        {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
      >
        {inner}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} aria-label={ariaLabel} className={cls}>
      {inner}
    </button>
  )
}
