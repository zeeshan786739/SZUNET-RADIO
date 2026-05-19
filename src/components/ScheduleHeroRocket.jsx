import { motion, useReducedMotion } from 'framer-motion'
import rocketImg from '../assets/images/Layer_3.png'
import vector2 from '../assets/images/Vector (2).png'
import vector4 from '../assets/images/Vector (4).png'

/** Smoke + exhaust behind timeline ruler (z below schedule content). */
export function ScheduleHeroRocketBackdrop() {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-[1] overflow-visible max-lg:inset-x-0 max-lg:top-[var(--hero-schedule-split)] max-lg:bottom-[calc(var(--hero-schedule-white-extend)+clamp(46px,4.2vw,58px))] max-lg:overflow-visible"
      aria-hidden="true"
    >
      <motion.div
        className="absolute bottom-0 left-[var(--launch-x,75%)] top-[clamp(-48px,-2.4vw,-30px)] w-[clamp(6px,0.75vw,10px)] -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,rgba(92,245,223,0.2)_0%,rgba(92,245,223,0.55)_22%,rgba(92,245,223,0.72)_48%,rgba(92,245,223,0.58)_72%,rgba(92,245,223,0.35)_92%,rgba(92,245,223,0.12)_100%)] opacity-[0.72] mix-blend-normal max-lg:top-[clamp(2px,0.4vw,4px)] max-lg:bottom-[clamp(28px,6vw,36px)] max-lg:h-auto max-sm:opacity-[0.65]"
        aria-hidden="true"
      />
      <img
        className="absolute bottom-[calc(-1*var(--hero-schedule-white-extend)-clamp(10px,1.15vw,18px))] left-[var(--launch-x,75%)] w-[min(280px,34vw)] max-w-none -translate-x-1/2 object-contain object-bottom opacity-[0.9] mix-blend-multiply max-lg:top-1/2 max-lg:bottom-auto max-lg:h-[calc(var(--hero-schedule-card-size)*1.15)] max-lg:w-[min(240px,56vw)] max-lg:-translate-x-1/2 max-lg:-translate-y-1/2 max-lg:object-center max-sm:w-[min(220px,52vw)] max-sm:opacity-[0.88] xl:w-[min(320px,30vw)] 2xl:w-[min(360px,28vw)]"
        src={vector2}
        alt=""
      />
      <img
        className="absolute bottom-[calc(-1*var(--hero-schedule-white-extend))] left-[var(--launch-x,75%)] w-[min(340px,40vw)] max-w-[min(92%,420px)] -translate-x-1/2 object-contain object-bottom opacity-[0.48] mix-blend-multiply max-lg:top-1/2 max-lg:bottom-auto max-lg:h-[calc(var(--hero-schedule-card-size)*1.2)] max-lg:w-[min(280px,64vw)] max-lg:-translate-y-1/2 max-lg:object-center max-sm:w-[min(260px,60vw)] max-sm:opacity-[0.4] xl:w-[min(400px,32vw)] xl:max-w-[480px] 2xl:w-[480px]"
        src={vector4}
        alt=""
      />
    </motion.div>
  )
}

/** Rocket on top of cards and timeline. */
export default function ScheduleHeroRocket() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[4] overflow-visible"
      aria-hidden="true"
    >
      <motion.img
        className="absolute left-[var(--launch-x,75%)] top-[clamp(-70px,-6.75vw,-62px)] w-[clamp(42px,4.2vw,58px)] max-w-none -translate-x-1/2 drop-shadow-[0_6px_16px_rgba(0,0,0,0.28)] max-lg:top-[calc(var(--hero-schedule-split)-clamp(142px,29.5vw,164px))] max-lg:w-[clamp(40px,9vw,50px)] max-sm:top-[calc(var(--hero-schedule-split)-clamp(136px,28.5vw,158px))] max-sm:w-[42px] xl:w-[clamp(48px,3.5vw,64px)] 2xl:w-16"
        src={rocketImg}
        alt=""
        animate={
          prefersReducedMotion ? undefined : { y: [-1.5, 2, -1.5], rotate: [-0.4, 0.4, -0.4] }
        }
        transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
