import {
  bottomMixcloudItems,
  topMixcloudItems,
} from '../data/mixcloudItems'
import mixcloudLogo from '../assets/images/Group 85.png'
import vectorShape from '../assets/images/Vector.png'
import playIcon from '../assets/images/Group 28.png'
import likeIcon from '../assets/images/Group 41.png'
import dislikeIcon from '../assets/images/Group 42.png'
import CardDisplayTitle from '../components/CardDisplayTitle'
import { cx } from '../utils/cx'

function MixcloudCard({ item, variant = 'top' }) {
  const isBottom = variant === 'bottom'
  const isFeature =
    item.titleStyle === 'artist-feature' || item.titleStyle === 'mixcloud-feature'
  const titleVariant =
    item.titleStyle === 'mixcloud-feature' ? 'purple-box' : 'underline'

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
        alt={item.artistName ?? item.displayTitle ?? item.title ?? 'Mixcloud'}
        style={{ objectPosition: item.imagePosition }}
      />
      <span
        className={cx(
          'pointer-events-none absolute inset-x-0 bottom-0 top-[36%] bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.78))]',
          isFeature && 'top-[38%] bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.86))]',
          isBottom && !isFeature && 'top-[32%] bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.72))]',
        )}
        aria-hidden="true"
      />

      <button
        className="absolute left-[clamp(10px,1.1vw,16px)] top-[clamp(10px,1.1vw,16px)] z-[2] grid h-[clamp(30px,3.3vw,46px)] w-[clamp(30px,3.3vw,46px)] cursor-pointer place-items-center border-0 bg-transparent p-0 transition-[filter,transform] duration-[160ms] hover:scale-[1.08] hover:[filter:drop-shadow(0_7px_12px_rgba(0,0,0,0.4))] focus-visible:rounded-full focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-white max-sm:h-[clamp(24px,7.4vw,32px)] max-sm:w-[clamp(24px,7.4vw,32px)]"
        type="button"
        aria-label={`Play ${item.artistName ?? item.displayTitle ?? item.title}`}
      >
        <img className="block h-full w-full" src={playIcon} alt="" aria-hidden="true" />
      </button>

      {item.showVotes && (
        <div className="absolute right-3 top-3 z-[2] inline-flex gap-0.5" aria-hidden="true">
          <img
            className="h-[18px] w-[18px] object-contain [filter:brightness(0)_saturate(100%)_invert(45%)_sepia(98%)_saturate(1707%)_hue-rotate(100deg)_brightness(99%)_contrast(108%)_drop-shadow(0_1px_2px_rgba(0,0,0,0.36))]"
            src={likeIcon}
            alt=""
          />
          <img
            className="h-[18px] w-[18px] object-contain [filter:brightness(0)_saturate(100%)_invert(21%)_sepia(96%)_saturate(5505%)_hue-rotate(350deg)_brightness(101%)_contrast(105%)_drop-shadow(0_1px_2px_rgba(0,0,0,0.36))]"
            src={dislikeIcon}
            alt=""
          />
        </div>
      )}

      <div
        className={cx(
          'absolute right-[clamp(12px,1.4vw,22px)] bottom-[clamp(16px,1.7vw,24px)] left-[clamp(12px,1.4vw,22px)] z-[2] min-w-0 text-white max-sm:right-2.5 max-sm:bottom-2.5 max-sm:left-2.5',
          isBottom && 'bottom-[clamp(18px,1.8vw,30px)] max-sm:bottom-2.5',
        )}
      >
        {item.eyebrow && (
          <span className="mb-1 block text-[clamp(18px,1.6vw,26px)] font-black leading-none [writing-mode:vertical-rl] rotate-180 max-sm:text-[13px]">
            {item.eyebrow}
          </span>
        )}
        {item.hideTitle ? null : isFeature ? (
          <div className="w-full min-w-0 max-w-full">
            <CardDisplayTitle variant={titleVariant}>
              {item.artistName ?? item.displayTitle ?? item.title}
            </CardDisplayTitle>
            {item.description ? (
              <p
                className={cx(
                  "m-0 min-w-0 w-full max-w-full overflow-hidden [display:-webkit-box] font-['Bebas_Neue',sans-serif] text-[clamp(7px,0.74vw,11px)] font-normal leading-[1.2] tracking-[0.03em] text-white [-webkit-box-orient:vertical] [-webkit-line-clamp:4] max-sm:leading-[1.18]",
                  item.descriptionUppercase
                    ? 'uppercase'
                    : 'normal-case',
                )}
              >
                {item.description}
              </p>
            ) : null}
          </div>
        ) : item.label ? (
          <strong className="relative z-0 m-0 block max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-[clamp(38px,5vw,72px)] font-[950] leading-[0.88]">
            {item.label}
            <span
              className="absolute left-[28%] right-[-14px] bottom-[-3px] -z-[1] h-[9px] min-w-[86px] bg-[#ff1111] max-sm:left-[24%] max-sm:right-[-10px]"
              aria-hidden="true"
            />
          </strong>
        ) : (
          <>
            <h2
              className={cx(
                'm-0 max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-[clamp(20px,2vw,32px)] font-[950] leading-[0.88]',
                isBottom && 'max-sm:text-[clamp(15px,4.15vw,18px)]',
              )}
            >
              {item.title}
            </h2>
            {item.subtitle && (
              <strong className="m-0 block max-w-full overflow-hidden whitespace-nowrap text-[clamp(20px,2vw,32px)] font-[950] leading-[0.88] max-sm:text-[clamp(17px,4.8vw,22px)]">
                <span className="relative inline-block w-fit max-w-full overflow-hidden text-ellipsis whitespace-nowrap align-top">
                  <span className="relative z-[1] text-white">{item.subtitle}</span>
                  <span
                    className="absolute inset-x-0 bottom-[-0.02em] z-0 h-[0.3em] bg-[#ff1111] max-sm:h-[0.32em]"
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
        className="pointer-events-none absolute left-[31%] top-5 z-0 max-md:left-[34%] max-md:w-[74vw] max-sm:left-[58%] max-sm:top-10 max-sm:w-[68vw] max-sm:-translate-x-1/2 max-sm:opacity-85"
        src={vectorShape}
        alt=""
        aria-hidden="true"
      />

      <div className="relative z-[1] mx-auto w-[min(100%,var(--page-width))] min-w-0 px-[clamp(12px,1.5vw,18px)] pb-7 pt-5 xl:px-[var(--page-gutter)] xl:pb-9 xl:pt-8">
        <div className="grid min-w-0 grid-cols-1 gap-3 xs:grid-cols-2 sm:gap-[clamp(10px,1.2vw,22px)] lg:grid-cols-4 lg:gap-[clamp(10px,1.2vw,22px)] xl:gap-[clamp(14px,1.1vw,28px)] 2xl:gap-8">
          {topMixcloudItems.map((item) => (
            <MixcloudCard item={item} key={item.id} />
          ))}
        </div>

        <div className="flex min-h-[130px] min-w-0 items-center justify-between gap-[clamp(14px,3vw,54px)] max-md:min-h-0 max-md:flex-col max-md:gap-4 max-md:py-4">
          <img
            className="w-[min(100%,clamp(430px,42vw,720px))] max-w-none shrink-0 max-md:mx-auto max-md:w-[min(86vw,430px)] max-xs:w-[min(78vw,320px)]"
            src={mixcloudLogo}
            alt="Mixcloud"
          />
          <div className="m-0 ml-auto min-w-0 max-w-[min(52ch,42%)] shrink text-right font-['Bebas_Neue',sans-serif] text-[clamp(11px,1.05vw,16px)] font-normal leading-[1.38] tracking-[0.02em] text-[#05051c] max-lg:max-w-[min(48ch,46%)] max-md:ml-0 max-md:max-w-none max-md:text-center">
            <span className="block">Lorem ipsum dolor sit amet, consectetur adipiscing elit,</span>
            <span className="block">
              sed do eiusmod tempor{' '}
              <span className="bg-[#ff1111] px-[0.06em] text-[#05051c]">incididunt ut labore et dolore</span>
            </span>
            <span className="block">magna aliqua. Ut enim ad minim veniam, quis</span>
          </div>
        </div>

        <div className="grid min-w-0 grid-cols-1 gap-3 xs:grid-cols-2 sm:gap-[clamp(10px,1.2vw,22px)] lg:grid-cols-4 lg:gap-[clamp(10px,1.2vw,22px)] xl:gap-[clamp(14px,1.1vw,28px)] 2xl:gap-8">
          {bottomMixcloudItems.map((item) => (
            <MixcloudCard item={item} key={item.id} variant="bottom" />
          ))}
        </div>
      </div>
    </section>
  )
}

export default MixcloudSection
