import { cx } from '../utils/cx'

const lineBase =
  "relative z-[1] inline-block max-w-full font-['Roboto_Condensed','Arial_Narrow',sans-serif] uppercase text-white tracking-[0.03em] leading-none [text-shadow:0_1px_4px_rgba(0,0,0,0.45)] [font-synthesis:none]"

export default function StyledTrackLabel({ artist, track, accent, plain = false, className }) {
  return (
    <div
      className={className}
      style={accent ? { '--track-label-accent': accent } : undefined}
    >
      <p className="m-0 flex w-fit max-w-full flex-col items-start gap-0">
        <span className="mb-[clamp(1px,0.1em,3px)] block w-fit max-w-full">
          <span
            className={cx(
              lineBase,
              plain
                ? 'origin-left-bottom scale-y-[1.38] overflow-hidden text-ellipsis whitespace-nowrap p-0 text-[clamp(9px,0.88vw,14px)] font-normal'
                : 'origin-left-bottom scale-y-[1.46] px-[0.06em] text-[clamp(11px,1.05vw,17px)] font-normal [box-decoration-break:clone] bg-[linear-gradient(to_bottom,transparent_0%,transparent_42%,var(--track-label-accent)_42%,var(--track-label-accent)_92%)]',
            )}
          >
            {artist}
          </span>
        </span>
        <strong
          className={cx(
            lineBase,
            plain
              ? 'origin-left-bottom scale-y-[1.38] overflow-hidden text-ellipsis whitespace-nowrap text-[clamp(10px,0.95vw,16px)] font-bold mt-[clamp(2px,0.42em,4px)]'
              : 'origin-left-bottom scale-y-[1.46] text-[clamp(12px,1.12vw,19px)] font-bold mt-[clamp(2px,0.5em,5px)]',
          )}
        >
          {track}
        </strong>
      </p>
    </div>
  )
}
