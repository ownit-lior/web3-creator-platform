import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type LogoProps = {
  href?: string
  className?: string
  imageClassName?: string
  showTagline?: boolean
  width?: number
  height?: number
  priority?: boolean
}

function AcronymTagline({ className }: { className?: string }) {
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

export function Logo({
  href = '/',
  className,
  imageClassName,
  showTagline = true,
  width = 320,
  height = 120,
  priority = false,
}: LogoProps) {
  const content = (
    <>
      <div className="relative flex items-center transition-transform duration-300 group-hover:scale-[1.03]">
        <Image
          src="/vibe-logo.png"
          alt="VIBE — Verified Intellectual Blockchain Equity"
          width={width}
          height={height}
          className={cn(
            'h-auto w-auto max-w-full object-contain',
            imageClassName,
          )}
          priority={priority}
        />
      </div>

      {showTagline && <AcronymTagline />}
    </>
  )

  if (!href) {
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
