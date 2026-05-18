/** Width breakpoints (px) — match @theme in index.css */
export const BP = {
  xs: 380,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1680,
  hero: 761,
  playerWide: 861,
}

export function mediaMax(px) {
  return `(max-width: ${px - 1}px)`
}

export function mediaMin(px) {
  return `(min-width: ${px}px)`
}
