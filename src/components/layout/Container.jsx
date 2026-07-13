// Container is the SINGLE source of max-width and horizontal padding.
// No component or section may redefine these. Everything inherits from here.
export default function Container({ children, className = '' }) {
  return (
    <div
      className={`mx-auto w-full max-w-[1200px] px-5 sm:px-6 md:px-8 lg:px-10 ${className}`}
    >
      {children}
    </div>
  )
}
