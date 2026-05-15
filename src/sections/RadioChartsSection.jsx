import { motion, useReducedMotion } from 'framer-motion'
import likeIcon from '../assets/images/Group 41.png'
import dislikeIcon from '../assets/images/Group 42.png'
import { radioChartRows } from '../data/radioCharts'
import { cx } from '../utils/cx'

const toneStyles = {
  szunet: {
    gradient: 'bg-[linear-gradient(100deg,#c90016_0%,#ff1111_45%,#ff4a27_100%)]',
    chip: 'bg-[#ff1111]',
  },
  oldschool: {
    gradient: 'bg-[linear-gradient(100deg,#b45d00_0%,#f58400_48%,#ff501f_100%)]',
    chip: 'bg-[#ff8500]',
  },
  power: {
    gradient: 'bg-[linear-gradient(100deg,#0038d6_0%,#087bff_54%,#4b79ff_100%)]',
    chip: 'bg-[#008eff]',
  },
  relax: {
    gradient: 'bg-[linear-gradient(100deg,#008323_0%,#1db940_48%,#86e663_100%)]',
    chip: 'bg-[#24c447]',
  },
  electric: {
    gradient: 'bg-[linear-gradient(100deg,#7700df_0%,#bd1dff_46%,#ff42d0_100%)]',
    chip: 'bg-[#d818ff]',
  },
}

function ChartLabel({ label }) {
  return (
    <div
      className="relative z-[2] grid place-items-center bg-[rgba(0,0,0,0.2)] shadow-[inset_-1px_0_0_rgba(255,255,255,0.2),inset_1px_0_0_rgba(0,0,0,0.12)]"
      aria-hidden="true"
    >
      <span className="block rotate-180 [font-family:Arial,Helvetica,sans-serif] text-[clamp(8px,0.85vw,13px)] font-[950] leading-none tracking-[0.06em] text-white uppercase [text-shadow:0_2px_8px_rgba(0,0,0,0.28)] [writing-mode:vertical-rl] max-[420px]:text-[7px]">
        {label}
      </span>
    </div>
  )
}

function ReactionIcons({ trend }) {
  return (
    <div
      className="absolute right-1 top-1 z-[3] inline-flex items-center gap-[3px]"
      aria-label={trend === 'up' ? 'Rising track' : 'Hot track'}
    >
      <img
        className="h-[clamp(10px,1vw,14px)] w-[clamp(10px,1vw,14px)] object-contain [filter:brightness(0)_saturate(100%)_invert(45%)_sepia(98%)_saturate(1707%)_hue-rotate(100deg)_brightness(99%)_contrast(108%)_drop-shadow(0_1px_2px_rgba(0,0,0,0.36))]"
        src={likeIcon}
        alt=""
        aria-hidden="true"
      />
      <img
        className="h-[clamp(10px,1vw,14px)] w-[clamp(10px,1vw,14px)] object-contain [filter:brightness(0)_saturate(100%)_invert(21%)_sepia(96%)_saturate(5505%)_hue-rotate(350deg)_brightness(101%)_contrast(105%)_drop-shadow(0_1px_2px_rgba(0,0,0,0.36))]"
        src={dislikeIcon}
        alt=""
        aria-hidden="true"
      />
    </div>
  )
}

function MusicMeta({ artist, title }) {
  return (
    <div className="grid w-full min-w-0 max-w-full gap-[3px] [font-family:Arial,Helvetica,sans-serif] leading-tight text-white [text-shadow:0_2px_6px_rgba(0,0,0,0.28)]">
      <strong className="block min-w-0 w-full max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-[clamp(7px,0.78vw,11px)] font-[950] uppercase max-[360px]:text-[6.5px]">
        {artist}
      </strong>
      <span className="block min-w-0 w-full max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-[clamp(6.5px,0.68vw,10px)] font-extrabold max-[360px]:text-[6px]">
        {title}
      </span>
    </div>
  )
}

function ChartCard({ card, rank, rowTone }) {
  const prefersReducedMotion = useReducedMotion()
  const tone = toneStyles[rowTone]

  return (
    <motion.article
      className="flex w-full min-w-0 max-w-full cursor-pointer flex-col gap-1.5 [transform-origin:center] group"
      aria-label={`${rank}. ${card.artist} - ${card.title}`}
      whileHover={prefersReducedMotion ? undefined : { y: -4, scale: 1.02 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <MusicMeta artist={card.artist} title={card.title} />
      <div className="relative isolate aspect-square w-full min-w-0 max-w-full overflow-hidden border-2 border-[rgba(255,255,255,0.82)] bg-[rgba(8,8,51,0.18)] shadow-[0_10px_18px_rgba(0,0,0,0.2),0_0_0_1px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.28)] transition-[box-shadow,filter] duration-200 group-hover:shadow-[0_14px_24px_rgba(0,0,0,0.26),0_0_18px_rgba(255,255,255,0.2)]">
        <img
          className="block h-full w-full object-cover transition-transform duration-[220ms] motion-reduce:transition-none group-hover:scale-[1.045]"
          src={card.image}
          alt=""
          aria-hidden="true"
          style={{ objectPosition: card.imagePosition }}
        />
        <span
          className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,transparent_42%,rgba(0,0,0,0.44)),radial-gradient(circle_at_85%_15%,rgba(255,255,255,0.22),transparent_14%)]"
          aria-hidden="true"
        />
        <ReactionIcons trend={card.trend} />
        <span
          className={cx(
            'absolute left-[4px] top-[4px] z-[3] inline-grid min-h-[18px] min-w-[18px] place-items-center rounded-full [font-family:Arial,Helvetica,sans-serif] text-[8px] font-[950] leading-none text-white shadow-[0_4px_10px_rgba(0,0,0,0.24)] max-[360px]:min-h-[16px] max-[360px]:min-w-[16px] max-[360px]:text-[7px]',
            tone.chip,
          )}
        >
          #{rank}
        </span>
      </div>
    </motion.article>
  )
}

function ChartRow({ row, index }) {
  const prefersReducedMotion = useReducedMotion()
  const tone = toneStyles[row.tone]

  return (
    <motion.section
      className={cx(
        'relative isolate grid min-h-[min(168px,28vw)] grid-cols-[clamp(30px,4vw,52px)_1fr] overflow-hidden text-white shadow-[0_18px_34px_rgba(8,8,51,0.14),inset_0_1px_0_rgba(255,255,255,0.24)] max-[620px]:min-h-[156px] max-[420px]:min-h-[148px] max-[360px]:grid-cols-[26px_1fr]',
        tone.gradient,
      )}
      aria-labelledby={`${row.id}-chart-heading`}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.42, ease: 'easeOut', delay: index * 0.045 }}
    >
      <h2 className="sr-only" id={`${row.id}-chart-heading`}>
        {row.label}
      </h2>
      <motion.span
        className={cx('pointer-events-none absolute inset-0 z-0 bg-[length:150%_150%] opacity-90', tone.gradient)}
        aria-hidden="true"
        initial={{ backgroundPosition: '0% 50%' }}
        animate={prefersReducedMotion ? undefined : { backgroundPosition: '100% 50%' }}
        transition={{ duration: 8, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
      />
      <span
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_18%_28%,rgba(255,255,255,0.82),transparent_7%),repeating-linear-gradient(90deg,rgba(255,255,255,0.22)_0_1px,transparent_1px_17px)] opacity-[0.18] mix-blend-screen"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(0,0,0,0.34)_0%,rgba(0,0,0,0.18)_18%,rgba(0,0,0,0.08)_44%,rgba(0,0,0,0.22)_100%)]"
        aria-hidden="true"
      />
      <ChartLabel label={row.label} />

      <div
        className="relative z-[2] min-w-0 touch-pan-x overflow-x-auto overflow-y-hidden overscroll-x-contain scroll-smooth [scroll-snap-type:x_mandatory] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ WebkitOverflowScrolling: 'touch' }}
        aria-label={`${row.label}: legfeljebb 30 dal, vízszintesen görgethető`}
      >
        <div className="flex w-max flex-nowrap items-stretch gap-[clamp(8px,1.2vw,14px)] py-[clamp(10px,1.2vw,16px)] pl-[clamp(8px,1.4vw,18px)] pr-[clamp(12px,2vw,28px)]">
          {row.cards.map((card, cardIndex) => (
            <div
              className="w-[clamp(76px,14vw,140px)] shrink-0 snap-start max-[420px]:w-[clamp(72px,26vw,100px)]"
              key={`${row.id}-${card.id}`}
            >
              <ChartCard card={card} rank={cardIndex + 1} rowTone={row.tone} />
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

function RadioChartsSection() {
  return (
    <section className="bg-white pb-[clamp(28px,4vw,58px)] pt-1" aria-label="SZUNET RADIO charts">
      <div className="mx-auto grid w-[min(100%,var(--page-width))] gap-[8px] overflow-hidden max-[620px]:w-[min(calc(100vw-16px),var(--page-width))]">
        {radioChartRows.map((row, index) => (
          <ChartRow row={row} index={index} key={row.id} />
        ))}
      </div>
    </section>
  )
}

export default RadioChartsSection
