/** Premium easing curves (cinematic / expo). */
export const heroEase = {
  out: [0.22, 1, 0.36, 1],
  dramatic: [0.16, 1, 0.3, 1],
  soft: [0.33, 1, 0.68, 1],
  camera: [0.25, 0.46, 0.45, 0.94],
  settle: [0.34, 1.25, 0.64, 1],
}

/** Last card (Prime) ≈ 0.54s delay + 1.35s motion */
export const HERO_INTRO_DURATION_MS = 2200
export const HERO_LOADER_DURATION_MS = 1600

export function getCardDelay(index, isFeature) {
  if (isFeature) return 0.54
  const asymmetric = [0.26, 0.4, null, 0.44, 0.3]
  return asymmetric[index] ?? 0.3 + index * 0.08
}

function getCardMotionDuration(index, isFeature) {
  return isFeature ? 1.35 : 1.08 + Math.abs(index - 2) * 0.04
}

function getCardMotionTransition(index, isFeature) {
  return {
    delay: getCardDelay(index, isFeature),
    duration: getCardMotionDuration(index, isFeature),
    times: [0, 0.52, 0.8, 1],
    ease: [heroEase.dramatic, heroEase.settle, heroEase.soft, heroEase.out],
  }
}

/** Blur veil fades in sync with card reveal (GPU-friendly vs animating filter on card) */
export function getCardBlurVeilTransition(index, isFeature) {
  const delay = getCardDelay(index, isFeature)
  const motionDuration = getCardMotionDuration(index, isFeature)

  return {
    delay,
    duration: motionDuration * 0.88,
    ease: heroEase.out,
  }
}

/** Layer 1 — ambient atmosphere */
export const heroAtmosphereVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.9, ease: heroEase.soft },
  },
}

/** Hero stage — smooth single pass, holds final frame (no intro→idle snap) */
export const heroCameraVariants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  intro: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.35,
      ease: heroEase.camera,
      delay: 0.05,
    },
  },
}

export const heroRibbonVariants = {
  hidden: { opacity: 0, scale: 1.03, x: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { delay: 0.14, duration: 1.05, ease: heroEase.dramatic },
  },
}

export const heroHeaderVariants = {
  hidden: { opacity: 0, y: -28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.32,
      duration: 0.82,
      ease: heroEase.out,
    },
  },
}

export const heroHeadlineVariants = {
  hidden: { opacity: 0, x: 48, y: -12 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      delay: 1.05,
      duration: 0.88,
      ease: heroEase.dramatic,
    },
  },
}

/**
 * Cinematic card assembly — transform/opacity only; blur via overlay in ChannelCard.
 * Stays on `visible` after play (no settled handoff).
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
          y: 140,
          x: 0,
          scale: 0.62,
          rotate: -3,
        }
      }

      return {
        opacity: 0,
        y: 130 + spread * 20,
        x: side * (80 + spread * 36),
        scale: 0.8 - spread * 0.03,
        rotate: offset * 6,
      }
    },
    visible: (index) => {
      const offset = index - 2
      const spread = Math.abs(offset)
      const transition = getCardMotionTransition(index, isFeature)

      if (isFeature) {
        return {
          opacity: [0, 0.5, 1, 1],
          y: [140, -8, 2, 0],
          x: [0, 0, 0, 0],
          scale: [0.62, 1.028, 0.996, 1],
          rotate: [-3, 0.5, 0, 0],
          transition,
        }
      }

      return {
        opacity: [0, 0.48, 1, 1],
        y: [130 + spread * 20, -8, 2, 0],
        x: [
          (offset < 0 ? -1 : 1) * (80 + spread * 36),
          (offset < 0 ? -1 : 1) * 6,
          0,
          0,
        ],
        scale: [0.8 - spread * 0.03, 1.022, 0.996, 1],
        rotate: [offset * 6, offset * 0.6, 0, 0],
        transition,
      }
    },
  }
}

/** Light sweep across card portrait during intro */
export const heroLightSweepTransition = (index, isFeature) => ({
  delay: getCardDelay(index, isFeature) + 0.18,
  duration: 0.9,
  ease: heroEase.out,
})
