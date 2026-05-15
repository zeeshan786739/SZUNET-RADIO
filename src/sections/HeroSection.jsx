import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import {
  HERO_INTRO_DURATION_MS,
  HERO_LOADER_DURATION_MS,
  heroAtmosphereVariants,
  heroCameraVariants,
  heroHeadlineVariants,
  heroHeaderVariants,
  heroRibbonVariants,
} from '../animations/heroIntro'
import ChannelCard from '../components/ChannelCard'
import HeroIntroLoader from '../components/HeroIntroLoader'
import brandLogo from '../assets/images/Group 2.png'
import headline from '../assets/images/KIMAXOLJUK A NAPODAT!.png'
import redRibbon from '../assets/images/Rectangle 19.png'

function SearchGlyph({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="6.75" stroke="currentColor" strokeWidth="2.25" />
      <path d="M16.25 16.25 20 20" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" />
    </svg>
  )
}

function HeroSection({ channels, playingChannelId, onToggleChannel }) {
  const channelStripRef = useRef(null)
  const [introComplete, setIntroComplete] = useState(false)
  const [showLoader, setShowLoader] = useState(true)
  const prefersReducedMotion = useReducedMotion()
  const skipIntro = prefersReducedMotion

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    if (skipIntro) {
      setIntroComplete(true)
      setShowLoader(false)
      return
    }

    const loaderTimer = window.setTimeout(() => setShowLoader(false), HERO_LOADER_DURATION_MS)
    const introTimer = window.setTimeout(() => setIntroComplete(true), HERO_INTRO_DURATION_MS)
    return () => {
      window.clearTimeout(loaderTimer)
      window.clearTimeout(introTimer)
    }
  }, [skipIntro])

  useEffect(() => {
    if (!introComplete) return

    const strip = channelStripRef.current
    if (!strip || !window.matchMedia('(max-width: 760px)').matches) return

    const featureCard = strip.querySelector('[data-channel-id="prime"]')
    featureCard?.scrollIntoView({ inline: 'center', block: 'nearest' })
  }, [introComplete])

  const cameraState = skipIntro ? 'idle' : introComplete ? 'idle' : 'intro'

  return (
    <section
      className="relative isolate flex h-[calc(100svh-var(--player-height))] min-h-0 flex-col overflow-hidden max-[760px]:px-[var(--page-gutter)]"
      aria-label="SZUNET Radio landing page"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-[0] bg-[radial-gradient(ellipse_at_72%_18%,rgba(255,17,17,0.07),transparent_52%),radial-gradient(ellipse_at_18%_88%,rgba(8,8,51,0.05),transparent_48%)]"
        aria-hidden="true"
        variants={heroAtmosphereVariants}
        initial={skipIntro ? false : 'hidden'}
        animate="visible"
      />

      <motion.div
        className="pointer-events-none absolute top-0 right-0 bottom-0 z-0 min-[761px]:left-[max(var(--page-gutter),calc((100vw-var(--page-width))/2))] max-[760px]:left-[var(--hero-ribbon-mobile-left)] max-[760px]:right-auto max-[760px]:w-[var(--hero-ribbon-mobile-width)]"
        aria-hidden="true"
        variants={heroRibbonVariants}
        initial={skipIntro ? false : 'hidden'}
        animate="visible"
      >
        <img
          className="block h-full w-full object-fill object-right-top"
          src={redRibbon}
          alt=""
        />
      </motion.div>

      <header className="absolute left-1/2 top-[max(clamp(10px,1.7vw,18px),var(--hero-header-safe-top))] z-[3] w-[min(100%,var(--page-width))] max-w-[calc(100vw-var(--page-gutter)*2)] -translate-x-1/2 px-0 max-[760px]:max-w-full">
        <motion.div
          className="flex w-full items-start justify-between gap-3 sm:gap-4 max-[380px]:flex-col max-[380px]:items-stretch max-[380px]:gap-2"
          variants={heroHeaderVariants}
          initial={skipIntro ? false : 'hidden'}
          animate="visible"
        >
          <button
            className="cursor-pointer border-0 bg-transparent p-0 transition-[opacity,transform] duration-300 hover:opacity-90 focus-visible:rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#080833]"
            type="button"
            aria-label="Scroll to top"
            onClick={scrollToTop}
          >
            <img
              className="block h-auto w-[clamp(100px,11vw,168px)] max-[380px]:w-[clamp(92px,28vw,118px)]"
              src={brandLogo}
              alt="SZUNET Radio"
            />
          </button>
          <nav
            className="mt-1 flex max-w-full flex-wrap items-center justify-end gap-2 sm:gap-2.5 max-[380px]:mt-0 max-[380px]:justify-start"
            aria-label="Gyorslinkek"
          >
            <a
              className="inline-flex items-center rounded-md border-2 border-[#080833] bg-white/90 px-[0.55em] py-[0.38em] [font-family:Arial,Helvetica,sans-serif] text-[clamp(10px,0.95vw,13px)] font-[950] normal-case leading-none tracking-[0.02em] text-[#080833] no-underline shadow-[0_2px_8px_rgba(8,8,51,0.08)] backdrop-blur-[1px] transition-[transform,background] duration-200 hover:-translate-y-px hover:bg-white focus-visible:rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#080833] max-[420px]:px-2 max-[420px]:text-[9px]"
              href="/second-page"
              aria-label="Second page — műsor és archívum, lejátszás folytatódik"
            >
              second-page
            </a>
            <a
              className="inline-flex items-center gap-[0.4em] rounded-md bg-[#ff1111] px-[0.65em] py-[0.42em] [font-family:Arial,Helvetica,sans-serif] text-[clamp(12px,1.05vw,17px)] font-[950] lowercase leading-none tracking-[0.02em] text-[#080833] no-underline shadow-[0_2px_12px_rgba(8,8,51,0.12)] ring-2 ring-white/75 transition-[transform,filter] duration-200 hover:-translate-y-px hover:brightness-[1.03] focus-visible:rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#080833] max-[420px]:text-[11px]"
              href="/dal-kereses"
              aria-label="Dal keresés — lejátszás folytatódik"
            >
              <SearchGlyph className="h-[1.05em] w-[1.05em] shrink-0 translate-y-px text-[#080833]" />
              <span>dalkereses</span>
            </a>
          </nav>
        </motion.div>
      </header>

      <motion.div
        className="relative z-[2] flex min-h-0 flex-1 flex-col justify-end pb-[max(6px,env(safe-area-inset-bottom,0px))] pt-[var(--hero-stage-top)] max-[760px]:min-h-[min(320px,calc(100svh-var(--player-height)-40px)))] max-[760px]:max-h-full"
        style={{ perspective: 1400 }}
        variants={heroCameraVariants}
        initial={skipIntro ? false : 'hidden'}
        animate={cameraState}
      >
        <motion.img
          className="pointer-events-none absolute top-[clamp(48px,6.2vw,78px)] right-[clamp(0px,0.5vw,12px)] z-[2] h-auto w-[clamp(240px,34vw,520px)] max-w-[min(92vw,520px)] max-[760px]:top-[calc(var(--hero-stage-top)-12px)] max-[760px]:right-0 max-[760px]:w-[min(58vw,300px)] max-[420px]:w-[min(64vw,250px)] min-[761px]:left-[calc(50%+min(10%,var(--page-width)*0.16)+clamp(10px,1vw,18px))] min-[761px]:right-0"
          src={headline}
          alt="Kimaxoljuk a napodat!"
          variants={heroHeadlineVariants}
          initial={skipIntro ? false : 'hidden'}
          animate="visible"
        />

        <AnimatePresence>
          {!skipIntro && showLoader ? <HeroIntroLoader key="hero-loader" /> : null}
        </AnimatePresence>

        <motion.div
          className="relative z-[1] mx-auto flex min-h-0 w-full max-w-[var(--page-width)] flex-1 flex-row items-end justify-stretch gap-[var(--hero-card-gap)] [transform-style:preserve-3d] min-[761px]:max-h-full max-[760px]:h-full max-[760px]:max-h-[min(72svh,calc(100svh-var(--player-height)-var(--hero-stage-top)))] max-[760px]:min-h-[220px] max-[760px]:max-w-none max-[760px]:snap-x max-[760px]:snap-mandatory max-[760px]:justify-start max-[760px]:items-stretch max-[760px]:gap-3 max-[760px]:overflow-x-auto max-[760px]:overflow-y-visible max-[760px]:overscroll-x-contain max-[760px]:scroll-smooth max-[760px]:[scroll-padding-inline:var(--page-gutter)] max-[760px]:[scroll-padding-bottom:8px] max-[760px]:[scrollbar-width:none] max-[760px]:[&::-webkit-scrollbar]:hidden"
          aria-label="Radio channels"
          ref={channelStripRef}
        >
          {channels.map((channel, index) => (
            <div className="contents" data-channel-id={channel.id} key={channel.id}>
              <ChannelCard
                channel={channel}
                index={index}
                introEnabled={!skipIntro}
                introComplete={introComplete}
                isPlaying={playingChannelId === channel.id}
                onToggle={onToggleChannel}
              />
            </div>
          ))}
        </motion.div>
      </motion.div>

    </section>
  )
}

export default HeroSection
