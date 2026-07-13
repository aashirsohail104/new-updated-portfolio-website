// Grid is the responsive column helper.
// Centralizes breakpoints so sections don't redefine grids.
const colMap = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
}

const gapMap = {
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
}

export default function Grid({
  cols = 3,
  gap = 'md',
  children,
  className = '',
}) {
  return (
    <div className={`grid ${colMap[cols]} ${gapMap[gap]} ${className}`}>
      {children}
    </div>
  )
}
