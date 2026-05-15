import blueRing from '../assets/images/Ellipse 5.png'

function EditorialBlueRing() {
  return (
    <img
      className="pointer-events-none absolute left-[50%] top-[13%]  z-[1] h-auto w-[var(--editorial-ellipse-size)] max-h-[min(96svh,calc(var(--editorial-ellipse-size)*814/713))] max-w-none object-contain object-right select-none [right:var(--editorial-ellipse-right)] [top:var(--editorial-ellipse-top)] [opacity:var(--editorial-ellipse-opacity)]"
      src={blueRing}
      width={713}
      height={814}
      alt=""
      aria-hidden="true"
      style={{ aspectRatio: '713 / 814' }}
    />
  )
}

export default EditorialBlueRing
