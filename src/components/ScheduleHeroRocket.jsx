import { motion, useReducedMotion } from 'framer-motion'
import rocketImg from '../assets/images/Layer_3.png'
import vector2 from '../assets/images/Vector (2).png'
import vector4 from '../assets/images/Vector (4).png'

/** Between cards 1 & 2 of the hero schedule: rocket, beam, Vector (2)/(4) smoke — pointer-events-none, soft blend for legibility. */
export default function ScheduleHeroRocket() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[3] overflow-hidden rounded-[inherit]"
      aria-hidden="true"
    >
      {/* Center line on boundary between column 1 and 2 (8 equal columns) */}
      <div
        className="absolute bottom-0 left-[12.5%] top-0 w-[clamp(4px,0.65vw,8px)] -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,transparent_0%,rgba(92,245,223,0.1)_10%,rgba(92,245,223,0.48)_28%,rgba(92,245,223,0.58)_48%,rgba(92,245,223,0.42)_72%,rgba(92,245,223,0.14)_94%,transparent)] opacity-[0.52] mix-blend-soft-light max-[560px]:opacity-[0.46]"
      />

      <motion.img
        className="absolute left-[12.5%] top-[clamp(2px,0.6vw,10px)] z-[2] w-[clamp(38px,3.6vw,54px)] max-w-none -translate-x-1/2 drop-shadow-[0_4px_12px_rgba(0,0,0,0.2)] max-[560px]:w-[34px]"
        src={rocketImg}
        alt=""
        animate={
          prefersReducedMotion ? undefined : { y: [-1, 2.5, -1], rotate: [-0.35, 0.35, -0.35] }
        }
        transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut' }}
      />

      <img
        className="absolute left-[12.5%] top-[clamp(52px,12%,120px)] w-[min(132px,19vw)] max-w-none -translate-x-1/2 object-contain opacity-[0.32] mix-blend-soft-light max-[560px]:top-[56px] max-[560px]:w-[100px] max-[560px]:opacity-[0.28]"
        src={vector2}
        alt=""
      />

      <img
        className="absolute bottom-[2px] left-[12.5%] w-[min(200px,30vw)] max-w-[min(88%,260px)] -translate-x-1/2 object-contain opacity-[0.34] mix-blend-multiply max-[560px]:w-[min(180px,46vw)] max-[560px]:opacity-[0.28]"
        src={vector4}
        alt=""
      />
    </div>
  )
}
