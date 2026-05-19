import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { brandAssets, channels } from '../data/channels'
import redBackground from '../assets/images/Rectangle 19.png'
import ScheduleSection from '../sections/ScheduleSection'
import RadioChartsSection from '../sections/RadioChartsSection'
import FooterSection from '../sections/FooterSection'
import { cx } from '../utils/cx'

/** Client zigzag order: label above/below a shared dot row (left → right). */
const ARCHIVE_CATEGORY_LAYOUT = [
  { channelId: 'electric', placement: 'top' },
  { channelId: 'oldschool', placement: 'bottom' },
  { channelId: 'prime', placement: 'top', center: true },
  { channelId: 'power', placement: 'bottom' },
  { channelId: 'relax', placement: 'top' },
]

const channelDotClasses = {
  electric: 'bg-[#c049f0]',
  oldschool: 'bg-[#e76614]',
  power: 'bg-[#4aa3ff]',
  relax: 'bg-[#5fe04a]',
}

const archiveCategories = ARCHIVE_CATEGORY_LAYOUT.map((slot) => {
  const channel = channels.find((item) => item.id === slot.channelId)
  const label =
    slot.channelId === 'prime'
      ? 'SZUNET'
      : (channel?.playerName ?? slot.channelId).replace('Ü', 'U').toUpperCase()

  return {
    ...slot,
    label,
    dotClass: channelDotClasses[slot.channelId],
    centerDot: slot.center,
  }
})

const calendarMonths = [
  { label: 'APR', year: 2026, days: 30, offset: 2, defaultDay: 9 },
  { label: 'MAY', year: 2026, days: 31, offset: 4, defaultDay: 12 },
]

function ArchiveCategoryLabel({ children }) {
  return (
    <span className="font-['Bebas_Neue',Impact,sans-serif] text-[clamp(15px,1.32vw,23px)] font-normal uppercase leading-[0.95] tracking-[0.14em] text-white whitespace-nowrap [text-shadow:0_4px_14px_rgba(120,0,0,0.28)] [font-synthesis:none]">
      {children}
    </span>
  )
}

function ArchiveCategoryColumn({ label, placement, dotClass, centerDot }) {
  return (
    <div className="grid min-h-[4.6em] grid-rows-[1fr_auto_1fr] items-center justify-items-center gap-y-[9px]">
      <div className="flex h-[1.15em] items-end justify-center">
        {placement === 'top' ? <ArchiveCategoryLabel>{label}</ArchiveCategoryLabel> : null}
      </div>
      <i
        className={cx(
          'block shrink-0 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.2)]',
          centerDot
            ? 'h-[11px] w-[11px] bg-white shadow-[inset_0_0_0_2px_#ff1111,0_4px_12px_rgba(0,0,0,0.22)]'
            : cx('h-[9px] w-[9px]', dotClass),
        )}
        aria-hidden="true"
      />
      <div className="flex h-[1.15em] items-start justify-center">
        {placement === 'bottom' ? <ArchiveCategoryLabel>{label}</ArchiveCategoryLabel> : null}
      </div>
    </div>
  )
}

function RadioHeader({ onNavigateHome }) {
  return (
    <header className="relative z-[5] mx-auto grid w-[min(100%,var(--page-width))] grid-cols-[minmax(92px,0.5fr)_minmax(280px,1fr)_minmax(92px,0.5fr)] items-start gap-[18px] px-[var(--page-gutter)] pt-[clamp(24px,3vw,42px)] max-lg:grid-cols-[minmax(88px,112px)_1fr] max-lg:gap-4 max-md:grid-cols-1 max-md:justify-items-center max-md:gap-5 max-md:pt-[22px] xl:gap-6 xl:pt-12 2xl:pt-14">
      <button
        className="block w-[clamp(82px,8vw,126px)] cursor-pointer border-0 bg-transparent p-0 max-md:justify-self-start"
        type="button"
        aria-label="Vissza a kezdőlapra — lejátszás folytatódik"
        onClick={onNavigateHome}
      >
        <img className="block h-auto w-full" src={brandAssets.stationLogo} alt="SZUNET RADIO" />
      </button>

      <div
        className="grid w-[min(100%,clamp(320px,34vw,620px))] grid-cols-5 justify-self-center gap-x-[clamp(10px,1.65vw,28px)] pt-[clamp(14px,1.6vw,24px)] max-lg:justify-self-end max-md:w-[min(100%,360px)] max-md:justify-self-center max-md:pt-1.5 max-xs:gap-x-2 max-xs:w-full"
        aria-label="Radio categories"
      >
        {archiveCategories.map((item) => (
          <ArchiveCategoryColumn
            centerDot={item.centerDot}
            dotClass={item.dotClass}
            key={item.channelId}
            label={item.label}
            placement={item.placement}
          />
        ))}
      </div>
    </header>
  )
}

function CalendarWidget() {
  const [monthIndex, setMonthIndex] = useState(0)
  const month = calendarMonths[monthIndex]
  const [selectedDay, setSelectedDay] = useState(month.defaultDay)

  const calendarCells = useMemo(() => {
    const blanks = Array.from({ length: month.offset }, (_, index) => ({
      id: `blank-${month.label}-${index}`,
      day: null,
    }))
    const days = Array.from({ length: month.days }, (_, index) => ({
      id: `${month.label}-${index + 1}`,
      day: index + 1,
    }))

    return [...blanks, ...days]
  }, [month])

  function changeMonth(direction) {
    setMonthIndex((currentIndex) => {
      const nextIndex =
        (currentIndex + direction + calendarMonths.length) % calendarMonths.length
      setSelectedDay(calendarMonths[nextIndex].defaultDay)
      return nextIndex
    })
  }

  return (
    <motion.article
      className="mt-[clamp(8px,1.6vw,26px)] w-[clamp(156px,15vw,212px)] justify-self-center self-start rounded-lg border-2 border-[#8b6cff] bg-[rgba(255,255,255,0.98)] px-3 pb-[13px] pt-[11px] text-[#11112a] shadow-[0_22px_44px_rgba(80,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.72)] max-lg:col-[2] max-lg:row-[2] max-lg:m-0 max-lg:self-start max-md:col-auto max-md:row-auto max-md:self-center max-md:justify-self-center max-sm:w-[162px]"
      aria-label={`${month.label} ${month.year} calendar`}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut', delay: 0.15 }}
    >
      <div className="mb-2.5 grid grid-cols-[24px_1fr_24px] items-center">
        <button
          className="grid h-[22px] w-[22px] cursor-pointer font-['Roboto_Condensed','Helvetica_Neue',Arial,sans-serif] [font-synthesis:none] place-items-center rounded-full border-0 bg-[#f1f1f4] p-0 text-[13px] font-bold text-[#080833] transition-[background,color,transform] duration-[160ms] hover:-translate-y-px hover:bg-[#ff1111] hover:text-white"
          type="button"
          aria-label="Previous month"
          onClick={() => changeMonth(-1)}
        >
          {'<'}
        </button>
        <strong className="text-center font-['Roboto_Condensed','Helvetica_Neue',Arial,sans-serif] text-[10px] font-bold tracking-[0.08em] [font-synthesis:none]">
          {month.label}{' '}
          <span className="font-normal text-[rgba(8,8,51,0.56)]">{month.year}</span>
        </strong>
        <button
          className="grid h-[22px] w-[22px] cursor-pointer font-['Roboto_Condensed','Helvetica_Neue',Arial,sans-serif] [font-synthesis:none] place-items-center rounded-full border-0 bg-[#f1f1f4] p-0 text-[13px] font-bold text-[#080833] transition-[background,color,transform] duration-[160ms] hover:-translate-y-px hover:bg-[#ff1111] hover:text-white"
          type="button"
          aria-label="Next month"
          onClick={() => changeMonth(1)}
        >
          {'>'}
        </button>
      </div>

      <div
        className="mb-1.5 grid grid-cols-7 text-center font-['Roboto_Condensed','Helvetica_Neue',Arial,sans-serif] text-[8px] font-bold text-[rgba(8,8,51,0.5)] [font-synthesis:none]"
        aria-hidden="true"
      >
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
          <span key={`${day}-${index}`}>{day}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-[3px]">
        {calendarCells.map((cell) =>
          cell.day ? (
            <button
              className={cx(
                "grid aspect-square w-full cursor-pointer place-items-center rounded-full border-0 p-0 font-['Roboto_Condensed','Helvetica_Neue',Arial,sans-serif] text-[8px] font-bold transition-[background,color,transform,box-shadow] duration-[140ms] [font-synthesis:none]",
                selectedDay === cell.day
                  ? 'z-[1] bg-[#ff1111] text-white shadow-none hover:scale-100 hover:bg-[#e01010] hover:text-white focus-visible:scale-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#080833]'
                  : 'bg-transparent text-[#20203b] hover:scale-[1.08] hover:bg-[rgba(255,17,17,0.12)] hover:text-[#ff1111] focus-visible:scale-[1.08] focus-visible:bg-[rgba(255,17,17,0.12)] focus-visible:text-[#ff1111] focus-visible:outline-none',
              )}
              type="button"
              aria-label={`${month.label} ${cell.day}, ${month.year}`}
              aria-current={selectedDay === cell.day ? 'date' : undefined}
              aria-pressed={selectedDay === cell.day}
              key={cell.id}
              onClick={() => setSelectedDay(cell.day)}
            >
              {cell.day}
            </button>
          ) : (
            <span className="aspect-square w-full" aria-hidden="true" key={cell.id} />
          ),
        )}
      </div>
    </motion.article>
  )
}

function TimeChevron({ direction }) {
  const up = direction === 'up'

  return (
    <span
      className={cx(
        'block h-0 w-0 border-x-[5px] border-x-transparent opacity-[0.88]',
        up ? 'border-b-[7px] border-b-white' : 'border-t-[7px] border-t-white',
      )}
      aria-hidden="true"
    />
  )
}

function TimeDigitStack({ value }) {
  return (
    <div className="flex flex-col items-center gap-[5px]">
      <TimeChevron direction="up" />
      <span className="font-['Roboto_Condensed','Helvetica_Neue',Arial,sans-serif] text-[clamp(40px,5vw,78px)] font-light leading-none tracking-[0.06em] text-white tabular-nums lining-nums [text-shadow:0_14px_28px_rgba(110,0,0,0.2)] [font-synthesis:none]">
        {value}
      </span>
      <TimeChevron direction="down" />
    </div>
  )
}

function TimeWidget() {
  return (
    <motion.div
      className="relative grid min-w-[clamp(168px,15vw,240px)] place-items-center self-center justify-self-start text-white max-lg:col-[2] max-lg:row-[1] max-lg:mb-5 max-lg:self-end max-lg:justify-self-center max-md:col-auto max-md:row-auto max-md:m-0 max-md:self-center max-md:justify-self-center"
      aria-label="Current time 17:25"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.38, ease: 'easeOut', delay: 0.25 }}
    >
      <time
        className="flex items-center gap-[clamp(8px,1vw,14px)]"
        dateTime="17:25"
      >
        <TimeDigitStack value="17" />
        <span className="pb-[2px] font-['Roboto_Condensed','Helvetica_Neue',Arial,sans-serif] text-[clamp(34px,4.2vw,64px)] font-light leading-none tracking-[0.06em] text-white/95 tabular-nums lining-nums [font-synthesis:none]">
          :
        </span>
        <TimeDigitStack value="25" />
      </time>
    </motion.div>
  )
}

function EditorialCopy() {
  return (
    <motion.div
      className="relative ml-[clamp(34px,5vw,84px)] w-fit font-['Bebas_Neue',Impact,sans-serif] text-[clamp(34px,4.9vw,76px)] font-normal uppercase leading-[0.95] tracking-[0.1em] text-white [text-shadow:0_8px_22px_rgba(120,0,0,0.24)] [font-synthesis:none] max-lg:col-[1] max-lg:row-[1/3] max-lg:ml-0 max-lg:text-[clamp(42px,7vw,60px)] max-md:col-auto max-md:row-auto max-md:m-0 max-md:text-center max-md:text-[clamp(30px,9vw,58px)] max-md:[transform-origin:center] max-xs:tracking-[0.08em]"
      initial={{ opacity: 0, x: -22, rotate: -5 }}
      animate={{ opacity: 1, x: 0, rotate: -5 }}
      transition={{ duration: 0.48, ease: 'easeOut' }}
    >
      <span
        className="absolute bottom-[-38px] left-4 h-[70px] w-[180px] bg-[radial-gradient(circle,#ffffff_0_1px,transparent_1.5px)] bg-[length:10px_10px] opacity-[0.18]"
        aria-hidden="true"
      />
      <p className="relative z-[1] m-0">MEGTETSZETT?</p>
      <p className="relative z-[1] m-0 ml-[clamp(70px,7vw,126px)] max-md:ml-0">KERESD</p>
      <p className="relative z-[1] m-0 ml-[clamp(112px,10vw,170px)] max-md:ml-0">VISSZA!</p>
    </motion.div>
  )
}

function DecorativeElements() {
  const crossLineClass = 'absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 bg-white'

  return (
    <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden="true">
      <span className="absolute left-[29%] top-[7%] block h-[18px] w-[18px]">
        <span className={crossLineClass} />
        <span className={cx(crossLineClass, 'rotate-90')} />
      </span>
      <span className="absolute bottom-[31%] left-[17%] block h-[18px] w-[18px] rotate-[21deg]">
        <span className={crossLineClass} />
        <span className={cx(crossLineClass, 'rotate-90')} />
      </span>
      <span className="absolute right-[21%] top-[24%] block h-[18px] w-[18px] rotate-45">
        <span className={crossLineClass} />
        <span className={cx(crossLineClass, 'rotate-90')} />
      </span>
      <span className="absolute left-[2%] top-[6%] block h-[15px] w-[15px] rounded-full border-4 border-white" />
      <span className="absolute right-[2%] top-[6%] block h-[15px] w-[15px] rounded-full border-4 border-white" />
      <span className="absolute right-[7%] top-[36%] block h-[118px] w-0.5 bg-[repeating-linear-gradient(to_bottom,#ffffff_0_2px,transparent_2px_12px)] opacity-[0.44] max-md:hidden" />
      <span className="absolute right-[4%] top-[43%] block h-28 w-[22px] bg-[linear-gradient(135deg,transparent_50%,#ffffff_51%_58%,transparent_59%),linear-gradient(45deg,transparent_50%,#ffffff_51%_58%,transparent_59%)] bg-[length:20px_20px] opacity-[0.56] max-md:hidden" />
      <span className="absolute bottom-[20%] left-[42%] block h-px w-[170px] bg-[repeating-linear-gradient(90deg,transparent_0_10px,#ffffff_10px_12px,transparent_12px_18px)] opacity-[0.45] max-md:hidden" />
    </div>
  )
}

function ScheduleTimelineSection() {
  return (
    <div className="archive-schedule-strip relative z-[2] w-full overflow-visible border-b-[4px] border-[#5cf5df] bg-transparent pb-0 [--launch-x:75%] -mt-[var(--archive-overlap)]">
      <ScheduleSection variant="hero" />
    </div>
  )
}

function HeroRadioSection({ onNavigateHome }) {
  return (
    <section
      className="relative z-[1] flex min-h-[clamp(480px,52svh,640px)] flex-col overflow-hidden bg-transparent max-lg:min-h-[clamp(520px,58svh,700px)] max-md:min-h-0 max-md:pb-6 xl:min-h-[clamp(540px,50svh,720px)] 2xl:min-h-[680px]"
      aria-label="SZUNET RADIO archive hero"
    >
      <DecorativeElements />

      <RadioHeader onNavigateHome={onNavigateHome} />

      <div className="relative z-[3] mx-auto grid min-h-[clamp(310px,31vw,430px)] w-[min(100%,var(--page-width))] flex-1 grid-cols-[minmax(260px,0.9fr)_minmax(168px,0.48fr)_minmax(190px,0.74fr)] items-center gap-[clamp(18px,4vw,86px)] px-[var(--page-gutter)] pb-[clamp(26px,3.2vw,48px)] pt-[clamp(12px,2vw,28px)] max-lg:min-h-[390px] max-lg:grid-cols-[minmax(0,1fr)_minmax(168px,240px)] max-lg:grid-rows-[auto_auto] max-lg:gap-x-8 max-lg:gap-y-6 max-md:min-h-0 max-md:grid-cols-1 max-md:grid-rows-none max-md:justify-items-center max-md:gap-5 max-md:pb-8 max-md:pt-6 max-sm:gap-[18px]">
        <EditorialCopy />
        <CalendarWidget />
        <TimeWidget />
      </div>
    </section>
  )
}

function ChartsSection() {
  return (
    <section
      className="relative z-0 grid min-h-[clamp(180px,28vw,320px)] place-items-center overflow-hidden bg-[#5cf5df] px-[var(--page-gutter)] text-[#050526] max-md:min-h-[clamp(160px,32vw,240px)]"
      aria-label="Charts"
    >
      <motion.h1
        className="relative z-0 m-0 max-w-[94vw] font-['Bebas_Neue',Impact,sans-serif] text-[clamp(58px,12vw,174px)] font-normal uppercase leading-[0.95] tracking-[0.16em] [text-shadow:0_1px_0_rgba(255,255,255,0.44)] [font-synthesis:none] max-md:text-[clamp(52px,14vw,82px)] max-md:tracking-[0.1em] max-sm:text-[clamp(44px,13vw,58px)] max-sm:tracking-[0.06em] max-xs:text-[40px] xl:text-[clamp(120px,10vw,200px)] 2xl:text-[200px]"
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.65 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        CHARTS
        <span className="pointer-events-none absolute bottom-[12%] left-[-1%] right-[4%] z-[2] h-[clamp(12px,1.4vw,22px)] -translate-y-[clamp(10px,1.1vw,20px)] bg-[#ff1111]" aria-hidden="true" />
      </motion.h1>
    </section>
  )
}

function ArchiveRedStack({ onNavigateHome }) {
  return (
    <div className="archive-red-stack">
      <img
        className="archive-red-stack__texture"
        src={redBackground}
        alt=""
        aria-hidden="true"
      />
      <HeroRadioSection onNavigateHome={onNavigateHome} />
      <ScheduleTimelineSection />
    </div>
  )
}

function SecondRadioPage({ onNavigateHome }) {
  return (
    <div className="min-h-[100svh] overflow-x-hidden bg-[#5cf5df] text-white">
      <ArchiveRedStack onNavigateHome={onNavigateHome} />
      <ChartsSection />
      <RadioChartsSection />
      <FooterSection />
    </div>
  )
}

export default SecondRadioPage
