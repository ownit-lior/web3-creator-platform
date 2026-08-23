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
      {/* Letter V */}
      <path d="M4 4l8 16 8-16" />
      {/* Dark singer silhouette (shadow) nested in the glowing V */}
      <g fill="#070b14" stroke="none">
        <circle cx="11.15" cy="8.05" r="1.75" />
        <path d="M10.55 9.7h1.2v1.05h-1.2z" />
        <path d="M8.2 10.7c.75-.5 1.9-.75 2.95-.75 1.05 0 2.2.25 2.95.75l.65 5.2H7.55l.65-5.2Z" />
        <path d="M13.55 11c.85-.55 2.15-1.55 3.05-2.35.22-.2.55-.15.7.12l.4.72c.12.22 0 .5-.22.65-1 .7-2.25 1.65-3.15 2.3-.28.2-.65.05-.78-.28l-.28-.6c-.1-.28.05-.55.28-.56Z" />
        <ellipse
          cx="16.95"
          cy="7.95"
          rx="1.2"
          ry="1.55"
          transform="rotate(-38 16.95 7.95)"
        />
        <rect
          x="15.55"
          y="8.85"
          width="0.85"
          height="2.1"
          rx="0.4"
          transform="rotate(-38 15.975 9.9)"
        />
      </g>
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

/** Prestigious brand lockup: wordmark + English expansion underneath */
export function VibeBrandLockup({
  className,
  wordmarkClassName,
  logoClassName,
  textClassName,
  taglineClassName,
}: {
  className?: string
  wordmarkClassName?: string
  logoClassName?: string
  textClassName?: string
  taglineClassName?: string
}) {
  return (
    <div
      dir="ltr"
      className={cn('flex flex-col items-center text-center', className)}
    >
      <VibeWordmark
        className={cn('text-7xl md:text-8xl drop-shadow-2xl', wordmarkClassName)}
        logoClassName={cn(
          'text-[#3bc1ca] drop-shadow-[0_0_12px_rgba(59,193,202,0.7)]',
          logoClassName,
        )}
        textClassName={cn(
          'text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#7ad4db]',
          textClassName,
        )}
      />
      <p
        className={cn(
          'mt-4 md:mt-5 text-[10px] sm:text-[11px] md:text-xs font-medium uppercase tracking-[0.32em] md:tracking-[0.38em] text-[#8fa8b8]/90',
          taglineClassName,
        )}
      >
        Verified Intellectual Blockchain Equity
      </p>
    </div>
  )
}
