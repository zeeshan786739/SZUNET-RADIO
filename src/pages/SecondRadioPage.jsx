import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { brandAssets } from '../data/channels'
import redBackground from '../assets/images/Rectangle 19.png'
import ScheduleSection from '../sections/ScheduleSection'
import RadioChartsSection from '../sections/RadioChartsSection'
import FooterSection from '../sections/FooterSection'
import { cx } from '../utils/cx'

const categoryDotClasses = {
  blue: 'bg-[#0b68ff]',
  orange: 'bg-[#ffb000]',
  green: 'bg-[#26de45]',
  red: 'bg-[#ff1111]',
}

const categoryTextRows = [
  [
    { label: 'ELECTRIC', color: 'blue' },
    { label: 'SZUNET', color: 'orange' },
    { label: 'RELAX', color: 'green' },
  ],
  [
    { label: 'OLDSCHOOL', color: 'red' },
    { label: 'POWER', color: 'blue' },
  ],
]

const calendarMonths = [
  { label: 'APR', year: 2026, days: 30, offset: 2, defaultDay: 8 },
  { label: 'MAY', year: 2026, days: 31, offset: 4, defaultDay: 12 },
]

function RadioHeader({ onNavigateHome }) {
  return (
    <header className="relative z-[5] mx-auto grid w-[var(--page-width)] grid-cols-[minmax(92px,0.5fr)_minmax(280px,1fr)_minmax(92px,0.5fr)] items-start gap-[18px] pt-[clamp(24px,3vw,42px)] max-[980px]:grid-cols-[112px_1fr] max-[700px]:grid-cols-1 max-[700px]:justify-items-center max-[700px]:pt-[22px]">
      <button
        className="block w-[clamp(82px,8vw,126px)] cursor-pointer border-0 bg-transparent p-0 max-[700px]:justify-self-start"
        type="button"
        aria-label="Vissza a kezdőlapra — lejátszás folytatódik"
        onClick={onNavigateHome}
      >
        <img className="block h-auto w-full" src={brandAssets.stationLogo} alt="SZUNET RADIO" />
      </button>

      <div
        className="grid w-[clamp(312px,28vw,560px)] justify-self-center pt-[clamp(16px,1.75vw,26px)] max-[980px]:justify-self-end max-[700px]:w-[min(100%,360px)] max-[700px]:justify-self-center max-[700px]:pt-1.5 max-[420px]:w-full"
        aria-label="Radio categories"
      >
        {categoryTextRows.map((row, rowIndex) => (
          <div
            className={cx(
              'grid items-start justify-items-center',
              rowIndex === 0 && 'grid-cols-3 gap-x-[clamp(22px,3vw,46px)]',
              rowIndex === 1 && 'mt-[12px] grid-cols-2 px-[clamp(48px,5vw,78px)] gap-x-[clamp(22px,3vw,46px)] max-[460px]:px-9 max-[380px]:px-6',
            )}
            key={`category-row-${rowIndex}`}
          >
            {row.map((item) => (
              <span
                className="relative text-center text-[clamp(13px,1.05vw,18px)] font-black leading-none tracking-[0.15em] text-[rgba(255,255,255,0.9)] uppercase [text-shadow:0_4px_12px_rgba(120,0,0,0.24)] max-[460px]:text-[11px] max-[460px]:tracking-[0.08em]"
                key={item.label}
              >
                {item.label}
                {rowIndex === 0 ? (
                  <i
                    className={cx(
                      'absolute bottom-[-13px] left-1/2 h-2 w-2 -translate-x-1/2 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.18)]',
                      categoryDotClasses[item.color],
                    )}
                  />
                ) : null}
              </span>
            ))}
          </div>
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
      className="mt-[clamp(8px,1.6vw,26px)] w-[clamp(156px,15vw,212px)] justify-self-center self-start rounded-lg border border-[rgba(255,255,255,0.72)] bg-[rgba(255,255,255,0.96)] px-3 pb-[13px] pt-[11px] text-[#11112a] shadow-[0_22px_44px_rgba(80,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.72)] max-[980px]:col-[2] max-[980px]:row-[2] max-[980px]:m-0 max-[980px]:self-start max-[700px]:col-auto max-[700px]:row-auto max-[700px]:self-center max-[700px]:justify-self-center max-[460px]:w-[162px]"
      aria-label={`${month.label} ${month.year} calendar`}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut', delay: 0.15 }}
    >
      <div className="mb-2.5 grid grid-cols-[24px_1fr_24px] items-center">
        <button
          className="grid h-[22px] w-[22px] cursor-pointer place-items-center rounded-full border-0 bg-[#f1f1f4] p-0 text-[#080833] transition-[background,color,transform] duration-[160ms] hover:-translate-y-px hover:bg-[#ff1111] hover:text-white"
          type="button"
          aria-label="Previous month"
          onClick={() => changeMonth(-1)}
        >
          {'<'}
        </button>
        <strong className="text-center text-[10px] font-[950] tracking-[0.08em]">
          {month.label} <span className="font-extrabold text-[rgba(8,8,51,0.56)]">{month.year}</span>
        </strong>
        <button
          className="grid h-[22px] w-[22px] cursor-pointer place-items-center rounded-full border-0 bg-[#f1f1f4] p-0 text-[#080833] transition-[background,color,transform] duration-[160ms] hover:-translate-y-px hover:bg-[#ff1111] hover:text-white"
          type="button"
          aria-label="Next month"
          onClick={() => changeMonth(1)}
        >
          {'>'}
        </button>
      </div>

      <div className="mb-1.5 grid grid-cols-7 text-center text-[8px] font-black text-[rgba(8,8,51,0.5)]" aria-hidden="true">
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
          <span key={`${day}-${index}`}>{day}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-[3px]">
        {calendarCells.map((cell) =>
          cell.day ? (
            <button
              className={cx(
                'grid aspect-square w-full cursor-pointer place-items-center rounded-full border-0 p-0 text-[8px] font-extrabold transition-[background,color,transform,box-shadow] duration-[140ms]',
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

function TimeWidget() {
  return (
    <motion.div
      className="relative grid min-w-[clamp(154px,14vw,220px)] place-items-center self-center justify-self-start text-white max-[980px]:col-[2] max-[980px]:row-[1] max-[980px]:mb-5 max-[980px]:self-end max-[980px]:justify-self-center max-[700px]:col-auto max-[700px]:row-auto max-[700px]:m-0 max-[700px]:self-center max-[700px]:justify-self-center"
      aria-label="Current time 17:25"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.38, ease: 'easeOut', delay: 0.25 }}
    >
      <span className="absolute top-[-21px] h-3 w-[88px] opacity-[0.82]" aria-hidden="true">
        <span className="absolute left-0 h-3 w-3 rotate-45 border-l-2 border-t-2 border-white" />
        <span className="absolute right-0 h-3 w-3 rotate-45 border-l-2 border-t-2 border-white" />
      </span>
      <time
        className="text-[clamp(44px,5.4vw,82px)] font-light leading-none tracking-[0.04em] [text-shadow:0_14px_28px_rgba(110,0,0,0.2)] max-[460px]:text-[42px]"
        dateTime="17:25"
      >
        17:25
      </time>
      <span className="absolute bottom-[-24px] h-3 w-[88px] opacity-[0.82]" aria-hidden="true">
        <span className="absolute left-0 h-3 w-3 rotate-[225deg] border-l-2 border-t-2 border-white" />
        <span className="absolute right-0 h-3 w-3 rotate-[225deg] border-l-2 border-t-2 border-white" />
      </span>
    </motion.div>
  )
}

function EditorialCopy() {
  return (
    <motion.div
      className="relative ml-[clamp(34px,5vw,84px)] w-fit text-[clamp(32px,4.7vw,72px)] font-black leading-[0.95] tracking-[0.13em] text-white uppercase [text-shadow:0_8px_20px_rgba(120,0,0,0.22)] max-[980px]:col-[1] max-[980px]:row-[1/3] max-[980px]:ml-0 max-[980px]:text-[clamp(42px,7vw,60px)] max-[700px]:col-auto max-[700px]:row-auto max-[700px]:m-0 max-[700px]:text-center max-[700px]:text-[clamp(30px,9vw,58px)] max-[700px]:[transform-origin:center] max-[420px]:tracking-[0.08em]"
      initial={{ opacity: 0, x: -22, rotate: -5 }}
      animate={{ opacity: 1, x: 0, rotate: -5 }}
      transition={{ duration: 0.48, ease: 'easeOut' }}
    >
      <span
        className="absolute bottom-[-38px] left-4 h-[70px] w-[180px] bg-[radial-gradient(circle,#ffffff_0_1px,transparent_1.5px)] bg-[length:10px_10px] opacity-[0.18]"
        aria-hidden="true"
      />
      <p className="relative z-[1] m-0">MEGTETSZETT?</p>
      <p className="relative z-[1] m-0 ml-[clamp(70px,7vw,126px)] max-[700px]:ml-0">KERESD</p>
      <p className="relative z-[1] m-0 ml-[clamp(112px,10vw,170px)] max-[700px]:ml-0">VISSZA!</p>
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
      <span className="absolute right-[7%] top-[36%] block h-[118px] w-0.5 bg-[repeating-linear-gradient(to_bottom,#ffffff_0_2px,transparent_2px_12px)] opacity-[0.44] max-[700px]:hidden" />
      <span className="absolute right-[4%] top-[43%] block h-28 w-[22px] bg-[linear-gradient(135deg,transparent_50%,#ffffff_51%_58%,transparent_59%),linear-gradient(45deg,transparent_50%,#ffffff_51%_58%,transparent_59%)] bg-[length:20px_20px] opacity-[0.56] max-[700px]:hidden" />
      <span className="absolute bottom-[20%] left-[42%] block h-px w-[170px] bg-[repeating-linear-gradient(90deg,transparent_0_10px,#ffffff_10px_12px,transparent_12px_18px)] opacity-[0.45] max-[700px]:hidden" />
    </div>
  )
}

function ScheduleTimelineSection() {
  return (
    <div className="relative isolate z-[20] w-full overflow-x-clip border-b-[4px] border-[#5cf5df] bg-white pb-0 pt-[clamp(10px,1.1vw,16px)] shadow-[0_-10px_40px_rgba(0,0,0,0.06)] [--launch-x:70.15%] max-[700px]:overflow-hidden">
      <ScheduleSection variant="hero" />
    </div>
  )
}

function HeroRadioSection({ onNavigateHome }) {
  return (
    <section
      className="relative isolate z-[1] flex min-h-[clamp(500px,46vw,640px)] flex-col overflow-hidden bg-[#ff0808] max-[980px]:min-h-[600px] max-[700px]:min-h-[720px] max-[460px]:min-h-[680px]"
      aria-label="SZUNET RADIO archive hero"
    >
      <img
        className="pointer-events-none absolute inset-0 -z-[3] h-full w-full object-cover object-center"
        src={redBackground}
        alt=""
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 -z-[2] bg-[linear-gradient(180deg,rgba(255,2,2,0.12),rgba(255,2,2,0.3)),radial-gradient(circle_at_72%_32%,rgba(255,255,255,0.12),transparent_23%),#ff0808]"
        aria-hidden="true"
      />
      <DecorativeElements />

      <RadioHeader onNavigateHome={onNavigateHome} />

      <div className="relative z-[3] mx-auto grid min-h-[clamp(310px,31vw,430px)] w-[var(--page-width)] flex-1 grid-cols-[minmax(260px,0.9fr)_minmax(168px,0.48fr)_minmax(190px,0.74fr)] items-center gap-[clamp(18px,4vw,86px)] pb-[clamp(26px,3.2vw,48px)] pt-[clamp(12px,2vw,28px)] max-[980px]:min-h-[390px] max-[980px]:grid-cols-[minmax(0,1fr)_minmax(168px,240px)] max-[980px]:grid-rows-[auto_auto] max-[980px]:gap-x-8 max-[980px]:gap-y-6 max-[700px]:min-h-[500px] max-[700px]:grid-cols-1 max-[700px]:grid-rows-none max-[700px]:justify-items-center max-[700px]:gap-[20px] max-[700px]:pt-6 max-[460px]:min-h-[470px]">
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
      className="relative z-0 grid min-h-[clamp(210px,24vw,320px)] place-items-center overflow-hidden bg-[#5cf5df] text-[#050526]"
      aria-label="Charts"
    >
      <motion.h1
        className="relative z-0 m-0 max-w-[94vw] text-[clamp(58px,12vw,174px)] font-[950] leading-[0.82] tracking-[0.18em] uppercase [text-shadow:0_1px_0_rgba(255,255,255,0.44)] max-[640px]:text-[clamp(52px,14vw,82px)] max-[640px]:tracking-[0.1em] max-[460px]:text-[clamp(44px,13vw,58px)] max-[460px]:tracking-[0.06em] max-[360px]:text-[40px]"
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.65 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        CHARTS
        <span className="pointer-events-none absolute left-[-1%] right-[4%] bottom-[12%] z-[2] h-[clamp(12px,1.4vw,22px)] bg-[#ff1111]" aria-hidden="true" />
      </motion.h1>
    </section>
  )
}

function SecondRadioPage({ onNavigateHome }) {
  return (
    <div className="min-h-[100svh] overflow-x-hidden bg-[#5cf5df] text-white">
      <div className="relative z-[1] overflow-visible">
        <HeroRadioSection onNavigateHome={onNavigateHome} />
        <ScheduleTimelineSection />
      </div>
      <ChartsSection />
      <RadioChartsSection />
      <FooterSection />
    </div>
  )
}

export default SecondRadioPage
