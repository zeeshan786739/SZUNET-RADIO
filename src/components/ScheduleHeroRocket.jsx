import { motion, useReducedMotion } from 'framer-motion'
import rocketImg from '../assets/images/Layer_3.png'
import vector2 from '../assets/images/Vector (2).png'
import vector4 from '../assets/images/Vector (4).png'

/** Rocket in red zone; cyan beam + smoke cross the white timeline (client reference). */
export default function ScheduleHeroRocket() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[4] overflow-visible"
      aria-hidden="true"
    >
      {/* Exhaust beam — rocket base through timeline */}
      <motion.div
        className="absolute bottom-0 left-[var(--launch-x,70.15%)] top-[clamp(42px,5.2vw,62px)] w-[clamp(6px,0.75vw,10px)] -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,rgba(92,245,223,0.2)_0%,rgba(92,245,223,0.55)_22%,rgba(92,245,223,0.72)_48%,rgba(92,245,223,0.58)_72%,rgba(92,245,223,0.35)_92%,rgba(92,245,223,0.12)_100%)] opacity-[0.72] mix-blend-normal max-sm:top-[clamp(38px,4.8vw,52px)] max-sm:opacity-[0.65]"
        aria-hidden="true"
      />

      {/* Mid trail puff */}
      <img
        className="absolute left-[var(--launch-x,70.15%)] top-[clamp(44px,5.4vw,58px)] z-[1] w-[min(160px,22vw)] max-w-none -translate-x-1/2 object-contain opacity-[0.38] mix-blend-multiply max-sm:top-[clamp(40px,5vw,52px)] max-sm:w-[min(120px,28vw)] max-sm:opacity-[0.32]"
        src={vector2}
        alt=""
      />

      {/* Rocket — fully inside red section */}
      <motion.img
        className="absolute left-[var(--launch-x,70.15%)] top-[clamp(6px,0.75vw,14px)] z-[3] w-[clamp(42px,4.2vw,58px)] max-w-none -translate-x-1/2 drop-shadow-[0_6px_16px_rgba(0,0,0,0.28)] max-sm:top-[clamp(4px,0.65vw,10px)] max-sm:w-[38px] xl:w-[clamp(48px,3.5vw,64px)] 2xl:w-16"
        src={rocketImg}
        alt=""
        animate={
          prefersReducedMotion ? undefined : { y: [-1.5, 2, -1.5], rotate: [-0.4, 0.4, -0.4] }
        }
        transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Smoke plume — spreads across timeline bar */}
      <img
        className="absolute bottom-[-2px] left-[var(--launch-x,70.15%)] z-[2] w-[min(340px,40vw)] max-w-[min(92%,420px)] -translate-x-1/2 object-contain object-bottom opacity-[0.48] mix-blend-multiply max-sm:bottom-0 max-sm:w-[min(260px,62vw)] max-sm:opacity-[0.42] xl:w-[min(400px,32vw)] xl:max-w-[480px] 2xl:w-[480px]"
        src={vector4}
        alt=""
      />
    </div>
  )
}
