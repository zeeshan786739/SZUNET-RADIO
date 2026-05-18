import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { scheduleItems } from '../data/schedule'
import ScheduleTrackLabel from '../components/ScheduleTrackLabel'
import { cx } from '../utils/cx'
import ScheduleHeroRocket from '../components/ScheduleHeroRocket'
import SearchGlyph from '../components/SearchGlyph'
const DEFAULT_ACTIVE_ITEM_ID = '1745'
const TICK_COUNT = 96

const heroScheduleGridClass =
  'grid w-full grid-cols-[repeat(8,minmax(76px,1fr))] gap-x-[clamp(8px,1.05vw,14px)] max-sm:grid-cols-[repeat(8,76px)] max-sm:gap-x-[6px] max-xs:grid-cols-[repeat(8,72px)] max-xs:gap-x-[5px] xl:grid-cols-[repeat(8,minmax(0,1fr))] xl:gap-x-[clamp(12px,0.95vw,20px)] 2xl:gap-x-[clamp(14px,1vw,24px)]'

const defaultScheduleGridClass =
  'grid w-full grid-cols-[repeat(8,minmax(72px,1fr))] gap-x-0 max-sm:grid-cols-[repeat(8,72px)] max-xs:grid-cols-[repeat(8,68px)] items-end xl:grid-cols-[repeat(8,minmax(0,1fr))] xl:gap-x-[clamp(8px,0.75vw,14px)]'

const heroScheduleScrollMinClass =
  'min-w-[min(100%,820px)] max-lg:min-w-[780px] max-sm:min-w-[700px] max-xs:min-w-[640px] xl:min-w-0 xl:w-full'

const defaultScheduleScrollMinClass =
  'min-w-[740px] max-lg:min-w-[720px] max-sm:min-w-[660px] max-xs:min-w-[620px] xl:min-w-0 xl:w-full'

const heroScheduleStageClass = 'relative isolate'

const heroScheduleCardsShellClass =
  'relative isolate pb-[clamp(10px,1.2vw,18px)] xl:pb-[clamp(12px,1vw,22px)]'

const heroScheduleCardsAreaClass = 'relative z-[1]'

const heroCardHeaderClass =
  'px-[clamp(3px,0.4vw,6px)] py-[clamp(3px,0.38vw,5px)]'

function getAnchor(index, total) {
  return `${((index + 0.5) / total) * 100}%`
}

function ScheduleTrackCard({ item, index, isActive, onSelect, anchor, variant = 'default' }) {
  const prefersReducedMotion = useReducedMotion()
  const isHeroVariant = variant === 'hero'

  return (
    <motion.article
      className={cx(
        'relative min-w-0 snap-center [transform-origin:center_bottom]',
        isHeroVariant ? 'px-0' : 'px-[clamp(5px,0.85vw,14px)]',
      )}
      style={{ '--card-anchor': anchor }}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
      animate={{
        opacity: 1,
        scale: isActive && !isHeroVariant ? 1.025 : 1,
        y: isActive && !isHeroVariant ? -4 : 0,
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

function getTimelineTickClass(tick, activeMajorTick, isHero = false) {
  const slotPosition = tick % 12
  const isMajor = slotPosition === 6
  const isMedium = slotPosition === 0
  const isActiveMajor = tick === activeMajorTick

  if (isActiveMajor) {
    return cx(
      'w-[2px] bg-[#ff1111] shadow-[0_0_12px_rgba(255,17,17,0.55)]',
      isHero ? 'h-[26px] xl:h-[30px] 2xl:h-[32px]' : 'h-[22px] w-0.5',
    )
  }

  if (isMajor) {
    return isHero ? 'h-[22px] w-px bg-[#070738] xl:h-[26px] 2xl:h-[28px]' : 'h-[18px] bg-[#070738]'
  }

  if (isMedium) {
    return isHero
      ? 'h-[12px] w-px bg-[rgba(7,7,56,0.68)] xl:h-[14px] 2xl:h-[15px]'
      : 'h-[10px] bg-[rgba(7,7,56,0.62)]'
  }

  return isHero
    ? 'h-[7px] w-px bg-[rgba(7,7,56,0.52)] xl:h-[9px] 2xl:h-[10px]'
    : 'h-[6px] bg-[rgba(7,7,56,0.5)]'
}

function ScheduleTimeline({ items, activeIndex, onSelect, variant = 'default' }) {
  const isHeroVariant = variant === 'hero'
  const minorTicks = Array.from({ length: TICK_COUNT }, (_, index) => index)
  const ticksPerItem = TICK_COUNT / items.length
  const activeMajorTick = activeIndex * ticksPerItem + Math.floor(ticksPerItem / 2)

  return (
    <div
      className={cx(
        'relative w-full',
        isHeroVariant
          ? 'h-[clamp(58px,5.6vw,72px)] xl:h-[clamp(64px,4.2vw,80px)] 2xl:h-[82px]'
          : 'mt-1 h-[46px] xl:h-[52px]',
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
          'pointer-events-none absolute inset-x-0 bottom-0 z-[3]',
          isHeroVariant
            ? 'h-[clamp(30px,2.9vw,36px)] xl:h-[clamp(34px,2.4vw,42px)] 2xl:h-[44px]'
            : 'h-[26px] xl:h-[30px]',
        )}
        aria-hidden="true"
      >
        <div className="absolute inset-0 grid grid-cols-[repeat(96,1fr)] items-end">
          {minorTicks.map((tick) => (
            <span
              className={cx(
                'block justify-self-center',
                getTimelineTickClass(tick, activeMajorTick, isHeroVariant),
              )}
              key={tick}
            />
          ))}
        </div>
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
        <div className="relative z-[2] mx-auto mb-2 w-full max-w-[var(--page-width)] max-sm:mb-1.5">
          <div className="flex min-h-7 items-center justify-between gap-3 px-1 text-[#070738] max-sm:px-2">
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
              href="/dal-kereses"
              aria-label="Dal keresés — lejátszás folytatódik"
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
          'relative z-[2] mx-auto w-full max-w-[var(--page-width)] overflow-hidden',
          !isHeroVariant && [
            'rounded-[14px] border border-[rgba(255,255,255,0.42)] bg-[#e8e6e6]',
            'shadow-[0_8px_22px_rgba(7,7,56,0.06),inset_0_1px_0_rgba(255,255,255,0.22)]',
            'max-sm:rounded-xl',
          ],
          isHeroVariant && 'overflow-visible border-0 bg-transparent shadow-none',
        )}
      >
        {!isHeroVariant ? (
          <span
            className="pointer-events-none absolute inset-0 -z-[1] bg-[linear-gradient(135deg,rgba(255,255,255,0.08)_0%,transparent_50%,rgba(0,0,0,0.03)_100%)]"
            aria-hidden="true"
          />
        ) : null}
        {isHeroVariant ? <ScheduleHeroRocket /> : null}
        <div
          className={cx(
            'relative z-[2] overflow-x-auto overscroll-x-contain scroll-smooth pb-[7px] [scroll-padding-inline:10px] [scrollbar-width:none] [scroll-snap-type:x_proximity] [&::-webkit-scrollbar]:hidden',
            isHeroVariant
              ? 'px-0 pt-0 xl:overflow-x-visible'
              : 'px-2.5 pt-2 max-sm:px-2 max-sm:py-[7px] xl:overflow-x-visible',
          )}
        >
          <div
            className={cx(
              isHeroVariant ? heroScheduleScrollMinClass : defaultScheduleScrollMinClass,
            )}
          >
            <div className={isHeroVariant ? heroScheduleStageClass : undefined}>
              {isHeroVariant ? (
                <div className={heroScheduleCardsShellClass}>
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 z-0 h-1/2 bg-[var(--archive-red-core)]"
                    aria-hidden="true"
                  />
                  <div
                    className="pointer-events-none absolute inset-x-0 top-1/2 bottom-0 z-0 bg-white"
                    aria-hidden="true"
                  />
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
                    ? 'relative z-[2] bg-white pb-[clamp(4px,0.5vw,8px)] pt-[clamp(10px,1.15vw,16px)] xl:pt-[clamp(12px,1vw,20px)] xl:pb-[clamp(6px,0.45vw,10px)]'
                    : undefined
                }
              >
                <ScheduleTimeline
                  items={scheduleItems}
                  activeIndex={activeIndex}
                  onSelect={setActiveItemId}
                  variant={isHeroVariant ? 'hero' : 'default'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ScheduleSection
