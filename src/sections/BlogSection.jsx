import { blogPosts } from '../data/blogPosts'
import blogTitle from '../assets/images/BLOG.png'
import facebookIcon from '../assets/images/facebook.png'
import instagramIcon from '../assets/images/Subtract.png'
import youtubeIcon from '../assets/images/Subtract (1).png'
import { cx } from '../utils/cx'

function BlogSection() {
  return (
    <section className="relative -mt-px overflow-visible bg-transparent" aria-label="Blog">
      <div className="relative z-[1] mx-auto w-[min(100%,var(--page-width))] px-[clamp(12px,1.5vw,18px)] pb-[34px] pt-5">
        <header className="relative mb-[clamp(18px,2vw,28px)] w-fit">
          <img className="relative z-[1] block w-[clamp(70px,6.6vw,105px)]" src={blogTitle} alt="Blog" />
          <span className="absolute right-[-9px] bottom-[2px] z-0 h-3 w-[70%] bg-[#ff1111]" aria-hidden="true" />
        </header>

        <div className="relative z-[2] grid min-w-0 grid-cols-4 gap-[clamp(14px,1.55vw,22px)] max-[760px]:grid-cols-2 max-[480px]:gap-3">
          {blogPosts.map((post) => (
            <article
              className={cx(
                'relative min-w-0 aspect-[1.02/1] overflow-hidden bg-[#0b0b15] max-[480px]:aspect-[0.92/1]',
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
              <div className="absolute right-[clamp(12px,1.4vw,22px)] bottom-[clamp(16px,1.7vw,24px)] left-[clamp(12px,1.4vw,22px)] z-[1] min-w-0 max-w-full text-white max-[480px]:right-2.5 max-[480px]:bottom-2.5 max-[480px]:left-2.5">
                <h2 className="relative isolate z-0 mb-[9px] w-fit min-w-0 max-w-full max-[480px]:mb-2">
                  <span className="sr-only">{post.title}</span>
                  <img
                    className="relative z-[1] block h-[clamp(18px,2.2vw,36px)] w-auto max-w-full object-contain object-left"
                    src={post.titleImage}
                    alt=""
                    aria-hidden="true"
                  />
                  <span
                    className="pointer-events-none absolute inset-x-0 bottom-[5px] z-0 h-[7px] max-w-full bg-[#ff1111] max-[560px]:bottom-[2px] max-[560px]:h-[5px]"
                    aria-hidden="true"
                  />
                </h2>
                <p className="m-0 min-w-0 w-full max-w-full overflow-hidden [display:-webkit-box] [font-family:Arial,Helvetica,sans-serif] text-[clamp(7px,0.74vw,11px)] font-semibold leading-[1.2] [-webkit-box-orient:vertical] [-webkit-line-clamp:4] max-[480px]:leading-[1.18]">
                  {post.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>

        <footer className="relative z-[2] mt-[clamp(26px,3vw,38px)] flex items-end justify-between gap-6 overflow-hidden max-[560px]:gap-2">
          <nav className="flex shrink-0 gap-[clamp(12px,4vw,64px)] pl-[clamp(0px,2vw,34px)] max-[560px]:gap-[clamp(8px,2.6vw,14px)]" aria-label="Social links">
            <a
              className="inline-grid h-[clamp(42px,4.2vw,56px)] w-[clamp(42px,4.2vw,56px)] place-items-center transition-[filter,transform] duration-[160ms] hover:-translate-y-0.5 hover:[filter:drop-shadow(0_8px_12px_rgba(255,0,0,0.22))] focus-visible:rounded-full focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-[#070738] max-[560px]:h-[clamp(28px,8.6vw,38px)] max-[560px]:w-[clamp(28px,8.6vw,38px)]"
              href="https://www.facebook.com/"
              aria-label="Facebook"
            >
              <img className="block h-full w-full object-contain" src={facebookIcon} alt="" />
            </a>
            <a
              className="inline-grid h-[clamp(42px,4.2vw,56px)] w-[clamp(42px,4.2vw,56px)] place-items-center transition-[filter,transform] duration-[160ms] hover:-translate-y-0.5 hover:[filter:drop-shadow(0_8px_12px_rgba(255,0,0,0.22))] focus-visible:rounded-full focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-[#070738] max-[560px]:h-[clamp(28px,8.6vw,38px)] max-[560px]:w-[clamp(28px,8.6vw,38px)]"
              href="https://www.instagram.com/"
              aria-label="Instagram"
            >
              <img className="block h-full w-full object-contain" src={instagramIcon} alt="" />
            </a>
            <a
              className="inline-grid h-[clamp(42px,4.2vw,56px)] w-[clamp(42px,4.2vw,56px)] place-items-center transition-[filter,transform] duration-[160ms] hover:-translate-y-0.5 hover:[filter:drop-shadow(0_8px_12px_rgba(255,0,0,0.22))] focus-visible:rounded-full focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-[#070738] max-[560px]:h-[clamp(28px,8.6vw,38px)] max-[560px]:w-[clamp(28px,8.6vw,38px)]"
              href="https://www.youtube.com/"
              aria-label="YouTube"
            >
              <img className="block h-full w-full object-contain" src={youtubeIcon} alt="" />
            </a>
          </nav>

          <p className="relative z-0 m-0 min-w-0 max-w-[58vw] overflow-hidden text-ellipsis whitespace-nowrap text-[clamp(34px,6.3vw,96px)] font-[950] leading-[0.78] text-[#070738] uppercase max-[560px]:max-w-[56vw] max-[560px]:text-[clamp(25px,9.4vw,42px)] max-[380px]:text-[clamp(21px,8.4vw,32px)]">
            Premierek
            <span className="absolute right-0 bottom-[-6px] -z-[1] h-4 w-4/5 bg-[#ff1111] max-[560px]:bottom-[-4px] max-[560px]:h-3" aria-hidden="true" />
          </p>
        </footer>
      </div>
    </section>
  )
}

export default BlogSection
