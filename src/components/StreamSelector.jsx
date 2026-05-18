import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { cx } from '../utils/cx'

function streamMenuLabel(label) {
  const t = label.replace(/\s+/g, ' ').trim()
  const match = t.match(/^(\d+)\s*kb\/s$/i)
  if (match) return `${match[1]} KB/S`
  return t
}

function StreamValue({ label, compact }) {
  const t = label.replace(/\s+/g, ' ').trim()
  const match = t.match(/^(\d+)\s*kb\/s$/i)

  if (!match) {
    return <span className="stream-selector__value">{label}</span>
  }

  if (compact) {
    return <span className="stream-selector__value">{`${match[1]}K`}</span>
  }

  return <span className="stream-selector__value">{`${match[1]}KB/S`}</span>
}

function StreamChevron({ open, className }) {
  return (
    <span
      className={cx(
        'stream-selector__chevron pointer-events-none shrink-0 transition-transform duration-150',
        open && 'stream-selector__chevron--open',
        className,
      )}
      aria-hidden="true"
    />
  )
}

/**
 * Stream quality control for the player bar.
 * Menu renders in a portal so it is not clipped by the fixed player bar overflow.
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
  const [menuPos, setMenuPos] = useState(null)
  const rootRef = useRef(null)
  const buttonRef = useRef(null)
  const selected = streams.find((s) => s.id === selectedStreamId) ?? streams[0]

  const updateMenuPosition = useCallback(() => {
    const button = buttonRef.current
    if (!button) return

    const rect = button.getBoundingClientRect()
    setMenuPos({
      left: rect.left + rect.width / 2,
      bottom: window.innerHeight - rect.top + 10,
      minWidth: Math.max(rect.width, 112),
    })
  }, [])

  useLayoutEffect(() => {
    if (!open) {
      setMenuPos(null)
      return undefined
    }

    updateMenuPosition()
    window.addEventListener('resize', updateMenuPosition)
    window.addEventListener('scroll', updateMenuPosition, true)

    return () => {
      window.removeEventListener('resize', updateMenuPosition)
      window.removeEventListener('scroll', updateMenuPosition, true)
    }
  }, [open, updateMenuPosition])

  useEffect(() => {
    if (!open) return
    function handlePointerDown(event) {
      const target = event.target
      if (rootRef.current?.contains(target)) return
      const menu = document.getElementById(`${labelId}-menu`)
      if (menu?.contains(target)) return
      setOpen(false)
    }
    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [open, labelId])

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
          'stream-selector stream-selector--static flex min-w-[52px] flex-col items-center justify-center gap-0.5 px-1 py-0.5',
          className,
        )}
        title={streams[0].label}
      >
        <StreamValue label={streams[0].label} compact={compact} />
      </div>
    )
  }

  const menu =
    open && menuPos
      ? createPortal(
          <ul
            id={`${labelId}-menu`}
            className="stream-selector__menu"
            style={{
              left: menuPos.left,
              bottom: menuPos.bottom,
              minWidth: menuPos.minWidth,
            }}
            role="listbox"
            aria-label="Choose stream quality"
          >
            {streams.map((stream) => {
              const isSelected = stream.id === selected.id
              return (
                <li className="list-none" key={stream.id} role="presentation">
                  <button
                    className={cx(
                      'stream-selector__menu-option',
                      isSelected && 'stream-selector__menu-option--selected',
                    )}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      onSelect(stream.id)
                      setOpen(false)
                    }}
                  >
                    {streamMenuLabel(stream.label)}
                  </button>
                </li>
              )
            })}
          </ul>,
          document.body,
        )
      : null

  return (
    <div className={cx('stream-selector relative z-[60] min-w-0', className)} ref={rootRef}>
      <span className="sr-only" id={labelId}>
        Stream quality
      </span>
      <button
        ref={buttonRef}
        className={cx(
          'stream-selector__button flex w-full min-w-[52px] cursor-pointer flex-col items-center justify-center gap-0.5 border-0 bg-transparent px-1 py-0.5 transition-opacity duration-150 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white max-[700px]:min-w-0',
          open && 'stream-selector__button--open',
          compact && 'min-w-0 max-w-full',
        )}
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-labelledby={labelId}
        aria-controls={open ? `${labelId}-menu` : undefined}
        title={selected.label}
        onClick={() => setOpen((value) => !value)}
      >
        <StreamValue label={selected.label} compact={compact} />
        <StreamChevron open={open} />
      </button>
      {menu}
    </div>
  )
}
