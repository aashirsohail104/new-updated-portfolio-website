import { motion } from 'framer-motion'

// Card is the only card component. Same padding, same border, same hover behavior everywhere.
export default function Card({
  children,
  className = '',
  interactive = false,
  as: Tag = 'div',
  ...rest
}) {
  const base =
    'rounded-xl border border-line bg-bg/40 p-6 2xl:p-8 transition-colors duration-200'
  const hover = interactive ? 'hover:border-primary/50 hover:bg-bg/60' : ''
  const cls = `${base} ${hover} ${className}`

  if (interactive) {
    return (
      <motion.div
        whileHover={{ y: -3 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        className={cls}
        {...rest}
      >
        {children}
      </motion.div>
    )
  }
  return (
    <Tag className={cls} {...rest}>
      {children}
    </Tag>
  )
}
