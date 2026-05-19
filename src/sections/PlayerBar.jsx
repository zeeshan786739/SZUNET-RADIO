import playControl from '../assets/images/Group 32.png'
import volumeIcon from '../assets/images/Group 17.png'
import onAirBadge from '../assets/images/Group 27.png'
import likeIcon from '../assets/images/Group 41.png'
import dislikeIcon from '../assets/images/Group 42.png'
import volumeLine from '../assets/images/Line 1.png'
import volumeKnob from '../assets/images/Ellipse 1.png'
import { useCallback, useEffect, useRef, useState } from 'react'
import { cx } from '../utils/cx'
import StreamSelector from '../components/StreamSelector'
import StyledTrackLabel from '../components/StyledTrackLabel'
import { BP, mediaMax } from '../utils/breakpoints'

const feedbackControls = [
  { label: 'Like this track', icon: likeIcon },
  { label: 'Dislike this track', icon: dislikeIcon },
]

/** Match hero card focal points so the square thumbnail fills edge-to-edge. */
const playerPortraitFocus = {
  electric: 'object-[center_32%]',
  oldschool: 'object-[center_28%]',
  prime: 'object-[center_30%]',
  power: 'object-[center_34%]',
  relax: 'object-[center_42%]',
}

function useNarrowPlayerBar() {
  const [narrow, setNarrow] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(mediaMax(BP.sm)).matches,
  )

  useEffect(() => {
    const mq = window.matchMedia(mediaMax(BP.sm))
    function update() {
      setNarrow(mq.matches)
    }
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return narrow
}

function VolumeSlider({ volume, onChangeVolume }) {
  const trackRef = useRef(null)

  const setVolumeFromPointer = useCallback(
    (clientX) => {
      const track = trackRef.current
      if (!track) return

      const { left, width } = track.getBoundingClientRect()
      if (width <= 0) return

      const next = Math.round(((clientX - left) / width) * 100)
      onChangeVolume(Math.min(100, Math.max(0, next)))
    },
    [onChangeVolume],
  )

  function handlePointerDown(event) {
    event.preventDefault()
    trackRef.current?.setPointerCapture(event.pointerId)
    setVolumeFromPointer(event.clientX)
  }

  function handlePointerMove(event) {
    if (!trackRef.current?.hasPointerCapture(event.pointerId)) return
    setVolumeFromPointer(event.clientX)
  }

  function handlePointerUp(event) {
    trackRef.current?.releasePointerCapture(event.pointerId)
  }

  function handleKeyDown(event) {
    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      event.preventDefault()
      onChangeVolume(Math.min(100, volume + 5))
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      event.preventDefault()
      onChangeVolume(Math.max(0, volume - 5))
    } else if (event.key === 'Home') {
      event.preventDefault()
      onChangeVolume(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      onChangeVolume(100)
    }
  }

  return (
    <div
      ref={trackRef}
      role="slider"
      tabIndex={0}
      aria-label="Volume"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={volume}
      className="relative block h-8 w-[clamp(88px,9vw,160px)] min-w-[88px] max-w-[160px] cursor-pointer touch-none select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      style={{ '--volume': `${volume}%` }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onKeyDown={handleKeyDown}
    >
      <span
        className="absolute left-0 top-1/2 h-[3px] -translate-y-1/2 bg-[#ff1111]"
        style={{ width: `${volume}%` }}
        aria-hidden="true"
      />
      <img
        className="pointer-events-none absolute inset-x-0 top-1/2 h-[3px] w-full -translate-y-1/2 opacity-90"
        src={volumeLine}
        alt=""
        aria-hidden="true"
      />
      <img
        className="pointer-events-none absolute left-[var(--volume)] top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2"
        src={volumeKnob}
        alt=""
        aria-hidden="true"
      />
    </div>
  )
}

function PlayerBar({
  channel,
  isPlaying,
  playbackProgress = 0,
  onChangeStream,
  onChangeVolume,
  onTogglePlay,
  selectedStreamId,
  streams,
  volume,
}) {
  const narrowBar = useNarrowPlayerBar()
  const trackTitle = `${channel.artist} - ${channel.track}`
  const activeStream = streams.find((stream) => stream.id === selectedStreamId) ?? streams[0]
  const showPlaybackProgress = isPlaying || playbackProgress > 0
  const progressPercent = `${Math.min(100, Math.max(0, playbackProgress * 100))}%`

  return (
    <section
      className="fixed inset-x-0 bottom-0 z-50 min-h-[var(--player-height)] overflow-visible border-t border-[#ff1515] bg-[#060633] pb-[env(safe-area-inset-bottom,0px)] shadow-[0_-12px_28px_rgba(0,0,0,0.36)]"
      aria-label={`Now playing: ${channel.playerName}. ${trackTitle}`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[#0057ff]" aria-hidden="true" />
      {showPlaybackProgress ? (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-[env(safe-area-inset-bottom,0px)] z-[4] h-1 bg-[rgba(255,17,17,0.22)]"
          role="progressbar"
          aria-label="Track progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(playbackProgress * 100)}
        >
          <span
            className="block h-full bg-[#ff1111] transition-[width] duration-100 ease-linear"
            style={{ width: progressPercent }}
          />
        </div>
      ) : null}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-[1] hidden -translate-x-1/2 -translate-y-1/2 place-items-center player:grid">
        <img
          className="block h-auto w-[88px] object-contain"
          src={onAirBadge}
          alt="On air"
        />
      </div>

      <div
        className="pointer-events-none absolute top-0 bottom-[env(safe-area-inset-bottom,0px)] left-[calc(50%+var(--player-on-air-half))] right-[calc((100vw-var(--page-width))/2+var(--player-controls-inset))] z-[2] hidden items-center justify-center player:flex"
        aria-hidden="true"
      >
        <p
          className="m-0 origin-center scale-y-[1.48] whitespace-nowrap font-['Roboto_Condensed','Arial_Narrow',sans-serif] text-[clamp(11px,1.05vw,16px)] font-bold uppercase leading-none tracking-[0.04em] [text-shadow:0_1px_6px_rgba(0,0,0,0.35)] [font-synthesis:none]"
          style={{ color: channel.trackLabelAccent ?? '#ff1111' }}
        >
          {channel.playerName}
        </p>
      </div>

      <div className="page-gutter-x">
        <div
          className={cx(
            'page-container relative z-[2] grid min-h-[calc(var(--player-height)_-_env(safe-area-inset-bottom,0px))] grid-cols-[auto_minmax(0,1fr)] items-center gap-0 py-[clamp(6px,0.5vw,10px)] text-white xl:py-3',
            'max-sm:py-1.5',
          )}
        >
        <button
          className="group relative inline-grid h-12 w-12 shrink-0 cursor-pointer place-items-center rounded-full border border-[#ff1111] bg-[#090947] p-0 shadow-[inset_0_0_0_2px_rgba(255,17,17,0.12),0_0_18px_rgba(255,17,17,0.18)] transition-[transform,box-shadow,background] duration-150 hover:scale-[1.05] hover:bg-[#11115a] hover:shadow-[inset_0_0_0_2px_rgba(255,17,17,0.2),0_0_22px_rgba(255,17,17,0.28)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white max-md:h-11 max-md:w-11"
          type="button"
          aria-label={isPlaying ? 'Pause radio' : 'Play radio'}
          aria-pressed={isPlaying}
          onClick={onTogglePlay}
        >
          <img
            className={cx(
              'h-[44px] w-[44px] object-contain transition-[opacity,transform] duration-150 max-md:h-[42px] max-md:w-[42px]',
              isPlaying && 'scale-[0.72] opacity-0',
            )}
            src={playControl}
            alt=""
            aria-hidden="true"
          />
          <span
            className={cx(
              'absolute left-1/2 top-1/2 grid h-5 w-5 -translate-x-1/2 -translate-y-1/2 scale-[0.8] grid-cols-2 gap-1.5 opacity-0 transition-[opacity,transform] duration-150',
              isPlaying && 'scale-100 opacity-100',
            )}
            aria-hidden="true"
          >
            <span className="rounded-sm bg-[#ff1111]" />
            <span className="rounded-sm bg-[#ff1111]" />
          </span>
        </button>

        <div
          className={cx(
            'flex min-w-0 flex-1 items-center gap-[clamp(8px,1.2vw,18px)]',
            'ml-[clamp(48px,5.6vw,88px)] max-player:ml-[clamp(40px,4.8vw,64px)] max-sm:ml-8 max-sm:gap-2',
          )}
        >
        <div
          className="relative flex aspect-square h-[calc(var(--player-height)-12px)] w-[calc(var(--player-height)-12px)] shrink-0 items-center justify-center overflow-hidden border border-[rgba(255,255,255,0.14)] bg-[#020225] max-md:h-[52px] max-md:w-[52px] max-sm:h-[48px] max-sm:w-[48px]"
          aria-hidden="true"
        >
          <img
            className={cx(
              'block h-full w-full object-cover',
              playerPortraitFocus[channel.id] ?? 'object-center',
            )}
            src={channel.portrait}
            alt=""
          />
        </div>

        <div className="grid min-w-0 flex-1 grid-cols-[auto_minmax(0,1fr)] items-center gap-[clamp(8px,1vw,14px)] max-sm:grid-cols-1 max-sm:gap-0.5">
          <div className="flex items-center gap-0.5 max-sm:hidden" aria-label="Track feedback">
            {feedbackControls.map((control) => (
              <button
                className="inline-grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-transparent bg-transparent p-0 transition-[background,border-color,transform] duration-150 hover:scale-105 hover:border-[rgba(255,255,255,0.22)] hover:bg-[rgba(255,255,255,0.08)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                type="button"
                aria-label={control.label}
                title={control.label}
                key={control.label}
              >
                <img className="h-[20px] w-[20px] object-contain" src={control.icon} alt="" aria-hidden="true" />
              </button>
            ))}
          </div>

          <div className="min-w-0 max-w-[clamp(170px,24vw,480px)] overflow-hidden">
            {channel.trackLabelAccent ? (
              <StyledTrackLabel
                artist={channel.artist}
                track={channel.track}
                accent={channel.trackLabelAccent}
                plain
                className="min-w-0 max-w-full"
              />
            ) : (
              <>
                <p className="m-0 min-w-0 truncate text-[clamp(11px,1vw,14px)] font-black uppercase leading-none text-white">
                  {channel.artist}
                </p>
                <p className="m-0 mt-1 truncate text-[clamp(10px,0.9vw,13px)] font-black uppercase leading-none text-white max-sm:mt-0.5 max-sm:text-[9px]">
                  {channel.track}
                </p>
              </>
            )}
          </div>
        </div>

        <div
          className={cx(
            'flex shrink-0 items-center justify-end gap-[clamp(8px,1vw,14px)]',
            'max-player:max-w-[min(40vw,190px)] max-sm:max-w-[86px]',
          )}
        >
          <StreamSelector
            className="order-2 w-[clamp(78px,9vw,112px)] max-player:w-full max-player:min-w-[66px] max-sm:min-w-0"
            compact={narrowBar}
            onSelect={onChangeStream}
            selectedStreamId={selectedStreamId}
            streams={streams}
          />

          <div className="order-1 flex items-center gap-2 max-player:hidden">
            <img className="h-4 w-[18px] shrink-0 object-contain" src={volumeIcon} alt="" aria-hidden="true" />
            <VolumeSlider volume={volume} onChangeVolume={onChangeVolume} />
          </div>
        </div>
        </div>
        </div>
      </div>
    </section>
  )
}

export default PlayerBar
