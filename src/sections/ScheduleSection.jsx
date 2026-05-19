import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { scheduleItems } from '../data/schedule'
import ScheduleTrackLabel from '../components/ScheduleTrackLabel'
import { cx } from '../utils/cx'
import ScheduleHeroRocket, { ScheduleHeroRocketBackdrop } from '../components/ScheduleHeroRocket'
import SearchGlyph from '../components/SearchGlyph'
import EditorialBlueRing from '../components/EditorialBlueRing'
const DEFAULT_ACTIVE_ITEM_ID = '1745'
/** Ticks between two time labels (10-minute span). */
const RULER_TICKS_BETWEEN_MAJORS = 9

const heroScheduleGridClass =
  'grid w-full grid-cols-[repeat(8,minmax(72px,1fr))] gap-x-[clamp(8px,1.05vw,14px)] max-lg:grid-cols-[repeat(8,minmax(64px,1fr))] max-lg:gap-x-[clamp(6px,0.9vw,10px)] max-sm:grid-cols-[repeat(8,minmax(60px,72px))] max-sm:gap-x-[6px] max-xs:grid-cols-[repeat(8,minmax(56px,68px))] max-xs:gap-x-[5px] lg:grid-cols-[repeat(8,minmax(0,1fr))] lg:gap-x-[clamp(10px,0.9vw,18px)] xl:gap-x-[clamp(12px,0.95vw,20px)] 2xl:gap-x-[clamp(14px,1vw,24px)]'

const defaultScheduleGridClass =
  'grid w-full grid-cols-[repeat(8,minmax(72px,1fr))] gap-x-0 max-sm:grid-cols-[repeat(8,72px)] max-xs:grid-cols-[repeat(8,68px)] items-end pt-1 xl:grid-cols-[repeat(8,minmax(0,1fr))] xl:gap-x-[clamp(8px,0.75vw,14px)]'

const heroScheduleScrollMinClass =
  'min-w-[min(100%,calc(8*64px+7*10px))] max-lg:min-w-[min(100%,580px)] max-md:min-w-[min(100%,520px)] max-sm:min-w-[min(100%,480px)] max-xs:min-w-[460px] lg:min-w-0 lg:w-full'

const defaultScheduleScrollMinClass =
  'min-w-[740px] max-lg:min-w-[720px] max-sm:min-w-[660px] max-xs:min-w-[620px] xl:min-w-0 xl:w-full'

const heroScheduleStageClass = 'relative isolate overflow-visible'

const heroScheduleCardsShellClass =
  'relative isolate z-[1] pt-[clamp(2px,0.35vw,6px)] pb-0 max-lg:z-[2]'

const heroScheduleCardsAreaClass = 'relative z-[1] max-lg:z-[2]'

const heroCardHeaderClass =
  'px-[clamp(3px,0.4vw,6px)] py-[clamp(3px,0.38vw,5px)]'

function getAnchor(index, total) {
  return `${((index + 0.5) / total) * 100}%`
}

function anchorPercent(index, total) {
  return ((index + 0.5) / total) * 100
}

function buildRulerMarks(itemCount, activeIndex) {
  const marks = []
  const slotWidth = 100 / itemCount
  const step = slotWidth / (RULER_TICKS_BETWEEN_MAJORS + 1)
  const midStep = Math.ceil(RULER_TICKS_BETWEEN_MAJORS / 2)
  const firstMajor = anchorPercent(0, itemCount)
  const lastMajor = anchorPercent(itemCount - 1, itemCount)

  const pushMinorAt = (pos, id) => {
    if (pos < 0 || pos > 100) return
    marks.push({ id, kind: 'minor', left: `${pos}%` })
  }

  const pushMediumAt = (pos, id) => {
    if (pos < 0 || pos > 100) return
    marks.push({ id, kind: 'medium', left: `${pos}%` })
  }

  // Same step as between labels: 0 → first time, then each gap, then last time → 100%
  for (let pos = 0; pos < firstMajor - step * 0.2; pos += step) {
    pushMinorAt(pos, `lead-${pos.toFixed(2)}`)
  }

  for (let index = 0; index < itemCount; index += 1) {
    marks.push({
      id: `major-${index}`,
      kind: index === activeIndex ? 'active' : 'major',
      left: getAnchor(index, itemCount),
    })

    if (index >= itemCount - 1) continue

    const start = anchorPercent(index, itemCount)
    for (let tick = 1; tick <= RULER_TICKS_BETWEEN_MAJORS; tick += 1) {
      const pos = start + tick * step
      if (pos >= anchorPercent(index + 1, itemCount) - step * 0.2) break
      if (tick === midStep) {
        pushMediumAt(pos, `gap-${index}-mid`)
      } else {
        pushMinorAt(pos, `gap-${index}-${tick}`)
      }
    }
  }

  for (let pos = lastMajor + step; pos <= 100 + 0.001; pos += step) {
    pushMinorAt(Math.min(pos, 100), `trail-${pos.toFixed(2)}`)
  }

  return marks
}

function ScheduleTrackCard({ item, index, isActive, onSelect, anchor, variant = 'default' }) {
  const prefersReducedMotion = useReducedMotion()
  const isHeroVariant = variant === 'hero'

  return (
    <motion.article
      className={cx(
        'relative min-w-0 snap-center [transform-origin:center_bottom]',
        isHeroVariant
          ? 'px-[clamp(8px,1.05vw,14px)] max-sm:px-[6px] max-xs:px-[5px] xl:px-[clamp(12px,0.95vw,20px)] 2xl:px-[clamp(14px,1vw,24px)]'
          : 'px-[clamp(5px,0.85vw,14px)]',
      )}
      style={{ '--card-anchor': anchor }}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
      animate={{
        opacity: 1,
        scale: isActive && !isHeroVariant ? 1.025 : 1,
        y: 0,
      }}
      transition={{
        delay: prefersReducedMotion ? 0 : index * 0.035,
        duration: 0.22,
        ease: 'easeOut',
      }}
    >
      <motion.button
        className={cx(
          'group relative grid w-full min-w-0 cursor-pointer justify-items-stretch text-left transition-[border-color,box-shadow,background] duration-[160ms] motion-reduce:transition-none',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#008eff]',
          isHeroVariant
            ? 'grid-rows-[auto_auto] gap-0 rounded-none border-0 bg-transparent p-0 hover:border-transparent hover:bg-transparent hover:shadow-none data-[pressed=true]:border-transparent data-[pressed=true]:bg-transparent data-[pressed=true]:shadow-none'
            : [
                'grid-rows-[auto_auto_auto] gap-[2px] rounded-lg border border-transparent bg-transparent p-[3px] text-[#050526]',
                'hover:border-[rgba(0,142,255,0.44)] hover:bg-[rgba(255,255,255,0.38)] hover:shadow-[0_8px_16px_rgba(7,7,56,0.11)]',
                isActive &&
                  'border-[rgba(255,17,17,0.62)] bg-[rgba(255,255,255,0.58)] shadow-[0_10px_18px_rgba(7,7,56,0.14),0_0_0_1px_rgba(255,255,255,0.72),0_0_12px_rgba(255,17,17,0.14)] backdrop-blur-[1px]',
              ],
        )}
        type="button"
        aria-label={`Play ${item.artist} - ${item.title} at ${item.time}`}
        aria-pressed={isActive}
        onClick={() => onSelect(item.id)}
        whileHover={prefersReducedMotion || isHeroVariant ? undefined : { y: -3 }}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.985 }}
      >
        {!isHeroVariant ? (
          <ScheduleTrackLabel artist={item.artist} title={item.title} className="w-full" />
        ) : (
          <div className={heroCardHeaderClass}>
            <ScheduleTrackLabel artist={item.artist} title={item.title} variant="hero" className="w-full" />
          </div>
        )}

        <div
          className={cx(
            'relative isolate aspect-square overflow-hidden bg-white',
            isHeroVariant
              ? cx(
                  'rounded-none shadow-[0_8px_18px_rgba(0,0,0,0.14)]',
                  isActive && 'shadow-[0_0_0_2px_#ff1111,0_10px_22px_rgba(7,7,56,0.2)]',
                )
              : 'rounded-sm bg-[rgba(217,217,222,0.88)] shadow-[0_6px_12px_rgba(7,7,56,0.14),inset_0_0_0_1px_rgba(255,255,255,0.45)] backdrop-blur-[2px]',
            !isHeroVariant && isActive && 'shadow-[0_8px_16px_rgba(7,7,56,0.22),0_0_0_2px_rgba(255,17,17,0.82)]',
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

        <time className="sr-only" dateTime={item.time}>
          {item.time}
        </time>
      </motion.button>

    </motion.article>
  )
}

function ScheduleTimeline({ items, activeIndex, onSelect, variant = 'default' }) {
  const isHeroVariant = variant === 'hero'
  const rulerMarks = useMemo(
    () => buildRulerMarks(items.length, activeIndex),
    [items.length, activeIndex],
  )

  return (
    <div
      className={cx(
        'schedule-timeline relative w-full',
        isHeroVariant
          ? 'h-[clamp(42px,3.8vw,52px)] xl:h-[clamp(46px,3.2vw,56px)] 2xl:h-[58px]'
          : 'mt-[clamp(6px,0.75vw,10px)] min-h-[46px] pb-0 xl:min-h-[50px]',
      )}
      aria-label="Schedule timeline"
    >
      <ol
        className={cx(
          'absolute inset-x-0 z-[5] m-0 list-none p-0',
          isHeroVariant ? 'top-[clamp(2px,0.25vw,4px)]' : 'top-0',
        )}
      >
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
                className="group cursor-pointer border-0 bg-transparent p-0 focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#008eff]"
                type="button"
                aria-label={`Jump to ${item.time}, ${item.artist} - ${item.title}`}
                aria-current={isActive ? 'true' : undefined}
                onClick={() => onSelect(item.id)}
              >
                <time
                  className={cx(
                    isHeroVariant
                      ? "block m-0 font-['Roboto_Condensed','Helvetica_Neue',Arial,sans-serif] text-[clamp(12px,1.05vw,14px)] font-bold tabular-nums lining-nums leading-none tracking-[0.01em] text-[#070738] whitespace-nowrap transition-colors duration-[160ms] motion-reduce:transition-none [font-synthesis:none] group-hover:text-[#008eff] xl:text-[15px] 2xl:text-[16px]"
                      : "block m-0 font-['Roboto_Condensed','Helvetica_Neue',Arial,sans-serif] text-[clamp(11px,0.95vw,13px)] font-bold tabular-nums lining-nums leading-none tracking-[0.01em] text-[#070738] whitespace-nowrap transition-colors duration-[160ms] motion-reduce:transition-none [font-synthesis:none] group-hover:text-[#008eff]",
                    isActive && 'text-[#ff1111]',
                  )}
                  dateTime={item.time}
                >
                  {item.time}
                </time>
              </button>
            </li>
          )
        })}
      </ol>

      <div
        className={cx(
          'schedule-ruler pointer-events-none absolute inset-x-0 bottom-0 z-[3]',
          isHeroVariant && 'schedule-ruler--hero',
        )}
        aria-hidden="true"
      >
        {rulerMarks.map((mark) => (
          <span
            className={cx('schedule-ruler__tick', `schedule-ruler__tick--${mark.kind}`)}
            key={mark.id}
            style={{ left: mark.left }}
          />
        ))}
      </div>
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
      className={cx(
        'relative isolate overflow-visible pt-2 max-sm:pt-[7px]',
        isHeroVariant ? 'bg-transparent pt-0 max-sm:pt-0' : 'bg-transparent',
      )}
      aria-label={isHeroVariant ? 'Közelgő műsor' : 'Nemrég hallottad — közelgő műsor'}
    >
      {!isHeroVariant ? (
        <div className="relative z-[2] mb-2 w-full max-sm:mb-1.5">
          <div className="flex min-h-7 items-center justify-between gap-3 text-[#070738]">
            <h2 className="m-0 inline-flex min-w-0 items-center gap-2 font-normal lowercase leading-none tracking-normal text-[#070738]">
              <span
                className="relative inline-grid h-[clamp(18px,1.55vw,23px)] w-[clamp(18px,1.55vw,23px)] shrink-0 place-items-center rounded-full border-2 border-current"
                aria-hidden="true"
              >
                <span className="absolute left-1/2 top-[22%] h-[36%] w-[2px] -translate-x-1/2 rounded-full bg-current" />
                <span className="absolute left-1/2 top-1/2 h-[2px] w-[34%] -translate-y-1/2 rounded-full bg-current" />
              </span>
              <span className="truncate text-[clamp(28px,2.75vw,42px)]">nemrég hallottad</span>
            </h2>
            <a
              className="inline-flex shrink-0 items-center gap-[clamp(4px,0.45vw,6px)] no-underline"
              href="/"
              aria-label="Kezdőlap — lejátszás folytatódik"
            >
              <span className="inline-flex items-center gap-[0.1em] rounded-full bg-[#ff1111] px-[clamp(12px,1.2vw,16px)] py-[clamp(4px,0.45vw,6px)] font-normal lowercase leading-none tracking-[0.02em] text-white shadow-[0_2px_8px_rgba(255,17,17,0.22)] [font-family:var(--font-family)] [font-size:clamp(1.2rem,1.75vw,1.8125rem)]">
                <SearchGlyph className="h-[1em] w-[1em] shrink-0 text-white" />
                <span>dalkeresés</span>
              </span>
              <span
                className="h-0 w-0 shrink-0 border-y-[clamp(4px,0.45vw,6px)] border-l-[clamp(6px,0.65vw,8px)] border-solid border-y-transparent border-l-[#ff1111]"
                aria-hidden="true"
              />
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
          'schedule-panel relative w-full',
          !isHeroVariant && 'overflow-visible',
          isHeroVariant && 'overflow-visible border-0 bg-transparent shadow-none',
        )}
      >
        {!isHeroVariant ? (
          <div
            className="schedule-panel__surface pointer-events-none absolute inset-0 z-0 rounded-[14px] shadow-[0_8px_22px_rgba(7,7,56,0.06)] max-sm:rounded-xl"
            aria-hidden="true"
          />
        ) : null}
        {!isHeroVariant ? (
          <div className="pointer-events-none absolute left-1/2 top-0 z-[1] h-full w-screen max-w-[100vw] -translate-x-1/2">
            <EditorialBlueRing topVar="--editorial-ellipse-top-panel" />
          </div>
        ) : null}
        <div
          className={cx(
            'relative z-[2] pb-[7px]',
            isHeroVariant
              ? 'px-0 pt-0 max-lg:overflow-visible lg:overflow-x-visible'
              : 'overflow-x-auto overscroll-x-contain scroll-smooth [scroll-padding-inline:10px] [scrollbar-width:none] [scroll-snap-type:x_proximity] [&::-webkit-scrollbar]:hidden px-2.5 pt-[clamp(10px,1.15vw,16px)] pb-[clamp(8px,0.9vw,12px)] max-sm:px-2 max-sm:pt-3 max-sm:pb-[10px] xl:overflow-x-visible',
          )}
        >
          <div
            className={cx(
              isHeroVariant ? heroScheduleScrollMinClass : defaultScheduleScrollMinClass,
            )}
          >
            <div className={isHeroVariant ? heroScheduleStageClass : 'contents'}>
              {isHeroVariant ? (
                <div
                  className="pointer-events-none absolute inset-x-0 top-[var(--hero-schedule-split)] bottom-[calc(-1*var(--hero-schedule-white-extend))] z-0 bg-white"
                  aria-hidden="true"
                />
              ) : null}
              {isHeroVariant ? <ScheduleHeroRocketBackdrop /> : null}
              {isHeroVariant ? (
                <div className={heroScheduleCardsShellClass}>
                  <div
                    className={cx(heroScheduleCardsAreaClass, heroScheduleGridClass, 'items-start')}
                  >
                    {scheduleItems.map((item, index) => (
                      <ScheduleTrackCard
                        anchor={getAnchor(index, scheduleItems.length)}
                        item={item}
                        index={index}
                        isActive={item.id === activeItem.id}
                        key={item.id}
                        onSelect={setActiveItemId}
                        variant="hero"
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className={defaultScheduleGridClass}>
                  {scheduleItems.map((item, index) => (
                    <ScheduleTrackCard
                      anchor={getAnchor(index, scheduleItems.length)}
                      item={item}
                      index={index}
                      isActive={item.id === activeItem.id}
                      key={item.id}
                      onSelect={setActiveItemId}
                      variant="default"
                    />
                  ))}
                </div>
              )}

              <div
                className={
                  isHeroVariant
                    ? 'relative z-[3] bg-transparent pb-0 pt-0'
                    : 'relative z-[3]'
                }
              >
                <ScheduleTimeline
                  items={scheduleItems}
                  activeIndex={activeIndex}
                  onSelect={setActiveItemId}
                  variant={isHeroVariant ? 'hero' : 'default'}
                />
              </div>
              {isHeroVariant ? <ScheduleHeroRocket /> : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ScheduleSection
