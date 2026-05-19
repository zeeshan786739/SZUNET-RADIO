import footerHeadline from '../assets/images/KIMAXOLJUK A NAPODAT! (1).png'
import footerBackground from '../assets/images/Rectangle 6.png'
import stationLogo from '../assets/images/Szünet logo.png'

function FooterSection() {
  return (
    <footer
      className="relative isolate flex min-h-[clamp(260px,34vw,420px)] flex-col overflow-hidden bg-[#080833] xl:min-h-[clamp(300px,28vw,460px)] 2xl:min-h-[480px]"
      aria-label="SZUNET Radio footer"
    >
      <img
        className="absolute inset-0 -z-[1] h-full w-full object-cover"
        src={footerBackground}
        alt=""
        aria-hidden="true"
      />

      <div className="page-gutter-x flex min-h-0 flex-1 flex-col">
        <div className="page-container relative grid min-h-0 flex-1 grid-rows-[1fr_auto] pb-[clamp(22px,3vw,34px)] pt-[clamp(44px,7vw,110px)] xl:pb-10 xl:pt-[clamp(56px,6vw,120px)]">
        <div className="relative inline-block w-[clamp(180px,52vw,420px)] place-self-center px-[clamp(12px,4vw,72px)] pb-3.5 pt-2.5 max-md:w-[min(92vw,360px)]">
          <span
            className="pointer-events-none absolute bottom-[14%] left-[25%] right-[25%] z-0 h-[38%] bg-[#ff1111]"
            aria-hidden="true"
          />
          <img
            className="relative z-[1] block w-full"
            src={footerHeadline}
            alt="Kimaxoljuk a napodat!"
          />
        </div>

        <div className="flex flex-wrap items-end justify-between gap-x-[clamp(14px,3vw,48px)] gap-y-4 text-white">
          <div className="flex min-w-0 flex-[1_1_280px] items-end gap-[clamp(12px,2vw,28px)] max-md:flex-col max-md:items-start max-md:gap-3">
            <img
              className="h-auto w-[clamp(74px,8vw,118px)] shrink-0"
              src={stationLogo}
              alt="SZUNET Radio"
            />
            <p className="m-0 min-w-0 max-w-[min(100%,52rem)] text-pretty font-['Helvetica_Neue',Arial,sans-serif] text-[clamp(8px,0.75vw,11px)] font-medium leading-[1.4] tracking-[0.01em] opacity-95 max-md:text-[clamp(8px,2.35vw,10px)]">
              <span>Üzemeltető: WEISZ MÁTYÁS </span>
              <a
                className="text-white underline decoration-white/35 underline-offset-[2px] transition-colors hover:decoration-white"
                href="mailto:info@szunet-radio.hu"
              >
                info@szunet-radio.hu
              </a>
              <span className="mx-[0.35em] opacity-70" aria-hidden="true">
                |
              </span>
              <span>MÉDIA MEGKERESÉS: </span>
              <a
                className="text-white underline decoration-white/35 underline-offset-[2px] transition-colors hover:decoration-white"
                href="mailto:media@szunet-radio.hu"
              >
                media@szunet-radio.hu
              </a>
            </p>
          </div>

          <p className="m-0 ml-auto min-w-0 shrink-0 text-pretty text-right font-['Helvetica_Neue',Arial,sans-serif] text-[clamp(8px,0.75vw,11px)] font-medium leading-[1.4] tracking-[0.01em] opacity-95 max-md:max-w-full max-md:text-[clamp(8px,2.35vw,10px)] max-sm:w-full max-sm:text-right">
            Copyright © Szünet Rádió 2026 - Minden jog fenntartva
          </p>
        </div>
        </div>
      </div>

      <div className="relative z-[1] w-full shrink-0" aria-hidden="true">
        <div className="h-[clamp(8px,0.9vw,12px)] bg-[#ff1111]" />
        <div className="h-[2px] bg-white" />
        <div className="h-[clamp(2px,0.28vw,3px)] bg-[#080833]" />
      </div>
    </footer>
  )
}

export default FooterSection
