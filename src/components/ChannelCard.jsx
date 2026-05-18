import { motion, useReducedMotion } from 'framer-motion'
import { useMemo } from 'react'
import {
  getCardBlurVeilTransition,
  getHeroCardVariants,
  heroLightSweepTransition,
} from '../animations/heroIntro'
import { brandAssets } from '../data/channels'
import { cx } from '../utils/cx'

/** Proportional flex weights mirror original 1040px strip ratios; width fills --page-width. */
const desktopFlexSizes = {
  electric: 'min-[761px]:flex-[1.05_1_0%] min-[761px]:min-w-0',
  oldschool: 'min-[761px]:flex-[1.12_1_0%] min-[761px]:min-w-0',
  prime: 'min-[761px]:flex-[1.58_1.12_0%] min-[761px]:min-w-0',
  power: 'min-[761px]:flex-[1.05_1_0%] min-[761px]:min-w-0',
  relax: 'min-[761px]:flex-[1.32_1_0%] min-[761px]:min-w-0',
}

const desktopHeights = {
  electric: 'min-[761px]:h-[clamp(465px,75svh,760px)]',
  oldschool: 'min-[761px]:h-[clamp(505px,81svh,820px)]',
  prime: 'min-[761px]:h-[clamp(510px,88svh,840px)]',
  power: 'min-[761px]:h-[clamp(415px,67svh,680px)]',
  relax: 'min-[761px]:h-[clamp(470px,78svh,780px)]',
}

/** Focal point per portrait (square album art in tall cards). */
const portraitFocus = {
  electric: 'object-[center_32%]',
  oldschool: 'object-[center_28%]',
  prime: 'object-[center_30%]',
  power: 'object-[center_34%]',
  relax: 'object-[center_42%]',
}

function CardBlurVeil({ index, isFeature, active }) {
  if (!active) return null

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-[4] bg-[#0a0a12]/25 backdrop-blur-[16px] min-[761px]:backdrop-blur-[18px]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={getCardBlurVeilTransition(index, isFeature)}
      aria-hidden="true"
    />
  )
}

function ChannelCard({
  channel,
  index,
  introEnabled = true,
  introComplete = false,
  isPlaying,
  onToggle,
}) {
  const isFeature = channel.size === 'feature'
  const prefersReducedMotion = useReducedMotion()
  const skipIntro = prefersReducedMotion || !introEnabled
  const variants = useMemo(() => getHeroCardVariants(isFeature), [isFeature])
  const showIntroFx = introEnabled && !skipIntro && !introComplete

  return (
    <motion.article
      className={cx(
        'relative z-[1] min-h-0 min-w-0 snap-center overflow-hidden bg-[#111] shadow-[0_16px_32px_rgba(0,0,0,0.18)]',
        '[--footer-height:26%] [--play-size:clamp(48px,4.5vw,88px)]',
        'min-[761px]:[--footer-height:var(--channel-footer-height)]',
        desktopFlexSizes[channel.id],
        desktopHeights[channel.id],
        'max-[760px]:h-full max-[760px]:max-h-full max-[760px]:w-[var(--hero-mobile-card-width)] max-[760px]:max-w-[var(--hero-mobile-card-width)] max-[760px]:flex-[0_0_var(--hero-mobile-card-width)] max-[760px]:snap-center max-[760px]:snap-always',
        isFeature && 'max-[760px]:[--play-size:clamp(54px,14vw,64px)]',
        isPlaying && 'outline-4 -outline-offset-4 outline-white',
      )}
      custom={index}
      variants={variants}
      initial={skipIntro ? false : 'hidden'}
      animate={skipIntro ? false : 'visible'}
    >
      <CardBlurVeil index={index} isFeature={isFeature} active={!skipIntro} />

      {showIntroFx && isFeature && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_50%_32%,rgba(255,17,17,0.22),transparent_62%)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.65, 0] }}
          transition={{ duration: 1.35, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        />
      )}

      <motion.div className="absolute inset-x-0 top-0 bottom-[var(--footer-height)] overflow-hidden">
        <img
          className={cx(
            'block h-full w-full object-cover transition-[filter,transform] duration-[240ms]',
            portraitFocus[channel.id],
            isPlaying && '[filter:saturate(1.12)_contrast(1.04)] scale-[1.02]',
          )}
          src={channel.portrait}
          alt={`${channel.artist} - ${channel.track}`}
        />

        {showIntroFx && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-[3] bg-[linear-gradient(105deg,transparent_38%,rgba(255,255,255,0.14)_50%,transparent_62%)]"
            initial={{ x: '-120%' }}
            animate={{ x: '130%' }}
            transition={heroLightSweepTransition(index, isFeature)}
            aria-hidden="true"
          />
        )}
      </motion.div>

      {channel.trackLabelAccent ? (
        <div
          className="styled-track-label absolute inset-x-0 bottom-[calc(var(--footer-height)_+_clamp(10px,1.4vw,15px))] z-[2] px-[clamp(9px,1.1vw,13px)]"
          style={{ '--track-label-accent': channel.trackLabelAccent }}
        >
          <p className="styled-track-label__stack m-0 w-fit max-w-full">
            <span className="styled-track-label__artist-unit">
              <span className="styled-track-label__line styled-track-label__line--artist">
                {channel.artist}
              </span>
            </span>
            <strong className="styled-track-label__line styled-track-label__line--track">
              {channel.track}
            </strong>
          </p>
        </div>
      ) : (
        <motion.div className="absolute inset-x-0 bottom-[calc(var(--footer-height)_+_clamp(10px,1.4vw,15px))] z-[2] flex min-w-0 max-w-full flex-col gap-px px-[clamp(9px,1.1vw,13px)] uppercase text-white [text-shadow:0_2px_7px_rgba(0,0,0,0.8)]">
          <span className="block min-w-0 w-full max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-[clamp(8px,0.85vw,13px)] font-black leading-none">
            {channel.artist}
          </span>
          <strong className="block min-w-0 w-full max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-[clamp(12px,1.15vw,18px)] font-[950] leading-[0.95]">
            {channel.track}
          </strong>
        </motion.div>
      )}

      <button
        className="absolute left-1/2 top-[48%] z-[3] h-[var(--play-size)] w-[var(--play-size)] -translate-x-1/2 -translate-y-1/2 cursor-pointer border-0 bg-transparent p-0 transition-[filter,transform] duration-[160ms] hover:scale-[1.08] hover:[filter:drop-shadow(0_10px_18px_rgba(0,0,0,0.28))] focus-visible:rounded-full focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-white"
        type="button"
        aria-label={`${isPlaying ? 'Pause' : 'Play'} ${channel.title} radio`}
        aria-pressed={isPlaying}
        onClick={() => onToggle(channel.id)}
      >
        <img
          className={cx(
            'block h-full w-full object-contain transition-[opacity,transform] duration-150',
            isPlaying && 'scale-[0.72] opacity-0',
          )}
          src={channel.playIcon}
          alt=""
          aria-hidden="true"
        />
        <span
          className={cx(
            'absolute left-1/2 top-1/2 grid h-[58%] w-[52%] -translate-x-1/2 -translate-y-1/2 scale-[0.74] grid-cols-2 place-items-center gap-[24%] opacity-0 transition-[opacity,transform] duration-150',
            isPlaying && 'scale-100 opacity-100',
          )}
          aria-hidden="true"
        >
          <span className="h-full w-full rounded-sm bg-white shadow-[0_2px_8px_rgba(0,0,0,0.28)]" />
          <span className="h-full w-full rounded-sm bg-white shadow-[0_2px_8px_rgba(0,0,0,0.28)]" />
        </span>
      </button>

      <footer className="absolute inset-x-0 bottom-0 h-[var(--footer-height)] overflow-hidden">
        <img className="absolute inset-0 h-full w-full object-cover" src={channel.panel} alt="" />
        <motion.div
          className="relative z-[1] grid h-full content-center justify-items-center gap-[clamp(2px,0.6vw,7px)] px-[8%] py-[clamp(10px,1.6vw,18px)]"
          initial={skipIntro ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: skipIntro ? 0 : getCardBlurVeilTransition(index, isFeature).delay + 0.35,
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <img
            className={cx(
              'h-auto w-[clamp(88px,10vw,140px)]',
              isFeature && 'w-[clamp(104px,11.5vw,160px)]',
            )}
            src={brandAssets.stationLogo}
            alt="SZUNET Radio"
          />
          {channel.label && (
            <img
              className="h-[clamp(18px,2.4vw,42px)] w-auto max-w-[86%] object-contain"
              src={channel.label}
              alt={channel.title}
            />
          )}
        </motion.div>
      </footer>
    </motion.article>
  )
}

export default ChannelCard
