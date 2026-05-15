import { useEffect, useRef, useState } from 'react'
import ChannelCard from '../components/ChannelCard'
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

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const introTimer = window.setTimeout(() => setIntroComplete(true), 1500)
    return () => window.clearTimeout(introTimer)
  }, [])

  useEffect(() => {
    if (!introComplete) return

    const strip = channelStripRef.current
    if (!strip || !window.matchMedia('(max-width: 760px)').matches) return

    const featureCard = strip.querySelector('[data-channel-id="prime"]')
    featureCard?.scrollIntoView({ inline: 'center', block: 'nearest' })
  }, [introComplete])

  return (
    <section
      className="relative isolate flex h-[calc(100svh-var(--player-height))] min-h-0 flex-col overflow-hidden px-5 max-[760px]:px-3"
      aria-label="SZUNET Radio landing page"
    >
      <div className="absolute inset-x-0 top-0 z-10 h-1.5 bg-[#080833]" aria-hidden="true" />
      <img
        className="pointer-events-none absolute right-0 top-0 z-0 h-full w-[min(90vw,1000px)] object-fill object-right-top max-[760px]:left-[110px] max-[760px]:right-auto max-[760px]:w-[680px] max-[420px]:left-[74px] max-[420px]:w-[600px]"
        src={redRibbon}
        alt=""
        aria-hidden="true"
      />

      <header className="absolute left-1/2 top-[clamp(10px,1.7vw,18px)] z-[3] flex w-[var(--page-width)] max-w-[calc(100vw-24px)] -translate-x-1/2 items-start justify-between gap-4 max-[760px]:max-w-[calc(100vw-16px)]">
        <button
          className="cursor-pointer border-0 bg-transparent p-0 transition-[opacity,transform] duration-300 hover:opacity-90 focus-visible:rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#080833]"
          type="button"
          aria-label="Scroll to top"
          onClick={scrollToTop}
        >
          <img
            className="block h-auto w-[clamp(118px,11vw,154px)]"
            src={brandLogo}
            alt="SZUNET Radio"
          />
        </button>
        <nav
          className="mt-1 flex max-w-[min(100%,calc(100vw-140px))] flex-wrap items-center justify-end gap-2 sm:gap-2.5"
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
      </header>

      <img
        className="pointer-events-none absolute right-[clamp(26px,3.4vw,52px)] top-[clamp(58px,7.3vw,82px)] z-[4] h-auto w-[clamp(286px,34vw,470px)] max-[760px]:right-5 max-[760px]:top-[76px] max-[760px]:w-[min(62vw,320px)] max-[420px]:top-[88px] max-[420px]:w-[250px]"
        src={headline}
        alt="Kimaxoljuk a napodat!"
      />

      {/* Desktop uses staggered channel proportions from the supplied design; mobile stays one-card-per-snap. */}
      <div className="relative z-[2] flex min-h-0 flex-1 flex-col justify-end pb-[max(6px,env(safe-area-inset-bottom,0px))] pt-[clamp(96px,min(22svh,180px),200px)] max-[760px]:min-h-[min(360px,calc(100svh-var(--player-height)-48px)))] max-[760px]:pt-[clamp(88px,18svh,160px)]">
        <div
          className="mx-auto flex min-h-0 w-full max-w-[1040px] flex-1 flex-row items-end justify-center gap-[clamp(3px,0.45vw,8px)] min-[761px]:max-h-full max-[760px]:h-full max-[760px]:max-h-[min(72svh,calc(100svh-var(--player-height)-72px))] max-[760px]:min-h-[260px] max-[760px]:max-w-none max-[760px]:snap-x max-[760px]:snap-mandatory max-[760px]:justify-start max-[760px]:items-stretch max-[760px]:gap-3 max-[760px]:overflow-x-auto max-[760px]:overflow-y-visible max-[760px]:overscroll-x-contain max-[760px]:scroll-smooth max-[760px]:[scroll-padding-inline:12px] max-[760px]:[scroll-padding-bottom:8px] max-[760px]:[scrollbar-width:none] max-[760px]:[&::-webkit-scrollbar]:hidden"
          aria-label="Radio channels"
          ref={channelStripRef}
        >
          {channels.map((channel, index) => (
            <div className="contents" data-channel-id={channel.id} key={channel.id}>
              <ChannelCard
                channel={channel}
                index={index}
                introActive={!introComplete}
                isPlaying={playingChannelId === channel.id}
                onToggle={onToggleChannel}
              />
            </div>
          ))}
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-[calc(var(--player-height)+4px)] z-[4] mx-auto h-[2px] w-[min(720px,72vw)] overflow-hidden rounded-full bg-white/35 opacity-0 shadow-[0_0_18px_rgba(255,255,255,0.34)] [animation:hero-loader_1.5s_ease-out_0s_1_both] max-[760px]:bottom-[calc(var(--player-height)+12px)] max-[760px]:w-[66vw]"
        aria-hidden="true"
      >
        <span className="block h-full w-full origin-left bg-[#ff1111] [animation:hero-loader-fill_1.5s_cubic-bezier(.2,.8,.2,1)_0s_1_both]" />
      </div>
    </section>
  )
}

export default HeroSection
