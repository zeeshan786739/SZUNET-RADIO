import playControl from '../assets/images/Group 32.png'
import volumeIcon from '../assets/images/Group 17.png'
import onAirBadge from '../assets/images/Group 27.png'
import likeIcon from '../assets/images/Group 41.png'
import dislikeIcon from '../assets/images/Group 42.png'
import volumeLine from '../assets/images/Line 1.png'
import volumeKnob from '../assets/images/Ellipse 1.png'
import { useEffect, useState } from 'react'
import { cx } from '../utils/cx'
import StreamSelector from '../components/StreamSelector'

const feedbackControls = [
  { label: 'Like this track', icon: likeIcon },
  { label: 'Dislike this track', icon: dislikeIcon },
]

function useNarrowPlayerBar() {
  const [narrow, setNarrow] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 560px)').matches,
  )

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 560px)')
    function update() {
      setNarrow(mq.matches)
    }
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return narrow
}

function PlayerBar({
  channel,
  isPlaying,
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

  return (
    <section
      className="fixed inset-x-0 bottom-0 z-50 min-h-[var(--player-height)] overflow-hidden border-t border-[#ff1515] bg-[#060633] pb-[env(safe-area-inset-bottom,0px)] shadow-[0_-12px_28px_rgba(0,0,0,0.36)]"
      aria-label={`Now playing: ${channel.playerName}. ${trackTitle}`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[#0057ff]" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-[env(safe-area-inset-bottom,0px)] left-0 h-1 w-[22%] bg-[#ff1010] max-[760px]:w-[34%]" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-[env(safe-area-inset-bottom,0px)] right-0 h-1 w-[17%] bg-[#0057ff] max-[760px]:w-[28%]" aria-hidden="true" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-[1] hidden -translate-x-1/2 -translate-y-1/2 place-items-center min-[861px]:grid">
        <img
          className="block h-auto w-[88px] object-contain"
          src={onAirBadge}
          alt="On air"
        />
      </div>

      <div
        className={cx(
          'relative z-[2] mx-auto grid min-h-[calc(var(--player-height)_-_env(safe-area-inset-bottom,0px))] w-[var(--page-width)] max-w-full grid-cols-[auto_auto_minmax(0,1fr)_auto] items-center gap-[clamp(8px,1.2vw,18px)] px-[clamp(10px,1.6vw,20px)] text-white [font-family:Arial,Helvetica,sans-serif]',
          'max-[860px]:grid-cols-[auto_auto_minmax(0,1fr)_auto] max-[860px]:gap-2.5 max-[860px]:px-2.5',
          'max-[560px]:gap-2 max-[560px]:py-1',
        )}
      >
        <button
          className="group relative inline-grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-full border border-[#ff1111] bg-[#090947] p-0 shadow-[inset_0_0_0_2px_rgba(255,17,17,0.12),0_0_18px_rgba(255,17,17,0.18)] transition-[transform,box-shadow,background] duration-150 hover:scale-[1.05] hover:bg-[#11115a] hover:shadow-[inset_0_0_0_2px_rgba(255,17,17,0.2),0_0_22px_rgba(255,17,17,0.28)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white max-[700px]:h-10 max-[700px]:w-10"
          type="button"
          aria-label={isPlaying ? 'Pause radio' : 'Play radio'}
          aria-pressed={isPlaying}
          onClick={onTogglePlay}
        >
          <img
            className={cx(
              'h-[42px] w-[42px] object-contain transition-[opacity,transform] duration-150 max-[700px]:h-10 max-[700px]:w-10',
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

        <div className="relative h-[calc(var(--player-height)_-_10px)] w-[54px] shrink-0 overflow-hidden border-x border-[rgba(255,255,255,0.12)] bg-[#020225] max-[700px]:h-[48px] max-[700px]:w-[44px] max-[560px]:h-[44px] max-[560px]:w-[38px]">
          <img
            className="h-full w-full object-cover object-top"
            src={channel.portrait}
            alt=""
            aria-hidden="true"
          />
          <span className="absolute inset-x-0 bottom-0 h-3 bg-gradient-to-t from-[rgba(0,0,0,0.58)] to-transparent" aria-hidden="true" />
        </div>

        <div className="grid min-w-0 grid-cols-[auto_minmax(0,1fr)] items-center gap-[clamp(8px,1vw,14px)] max-[560px]:grid-cols-1 max-[560px]:gap-0.5">
          <div className="flex items-center gap-1.5 max-[560px]:hidden" aria-label="Track feedback">
            {feedbackControls.map((control) => (
              <button
                className="inline-grid h-8 w-8 cursor-pointer place-items-center rounded-full border border-transparent bg-transparent p-0 transition-[background,border-color,transform] duration-150 hover:scale-105 hover:border-[rgba(255,255,255,0.22)] hover:bg-[rgba(255,255,255,0.08)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                type="button"
                aria-label={control.label}
                title={control.label}
                key={control.label}
              >
                <img className="h-[17px] w-[17px] object-contain" src={control.icon} alt="" aria-hidden="true" />
              </button>
            ))}
          </div>

          <div className="min-w-0 max-w-[clamp(170px,28vw,390px)] overflow-hidden">
            <div className="flex min-w-0 items-center gap-2">
              <span className="hidden shrink-0 border border-[rgba(255,255,255,0.14)] bg-white px-1.5 py-0.5 text-[10px] font-black uppercase leading-none text-[#071052] min-[1040px]:inline-flex">
                Now
              </span>
              <p className="m-0 min-w-0 truncate text-[clamp(11px,1vw,14px)] font-black uppercase leading-none text-white">
                {channel.artist}
              </p>
            </div>
            <p className="m-0 mt-1 truncate text-[clamp(10px,0.9vw,13px)] font-black uppercase leading-none text-white max-[560px]:mt-0.5 max-[560px]:text-[9px]">
              {channel.track}
            </p>
          </div>
        </div>

        <div
          className={cx(
            'flex shrink-0 items-center justify-end gap-[clamp(8px,1vw,14px)]',
            'max-[860px]:max-w-[min(40vw,190px)] max-[560px]:max-w-[86px]',
          )}
        >
          <StreamSelector
            className="order-2 w-[clamp(78px,9vw,112px)] max-[860px]:w-full max-[860px]:min-w-[66px] max-[560px]:min-w-0"
            compact={narrowBar}
            onSelect={onChangeStream}
            selectedStreamId={selectedStreamId}
            streams={streams}
          />

          <div className="order-1 flex items-center gap-2 max-[860px]:hidden">
            <img className="h-4 w-[18px] shrink-0 object-contain" src={volumeIcon} alt="" aria-hidden="true" />
            <label
              className="relative block h-8 w-[clamp(88px,10vw,142px)] min-w-[88px] max-w-[142px]"
              style={{ '--volume': `${volume}%` }}
            >
              <span className="sr-only">Volume</span>
              <span
                className="absolute left-0 top-1/2 h-[3px] -translate-y-1/2 bg-[#ff1111]"
                style={{ width: `${volume}%` }}
                aria-hidden="true"
              />
              <img
                className="absolute inset-x-0 top-1/2 h-[3px] w-full -translate-y-1/2 opacity-90"
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
              <input
                className="absolute inset-0 m-0 h-full w-full cursor-pointer opacity-0 [appearance:none] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white [&::-webkit-slider-thumb]:appearance-none [&::-moz-range-thumb]:appearance-none"
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(event) => onChangeVolume(Number(event.target.value))}
              />
            </label>
            <span className="w-10 text-right text-[9px] font-black uppercase leading-none text-[rgba(255,255,255,0.72)]">
              {activeStream?.label ?? ''}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PlayerBar
