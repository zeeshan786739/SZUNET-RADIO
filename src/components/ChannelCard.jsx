import { motion, useReducedMotion } from 'framer-motion'
import { brandAssets } from '../data/channels'
import { cx } from '../utils/cx'

const desktopCardSizes = {
  electric:
    'min-[761px]:h-[clamp(390px,66svh,510px)] min-[761px]:w-[clamp(145px,17vw,174px)]',
  oldschool:
    'min-[761px]:h-[clamp(430px,75svh,575px)] min-[761px]:w-[clamp(150px,17.5vw,180px)]',
  prime:
    'min-[761px]:h-[clamp(470px,84svh,645px)] min-[761px]:w-[clamp(205px,24vw,246px)]',
  power:
    'min-[761px]:h-[clamp(390px,66svh,510px)] min-[761px]:w-[clamp(145px,17vw,174px)]',
  relax:
    'min-[761px]:h-[clamp(430px,76svh,585px)] min-[761px]:w-[clamp(185px,21vw,215px)]',
}

function ChannelCard({ channel, index, introActive = false, isPlaying, onToggle }) {
  const isFeature = channel.size === 'feature'
  const prefersReducedMotion = useReducedMotion()
  const introOffset = index - 2

  return (
    <motion.article
      className={cx(
        'relative min-h-0 min-w-0 snap-center overflow-hidden bg-[#111] shadow-[0_16px_32px_rgba(0,0,0,0.18)]',
        '[--footer-height:26%] [--play-size:clamp(48px,4.2vw,68px)]',
        'min-[761px]:flex-none',
        desktopCardSizes[channel.id],
        /* Mobile: one card width per “page”, full strip height */
        'max-[760px]:h-full max-[760px]:max-h-full max-[760px]:w-[calc(100vw-24px)] max-[760px]:max-w-[calc(100vw-24px)] max-[760px]:flex-[0_0_calc(100vw-24px)] max-[760px]:snap-center max-[760px]:snap-always',
        isFeature && 'max-[760px]:[--footer-height:25%] max-[760px]:[--play-size:clamp(54px,14vw,64px)]',
        isPlaying && 'outline-4 -outline-offset-4 outline-white',
      )}
      initial={
        prefersReducedMotion
          ? false
          : {
              opacity: 0,
              y: introActive ? -150 : 36,
              x: introActive ? introOffset * 34 : 0,
              rotate: introActive ? introOffset * -3.5 : 0,
              scale: introActive ? 0.72 : 0.94,
              filter: introActive ? 'saturate(0.85) brightness(1.08)' : 'none',
            }
      }
      animate={{ opacity: 1, y: 0, x: 0, rotate: 0, scale: 1, filter: 'none' }}
      transition={
        introActive
          ? {
              type: 'spring',
              stiffness: 92,
              damping: 15,
              mass: 0.82,
              delay: 0.08 + index * 0.09,
            }
          : { duration: 0.56, ease: 'easeOut', delay: 0.12 + index * 0.08 }
      }
    >
      <img
        className={cx(
          'absolute inset-x-0 top-0 bottom-[var(--footer-height)] h-[calc(100%_-_var(--footer-height))] w-full object-cover object-top transition-[filter,transform] duration-[240ms]',
          channel.id === 'relax' && 'max-[760px]:object-[58%_center]',
          isPlaying && '[filter:saturate(1.12)_contrast(1.04)] scale-[1.015]',
        )}
        src={channel.portrait}
        alt={`${channel.artist} - ${channel.track}`}
      />

      <div className="absolute inset-x-0 bottom-[calc(var(--footer-height)_+_clamp(10px,1.4vw,15px))] z-[2] flex min-w-0 max-w-full flex-col gap-px px-[clamp(9px,1.1vw,13px)] uppercase text-white [text-shadow:0_2px_7px_rgba(0,0,0,0.8)]">
        <span className="block min-w-0 w-full max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-[clamp(8px,0.9vw,11px)] font-black leading-none">
          {channel.artist}
        </span>
        <strong className="block min-w-0 w-full max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-[clamp(12px,1.25vw,16px)] font-[950] leading-[0.95]">
          {channel.track}
        </strong>
      </div>

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
        <div className="relative z-[1] grid h-full content-center justify-items-center gap-[clamp(2px,0.6vw,7px)] px-[8%] py-[clamp(10px,1.6vw,18px)]">
          <img
            className={cx(
              'h-auto w-[clamp(88px,11vw,112px)]',
              isFeature && 'w-[clamp(104px,12.5vw,130px)]',
            )}
            src={brandAssets.stationLogo}
            alt="SZUNET Radio"
          />
          {channel.label && (
            <img
              className="h-[clamp(18px,2.6vw,36px)] w-auto max-w-[86%] object-contain"
              src={channel.label}
              alt={channel.title}
            />
          )}
        </div>
      </footer>
    </motion.article>
  )
}

export default ChannelCard
