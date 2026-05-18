import { cx } from '../utils/cx'

export default function ScheduleTrackLabel({ artist, title, variant = 'default', className }) {
  const isHero = variant === 'hero'

  return (
    <div
      className={cx(
        'flex min-w-0 max-w-full flex-col gap-0 pb-px font-[\'Helvetica_Neue\',Arial,sans-serif]',
        className,
      )}
    >
      <p
        className={cx(
          'm-0 truncate leading-[1.08] tracking-[0.01em]',
          isHero
            ? 'text-[clamp(7px,0.62vw,9px)] font-normal text-white/90 [text-shadow:0_1px_3px_rgba(0,0,0,0.28)]'
            : 'text-[clamp(8px,0.72vw,10px)] font-normal text-[#050526]',
        )}
      >
        {artist}
      </p>
      <p
        className={cx(
          'm-0 truncate font-bold leading-[1.08] tracking-[0.01em]',
          isHero
            ? 'text-[clamp(8px,0.76vw,11px)] text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.28)]'
            : 'text-[clamp(8px,0.72vw,10px)] text-[#050526]',
        )}
      >
        {title}
      </p>
    </div>
  )
}
