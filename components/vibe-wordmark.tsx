import { cn } from '@/lib/utils'

function VibeLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.55"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {/* Abstract neon V */}
      <path d="M4 4l8 16 8-16" />
      {/* Crisp dark singer-with-mic silhouette nested in the V */}
      <g fill="#050814" stroke="none">
        {/* Head — slightly tilted performance pose */}
        <circle cx="11.05" cy="7.85" r="1.72" />
        {/* Neck */}
        <path d="M10.45 9.45h1.2v1.05h-1.2z" />
        {/* Dynamic torso */}
        <path d="M7.95 10.55c.8-.55 2-.85 3.1-.85 1.1 0 2.3.3 3.1.85l.75 5.45H7.2l.75-5.45Z" />
        {/* Raised arm to mic */}
        <path d="M13.45 10.85c.9-.6 2.35-1.75 3.25-2.55.2-.18.52-.12.68.14l.42.68c.14.22.04.52-.18.68-1.05.75-2.4 1.8-3.35 2.5-.3.2-.68.04-.82-.3l-.3-.62c-.1-.28.06-.55.3-.53Z" />
        {/* Mic capsule */}
        <ellipse
          cx="17.05"
          cy="7.75"
          rx="1.18"
          ry="1.52"
          transform="rotate(-40 17.05 7.75)"
        />
        {/* Mic handle */}
        <rect
          x="15.6"
          y="8.7"
          width="0.82"
          height="2.15"
          rx="0.4"
          transform="rotate(-40 16.01 9.775)"
        />
      </g>
    </svg>
  )
}

export function VibeWordmark({
  className,
  logoClassName,
  textClassName,
  withHalo = false,
}: {
  className?: string
  logoClassName?: string
  textClassName?: string
  /** Soft neon halo behind the glowing V */
  withHalo?: boolean
}) {
  return (
    <span
      dir="ltr"
      className={cn('relative inline-flex items-center font-black tracking-tight', className)}
    >
      {withHalo && (
        <span
          aria-hidden
          className="pointer-events-none absolute left-[0.12em] top-1/2 -z-10 h-[0.85em] w-[0.85em] -translate-y-1/2 rounded-full bg-[#3bc1ca]/35 blur-[18px]"
        />
      )}
      <VibeLogo
        className={cn(
          'relative h-[0.92em] w-[0.92em] shrink-0',
          logoClassName,
        )}
      />
      <span className={cn('relative', textClassName)}>IBE</span>
    </span>
  )
}

/**
 * Centered vertical brand lockup:
 * large neon VIBE → English expansion → compact mark
 */
export function VibeBrandLockup({
  className,
  showCompactMark = true,
}: {
  className?: string
  showCompactMark?: boolean
}) {
  return (
    <div
      dir="ltr"
      className={cn(
        'flex flex-col items-center text-center select-none',
        className,
      )}
    >
      {/* Primary wordmark */}
      <VibeWordmark
        withHalo
        className="text-7xl md:text-8xl leading-none"
        logoClassName="text-[#3bc1ca] [filter:drop-shadow(0_0_10px_rgba(59,193,202,0.85))_drop-shadow(0_0_28px_rgba(59,193,202,0.4))]"
        textClassName="text-white"
      />

      {/* English expansion — smaller, white, refined tracking */}
      <p className="mt-5 md:mt-6 max-w-[22rem] md:max-w-none text-[9px] sm:text-[10px] md:text-[11px] font-medium uppercase tracking-[0.34em] md:tracking-[0.42em] text-white/85">
        Verified Intellectual Blockchain Equity
      </p>

      {/* Compact secondary mark */}
      {showCompactMark && (
        <div className="mt-8 md:mt-10 opacity-90">
          <VibeWordmark
            withHalo
            className="text-2xl md:text-3xl leading-none"
            logoClassName="text-[#3bc1ca] drop-shadow-[0_0_10px_rgba(59,193,202,0.55)]"
            textClassName="text-white"
          />
        </div>
      )}
    </div>
  )
}
