import { useMemo, useState } from 'react'
import { brandAssets } from '../data/channels'
import { scheduleItems } from '../data/schedule'

function SearchIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="6.75" stroke="currentColor" strokeWidth="2.25" />
      <path
        d="M16.25 16.25 20 20"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
    </svg>
  )
}

function SongSearchBar({ value, onChange, inputId }) {
  return (
    <label
      className="group relative mx-auto block w-full max-w-[min(100%,560px)] cursor-text rounded-xl border border-[rgba(8,8,51,0.12)] bg-white shadow-[0_2px_14px_rgba(8,8,51,0.06)] transition-[border-color,box-shadow] duration-200 focus-within:border-[#008eff] focus-within:shadow-[0_0_0_3px_rgba(0,142,255,0.18),0_4px_20px_rgba(8,8,51,0.08)]"
      htmlFor={inputId}
    >
      <span className="sr-only">Keresés előadóra vagy dalra</span>
      <div className="flex min-h-[52px] items-center gap-3 px-3 py-2.5 sm:min-h-[56px] sm:gap-3.5 sm:px-4">
        <span
          className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[rgba(8,8,51,0.06)] text-[#080833] ring-1 ring-[rgba(8,8,51,0.08)] transition-colors duration-200 group-focus-within:bg-[rgba(0,142,255,0.08)] group-focus-within:ring-[rgba(0,142,255,0.35)] sm:h-11 sm:w-11"
          aria-hidden="true"
        >
          <SearchIcon className="h-[19px] w-[19px] opacity-[0.72] sm:h-5 sm:w-5" />
        </span>
        <input
          className="min-w-0 flex-1 border-0 bg-transparent py-1 text-[16px] font-semibold leading-snug text-[#080833] outline-none ring-0 placeholder:font-normal placeholder:text-[rgba(8,8,51,0.42)] focus:ring-0 sm:text-[17px]"
          id={inputId}
          type="search"
          name="song-search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Előadó vagy dal címe…"
          autoComplete="off"
          spellCheck="false"
          enterKeyHint="search"
        />
      </div>
    </label>
  )
}

function SongSearchPage({ onNavigateHome }) {
  const [query, setQuery] = useState('')
  const inputId = 'song-search-field'
  const total = scheduleItems.length

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return scheduleItems
    return scheduleItems.filter(
      (item) =>
        item.artist.toLowerCase().includes(q) || item.title.toLowerCase().includes(q),
    )
  }, [query])

  const hasFilter = query.trim().length > 0

  return (
    <div className="min-h-[calc(100svh-var(--player-height))] bg-[#f0f1f6] text-[#11112a]">
      <header className="border-b border-[rgba(8,8,51,0.08)] bg-white shadow-[0_1px_0_rgba(255,255,255,0.9)]">
        <div className="mx-auto flex w-[var(--page-width)] items-center px-[clamp(12px,1.5vw,18px)] py-[clamp(14px,2vw,20px)]">
          <button
            className="block w-[clamp(96px,10vw,132px)] shrink-0 cursor-pointer border-0 bg-transparent p-0 transition-opacity duration-200 hover:opacity-85 focus-visible:rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#080833]"
            type="button"
            aria-label="Vissza a kezdőlapra — lejátszás folytatódik"
            onClick={onNavigateHome}
          >
            <img className="block h-auto w-full" src={brandAssets.stationLogo} alt="SZUNET RADIO" />
          </button>
        </div>
      </header>

      <div className="mx-auto w-[var(--page-width)] px-[clamp(12px,1.5vw,18px)] pb-[clamp(32px,5vw,56px)] pt-[clamp(24px,4vw,40px)] xl:px-[var(--page-gutter)] xl:pb-16 xl:pt-12 2xl:pb-20">
        <header className="mb-6 max-w-[40rem] sm:mb-8">
          <h1 className="m-0 text-[clamp(24px,4vw,36px)] font-[950] uppercase leading-[1.05] tracking-[0.04em] text-[#080833] xl:text-[clamp(32px,3vw,44px)] 2xl:text-[44px]">
            Dal keresés
          </h1>
          <p className="mt-2.5 text-[15px] leading-relaxed text-[rgba(8,8,51,0.62)] sm:text-[16px]">
            Keress a mai műsorban — gépelés közben frissül a lista. Összesen{' '}
            <span className="font-semibold text-[#080833]">{total}</span> műsorpont.
          </p>
        </header>

        <SongSearchBar value={query} onChange={setQuery} inputId={inputId} />

        <p
          className="mx-auto mt-4 max-w-[min(100%,560px)] text-[13px] leading-snug text-[rgba(8,8,51,0.52)] sm:mt-5 sm:text-[14px]"
          role="status"
          aria-live="polite"
        >
          {hasFilter
            ? results.length === 1
              ? '1 találat — töröld a mezőt az összes szám megjelenítéséhez.'
              : `${results.length} találat — töröld a mezőt az összes szám megjelenítéséhez.`
            : 'Kezdj el gépelni a szűréshez, vagy görgess le az összes műsorponthoz.'}
        </p>

        <ul className="m-0 mt-6 grid list-none gap-3 p-0 xs:mt-7 sm:mt-8 sm:grid-cols-2 sm:gap-4 md:gap-5 lg:grid-cols-3 xl:gap-6">
          {results.map((item) => (
            <li
              className="flex min-w-0 gap-3.5 rounded-xl border border-[rgba(8,8,51,0.07)] bg-white p-3.5 shadow-[0_4px_18px_rgba(8,8,51,0.05)] transition-[box-shadow,transform] duration-200 hover:shadow-[0_8px_24px_rgba(8,8,51,0.08)] sm:gap-4 sm:p-4"
              key={item.id}
            >
              <img
                className="h-[60px] w-[60px] shrink-0 rounded-lg object-cover ring-1 ring-[rgba(8,8,51,0.06)] sm:h-[64px] sm:w-[64px]"
                src={item.cover}
                alt=""
              />
              <div className="min-w-0 flex-1 py-0.5">
                <p className="m-0 truncate text-[12px] font-semibold uppercase tracking-[0.04em] text-[rgba(8,8,51,0.5)]">
                  {item.artist}
                </p>
                <p className="m-0 mt-0.5 truncate text-[15px] font-[950] leading-tight text-[#080833] sm:text-[16px]">
                  {item.title}
                </p>
                <p className="m-0 mt-2 inline-flex items-center rounded-md bg-[rgba(255,17,17,0.08)] px-2 py-0.5 text-[12px] font-bold tabular-nums text-[#d60a0a]">
                  {item.time}
                </p>
              </div>
            </li>
          ))}
        </ul>

        {results.length === 0 ? (
          <div className="mx-auto mt-10 max-w-md rounded-xl border border-dashed border-[rgba(8,8,51,0.18)] bg-white/80 px-6 py-10 text-center">
            <p className="m-0 text-[16px] font-semibold text-[#080833]">Nincs találat</p>
            <p className="m-0 mt-2 text-[14px] leading-relaxed text-[rgba(8,8,51,0.55)]">
              Próbálj másik kifejezést, vagy töröld a keresőmezőt az összes műsor visszaállításához.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default SongSearchPage
