import blueRing from '../assets/images/Ellipse 5.png'

function EditorialBlueRing() {
  return (
    <img
      className="pointer-events-none absolute right-0 z-[1] h-[var(--editorial-ellipse-size)] w-auto max-h-[min(92vh,920px)] max-w-[min(52vw,720px)] translate-y-[var(--editorial-ellipse-offset-y)] object-contain object-right select-none [top:var(--editorial-ellipse-top)] [opacity:var(--editorial-ellipse-opacity)] max-[760px]:max-w-[min(72vw,640px)] max-[480px]:max-w-[min(88vw,480px)]"
      src={blueRing}
      width={713}
      height={814}
      alt=""
      aria-hidden="true"
    />
  )
}

export default EditorialBlueRing
