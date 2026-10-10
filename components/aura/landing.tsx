'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

const systems = [
  {
    id: 'automation',
    title: 'בית חכם ואוטומציה',
    body: 'שליטה בתאורה, בתריסים, במיזוג ובמערכות נוספות, בהתאם לצורכי הבית.',
    image: '/aura/automation.jpg',
    alt: 'חלל מגורים מודרני עם תאורה טבעית',
  },
  {
    id: 'av',
    title: 'אודיו־וידאו וקולנוע ביתי',
    body: 'מערכות שמע, מסכים וקולנוע ביתי בתכנון מוקפד, עם התייחסות לאקוסטיקה, למיקום הרמקולים ולעיצוב.',
    image: '/aura/cinema.jpg',
    alt: 'חלל קולנוע ביתי מעוצב',
  },
  {
    id: 'network',
    title: 'תשתיות תקשורת ורשתות',
    body: 'תכנון תשתיות, נקודות תקשורת ופתרונות Wi-Fi.',
    image: '/aura/network.jpg',
    alt: 'תשתית תקשורת ורשת',
  },
  {
    id: 'security',
    title: 'אבטחה ובקרת כניסה',
    body: 'מצלמות, מערכות הקלטה ובקרת כניסה המותאמות לנכס ולצורכי האבטחה.',
    image: '/aura/security.jpg',
    alt: 'כניסה לבית עם בקרת גישה',
  },
] as const

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, visible }
}

export function AuraLanding() {
  const [heroReady, setHeroReady] = useState(false)
  const systemsReveal = useReveal<HTMLElement>()

  useEffect(() => {
    const id = window.setTimeout(() => setHeroReady(true), 60)
    return () => window.clearTimeout(id)
  }, [])

  return (
    <div className="aura-page min-h-screen bg-[var(--aura-surface)] text-[var(--aura-ink)]">
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8 sm:py-7">
          <a
            href="#contact"
            className="text-[0.72rem] font-medium tracking-[0.18em] text-white/85 transition hover:text-white"
          >
            צור קשר
          </a>
          <span className="font-[family-name:var(--font-aura-brand)] text-[1.35rem] font-medium tracking-[0.28em] text-white sm:text-[1.5rem]">
            AURA
          </span>
        </div>
      </header>

      <section className="relative min-h-[100svh] overflow-hidden">
        <div
          className={`absolute inset-0 scale-105 transition-transform duration-[8s] ease-out ${
            heroReady ? 'scale-100' : 'scale-105'
          }`}
        >
          <Image
            src="/aura/hero-living.jpg"
            alt="סלון מעוצב עם אור רך — הבית כמערכת אחת"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(18,16,14,0.78)_0%,rgba(18,16,14,0.45)_48%,rgba(18,16,14,0.22)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,transparent_20%,rgba(12,11,10,0.35)_100%)]" />

        <div className="relative z-10 flex min-h-[100svh] items-end px-5 pb-16 pt-28 sm:items-center sm:px-8 sm:pb-24 sm:pt-20">
          <div
            className={`mx-auto w-full max-w-6xl transition-all duration-1000 ease-out ${
              heroReady
                ? 'translate-y-0 opacity-100'
                : 'translate-y-6 opacity-0'
            }`}
          >
            <p className="mb-5 font-[family-name:var(--font-aura-brand)] text-[clamp(2.8rem,9vw,5.5rem)] font-medium leading-none tracking-[0.22em] text-white">
              AURA
            </p>
            <h1 className="max-w-xl font-[family-name:var(--font-aura-display)] text-[clamp(1.85rem,4.6vw,3.15rem)] font-medium leading-[1.2] text-white">
              כל המערכות. תכנון אחד.
            </h1>
            <p
              className={`mt-5 max-w-md text-[1.02rem] leading-relaxed text-white/78 transition-all delay-200 duration-1000 ease-out sm:text-[1.08rem] ${
                heroReady
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-4 opacity-0'
              }`}
            >
              בית חכם, אודיו־וידאו, תשתיות ואבטחה — כמערכת אחת שמתאימה לנכס
              ולאיך שאתם חיים בו.
            </p>
            <div
              className={`mt-9 flex flex-wrap items-center gap-4 transition-all delay-300 duration-1000 ease-out ${
                heroReady
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-4 opacity-0'
              }`}
            >
              <a
                href="#systems"
                className="inline-flex items-center justify-center bg-[var(--aura-brass)] px-7 py-3.5 text-[0.95rem] font-medium text-[var(--aura-ink)] transition hover:bg-[var(--aura-brass-soft)]"
              >
                להכיר את המערכות
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center border border-white/35 px-7 py-3.5 text-[0.95rem] font-medium text-white transition hover:border-white/70 hover:bg-white/10"
              >
                לתיאום פגישה
              </a>
            </div>
          </div>
        </div>

        <div
          className={`absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/55 transition-opacity delay-700 duration-1000 sm:flex ${
            heroReady ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden
        >
          <span className="text-[0.65rem] tracking-[0.22em]">גלילה</span>
          <span className="aura-scroll-line h-8 w-px bg-white/45" />
        </div>
      </section>

      <section
        id="systems"
        ref={systemsReveal.ref}
        className="border-t border-[var(--aura-line)] bg-[var(--aura-surface)]"
      >
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <div
            className={`max-w-2xl transition-all duration-700 ease-out ${
              systemsReveal.visible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-5 opacity-0'
            }`}
          >
            <p className="mb-3 text-[0.72rem] font-medium tracking-[0.2em] text-[var(--aura-brass)]">
              המערכות
            </p>
            <h2 className="font-[family-name:var(--font-aura-display)] text-[clamp(1.7rem,3.4vw,2.45rem)] font-medium leading-snug text-[var(--aura-ink)]">
              ארבע שכבות. שפה אחת של תכנון.
            </h2>
          </div>
        </div>

        <div className="flex flex-col">
          {systems.map((system, index) => (
            <SystemBlock
              key={system.id}
              system={system}
              index={index}
              reverse={index % 2 === 1}
            />
          ))}
        </div>
      </section>

      <section
        id="contact"
        className="relative overflow-hidden border-t border-[var(--aura-line)] bg-[var(--aura-ink)] text-white"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(168,132,79,0.18),transparent_55%)]" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-8 px-5 py-20 sm:flex-row sm:items-end sm:justify-between sm:px-8 sm:py-28">
          <div className="max-w-xl">
            <p className="mb-3 font-[family-name:var(--font-aura-brand)] text-[0.8rem] tracking-[0.28em] text-[var(--aura-brass-soft)]">
              AURA
            </p>
            <h2 className="font-[family-name:var(--font-aura-display)] text-[clamp(1.7rem,3.5vw,2.5rem)] font-medium leading-snug">
              נתחיל מתכנון שמתאים לבית שלכם.
            </h2>
            <p className="mt-4 max-w-md text-[1rem] leading-relaxed text-white/70">
              שיחת היכרות קצרה — נבין את הנכס, את הצרכים ואת סדר העדיפויות, ונבנה
              יחד מפת מערכות אחת.
            </p>
          </div>
          <a
            href="mailto:hello@aura.living"
            className="inline-flex shrink-0 items-center justify-center bg-[var(--aura-brass)] px-8 py-3.5 text-[0.95rem] font-medium text-[var(--aura-ink)] transition hover:bg-[var(--aura-brass-soft)]"
          >
            hello@aura.living
          </a>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[var(--aura-ink)] px-5 py-6 text-center text-[0.75rem] text-white/40 sm:px-8">
        © {new Date().getFullYear()} AURA Smart Living
      </footer>
    </div>
  )
}

function SystemBlock({
  system,
  index,
  reverse,
}: {
  system: (typeof systems)[number]
  index: number
  reverse: boolean
}) {
  const { ref, visible } = useReveal<HTMLElement>()

  return (
    <article
      id={system.id}
      ref={ref}
      className={`border-t border-[var(--aura-line)] ${
        index % 2 === 0 ? 'bg-[var(--aura-surface)]' : 'bg-[var(--aura-mist)]'
      }`}
    >
      <div
        className={`mx-auto grid max-w-6xl items-stretch gap-0 lg:grid-cols-2 ${
          reverse ? 'lg:[&>div:first-child]:order-2' : ''
        }`}
      >
        <div className="relative min-h-[280px] overflow-hidden sm:min-h-[360px] lg:min-h-[440px]">
          <Image
            src={system.image}
            alt={system.alt}
            fill
            className={`object-cover transition-transform duration-[1.4s] ease-out ${
              visible ? 'scale-100' : 'scale-105'
            }`}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(20,18,16,0.18),transparent_45%)] lg:bg-none" />
        </div>
        <div
          className={`flex flex-col justify-center px-5 py-12 sm:px-10 sm:py-16 lg:px-14 transition-all duration-700 ease-out ${
            visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          <span className="mb-5 font-[family-name:var(--font-aura-brand)] text-[0.75rem] tracking-[0.28em] text-[var(--aura-brass)]">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className="font-[family-name:var(--font-aura-display)] text-[clamp(1.45rem,2.6vw,1.95rem)] font-medium leading-snug text-[var(--aura-ink)]">
            {system.title}
          </h3>
          <p className="mt-4 max-w-md text-[1.02rem] leading-relaxed text-[var(--aura-muted)]">
            {system.body}
          </p>
        </div>
      </div>
    </article>
  )
}
