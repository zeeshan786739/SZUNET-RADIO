import footerHeadline from '../assets/images/KIMAXOLJUK A NAPODAT! (1).png'
import footerBackground from '../assets/images/Rectangle 6.png'
import stationLogo from '../assets/images/Szünet logo.png'

function FooterSection() {
  return (
    <footer
      className="relative isolate min-h-[clamp(260px,34vw,420px)] overflow-hidden bg-[#080833]"
      aria-label="SZUNET Radio footer"
    >
      <img
        className="absolute inset-0 -z-[1] h-full w-full object-cover"
        src={footerBackground}
        alt=""
        aria-hidden="true"
      />

      <div className="relative mx-auto grid min-h-[inherit] w-[min(100%,var(--page-width))] grid-rows-[1fr_auto] px-[clamp(16px,3vw,52px)] pb-[clamp(22px,3vw,34px)] pt-[clamp(44px,7vw,110px)]">
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

        <div className="grid grid-cols-[minmax(74px,140px)_1fr_auto] items-end gap-[clamp(14px,3vw,48px)] [font-family:Arial,Helvetica,sans-serif] text-white max-[700px]:grid-cols-[auto_1fr] max-[700px]:items-center">
          <img className="h-auto w-[clamp(74px,8vw,118px)]" src={stationLogo} alt="SZUNET Radio" />

          <p className="m-0 min-w-0 max-w-full text-pretty text-[clamp(7px,0.68vw,10px)] font-medium leading-[1.35] opacity-90 max-[700px]:text-[clamp(8px,2.4vw,10px)]">
            Készítette: McG012. Szép volt minden zene/tartalom itt csak
            megjelenítésre. Minden jog fenntartva.
          </p>

          <p className="m-0 min-w-0 max-w-full justify-self-end text-pretty text-right text-[clamp(7px,0.68vw,10px)] font-medium leading-[1.35] opacity-90 max-[700px]:col-span-2 max-[700px]:justify-self-start max-[700px]:text-left max-[700px]:text-[clamp(8px,2.4vw,10px)]">
            Copyright © Szünet Rádió 2026 - Minden jog fenntartva.
          </p>
        </div>
      </div>

      <div
        className="absolute inset-x-0 bottom-0 h-3 bg-[linear-gradient(#008eff,#008eff)_0_0/100%_4px_no-repeat,linear-gradient(#ff1111,#ff1111)_0_4px/100%_8px_no-repeat]"
        aria-hidden="true"
      />
    </footer>
  )
}

export default FooterSection
