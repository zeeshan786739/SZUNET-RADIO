import { useEffect, useId, useRef, useState } from 'react'
import { cx } from '../utils/cx'

function shortBitrateLabel(label) {
  const t = label.replace(/\s+/g, ' ').trim()
  const match = t.match(/^(\d+)\s*kb\/s$/i)
  if (match) return `${match[1]}K`
  return t
}

/**
 * Stream quality control for the player bar.
 * — Multiple streams: custom listbox (designed), opens above the bar.
 * — Single stream: compact read-only chip (same visual weight as the control).
 */
export default function StreamSelector({
  streams,
  selectedStreamId,
  onSelect,
  className = '',
  compact = false,
}) {
  const labelId = useId()
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const selected = streams.find((s) => s.id === selectedStreamId) ?? streams[0]

  useEffect(() => {
    if (!open) return
    function handlePointerDown(event) {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [open])

  useEffect(() => {
    if (!open) return
    function onKey(event) {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  if (!streams?.length) return null

  if (streams.length === 1) {
    return (
      <div
        className={cx(
          'flex h-8 min-w-[76px] items-center justify-center border border-[rgba(0,142,255,0.58)] bg-[rgba(3,3,34,0.82)] px-2 [font-family:Arial,Helvetica,sans-serif] text-[10px] font-black uppercase tracking-wide text-[rgba(255,255,255,0.86)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] max-[700px]:h-10 max-[700px]:min-w-0 max-[700px]:w-full max-[700px]:text-[8px]',
          compact && 'h-8 min-w-0 max-w-full px-1.5 text-[9px] leading-none tracking-normal max-[700px]:h-8 max-[700px]:text-[9px]',
          className,
        )}
        title={streams[0].label}
      >
        {compact ? shortBitrateLabel(streams[0].label) : streams[0].label}
      </div>
    )
  }

  return (
    <div className={cx('relative min-w-0', className)} ref={rootRef}>
      <span className="sr-only" id={labelId}>
        Stream quality
      </span>
      <button
        className={cx(
          'flex h-8 w-full min-w-[92px] cursor-pointer items-center justify-between gap-2 border border-[#008eff] bg-[#030322] px-2.5 pr-2 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-[border-color,box-shadow,background] duration-150 hover:border-[#00b4ff] hover:bg-[#0a0a45] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_0_14px_rgba(0,142,255,0.2)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white max-[700px]:h-10 max-[700px]:min-w-0',
          compact && 'h-8 min-h-[36px] min-w-0 gap-1 px-1.5 py-0 pr-1.5 max-[700px]:h-8',
        )}
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-labelledby={labelId}
        title={selected.label}
        onClick={() => setOpen((value) => !value)}
      >
        <span
          className={cx(
            'min-w-0 truncate [font-family:Arial,Helvetica,sans-serif] text-[10px] font-black uppercase leading-none text-white max-[700px]:text-[7px]',
            compact && 'text-[9px] font-[950] tracking-tight max-[700px]:text-[9px]',
          )}
        >
          {compact ? shortBitrateLabel(selected.label) : selected.label}
        </span>
        <span
          className={cx(
            'pointer-events-none h-0 w-0 shrink-0 border-x-[4px] border-t-[5px] border-x-transparent border-t-white transition-transform duration-150 max-[700px]:border-x-[3px] max-[700px]:border-t-[4px]',
            compact && 'border-x-[3px] border-t-[4px]',
            open && '-rotate-180',
          )}
          aria-hidden="true"
        />
      </button>

      {open ? (
        <ul
          className="absolute bottom-[calc(100%+6px)] right-0 z-[70] min-w-[100%] overflow-hidden rounded-sm border border-[#008eff] bg-[#050536] py-1 shadow-[0_-12px_28px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.06)] max-[700px]:bottom-[calc(100%+4px)] max-[700px]:left-0 max-[700px]:right-0 max-[700px]:min-w-full"
          role="listbox"
          aria-label="Choose stream quality"
        >
          {streams.map((stream) => {
            const isSelected = stream.id === selected.id
            return (
              <li className="list-none" key={stream.id} role="presentation">
                <button
                  className={cx(
                    'flex w-full cursor-pointer items-center border-0 bg-transparent px-3 py-2 text-left [font-family:Arial,Helvetica,sans-serif] text-[10px] font-black uppercase tracking-wide text-white transition-colors duration-150 hover:bg-[rgba(0,142,255,0.22)] max-[700px]:py-2.5 max-[700px]:text-[8px]',
                    isSelected && 'bg-[rgba(255,17,17,0.12)] text-[#ff6b6b]',
                  )}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onSelect(stream.id)
                    setOpen(false)
                  }}
                >
                  <span
                    className={cx(
                      'mr-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[rgba(255,255,255,0.25)]',
                      isSelected && 'bg-[#ff1111] shadow-[0_0_8px_rgba(255,17,17,0.55)]',
                    )}
                    aria-hidden="true"
                  />
                  {stream.label}
                </button>
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}
