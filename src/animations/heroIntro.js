/** Premium easing curves (cinematic / expo). */
export const heroEase = {
  out: [0.22, 1, 0.36, 1],
  dramatic: [0.16, 1, 0.3, 1],
  soft: [0.33, 1, 0.68, 1],
  camera: [0.25, 0.46, 0.45, 0.94],
  settle: [0.34, 1.25, 0.64, 1],
}

export const HERO_INTRO_DURATION_MS = 3200
/** Circular loader hides once cards begin assembling */
export const HERO_LOADER_DURATION_MS = 1900

/** Layer 1 — ambient atmosphere */
export const heroAtmosphereVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.9, ease: heroEase.soft },
  },
}

/** Subtle cinematic camera on the hero stage */
export const heroCameraVariants = {
  hidden: {
    opacity: 0,
    scale: 0.985,
    y: 18,
  },
  intro: {
    opacity: 1,
    scale: [0.985, 1.012, 1],
    y: [18, -5, 0],
    transition: {
      duration: 1.15,
      ease: heroEase.camera,
      scale: { duration: 2.8, times: [0, 0.55, 1], ease: heroEase.soft },
      y: { duration: 2.6, times: [0, 0.5, 1], ease: heroEase.camera },
    },
  },
  idle: {
    opacity: 1,
    scale: 1,
    y: [0, -3, 0],
    transition: {
      duration: 7,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

export const heroRibbonVariants = {
  hidden: { opacity: 0, scale: 1.04, x: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { delay: 0.14, duration: 1.05, ease: heroEase.dramatic },
  },
}

export const heroHeaderVariants = {
  hidden: { opacity: 0, y: -32, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'none',
    transition: {
      delay: 0.32,
      duration: 0.82,
      ease: heroEase.out,
      filter: { duration: 0.5 },
    },
  },
}

export const heroHeadlineVariants = {
  hidden: { opacity: 0, x: 56, y: -16, filter: 'blur(12px)' },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    filter: 'none',
    transition: {
      delay: 1.18,
      duration: 0.88,
      ease: heroEase.dramatic,
      filter: { duration: 0.55 },
    },
  },
}

function getCardDelay(index, isFeature) {
  if (isFeature) return 0.54
  const asymmetric = [0.26, 0.4, null, 0.44, 0.3]
  return asymmetric[index] ?? 0.3 + index * 0.08
}

function getSettleTransition(index, isFeature) {
  const delay = getCardDelay(index, isFeature)
  const duration = isFeature ? 1.38 : 1.12 + Math.abs(index - 2) * 0.04

  return {
    delay,
    duration,
    times: [0, 0.68, 0.86, 1],
    ease: [heroEase.dramatic, heroEase.settle, heroEase.soft, heroEase.out],
  }
}

/**
 * Cinematic card assembly — final frame is identity (layout unchanged).
 */
export function getHeroCardVariants(isFeature) {
  return {
    hidden: (index) => {
      const offset = index - 2
      const side = offset === 0 ? 0 : offset < 0 ? -1 : 1
      const spread = Math.abs(offset)

      if (isFeature) {
        return {
          opacity: 0,
          y: 160,
          x: 0,
          scale: 0.58,
          rotate: -4,
          filter: 'blur(18px) saturate(0.85) brightness(1.08)',
        }
      }

      return {
        opacity: 0,
        y: 150 + spread * 22,
        x: side * (95 + spread * 42),
        scale: 0.78 - spread * 0.035,
        rotate: offset * 7,
        filter: 'blur(14px) saturate(0.88)',
      }
    },
    visible: (index) => {
      const offset = index - 2
      const spread = Math.abs(offset)
      const transition = getSettleTransition(index, isFeature)

      if (isFeature) {
        return {
          opacity: [0, 0.55, 1, 1],
          y: [160, -14, 5, 0],
          x: [0, 0, 0, 0],
          scale: [0.58, 1.045, 0.992, 1],
          rotate: [-4, 0.8, 0, 0],
          filter: [
            'blur(18px) saturate(0.85) brightness(1.08)',
            'blur(5px) saturate(0.95)',
            'blur(0px) saturate(1)',
            'none',
          ],
          transition,
        }
      }

      return {
        opacity: [0, 0.5, 1, 1],
        y: [150 + spread * 22, -10, 3, 0],
        x: [
          (offset < 0 ? -1 : 1) * (95 + spread * 42),
          (offset < 0 ? -1 : 1) * 8,
          0,
          0,
        ],
        scale: [0.78 - spread * 0.035, 1.03, 0.994, 1],
        rotate: [offset * 7, offset * 0.8, 0, 0],
        filter: ['blur(14px) saturate(0.88)', 'blur(4px)', 'none', 'none'],
        transition,
      }
    },
    /** Locked final frame — variant name avoids per-render animate objects resetting motion */
    settled: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      rotate: 0,
      filter: 'none',
      transition: { duration: 0.35, ease: heroEase.out },
    },
    breathe: (index) => {
      const drift = index - 2
      const yAmp = Math.abs(drift) === 0 ? 2.5 : 3.5 + Math.abs(drift) * 0.6

      return {
        opacity: 1,
        y: [0, -yAmp, 0],
        x: 0,
        scale: 1,
        rotate: 0,
        filter: 'none',
        transition: {
          y: {
            duration: 5.2 + Math.abs(drift) * 0.35,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.2 + Math.abs(drift) * 0.12,
          },
        },
      }
    },
  }
}

/** Light sweep across card portrait during intro */
export const heroLightSweepTransition = (index, isFeature) => ({
  delay: getCardDelay(index, isFeature) + 0.22,
  duration: 0.95,
  ease: heroEase.out,
})
