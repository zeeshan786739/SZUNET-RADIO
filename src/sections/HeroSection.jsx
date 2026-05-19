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
import { BP, mediaMax } from '../utils/breakpoints'

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
    if (!strip || !window.matchMedia(mediaMax(BP.hero)).matches) return

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
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden="true"
        variants={heroRibbonVariants}
        initial={skipIntro ? false : 'hidden'}
        animate="visible"
      >
        <img
          className="block h-full w-full object-fill object-right-top max-hero:scale-[1.08] max-hero:object-[72%_0%]"
          src={redRibbon}
          alt=""
        />
      </motion.div>

      <header className="absolute inset-x-0 top-[max(clamp(10px,1.7vw,18px),var(--hero-header-safe-top))] z-[3] px-[var(--page-gutter)]">
        <motion.div
          className="mx-auto flex w-full max-w-[var(--page-width)] items-start justify-between gap-3 sm:gap-4 max-xs:flex-col max-xs:items-stretch max-xs:gap-2"
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
              className="block h-auto w-[clamp(100px,11vw,168px)] max-xs:w-[clamp(92px,28vw,118px)] xl:w-[clamp(120px,9vw,188px)] 2xl:w-[188px]"
              src={brandLogo}
              alt="SZUNET Radio"
            />
          </button>
          <nav
            className="mt-1 flex max-w-full flex-wrap items-center justify-end gap-[clamp(14px,2vw,28px)] max-xs:mt-0 max-xs:justify-start"
            aria-label="Gyorslinkek"
          >
            <a
              className="inline-flex items-center border-0 bg-transparent p-0 font-[family-name:var(--font-family)] text-[length:var(--hero-nav-link-size)] font-normal normal-case leading-none tracking-[0.02em] text-[#080833] no-underline shadow-none transition-opacity duration-200 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-[#080833] focus-visible:outline-offset-4"
              href="/second-page"
              aria-label="Second page — műsor és archívum, lejátszás folytatódik"
            >
              second-page
            </a>
            <a
              className="inline-flex items-center gap-[0.1em] border-0 bg-transparent p-0 font-[family-name:var(--font-family)] text-[length:var(--hero-nav-link-size)] font-normal lowercase leading-none tracking-[0.02em] text-[#080833] no-underline shadow-none transition-opacity duration-200 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-[#080833] focus-visible:outline-offset-4"
              href="/"
              aria-label="Kezdőlap — lejátszás folytatódik"
            >
              <SearchGlyph className="h-[1em] w-[1em] shrink-0 text-[#080833]" />
              <span>dalkereses</span>
            </a>
          </nav>
        </motion.div>
      </header>

      <motion.div
        className="relative z-[2] flex min-h-0 flex-1 flex-col justify-end pb-[max(6px,env(safe-area-inset-bottom,0px))] pt-[var(--hero-stage-top)] max-hero:min-h-[min(320px,calc(100svh-var(--player-height)-40px))] max-hero:max-h-full"
        variants={heroCameraVariants}
        initial={skipIntro ? false : 'hidden'}
        animate={cameraState}
      >
        <motion.img
          className="pointer-events-none absolute top-[clamp(48px,6.2vw,78px)] right-[clamp(0px,0.5vw,12px)] z-[4] h-auto w-[clamp(240px,34vw,520px)] max-w-[min(92vw,520px)] max-hero:top-[clamp(96px,20svh,142px)] max-hero:left-[clamp(104px,28vw,158px)] max-hero:right-[var(--page-gutter)] max-hero:w-[min(72vw,320px)] max-hero:max-w-none max-hero:object-contain max-hero:object-center max-xs:left-[clamp(96px,26vw,140px)] max-xs:w-[min(76vw,300px)] hero:left-[calc(50%+min(10%,var(--page-width)*0.16)+clamp(10px,1vw,18px))] hero:right-0 hero:w-[clamp(240px,34vw,520px)] hero:max-w-[min(92vw,520px)] xl:w-[clamp(320px,28vw,560px)] xl:max-w-[560px] 2xl:w-[560px]"
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
            className="relative z-[1] mx-auto flex min-h-0 w-full max-w-[var(--page-width)] flex-1 flex-row items-end justify-stretch gap-[var(--hero-card-gap)] hero:max-h-full max-hero:h-auto max-hero:min-h-[min(312px,60svh)] max-hero:max-h-[var(--hero-mobile-card-height-max)] max-hero:max-w-none max-hero:snap-x max-hero:snap-mandatory max-hero:justify-start max-hero:items-end max-hero:gap-3 max-hero:overflow-x-auto max-hero:overflow-y-visible max-hero:overscroll-x-contain max-hero:scroll-smooth max-hero:[scroll-padding-inline:var(--page-gutter)] max-hero:[scroll-padding-bottom:10px] max-hero:[scrollbar-width:none] max-hero:[&::-webkit-scrollbar]:hidden"
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
