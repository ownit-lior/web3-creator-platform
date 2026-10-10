'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

const systems = [
  {
    id: 'automation',
    title: 'בית חכם ואוטומציה',
    body: 'שליטה בתאורה, בתריסים, במיזוג ובמערכות נוספות, בהתאם לצורכי הבית.',
    image: '/aura/automation.jpg',
    alt: 'בית מודרני עם תאורה חמה בשעת ערב',
  },
  {
    id: 'av',
    title: 'אודיו־וידאו וקולנוע ביתי',
    body: 'מערכות שמע, מסכים וקולנוע ביתי בתכנון מוקפד, עם התייחסות לאקוסטיקה, למיקום הרמקולים ולעיצוב.',
    image: '/aura/cinema.jpg',
    alt: 'חלל מגורים עם מסך ומערכת שמע',
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
    alt: 'בקרת כניסה לנכס',
  },
] as const

const approachPoints = [
  'תכנון בהתאם לצרכים ולתקציב הפרויקט.',
  'התייחסות לתשתיות כבר בשלבים המוקדמים.',
  'תיאום בין המערכות ובין הגורמים המעורבים בפרויקט.',
  'התקנה, הגדרות והדרכה בהתאם להיקף השירות שסוכם.',
] as const

const projects = [
  {
    id: 'villa-sharon',
    title: 'וילה בשרון',
    scope: 'בית חכם · אודיו־וידאו · אבטחה',
    body: 'תכנון מערכות מקצה לקצה — מתשתיות ועד קולנוע ביתי ובקרת כניסה.',
    image: '/aura/project-villa.jpg',
    alt: 'וילה מודרנית בפרויקט INOVIX',
  },
  {
    id: 'apt-tlv',
    title: 'דירת פנטהאוז בתל אביב',
    scope: 'אוטומציה · רשת · שמע רב־אזורי',
    body: 'אינטגרציה שקטה בחלל קיים — בלי להתפשר על עיצוב או ביצועי רשת.',
    image: '/aura/project-apt.jpg',
    alt: 'פנטהאוז עם תכנון מערכות משולב',
  },
  {
    id: 'office-center',
    title: 'משרדים במרכז',
    scope: 'תקשורת · בקרת כניסה · תצוגות',
    body: 'תשתיות ותפעול יומיומי שמתואמים לעובדים, לאורחים ולצוות הניהול.',
    image: '/aura/project-office.jpg',
    alt: 'חלל משרדים עם תשתיות ותצוגות',
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
      { threshold: 0.16, rootMargin: '0px 0px -8% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, visible }
}

export function AuraLanding() {
  const [heroReady, setHeroReady] = useState(false)
  const [navSolid, setNavSolid] = useState(false)
  const approachReveal = useReveal<HTMLElement>()
  const systemsReveal = useReveal<HTMLElement>()
  const projectsReveal = useReveal<HTMLElement>()

  useEffect(() => {
    const id = window.setTimeout(() => setHeroReady(true), 60)
    return () => window.clearTimeout(id)
  }, [])

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > window.innerHeight * 0.72)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="aura-page min-h-screen bg-[var(--aura-surface)] text-[var(--aura-ink)]">
      <header
        className={`fixed inset-x-0 top-0 z-30 transition-colors duration-300 ${
          navSolid
            ? 'border-b border-[var(--aura-line)] bg-[var(--aura-surface)]/92 backdrop-blur-md'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8 sm:py-6">
          <nav
            className={`flex items-center gap-5 text-[0.72rem] font-medium tracking-[0.14em] ${
              navSolid ? 'text-[var(--aura-ink)]/75' : 'text-white/85'
            }`}
          >
            <a
              href="#approach"
              className={`transition ${navSolid ? 'hover:text-[var(--aura-ink)]' : 'hover:text-white'}`}
            >
              הגישה
            </a>
            <a
              href="#systems"
              className={`hidden transition sm:inline ${navSolid ? 'hover:text-[var(--aura-ink)]' : 'hover:text-white'}`}
            >
              מערכות
            </a>
            <a
              href="#projects"
              className={`transition ${navSolid ? 'hover:text-[var(--aura-ink)]' : 'hover:text-white'}`}
            >
              פרויקטים
            </a>
            <a
              href="#contact"
              className={`transition ${navSolid ? 'hover:text-[var(--aura-ink)]' : 'hover:text-white'}`}
            >
              צור קשר
            </a>
          </nav>
          <a
            href="#"
            className={`font-[family-name:var(--font-aura-brand)] text-[1.25rem] font-medium tracking-[0.22em] sm:text-[1.45rem] ${
              navSolid ? 'text-[var(--aura-ink)]' : 'text-white'
            }`}
          >
            INOVIX
          </a>
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
            alt="חלל מגורים מעוצב — מערכות הבית כפתרון אחד"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(18,16,14,0.8)_0%,rgba(18,16,14,0.48)_50%,rgba(18,16,14,0.22)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,transparent_20%,rgba(12,11,10,0.35)_100%)]" />

        <div className="relative z-10 flex min-h-[100svh] items-end px-5 pb-16 pt-28 sm:items-center sm:px-8 sm:pb-24 sm:pt-20">
          <div
            className={`mx-auto w-full max-w-6xl transition-all duration-1000 ease-out ${
              heroReady
                ? 'translate-y-0 opacity-100'
                : 'translate-y-6 opacity-0'
            }`}
          >
            <p className="mb-5 font-[family-name:var(--font-aura-brand)] text-[clamp(2.4rem,8vw,4.8rem)] font-medium leading-none tracking-[0.2em] text-white">
              INOVIX
            </p>
            <h1 className="max-w-2xl font-[family-name:var(--font-aura-display)] text-[clamp(1.75rem,4.4vw,3rem)] font-medium leading-[1.22] text-white">
              כל המערכות. תכנון אחד.
            </h1>
            <p
              className={`mt-5 max-w-lg text-[1.02rem] leading-relaxed text-white/78 transition-all delay-200 duration-1000 ease-out sm:text-[1.08rem] ${
                heroReady
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-4 opacity-0'
              }`}
            >
              לא רק מתקינים מערכות — מחברים אותן לפתרון אחד שמתאים לנכס
              ולפרויקט.
            </p>
            <div
              className={`mt-9 flex flex-wrap items-center gap-4 transition-all delay-300 duration-1000 ease-out ${
                heroReady
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-4 opacity-0'
              }`}
            >
              <a
                href="#approach"
                className="inline-flex items-center justify-center bg-[var(--aura-brass)] px-7 py-3.5 text-[0.95rem] font-medium text-[var(--aura-ink)] transition hover:bg-[var(--aura-brass-soft)]"
              >
                איך אנחנו עובדים
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
        id="approach"
        ref={approachReveal.ref}
        className="scroll-mt-24 border-t border-[var(--aura-line)] bg-[var(--aura-surface)]"
      >
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div
            className={`transition-all duration-700 ease-out ${
              approachReveal.visible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-5 opacity-0'
            }`}
          >
            <p className="mb-3 text-[0.72rem] font-medium tracking-[0.2em] text-[var(--aura-brass)]">
              הגישה
            </p>
            <h2 className="font-[family-name:var(--font-aura-display)] text-[clamp(1.65rem,3.3vw,2.4rem)] font-medium leading-snug text-[var(--aura-ink)]">
              לא רק מתקינים מערכות. מחברים אותן לפתרון אחד.
            </h2>
            <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-[var(--aura-muted)]">
              כשמערכות שונות מתוכננות בנפרד, עלולים להיווצר פערים בתשתיות,
              בתפעול ובתיאום בין בעלי המקצוע.
            </p>
            <p className="mt-4 max-w-xl text-[1.05rem] leading-relaxed text-[var(--aura-ink)]/85">
              ב־INOVIX אנחנו מסתכלים על התמונה המלאה: מבינים את צורכי הפרויקט,
              מתכננים את המערכות בהתאמה ומשתדלים לוודא שכל רכיב משתלב בתכנון
              הכולל.
            </p>
          </div>

          <ul
            className={`flex flex-col justify-center gap-0 border-t border-[var(--aura-line)] transition-all delay-150 duration-700 ease-out ${
              approachReveal.visible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-5 opacity-0'
            }`}
          >
            {approachPoints.map((point, index) => (
              <li
                key={point}
                className="flex gap-4 border-b border-[var(--aura-line)] py-5"
              >
                <span className="font-[family-name:var(--font-aura-brand)] text-[0.75rem] tracking-[0.2em] text-[var(--aura-brass)]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="text-[1.02rem] leading-relaxed text-[var(--aura-ink)]">
                  {point}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="systems"
        ref={systemsReveal.ref}
        className="scroll-mt-24 border-t border-[var(--aura-line)] bg-[var(--aura-mist)]"
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
        id="projects"
        ref={projectsReveal.ref}
        className="scroll-mt-24 border-t border-[var(--aura-line)] bg-[var(--aura-surface)]"
      >
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <div
            className={`max-w-2xl transition-all duration-700 ease-out ${
              projectsReveal.visible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-5 opacity-0'
            }`}
          >
            <p className="mb-3 text-[0.72rem] font-medium tracking-[0.2em] text-[var(--aura-brass)]">
              פרויקטים
            </p>
            <h2 className="font-[family-name:var(--font-aura-display)] text-[clamp(1.7rem,3.4vw,2.45rem)] font-medium leading-snug text-[var(--aura-ink)]">
              מהשטח — כשהמערכות עובדות יחד.
            </h2>
            <p className="mt-4 max-w-lg text-[1.02rem] leading-relaxed text-[var(--aura-muted)]">
              מבחר פרויקטים שבהם תכנון המערכות, התשתיות והתיאום בין הגורמים
              נבנו כמכלול אחד.
            </p>
          </div>
        </div>

        <div className="flex flex-col">
          {projects.map((project, index) => (
            <ProjectBlock
              key={project.id}
              project={project}
              index={index}
              reverse={index % 2 === 1}
            />
          ))}
        </div>
      </section>

      <section
        id="contact"
        className="relative scroll-mt-24 overflow-hidden border-t border-[var(--aura-line)] bg-[var(--aura-ink)] text-white"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(168,132,79,0.18),transparent_55%)]" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-8 px-5 py-20 sm:flex-row sm:items-end sm:justify-between sm:px-8 sm:py-28">
          <div className="max-w-xl">
            <p className="mb-3 font-[family-name:var(--font-aura-brand)] text-[0.8rem] tracking-[0.28em] text-[var(--aura-brass-soft)]">
              INOVIX
            </p>
            <h2 className="font-[family-name:var(--font-aura-display)] text-[clamp(1.7rem,3.5vw,2.5rem)] font-medium leading-snug">
              נתחיל מתכנון שמתאים לפרויקט שלכם.
            </h2>
            <p className="mt-4 max-w-md text-[1rem] leading-relaxed text-white/70">
              שיחת היכרות קצרה — נבין את הנכס, את הצרכים ואת סדר העדיפויות, ונבנה
              יחד מפת מערכות אחת.
            </p>
          </div>
          <a
            href="mailto:hello@inovix.co.il"
            className="inline-flex shrink-0 items-center justify-center bg-[var(--aura-brass)] px-8 py-3.5 text-[0.95rem] font-medium text-[var(--aura-ink)] transition hover:bg-[var(--aura-brass-soft)]"
          >
            hello@inovix.co.il
          </a>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[var(--aura-ink)] px-5 py-6 text-center text-[0.75rem] text-white/40 sm:px-8">
        © {new Date().getFullYear()} INOVIX
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
      className={`scroll-mt-24 border-t border-[var(--aura-line)] ${
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

function ProjectBlock({
  project,
  index,
  reverse,
}: {
  project: (typeof projects)[number]
  index: number
  reverse: boolean
}) {
  const { ref, visible } = useReveal<HTMLElement>()

  return (
    <article
      ref={ref}
      className={`border-t border-[var(--aura-line)] ${
        index % 2 === 0 ? 'bg-[var(--aura-mist)]' : 'bg-[var(--aura-surface)]'
      }`}
    >
      <div
        className={`mx-auto grid max-w-6xl items-stretch gap-0 lg:grid-cols-2 ${
          reverse ? 'lg:[&>div:first-child]:order-2' : ''
        }`}
      >
        <div className="relative min-h-[280px] overflow-hidden sm:min-h-[340px] lg:min-h-[420px]">
          <Image
            src={project.image}
            alt={project.alt}
            fill
            className={`object-cover transition-transform duration-[1.4s] ease-out ${
              visible ? 'scale-100' : 'scale-105'
            }`}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div
          className={`flex flex-col justify-center px-5 py-12 sm:px-10 sm:py-16 lg:px-14 transition-all duration-700 ease-out ${
            visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          <span className="mb-4 font-[family-name:var(--font-aura-brand)] text-[0.75rem] tracking-[0.28em] text-[var(--aura-brass)]">
            {String(index + 1).padStart(2, '0')}
          </span>
          <p className="text-[0.8rem] tracking-[0.1em] text-[var(--aura-muted)]">
            {project.scope}
          </p>
          <h3 className="mt-3 font-[family-name:var(--font-aura-display)] text-[clamp(1.4rem,2.5vw,1.85rem)] font-medium leading-snug text-[var(--aura-ink)]">
            {project.title}
          </h3>
          <p className="mt-4 max-w-md text-[1.02rem] leading-relaxed text-[var(--aura-muted)]">
            {project.body}
          </p>
        </div>
      </div>
    </article>
  )
}
