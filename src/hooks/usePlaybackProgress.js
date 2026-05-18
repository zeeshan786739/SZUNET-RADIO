import { useEffect, useRef, useState } from 'react'

function getTrackDurationSec(channelId) {
  const seed = (channelId ?? '').split('').reduce((total, char) => total + char.charCodeAt(0), 0)
  return 195 + (seed % 75)
}

export function usePlaybackProgress(isPlaying, channelId) {
  const [progress, setProgress] = useState(0)
  const elapsedRef = useRef(0)
  const durationRef = useRef(getTrackDurationSec(channelId))
  const rafRef = useRef(null)
  const lastTickRef = useRef(null)

  useEffect(() => {
    durationRef.current = getTrackDurationSec(channelId)
    elapsedRef.current = 0
    lastTickRef.current = null
    setProgress(0)
  }, [channelId])

  useEffect(() => {
    if (!isPlaying) {
      lastTickRef.current = null
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      return undefined
    }

    if (elapsedRef.current >= durationRef.current) {
      elapsedRef.current = 0
      setProgress(0)
    }

    function tick(now) {
      if (lastTickRef.current == null) lastTickRef.current = now
      const deltaSec = (now - lastTickRef.current) / 1000
      lastTickRef.current = now
      elapsedRef.current = Math.min(durationRef.current, elapsedRef.current + deltaSec)
      setProgress(elapsedRef.current / durationRef.current)

      if (elapsedRef.current < durationRef.current) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [isPlaying, channelId])

  return progress
}
