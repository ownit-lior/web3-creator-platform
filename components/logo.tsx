import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const LOGO_SIZES = {
  hero: {
    width: 420,
    height: 180,
    imageClassName: 'w-[240px] sm:w-[300px] md:w-[360px]',
  },
  header: {
    width: 180,
    height: 64,
    imageClassName: 'w-[130px] sm:w-[150px]',
  },
  inline: {
    width: 96,
    height: 36,
    imageClassName: 'w-[80px]',
  },
} as const

type LogoSize = keyof typeof LOGO_SIZES

type LogoProps = {
  href?: string | null
  className?: string
  imageClassName?: string
  showTagline?: boolean
  size?: LogoSize
  width?: number
  height?: number
  priority?: boolean
}

export function AcronymTagline({ className }: { className?: string }) {
  return (
    <p
      dir="ltr"
      className={cn(
        'mt-4 md:mt-5 max-w-[min(100%,34rem)] text-center text-[0.62rem] sm:text-xs md:text-sm font-semibold uppercase leading-snug tracking-[0.18em] sm:tracking-[0.22em] md:tracking-[0.28em] text-white/90',
        className,
      )}
    >
      <span className="text-[#3bc1ca] font-extrabold drop-shadow-[0_0_6px_rgba(59,193,202,0.5)]">
        V
      </span>
      erified{' '}
      <span className="text-[#3bc1ca] font-extrabold drop-shadow-[0_0_6px_rgba(59,193,202,0.5)]">
        I
      </span>
      ntellectual{' '}
      <span className="text-[#3bc1ca] font-extrabold drop-shadow-[0_0_6px_rgba(59,193,202,0.5)]">
        B
      </span>
      lockchain{' '}
      <span className="text-[#3bc1ca] font-extrabold drop-shadow-[0_0_6px_rgba(59,193,202,0.5)]">
        E
      </span>
      quity
    </p>
  )
}

/** Image-only VIBE mark (no tagline) — for headers, modals, inline use */
export function LogoMark({
  className,
  imageClassName,
  size = 'header',
  width,
  height,
  priority = false,
}: Pick<LogoProps, 'className' | 'imageClassName' | 'size' | 'width' | 'height' | 'priority'>) {
  const preset = LOGO_SIZES[size ?? 'header']
  return (
    <span className={cn('inline-flex items-center', className)}>
      <Image
        src="/vibe-logo.png"
        alt="VIBE"
        width={width ?? preset.width}
        height={height ?? preset.height}
        className={cn('h-auto w-auto max-w-full object-contain', preset.imageClassName, imageClassName)}
        priority={priority}
      />
    </span>
  )
}

export function Logo({
  href = '/',
  className,
  imageClassName,
  showTagline = true,
  size = 'hero',
  width,
  height,
  priority = false,
}: LogoProps) {
  const preset = LOGO_SIZES[size]

  const content = (
    <>
      <div className="relative flex items-center transition-transform duration-300 group-hover:scale-[1.03]">
        <LogoMark
          size={size}
          width={width ?? preset.width}
          height={height ?? preset.height}
          imageClassName={imageClassName}
          priority={priority}
        />
      </div>

      {showTagline && <AcronymTagline />}
    </>
  )

  if (href === null || href === undefined) {
    return (
      <div className={cn('group flex flex-col items-center justify-center', className)}>
        {content}
      </div>
    )
  }

  return (
    <Link
      href={href}
      className={cn(
        'group flex cursor-pointer flex-col items-center justify-center',
        className,
      )}
    >
      {content}
    </Link>
  )
}
