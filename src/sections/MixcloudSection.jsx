import {
  bottomMixcloudItems,
  topMixcloudItems,
} from '../data/mixcloudItems'
import mixcloudLogo from '../assets/images/Group 85.png'
import vectorShape from '../assets/images/Vector.png'
import playIcon from '../assets/images/Group 28.png'
import likeIcon from '../assets/images/Group 41.png'
import dislikeIcon from '../assets/images/Group 42.png'
import { cx } from '../utils/cx'

function MixcloudCard({ item, variant = 'top' }) {
  const isBottom = variant === 'bottom'

  return (
    <article
      className={cx(
        'relative min-w-0 aspect-[1.08/1] overflow-hidden bg-[#101018]',
        isBottom && 'aspect-[1.24/1]',
        item.active && 'outline-4 -outline-offset-4 outline-[#0098ff]',
      )}
    >
      <img
        className="block h-full w-full object-cover"
        src={item.image}
        alt={item.label ?? `${item.title} ${item.subtitle ?? ''}`.trim()}
        style={{ objectPosition: item.imagePosition }}
      />
      <span
        className={cx(
          'pointer-events-none absolute inset-x-0 bottom-0 top-[36%] bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.78))]',
          isBottom && 'top-[32%] bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.72))]',
        )}
        aria-hidden="true"
      />

      <button
        className="absolute left-[clamp(10px,1.1vw,16px)] top-[clamp(10px,1.1vw,16px)] z-[2] grid h-[clamp(30px,3.3vw,46px)] w-[clamp(30px,3.3vw,46px)] cursor-pointer place-items-center border-0 bg-transparent p-0 transition-[filter,transform] duration-[160ms] hover:scale-[1.08] hover:[filter:drop-shadow(0_7px_12px_rgba(0,0,0,0.4))] focus-visible:rounded-full focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-white max-[480px]:h-[clamp(24px,7.4vw,32px)] max-[480px]:w-[clamp(24px,7.4vw,32px)]"
        type="button"
        aria-label={`Play ${item.title}`}
      >
        <img className="block h-full w-full" src={playIcon} alt="" aria-hidden="true" />
      </button>

      {item.showVotes && (
        <div className="absolute right-3 top-3 z-[2] inline-flex gap-0.5" aria-hidden="true">
          <img className="h-[18px] w-[18px] object-contain" src={likeIcon} alt="" />
          <img className="h-[18px] w-[18px] object-contain" src={dislikeIcon} alt="" />
        </div>
      )}

      <div
        className={cx(
          'absolute right-[clamp(14px,1.5vw,24px)] bottom-[clamp(14px,1.4vw,22px)] left-[clamp(14px,1.5vw,24px)] z-[2] text-white uppercase max-[480px]:left-2.5 max-[480px]:right-2.5 max-[480px]:bottom-2.5',
          isBottom && 'bottom-[clamp(18px,1.8vw,30px)] max-[480px]:bottom-2.5',
        )}
      >
        {item.eyebrow && (
          <span className="mb-1 block [font-family:Arial,Helvetica,sans-serif] text-[clamp(18px,1.6vw,26px)] font-black leading-none [writing-mode:vertical-rl] rotate-180 max-[480px]:text-[13px]">
            {item.eyebrow}
          </span>
        )}
        {item.hideTitle ? null : item.titleImage || item.subtitleImage ? (
          <h2 className="relative z-0 m-0 grid w-fit max-w-full gap-0.5">
            <span className="sr-only">{`${item.title} ${item.subtitle ?? ''}`.trim()}</span>
            {item.titleImage ? (
              <img
                className="relative z-[1] block h-[clamp(20px,2vw,32px)] w-auto max-w-full object-contain object-left"
                src={item.titleImage}
                alt=""
                aria-hidden="true"
              />
            ) : null}
            {item.subtitleImage ? (
              <span className="relative isolate z-0 block w-fit max-w-full">
                <img
                  className="relative z-[1] block h-[clamp(20px,2vw,32px)] w-auto max-w-full object-contain object-left"
                  src={item.subtitleImage}
                  alt=""
                  aria-hidden="true"
                />
                <span
                  className="pointer-events-none absolute inset-x-0 bottom-[5px] z-0 h-[7px] bg-[#ff1111] max-[560px]:bottom-[2px] max-[560px]:h-[5px]"
                  aria-hidden="true"
                />
              </span>
            ) : null}
          </h2>
        ) : item.label ? (
          <strong className="relative z-0 m-0 block max-w-full overflow-hidden text-ellipsis whitespace-nowrap [font-family:Arial,Helvetica,sans-serif] text-[clamp(38px,5vw,72px)] font-[950] leading-[0.88]">
            {item.label}
            <span className="absolute left-[28%] right-[-14px] bottom-[-3px] -z-[1] h-[9px] min-w-[86px] bg-[#ff1111] max-[560px]:left-[24%] max-[560px]:right-[-10px]" aria-hidden="true" />
          </strong>
        ) : (
          <>
            <h2
              className={cx(
                'm-0 max-w-full overflow-hidden text-ellipsis whitespace-nowrap [font-family:Arial,Helvetica,sans-serif] text-[clamp(20px,2vw,32px)] font-[950] leading-[0.88]',
                isBottom && 'max-[480px]:text-[clamp(15px,4.15vw,18px)]',
              )}
            >
              {item.title}
            </h2>
            {item.subtitle && (
              <strong className="m-0 block max-w-full overflow-hidden whitespace-nowrap [font-family:Arial,Helvetica,sans-serif] text-[clamp(20px,2vw,32px)] font-[950] leading-[0.88] max-[480px]:text-[clamp(17px,4.8vw,22px)]">
                <span className="relative inline-block w-fit max-w-full overflow-hidden text-ellipsis whitespace-nowrap align-top">
                  <span className="relative z-[1] text-white">
                  {item.subtitle}
                  </span>
                  <span
                    className="absolute inset-x-0 bottom-[-0.02em] z-0 h-[0.3em] bg-[#ff1111] max-[480px]:h-[0.32em]"
                    aria-hidden="true"
                  />
                </span>
              </strong>
            )}
          </>
        )}
      </div>
    </article>
  )
}

function MixcloudSection() {
  return (
    <section className="relative overflow-hidden bg-transparent" aria-label="Mixcloud">
      <img
        className="pointer-events-none absolute left-[31%] top-5 z-0 max-[760px]:left-[34%] max-[760px]:w-[74vw] max-[560px]:left-[58%] max-[560px]:top-10 max-[560px]:w-[68vw] max-[560px]:-translate-x-1/2 max-[560px]:opacity-85"
        src={vectorShape}
        alt=""
        aria-hidden="true"
      />

        <div className="relative z-[1] mx-auto w-[min(100%,var(--page-width))] min-w-0 px-[clamp(12px,1.5vw,18px)] pb-7 pt-5">
        <div className="grid min-w-0 grid-cols-4 gap-[clamp(10px,1.25vw,18px)] max-[760px]:grid-cols-2 max-[480px]:gap-3">
          {topMixcloudItems.map((item) => (
            <MixcloudCard item={item} key={item.id} />
          ))}
        </div>

        <div className="grid min-h-[130px] grid-cols-[minmax(200px,0.92fr)_minmax(180px,0.48fr)] items-center gap-[clamp(14px,3vw,54px)] max-[700px]:min-h-0 max-[700px]:grid-cols-1 max-[700px]:gap-4 max-[700px]:py-4">
          <img
            className="w-[min(100%,650px)] max-w-none justify-self-start max-[700px]:mx-auto max-[700px]:w-[min(86vw,430px)] max-[420px]:w-[min(78vw,320px)]"
            src={mixcloudLogo}
            alt="Mixcloud"
          />
          <p className="m-0 min-w-0 max-w-[52ch] overflow-hidden [display:-webkit-box] [font-family:Arial,Helvetica,sans-serif] text-[clamp(10px,1vw,15px)] font-extrabold leading-[1.55] text-[#05051c] [-webkit-box-orient:vertical] [-webkit-line-clamp:4] max-[700px]:max-w-none max-[700px]:text-center max-[700px]:[-webkit-line-clamp:5]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis.
          </p>
        </div>

        <div className="grid min-w-0 grid-cols-4 gap-[clamp(10px,1.25vw,18px)] max-[760px]:grid-cols-2 max-[480px]:gap-3">
          {bottomMixcloudItems.map((item) => (
            <MixcloudCard item={item} key={item.id} variant="bottom" />
          ))}
        </div>
      </div>
    </section>
  )
}

export default MixcloudSection
