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
  width = 320,
  height = 120,
  priority = false,
}: LogoProps) {
  const content = (
    <>
      <div className="relative flex items-center transition-transform duration-300 group-hover:scale-[1.03]">
        <Image
          src="/vibe-logo.png"
          alt="VIBE Logo"
          width={width}
          height={height}
          className={cn(
            'h-auto w-auto max-w-full object-contain',
            imageClassName,
          )}
          priority={priority}
        />
      </div>

      {showTagline && (
        <div className="mt-4 md:mt-5 text-center leading-relaxed">
          <p className="text-[0.58rem] sm:text-[0.65rem] md:text-[0.7rem] font-medium uppercase tracking-[0.34em] md:tracking-[0.42em] text-[#7adfe8]/85">
            Verified Intellectual
          </p>
          <p className="mt-1 text-[0.58rem] sm:text-[0.65rem] md:text-[0.7rem] font-medium uppercase tracking-[0.34em] md:tracking-[0.42em] text-[#7adfe8]/85">
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
