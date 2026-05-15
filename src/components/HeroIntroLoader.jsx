import { motion } from 'framer-motion'

function HeroIntroLoader() {
  return (
    <motion.div
      className="pointer-events-none absolute left-1/2 top-[var(--hero-loader-top)] z-[5] -translate-x-1/2 -translate-y-1/2"
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
    >
      <motion.div
        className="relative h-[var(--hero-loader-size)] w-[var(--hero-loader-size)]"
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.div
          className="absolute inset-0 rounded-full bg-white/75 shadow-[0_8px_32px_rgba(8,8,51,0.12)] backdrop-blur-[2px]"
          aria-hidden="true"
        />
        <motion.div
          className="absolute inset-0 rounded-full border-[3px] border-[rgba(8,8,51,0.1)]"
          aria-hidden="true"
        />
        <motion.div
          className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#ff1111] border-r-[#ff1111]/85"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.95, repeat: Infinity, ease: 'linear' }}
          aria-hidden="true"
        />
        <motion.div
          className="absolute inset-[7px] rounded-full border-[2px] border-transparent border-b-[#0057ff] border-l-[#0057ff]/45"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.35, repeat: Infinity, ease: 'linear' }}
          aria-hidden="true"
        />
        <motion.div
          className="absolute inset-[18px] rounded-full bg-[radial-gradient(circle,rgba(255,17,17,0.14),transparent_70%)]"
          aria-hidden="true"
        />
        <div className="absolute inset-0 grid place-items-center">
          <span className="block h-2 w-2 rounded-full bg-[#ff1111] shadow-[0_0_12px_rgba(255,17,17,0.55)]" />
        </div>
      </motion.div>
    </motion.div>
  )
}

export default HeroIntroLoader
