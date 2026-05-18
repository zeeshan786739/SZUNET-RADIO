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

      <div className="relative mx-auto grid min-h-0 w-[min(100%,var(--page-width))] flex-1 grid-rows-[1fr_auto] px-[clamp(16px,3vw,52px)] pb-[clamp(22px,3vw,34px)] pt-[clamp(44px,7vw,110px)] xl:px-[var(--page-gutter)] xl:pb-10 xl:pt-[clamp(56px,6vw,120px)]">
        <div className="relative inline-block w-[clamp(210px,28vw,420px)] place-self-center px-[clamp(20px,4vw,72px)] pb-3.5 pt-2.5">
          <span
            className="pointer-events-none absolute bottom-[14%] left-[25%] right-[25%] z-0 h-[38%] bg-[#ff1111]"
            aria-hidden="true"
          />
          <img
            className="relative z-[1] block w-[clamp(210px,28vw,420px)]"
            src={footerHeadline}
            alt="Kimaxoljuk a napodat!"
          />
        </div>

        <div className="grid grid-cols-[minmax(74px,140px)_1fr_auto] items-end gap-[clamp(14px,3vw,48px)] text-white max-md:grid-cols-[auto_1fr] max-md:items-center">
          <img className="h-auto w-[clamp(74px,8vw,118px)]" src={stationLogo} alt="SZUNET Radio" />

          <p className="m-0 min-w-0 max-w-full text-pretty text-[clamp(7px,0.68vw,10px)] font-medium leading-[1.35] opacity-90 max-md:text-[clamp(8px,2.4vw,10px)]">
            Készítette: McG012. Szép volt minden zene/tartalom itt csak
            megjelenítésre. Minden jog fenntartva.
          </p>

          <p className="m-0 min-w-0 max-w-full justify-self-end text-pretty text-right text-[clamp(7px,0.68vw,10px)] font-medium leading-[1.35] opacity-90 max-md:col-span-2 max-md:justify-self-start max-md:text-left max-md:text-[clamp(8px,2.4vw,10px)]">
            Copyright © Szünet Rádió 2026 - Minden jog fenntartva.
          </p>
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
