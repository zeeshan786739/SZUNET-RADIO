import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { scheduleItems } from '../data/schedule'
import { cx } from '../utils/cx'
import ScheduleHeroRocket from '../components/ScheduleHeroRocket'
import donnaDonnaLabel from '../assets/images/Donna Donna Ball in my hand.png'
import schedulePanelBg from '../assets/images/Rectangle 98.png'
import blueRing from '../assets/images/Ellipse 5.png'

const DEFAULT_ACTIVE_ITEM_ID = '1745'
const TICK_COUNT = 96

function getAnchor(index, total) {
  return `${((index + 0.5) / total) * 100}%`
}

function ScheduleTrackCard({ item, index, isActive, onSelect, anchor }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.article
      className="relative min-w-0 snap-center px-[clamp(5px,0.85vw,14px)] [transform-origin:center_bottom]"
      style={{ '--card-anchor': anchor }}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
      animate={{
        opacity: 1,
        scale: isActive ? 1.025 : 1,
        y: isActive ? -4 : 0,
      }}
      transition={{
        delay: prefersReducedMotion ? 0 : index * 0.035,
        duration: 0.22,
        ease: 'easeOut',
      }}
    >
      <motion.button
        className={cx(
          'group relative grid w-full min-w-0 cursor-pointer grid-rows-[15px_auto_auto] justify-items-stretch gap-[3px] rounded-lg border border-transparent bg-transparent p-[3px] text-left text-[#050526] transition-[border-color,box-shadow,background] duration-[160ms] motion-reduce:transition-none',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#008eff]',
          'hover:border-[rgba(0,142,255,0.44)] hover:bg-[rgba(255,255,255,0.38)] hover:shadow-[0_8px_16px_rgba(7,7,56,0.11)]',
          isActive &&
            'border-[rgba(255,17,17,0.62)] bg-[rgba(255,255,255,0.58)] shadow-[0_10px_18px_rgba(7,7,56,0.14),0_0_0_1px_rgba(255,255,255,0.72),0_0_12px_rgba(255,17,17,0.14)] backdrop-blur-[5px]',
        )}
        type="button"
        aria-label={`Play ${item.artist} - ${item.title} at ${item.time}`}
        aria-pressed={isActive}
        onClick={() => onSelect(item.id)}
        whileHover={prefersReducedMotion ? undefined : { y: -3 }}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.985 }}
      >
        <div className="grid h-[15px] w-full min-w-0 max-w-full place-items-start overflow-hidden">
          <img
            className="block h-auto w-[clamp(36px,4.2vw,52px)] max-w-full object-contain object-left"
            src={donnaDonnaLabel}
            alt={`${item.artist} - ${item.title}`}
          />
        </div>

        <div
          className={cx(
            'relative isolate aspect-square overflow-hidden rounded-sm bg-[rgba(217,217,222,0.88)] shadow-[0_6px_12px_rgba(7,7,56,0.14),inset_0_0_0_1px_rgba(255,255,255,0.45)] backdrop-blur-[2px]',
            isActive && 'shadow-[0_8px_16px_rgba(7,7,56,0.22),0_0_0_2px_rgba(255,17,17,0.82)]',
          )}
        >
          <img
            className="block h-full w-full object-cover transition-transform duration-[220ms] motion-reduce:transition-none group-hover:scale-[1.035]"
            src={item.cover}
            alt={`${item.artist} - ${item.title}`}
          />
          <span
            className="pointer-events-none absolute inset-x-0 bottom-0 top-[38%] z-[1] bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.28))]"
            aria-hidden="true"
          />
          <span
            className="absolute bottom-[3px] right-[3px] z-[2] grid h-[clamp(18px,1.8vw,25px)] w-[clamp(18px,1.8vw,25px)] place-items-center rounded-full border border-[rgba(255,255,255,0.82)] bg-[rgba(7,7,56,0.7)] shadow-[0_5px_10px_rgba(0,0,0,0.24)]"
            aria-hidden="true"
          >
            {isActive ? (
              <span className="inline-flex h-3 items-end gap-0.5">
                {[0, 1, 2].map((bar) => (
                  <motion.i
                    className="block w-[3px] rounded-full bg-white"
                    animate={prefersReducedMotion ? { height: 5 } : { height: [4, 12, 4] }}
                    transition={{
                      duration: 0.76,
                      ease: 'easeInOut',
                      repeat: prefersReducedMotion ? 0 : Infinity,
                      delay: bar * 0.12,
                    }}
                    key={bar}
                  />
                ))}
              </span>
            ) : (
              <span className="ml-0.5 h-0 w-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-white" />
            )}
          </span>
        </div>

        <time
          className={cx(
            'inline-grid min-h-3.5 min-w-[38px] place-items-center justify-self-center [font-family:Arial,Helvetica,sans-serif] text-[clamp(7px,0.6vw,9px)] font-[950] leading-none text-[#080833] [text-shadow:0_1px_0_rgba(255,255,255,0.5)]',
            isActive && 'text-[#ff1111]',
          )}
          dateTime={item.time}
        >
          {item.time}
        </time>
      </motion.button>

      <span
        className={cx(
          'absolute bottom-[-10px] left-1/2 h-3 w-px -translate-x-1/2 bg-[rgba(7,7,56,0.52)]',
          isActive && 'w-0.5 bg-[#ff1111] shadow-[0_0_12px_rgba(255,17,17,0.56)]',
        )}
        aria-hidden="true"
      />
    </motion.article>
  )
}

function ScheduleTimeline({ items, activeIndex, activeItem, onSelect }) {
  const progress = getAnchor(activeIndex, items.length)
  const minorTicks = Array.from({ length: TICK_COUNT }, (_, index) => index)
  const prefersReducedMotion = useReducedMotion()

  return (
    <div
      className="relative mt-px h-[42px] w-full"
      style={{ '--timeline-progress': progress }}
      aria-label="Schedule progress timeline"
    >
      <div
        className="absolute inset-x-0 top-[3px] h-[3px] overflow-hidden rounded-full bg-[rgba(7,7,56,0.2)]"
        aria-hidden="true"
      >
        <motion.span
          className="absolute inset-y-0 left-0 rounded-[inherit] bg-[linear-gradient(90deg,#070738,#008eff_62%,#ff1111)] shadow-[0_0_10px_rgba(0,142,255,0.28)]"
          initial={false}
          animate={{ width: progress }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.32, ease: 'easeOut' }}
        />
      </div>

      <div className="absolute inset-x-0 top-2 h-[30px]" aria-hidden="true">
        <span className="absolute left-0 right-0 top-px h-px bg-[rgba(7,7,56,0.34)]" />
        <div className="absolute inset-0 grid grid-cols-[repeat(96,1fr)] items-start">
          {minorTicks.map((tick) => (
            <span
              className={cx(
                'block h-[11px] w-px justify-self-center bg-[rgba(7,7,56,0.72)]',
                tick % 4 === 0 && 'h-4 bg-[rgba(7,7,56,0.82)]',
                tick % 12 === 0 && 'h-[22px] bg-[#070738]',
              )}
              key={tick}
            />
          ))}
        </div>
      </div>

      <ol className="absolute inset-x-0 top-2 h-[30px] list-none p-0">
        {items.map((item, index) => {
          const position = getAnchor(index, items.length)
          const isActive = index === activeIndex

          return (
            <li
              className="absolute top-0 -translate-x-1/2"
              key={item.id}
              style={{ left: position }}
            >
              <button
                className="group grid h-[30px] w-[38px] cursor-pointer content-start justify-items-center border-0 bg-transparent p-0 focus-visible:rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#008eff]"
                type="button"
                aria-label={`Jump to ${item.time}, ${item.artist} - ${item.title}`}
                onClick={() => onSelect(item.id)}
              >
                <span
                  className={cx(
                    'h-[27px] w-0.5 rounded-full bg-[#070738] transition-[background,box-shadow,height] duration-[160ms] motion-reduce:transition-none group-hover:bg-[#008eff] group-hover:shadow-[0_0_10px_rgba(0,142,255,0.48)]',
                    isActive && 'h-[31px] bg-[#ff1111] shadow-[0_0_12px_rgba(255,17,17,0.62)] group-hover:bg-[#ff1111]',
                  )}
                  aria-hidden="true"
                />
                <time className="sr-only" dateTime={item.time}>
                  {item.time}
                </time>
              </button>
            </li>
          )
        })}
      </ol>

      <motion.div
        className="pointer-events-none absolute top-[-5px] z-[4] -translate-x-1/2"
        aria-live="polite"
        initial={false}
        animate={{ left: progress }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.32, ease: 'easeOut' }}
      >
        <span
          className="absolute left-1/2 top-[17px] h-[22px] w-[22px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,17,17,0.18),transparent_70%)]"
          aria-hidden="true"
        />
        <span
          className="absolute left-1/2 top-[19px] h-[30px] w-0.5 -translate-x-1/2 rounded-full bg-[linear-gradient(#ff1111,rgba(255,17,17,0))]"
          aria-hidden="true"
        />
        <span className="relative z-[2] inline-grid min-h-[18px] min-w-[38px] place-items-center rounded-full border border-[rgba(255,255,255,0.72)] bg-[#070738] px-[7px] [font-family:Arial,Helvetica,sans-serif] text-[8px] font-[950] leading-none text-white shadow-[0_5px_14px_rgba(7,7,56,0.28),0_0_12px_rgba(0,142,255,0.22)]">
          {activeItem.time}
        </span>
      </motion.div>
    </div>
  )
}

function ScheduleSection({ variant = 'default' }) {
  const [activeItemId, setActiveItemId] = useState(DEFAULT_ACTIVE_ITEM_ID)
  const isHeroVariant = variant === 'hero'

  const activeIndex = useMemo(() => {
    const index = scheduleItems.findIndex((item) => item.id === activeItemId)
    return index >= 0 ? index : 0
  }, [activeItemId])

  const activeItem = scheduleItems[activeIndex] ?? scheduleItems[0]

  return (
    <section
      className={cx('relative isolate overflow-visible bg-transparent pt-2 max-[560px]:pt-[7px]', isHeroVariant && 'pt-0 max-[560px]:pt-0')}
      aria-label={isHeroVariant ? 'Közelgő műsor' : 'Nemrég hallottad — közelgő műsor'}
    >
      {!isHeroVariant ? (
        <img
          className="pointer-events-none absolute right-[-50px] top-[200px] z-[1] h-[814px] w-[713px] max-w-none"
          src={blueRing}
          width={713}
          height={814}
          alt=""
          aria-hidden="true"
        />
      ) : null}
      {!isHeroVariant ? (
        <div className="relative z-[2] mx-auto mb-2 w-[var(--page-width)] max-w-[min(100%,var(--page-width))] max-[560px]:mb-1.5 max-[560px]:w-[calc(100vw-20px)]">
          <div className="flex min-h-7 items-center justify-between gap-3 px-1 [font-family:Arial,Helvetica,sans-serif] text-[#070738] max-[560px]:px-2">
            <h2 className="m-0 inline-flex min-w-0 items-center gap-1.5 [font-family:Impact,Haettenschweiler,'Arial_Narrow_Bold','Arial_Narrow',Arial,sans-serif] text-[clamp(16px,1.55vw,23px)] font-normal lowercase leading-none tracking-normal">
              <span className="relative inline-grid h-[1em] w-[1em] shrink-0 place-items-center rounded-full border-2 border-current" aria-hidden="true">
                <span className="absolute left-1/2 top-[22%] h-[36%] w-[2px] -translate-x-1/2 rounded-full bg-current" />
                <span className="absolute left-1/2 top-1/2 h-[2px] w-[34%] -translate-y-1/2 rounded-full bg-current" />
              </span>
              <span className="truncate">nemrég hallottad</span>
              <span className="mt-[0.12em] h-0 w-0 shrink-0 border-x-[4px] border-t-[6px] border-x-transparent border-t-current" aria-hidden="true" />
            </h2>
            <a
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#ff1111] px-3 py-1.5 text-[clamp(9px,0.86vw,12px)] font-[950] lowercase leading-none text-white no-underline shadow-[0_2px_8px_rgba(255,17,17,0.22)]"
              href="/dal-kereses"
              aria-label="Dal keresés"
            >
              <span className="relative inline-block h-[1em] w-[1em] rounded-full border border-white" aria-hidden="true">
                <span className="absolute left-[62%] top-[68%] h-[1.5px] w-[42%] origin-left rotate-45 rounded-full bg-white" />
              </span>
              dalkereses
            </a>
          </div>
        </div>
      ) : null}
      {!isHeroVariant ? (
        <h2 className="sr-only">
          Nemrég hallottad
        </h2>
      ) : null}
      <div
        className={cx(
          'relative z-[2] mx-auto w-[var(--page-width)] overflow-hidden rounded-[14px]',
          'border border-[rgba(255,255,255,0.38)]',
          'bg-[rgba(255,255,255,0.12)] shadow-[0_8px_22px_rgba(7,7,56,0.07),inset_0_1px_0_rgba(255,255,255,0.28)]',
          'backdrop-blur-[1px] backdrop-saturate-[1.06]',
          'max-[560px]:w-[calc(100vw-20px)] max-[560px]:rounded-xl max-[560px]:bg-[rgba(255,255,255,0.14)] max-[560px]:backdrop-blur-[5px]',
          isHeroVariant &&
            'rounded-[9px] border-[rgba(255,255,255,0.45)] bg-[rgba(255,255,255,0.22)] shadow-[0_12px_24px_rgba(76,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.32)] max-[560px]:w-[var(--page-width)]',
        )}
      >
        {!isHeroVariant ? null : (
          <img
            className="pointer-events-none absolute inset-0 -z-[2] h-full w-full object-fill opacity-[0.12]"
            src={schedulePanelBg}
            alt=""
            aria-hidden="true"
          />
        )}
        <span
          className="pointer-events-none absolute inset-0 -z-[1] bg-[linear-gradient(90deg,rgba(255,255,255,0.06),transparent_16%,transparent_84%,rgba(255,255,255,0.05)),repeating-linear-gradient(90deg,rgba(7,7,56,0.055)_0_1px,transparent_1px_84px)]"
          aria-hidden="true"
        />
        {isHeroVariant ? <ScheduleHeroRocket /> : null}
        <div className="relative z-[2] overflow-x-auto overscroll-x-contain scroll-smooth px-2.5 pb-[7px] pt-2 [scroll-padding-inline:10px] [scrollbar-width:none] [scroll-snap-type:x_proximity] [&::-webkit-scrollbar]:hidden max-[560px]:px-2 max-[560px]:py-[7px]">
          <div className="min-w-[740px] max-[900px]:min-w-[720px] max-[560px]:min-w-[660px] max-[420px]:min-w-[620px]">
            <div className="grid w-full grid-cols-[repeat(8,minmax(72px,1fr))] items-end gap-x-0 max-[560px]:grid-cols-[repeat(8,72px)] max-[420px]:grid-cols-[repeat(8,68px)]">
              {scheduleItems.map((item, index) => (
                <ScheduleTrackCard
                  anchor={getAnchor(index, scheduleItems.length)}
                  item={item}
                  index={index}
                  isActive={item.id === activeItem.id}
                  key={item.id}
                  onSelect={setActiveItemId}
                />
              ))}
            </div>

            <ScheduleTimeline
              items={scheduleItems}
              activeIndex={activeIndex}
              activeItem={activeItem}
              onSelect={setActiveItemId}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ScheduleSection
