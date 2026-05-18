import { Fragment } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import likeIcon from '../assets/images/Group 41.png'
import dislikeIcon from '../assets/images/Group 42.png'
import { radioChartRows } from '../data/radioCharts'
import { cx } from '../utils/cx'

const toneStyles = {
  szunet: {
    gradient: 'bg-[linear-gradient(90deg,#e01010_0%,#c90016_42%,#9e0a12_100%)]',
    rail: 'bg-[#6a0810]',
  },
  oldschool: {
    gradient: 'bg-[linear-gradient(90deg,#f58400_0%,#d96a00_48%,#b45d00_100%)]',
    rail: 'bg-[#8a4200]',
  },
  power: {
    gradient: 'bg-[linear-gradient(90deg,#087bff_0%,#0066d6_52%,#0038a8_100%)]',
    rail: 'bg-[#003080]',
  },
  relax: {
    gradient: 'bg-[linear-gradient(90deg,#1db940_0%,#159a32_50%,#008323_100%)]',
    rail: 'bg-[#0a5a18]',
  },
  electric: {
    gradient: 'bg-[linear-gradient(90deg,#bd1dff_0%,#8f12c8_48%,#7700b8_100%)]',
    rail: 'bg-[#4a0878]',
  },
}

function ChartRail({ label, railClass }) {
  return (
    <div
      className={cx(
        'relative z-[2] grid w-[clamp(30px,4vw,52px)] shrink-0 place-items-center shadow-[inset_-1px_0_0_rgba(255,255,255,0.14)] max-xs:w-[26px]',
        railClass,
      )}
      aria-hidden="true"
    >
      <span className="block rotate-180 [writing-mode:vertical-rl] font-['Bebas_Neue',Impact,sans-serif] text-[clamp(9px,0.9vw,13px)] font-normal uppercase leading-none tracking-[0.08em] text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.32)]">
        {label}
      </span>
    </div>
  )
}

function ReactionIcons() {
  return (
    <div className="absolute right-[3px] top-[3px] z-[3] inline-flex items-center gap-[2px]" aria-hidden="true">
      <img
        className="h-[clamp(11px,1.05vw,15px)] w-[clamp(11px,1.05vw,15px)] object-contain [filter:brightness(0)_saturate(100%)_invert(58%)_sepia(79%)_saturate(520%)_hue-rotate(84deg)_brightness(98%)_contrast(101%)_drop-shadow(0_1px_2px_rgba(0,0,0,0.45))]"
        src={likeIcon}
        alt=""
      />
      <img
        className="h-[clamp(11px,1.05vw,15px)] w-[clamp(11px,1.05vw,15px)] object-contain [filter:brightness(0)_saturate(100%)_invert(24%)_sepia(98%)_saturate(4200%)_hue-rotate(350deg)_brightness(102%)_contrast(104%)_drop-shadow(0_1px_2px_rgba(0,0,0,0.45))]"
        src={dislikeIcon}
        alt=""
      />
    </div>
  )
}

function PlayButton() {
  return (
    <span
      className="absolute bottom-[3px] right-[3px] z-[3] grid h-[clamp(18px,1.65vw,24px)] w-[clamp(18px,1.65vw,24px)] place-items-center rounded-full border border-[rgba(255,255,255,0.9)] bg-[rgba(0,0,0,0.38)] shadow-[0_3px_8px_rgba(0,0,0,0.35)]"
      aria-hidden="true"
    >
      <span className="ml-0.5 h-0 w-0 border-y-[4px] border-l-[7px] border-y-transparent border-l-white" />
    </span>
  )
}

function ChartMeta({ artist, title }) {
  return (
    <div className="flex min-w-0 max-w-full flex-col items-start gap-[clamp(2px,0.28vw,4px)]">
      <span className="relative z-0 inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap px-[clamp(3px,0.35vw,5px)] pl-[clamp(1px,0.15vw,2px)] font-['Helvetica_Neue','Arial_Narrow',Arial,sans-serif] text-[clamp(8px,0.82vw,11px)] font-bold uppercase leading-[1.08] tracking-[0.045em] text-white">
        <span
          className="pointer-events-none absolute top-1/2 right-[clamp(-2px,-0.2vw,-1px)] left-[clamp(-2px,-0.2vw,-1px)] z-[-1] h-[0.5em] -translate-y-1/2 bg-black"
          aria-hidden="true"
        />
        {artist}
      </span>
      <span className="block max-w-full overflow-hidden text-ellipsis whitespace-nowrap font-['Helvetica_Neue',Arial,sans-serif] text-[clamp(7px,0.72vw,10px)] font-normal leading-[1.15] tracking-[0.01em] text-white">
        {title}
      </span>
    </div>
  )
}

function ChartRank({ value }) {
  const digitCount = String(value).length

  return (
    <span
      className={cx(
        'block select-none text-center font-[family-name:var(--font-family)] font-bold tabular-nums lining-nums leading-[0.82] text-white [-webkit-text-stroke:0.45px_rgba(90,0,0,0.38)] [paint-order:stroke_fill] [text-shadow:0_1px_0_rgba(90,0,0,0.42)] [font-synthesis:none]',
        digitCount >= 2
          ? 'text-[clamp(50px,9.2vw,90px)] tracking-[-0.01em]'
          : 'text-[clamp(58px,10.8vw,104px)] tracking-[0.02em]',
      )}
      aria-hidden="true"
    >
      {value}
    </span>
  )
}

function ChartRankSlot({ rank }) {
  const digitCount = String(rank).length

  return (
    <div
      className={cx(
        'relative z-[5] box-border flex shrink-0 items-center justify-center self-start h-[var(--chart-cover-size)] w-auto px-[clamp(12px,1.65vw,26px)]',
        digitCount >= 2 ? 'min-w-[clamp(48px,6.4vw,88px)]' : 'min-w-[clamp(44px,5.8vw,80px)]',
      )}
      aria-hidden="true"
    >
      <ChartRank value={rank} />
    </div>
  )
}

function ChartCard({ card, rank }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.article
      className="relative z-[2] flex w-[var(--chart-cover-size)] shrink-0 snap-start cursor-pointer flex-col gap-[6px] [transform-origin:center_bottom]"
      aria-label={`${rank}. ${card.artist} - ${card.title}`}
      whileHover={prefersReducedMotion ? undefined : { y: -3 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <div className="relative isolate aspect-square w-full overflow-hidden border border-white bg-[rgba(0,0,0,0.2)] shadow-[0_8px_16px_rgba(0,0,0,0.22)]">
        <img
          className="block h-full w-full object-cover transition-transform duration-[220ms] motion-reduce:transition-none hover:scale-[1.04]"
          src={card.image}
          alt=""
          style={{ objectPosition: card.imagePosition }}
        />
        <span
          className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,transparent_55%,rgba(0,0,0,0.35))]"
          aria-hidden="true"
        />
        <ReactionIcons />
        <PlayButton />
      </div>
      <ChartMeta artist={card.artist} title={card.title} />
    </motion.article>
  )
}

function ChartRow({ row, index }) {
  const prefersReducedMotion = useReducedMotion()
  const tone = toneStyles[row.tone]

  return (
    <motion.section
      className={cx('relative isolate grid min-h-[min(200px,34vw)] grid-cols-[auto_1fr] overflow-hidden text-white', tone.gradient)}
      aria-labelledby={`${row.id}-chart-heading`}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.04 }}
    >
      <h2 className="sr-only" id={`${row.id}-chart-heading`}>
        {row.label}
      </h2>

      <span
        className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(0,0,0,0.28)_0%,rgba(0,0,0,0.1)_22%,rgba(0,0,0,0.06)_50%,rgba(0,0,0,0.14)_100%)]"
        aria-hidden="true"
      />

      <ChartRail label={row.label} railClass={tone.rail} />

      <div
        className="relative z-[2] min-w-0 touch-pan-x overflow-x-auto overflow-y-hidden overscroll-x-contain scroll-smooth [scroll-snap-type:x_mandatory] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ WebkitOverflowScrolling: 'touch' }}
        aria-label={`${row.label}: legfeljebb 30 dal, vízszintesen görgethető`}
      >
        <div className="flex w-max flex-nowrap items-start gap-0 py-[clamp(10px,1.15vw,14px)] pl-[clamp(10px,1.25vw,16px)] pr-[clamp(14px,2vw,24px)] [--chart-cover-size:clamp(102px,15.5vw,152px)] max-xs:[--chart-cover-size:clamp(92px,27vw,124px)] xl:py-4 xl:pl-5 xl:pr-7 xl:[--chart-cover-size:clamp(118px,10vw,168px)] 2xl:[--chart-cover-size:clamp(128px,9vw,176px)]">
          {row.cards.map((card, cardIndex) => {
            const rank = cardIndex + 1
            const showRankAfter = cardIndex < row.cards.length - 1

            return (
              <Fragment key={card.id}>
                <ChartCard card={card} rank={rank} />
                {showRankAfter ? <ChartRankSlot rank={rank} /> : null}
              </Fragment>
            )
          })}
        </div>
      </div>
    </motion.section>
  )
}

function RadioChartsSection() {
  return (
    <section className="bg-white pb-[clamp(28px,4vw,58px)] pt-1 xl:pb-16 xl:pt-2" aria-label="SZUNET RADIO charts">
      <div className="mx-auto grid w-[min(100%,var(--page-width))] gap-[8px] overflow-hidden max-md:w-[min(calc(100vw-16px),var(--page-width))] xl:gap-3 2xl:gap-4">
        {radioChartRows.map((row, index) => (
          <ChartRow row={row} index={index} key={row.id} />
        ))}
      </div>
    </section>
  )
}

export default RadioChartsSection
