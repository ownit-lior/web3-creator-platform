import { cn } from '@/lib/utils'

function VibeLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M4 4l8 16 8-16" />
      <circle cx="12" cy="12" r="3" fill="currentColor" />
    </svg>
  )
}

export function VibeWordmark({
  className,
  logoClassName,
  textClassName,
}: {
  className?: string
  logoClassName?: string
  textClassName?: string
}) {
  return (
    <span
      dir="ltr"
      className={cn('inline-flex items-center font-black tracking-tight', className)}
    >
      <VibeLogo className={cn('h-[0.92em] w-[0.92em] shrink-0', logoClassName)} />
      <span className={textClassName}>IBE</span>
    </span>
  )
}
