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
import SearchGlyph from '../components/SearchGlyph'

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

  const cameraState = skipIntro ? false : 'intro'

  return (
    <section
      className="relative isolate flex h-[calc(100svh-var(--player-height))] min-h-0 flex-col overflow-hidden"
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
        className="hero-ribbon pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
        variants={heroRibbonVariants}
        initial={skipIntro ? false : 'hidden'}
        animate="visible"
      >
        <img className="hero-ribbon__img" src={redRibbon} alt="" />
      </motion.div>

      <header className="absolute inset-x-0 top-[max(clamp(10px,1.7vw,18px),var(--hero-header-safe-top))] z-[3] px-[var(--page-gutter)]">
        <motion.div
          className="mx-auto flex w-full max-w-[var(--page-width)] items-start justify-between gap-3 sm:gap-4 max-[380px]:flex-col max-[380px]:items-stretch max-[380px]:gap-2"
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
            className="mt-1 flex max-w-full flex-wrap items-center justify-end gap-[clamp(14px,2vw,28px)] max-[380px]:mt-0 max-[380px]:justify-start"
            aria-label="Gyorslinkek"
          >
            <a
              className="hero-nav-link normal-case"
              href="/second-page"
              aria-label="Second page — műsor és archívum, lejátszás folytatódik"
            >
              second-page
            </a>
            <a
              className="hero-nav-link hero-nav-link--with-icon lowercase"
              href="/dal-kereses"
              aria-label="Dal keresés — lejátszás folytatódik"
            >
              <SearchGlyph className="hero-nav-link__icon text-[#080833]" />
              <span>dalkereses</span>
            </a>
          </nav>
        </motion.div>
      </header>

      <motion.div
        className="relative z-[2] flex min-h-0 flex-1 flex-col justify-end pb-[max(6px,env(safe-area-inset-bottom,0px))] pt-[var(--hero-stage-top)] max-[760px]:min-h-[min(320px,calc(100svh-var(--player-height)-40px)))] max-[760px]:max-h-full"
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

        <div className="w-full px-[var(--page-gutter)]">
          <motion.div
            className="relative z-[1] mx-auto flex min-h-0 w-full max-w-[var(--page-width)] flex-1 flex-row items-end justify-stretch gap-[var(--hero-card-gap)] min-[761px]:max-h-full max-[760px]:h-full max-[760px]:max-h-[min(72svh,calc(100svh-var(--player-height)-var(--hero-stage-top)))] max-[760px]:min-h-[220px] max-[760px]:max-w-none max-[760px]:snap-x max-[760px]:snap-mandatory max-[760px]:justify-start max-[760px]:items-stretch max-[760px]:gap-3 max-[760px]:overflow-x-auto max-[760px]:overflow-y-visible max-[760px]:overscroll-x-contain max-[760px]:scroll-smooth max-[760px]:[scroll-padding-inline:var(--page-gutter)] max-[760px]:[scroll-padding-bottom:8px] max-[760px]:[scrollbar-width:none] max-[760px]:[&::-webkit-scrollbar]:hidden"
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
        </div>
      </motion.div>

    </section>
  )
}

export default HeroSection
