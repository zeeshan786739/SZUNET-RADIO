import { blogPosts } from '../data/blogPosts'
import CardDisplayTitle from '../components/CardDisplayTitle'
import facebookIcon from '../assets/images/facebook.png'
import instagramIcon from '../assets/images/Subtract.png'
import youtubeIcon from '../assets/images/Subtract (1).png'
import { cx } from '../utils/cx'

function BlogSection() {
  return (
    <section className="relative -mt-px overflow-visible bg-transparent" aria-label="Blog">
      <div className="relative z-[1] mx-auto w-[min(100%,var(--page-width))] px-[clamp(12px,1.5vw,18px)] pb-[34px] pt-5 xl:px-[var(--page-gutter)] xl:pb-10 xl:pt-8">
        <header className="relative mb-[clamp(18px,2vw,28px)] w-fit max-w-full xl:mb-8">
          <h2 className="relative z-[1] m-0 max-w-full [font-family:var(--font-family)] text-[clamp(30px,5.2vw,76px)] font-normal uppercase leading-[0.86] tracking-normal text-[#070738] xl:text-[clamp(48px,3.8vw,88px)] 2xl:text-[88px]">
            Legfrissebb zenei híreink
          </h2>
          <span className="absolute left-[2em] inset-x-0 bottom-[0em] z-0 h-[1em] bg-[#ff1111]" aria-hidden="true" />
        </header>

        <div className="relative z-[2] grid min-w-0 grid-cols-1 gap-3 xs:grid-cols-2 xs:gap-[clamp(12px,2vw,18px)] lg:grid-cols-4 lg:gap-[clamp(14px,1.4vw,26px)] xl:gap-[clamp(18px,1.2vw,32px)] 2xl:gap-8">
          {blogPosts.map((post) => (
            <article
              className={cx(
                'relative min-w-0 aspect-[1.02/1] overflow-hidden bg-[#0b0b15] max-sm:aspect-[0.92/1]',
              )}
              key={post.id}
            >
              <img
                className="block h-full w-full object-cover"
                src={post.image}
                alt={post.title}
                style={{ objectPosition: post.imagePosition }}
              />
              <span
                className="pointer-events-none absolute inset-x-0 bottom-0 top-[38%] bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.86))]"
                aria-hidden="true"
              />
              <div className="absolute right-[clamp(12px,1.4vw,22px)] bottom-[clamp(16px,1.7vw,24px)] left-[clamp(12px,1.4vw,22px)] z-[1] min-w-0 max-w-full text-white max-sm:right-2.5 max-sm:bottom-2.5 max-sm:left-2.5">
                <CardDisplayTitle>{post.title}</CardDisplayTitle>
                <p className="m-0 min-w-0 w-full max-w-full overflow-hidden [display:-webkit-box] font-['Bebas_Neue',sans-serif] text-[clamp(7px,0.74vw,11px)] font-normal uppercase leading-[1.2] tracking-[0.03em] [-webkit-box-orient:vertical] [-webkit-line-clamp:4] max-sm:leading-[1.18]">
                  {post.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>

        <footer className="relative z-[2] mt-[clamp(26px,3vw,38px)] flex items-end justify-between gap-6 overflow-hidden max-sm:gap-2">
          <nav className="flex shrink-0 gap-[clamp(12px,4vw,64px)] pl-[clamp(0px,2vw,34px)] max-sm:gap-[clamp(8px,2.6vw,14px)]" aria-label="Social links">
            <a
              className="inline-grid h-[clamp(42px,4.2vw,56px)] w-[clamp(42px,4.2vw,56px)] place-items-center transition-[filter,transform] duration-[160ms] hover:-translate-y-0.5 hover:[filter:drop-shadow(0_8px_12px_rgba(255,0,0,0.22))] focus-visible:rounded-full focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-[#070738] max-sm:h-[clamp(28px,8.6vw,38px)] max-sm:w-[clamp(28px,8.6vw,38px)]"
              href="https://www.facebook.com/"
              aria-label="Facebook"
            >
              <img className="block h-full w-full object-contain" src={facebookIcon} alt="" />
            </a>
            <a
              className="inline-grid h-[clamp(42px,4.2vw,56px)] w-[clamp(42px,4.2vw,56px)] place-items-center transition-[filter,transform] duration-[160ms] hover:-translate-y-0.5 hover:[filter:drop-shadow(0_8px_12px_rgba(255,0,0,0.22))] focus-visible:rounded-full focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-[#070738] max-sm:h-[clamp(28px,8.6vw,38px)] max-sm:w-[clamp(28px,8.6vw,38px)]"
              href="https://www.instagram.com/"
              aria-label="Instagram"
            >
              <img className="block h-full w-full object-contain" src={instagramIcon} alt="" />
            </a>
            <a
              className="inline-grid h-[clamp(42px,4.2vw,56px)] w-[clamp(42px,4.2vw,56px)] place-items-center transition-[filter,transform] duration-[160ms] hover:-translate-y-0.5 hover:[filter:drop-shadow(0_8px_12px_rgba(255,0,0,0.22))] focus-visible:rounded-full focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-[#070738] max-sm:h-[clamp(28px,8.6vw,38px)] max-sm:w-[clamp(28px,8.6vw,38px)]"
              href="https://www.youtube.com/"
              aria-label="YouTube"
            >
              <img className="block h-full w-full object-contain" src={youtubeIcon} alt="" />
            </a>
          </nav>

          <p className="relative isolate z-0 m-0 w-fit min-w-0 max-w-[58vw] overflow-hidden text-ellipsis whitespace-nowrap text-[clamp(34px,6.3vw,96px)] font-[500] leading-[0.78] text-[#070738] uppercase max-sm:max-w-[56vw] max-sm:text-[clamp(25px,9.4vw,42px)] max-xs:text-[clamp(21px,8.4vw,32px)]">
            Zenei Premierek
            <span className="absolute inset-x-0 bottom-[0.02em] -z-[1] h-[0.18em] right-[0.5em] bg-[#ff1111]" aria-hidden="true" />
          </p>
        </footer>
      </div>
    </section>
  )
}

export default BlogSection
