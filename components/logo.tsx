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

export function Logo({
  href = '/',
  className,
  imageClassName,
  showTagline = true,
  width = 220,
  height = 72,
  priority = false,
}: LogoProps) {
  const content = (
    <>
      <div className="relative flex items-center transition-transform duration-300 group-hover:scale-105">
        <Image
          src="/vibe-logo.png"
          alt="VIBE Logo"
          width={width}
          height={height}
          className={cn(
            'h-auto w-auto object-contain drop-shadow-[0_0_8px_rgba(0,255,255,0.4)]',
            imageClassName,
          )}
          priority={priority}
        />
      </div>

      {showTagline && (
        <div className="mt-2 text-center">
          <p className="text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-[#00FFFF]/80 sm:text-[0.6rem]">
            Verified Intellectual
          </p>
          <p className="text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-[#00FFFF]/80 sm:text-[0.6rem]">
            Blockchain Equity
          </p>
        </div>
      )}
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
