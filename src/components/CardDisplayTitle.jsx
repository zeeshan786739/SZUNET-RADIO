import { cx } from '../utils/cx'

function CardDisplayTitle({ children, className, variant = 'underline' }) {
  if (variant === 'purple-box') {
    return (
      <h2
        className={cx(
          "relative isolate z-0 mb-[9px] w-fit min-w-0 max-w-full max-sm:mb-2 font-['Bebas_Neue',sans-serif]",
          className,
        )}
      >
        <span className="sr-only">{children}</span>
        <span className="relative z-[1] block text-[clamp(18px,2.2vw,36px)] font-normal uppercase leading-[0.88] tracking-[0.04em] text-white">
          {children}
        </span>
        <span
          className="pointer-events-none absolute inset-x-0 bottom-[-0.02em] z-0 h-1/2 max-w-full bg-[#7b5cff]"
          aria-hidden="true"
        />
      </h2>
    )
  }

  return (
    <h2
      className={cx(
        "relative isolate z-0 mb-[9px] w-fit min-w-0 max-w-full max-sm:mb-2 font-['Bebas_Neue',sans-serif]",
        className,
      )}
    >
      <span className="sr-only">{children}</span>
      <span className="relative z-[1] block text-[clamp(18px,2.2vw,36px)] font-normal uppercase leading-[0.88] tracking-[0.04em] text-white">
        {children}
      </span>
      <span
        className="pointer-events-none absolute inset-x-0 bottom-[5px] z-0 h-[7px] max-w-full bg-[#ff1111] max-sm:bottom-[2px] max-sm:h-[5px]"
        aria-hidden="true"
      />
    </h2>
  )
}

export default CardDisplayTitle
