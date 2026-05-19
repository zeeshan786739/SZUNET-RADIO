import blueRing from '../assets/images/Ellipse 5.png'
import { cx } from '../utils/cx'

function EditorialBlueRing({ topVar = '--editorial-ellipse-top', className }) {
  return (
    <img
      className={cx(
        'pointer-events-none absolute left-auto z-[1] h-auto w-[var(--editorial-ellipse-size)] max-h-[min(140vh,calc(var(--editorial-ellipse-size)*814/713))] max-w-none object-contain object-right select-none [right:var(--editorial-ellipse-right)] [opacity:var(--editorial-ellipse-opacity)] [transform:translateX(var(--editorial-ellipse-translate-x,0px))]',
        className,
      )}
      src={blueRing}
      width={713}
      height={814}
      alt=""
      aria-hidden="true"
      style={{ aspectRatio: '713 / 814', top: `var(${topVar})` }}
    />
  )
}

export default EditorialBlueRing
