import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { channels, defaultChannelId } from './data/channels'
import HeroSection from './sections/HeroSection'
import PlayerBar from './sections/PlayerBar'
import ScheduleSection from './sections/ScheduleSection'
import BlogSection from './sections/BlogSection'
import MixcloudSection from './sections/MixcloudSection'
import FooterSection from './sections/FooterSection'
import SecondRadioPage from './pages/SecondRadioPage'
import SongSearchPage from './pages/SongSearchPage'
import RevealOnScroll from './components/RevealOnScroll'
import EditorialBlueRing from './components/EditorialBlueRing'

function getInitialView() {
  const normalizedPath = window.location.pathname.replace(/\/$/, '') || '/'
  const hash = window.location.hash
  if (normalizedPath === '/second-page' || hash === '#second-page') return 'archive'
  if (normalizedPath === '/dal-kereses' || normalizedPath === '/dalkereses' || hash === '#dal-kereses')
    return 'search'
  return 'home'
}

function LandingPage({ playingChannelId, onToggleChannel }) {
  return (
    <>
      <HeroSection channels={channels} playingChannelId={playingChannelId} onToggleChannel={onToggleChannel} />
      <div className="relative isolate overflow-visible bg-white">
        <EditorialBlueRing />
        <div className="relative z-[2]">
          <RevealOnScroll>
            <ScheduleSection />
          </RevealOnScroll>
          <RevealOnScroll delay={0.06}>
            <BlogSection />
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <MixcloudSection />
          </RevealOnScroll>
        </div>
      </div>
      <RevealOnScroll delay={0.04}>
        <FooterSection />
      </RevealOnScroll>
    </>
  )
}

function App() {
  const [selectedChannelId, setSelectedChannelId] = useState(defaultChannelId)
  const [playingChannelId, setPlayingChannelId] = useState(null)
  const [view, setView] = useState(getInitialView)
  const [streamByChannel, setStreamByChannel] = useState(() =>
    Object.fromEntries(channels.map((channel) => [channel.id, channel.streams[0].id])),
  )
  const [volume, setVolume] = useState(40)
  const audioRef = useRef(null)
  const isStartingPlaybackRef = useRef(false)

  const selectedChannel =
    channels.find((channel) => channel.id === selectedChannelId) ?? channels[0]
  const selectedStreamId = streamByChannel[selectedChannel.id] ?? selectedChannel.streams[0].id
  const selectedStream =
    selectedChannel.streams.find((stream) => stream.id === selectedStreamId) ??
    selectedChannel.streams[0]

  const selectedChannelName = selectedChannel.playerName ?? selectedChannel.title.toUpperCase()

  const isPlaying = playingChannelId === selectedChannel.id

  const playerChannel = useMemo(
    () => ({
      ...selectedChannel,
      currentStream: selectedStream,
      playerName: selectedChannelName,
    }),
    [selectedChannel, selectedChannelName, selectedStream],
  )

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100
      audioRef.current.muted = volume === 0
    }
  }, [volume])

  useEffect(() => {
    if (!audioRef.current || isPlaying) return

    if (audioRef.current.src !== selectedStream.url) {
      audioRef.current.src = selectedStream.url
    }
  }, [isPlaying, selectedStream.url])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    function syncPausedState() {
      if (isStartingPlaybackRef.current) return
      setPlayingChannelId(null)
    }

    audio.addEventListener('pause', syncPausedState)
    audio.addEventListener('ended', syncPausedState)
    audio.addEventListener('error', syncPausedState)

    return () => {
      audio.removeEventListener('pause', syncPausedState)
      audio.removeEventListener('ended', syncPausedState)
      audio.removeEventListener('error', syncPausedState)
    }
  }, [])

  useEffect(() => {
    function handlePopState() {
      setView(getInitialView())
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = useCallback((nextView) => {
    setView(nextView)
    const nextUrl =
      nextView === 'archive' ? '/second-page' : nextView === 'search' ? '/dal-kereses' : '/'
    window.history.pushState({ view: nextView }, '', nextUrl)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  /** Same-origin in-app routes: no full reload; audio element stays mounted. */
  useEffect(() => {
    function onDocumentClick(event) {
      if (event.defaultPrevented) return
      const el = event.target
      if (!(el instanceof Element)) return
      const anchor = el.closest('a[href]')
      if (!anchor) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const href = anchor.getAttribute('href')
      if (!href || href.startsWith('http') || href.startsWith('mailto:')) return

      const pathOnly = href.split('#')[0].split('?')[0]
      const hash = href.includes('#') ? href.slice(href.indexOf('#')) : ''

      if (pathOnly === '/second-page' || pathOnly === '/second-page/' || hash === '#second-page') {
        event.preventDefault()
        navigate('archive')
        return
      }

      if (
        pathOnly === '/dal-kereses' ||
        pathOnly === '/dal-kereses/' ||
        pathOnly === '/dalkereses' ||
        pathOnly === '/dalkereses/' ||
        hash === '#dal-kereses'
      ) {
        event.preventDefault()
        navigate('search')
        return
      }

      if ((pathOnly === '/' || pathOnly === '') && view !== 'home' && hash !== '#second-page') {
        event.preventDefault()
        navigate('home')
      }
    }

    document.addEventListener('click', onDocumentClick)
    return () => document.removeEventListener('click', onDocumentClick)
  }, [navigate, view])

  async function startChannel(channelId) {
    setSelectedChannelId(channelId)
    setPlayingChannelId(channelId)

    const nextChannel = channels.find((channel) => channel.id === channelId) ?? channels[0]
    const nextStreamId = streamByChannel[nextChannel.id] ?? nextChannel.streams[0].id
    const nextStream =
      nextChannel.streams.find((stream) => stream.id === nextStreamId) ?? nextChannel.streams[0]

    if (audioRef.current) {
      isStartingPlaybackRef.current = true
      if (audioRef.current.src !== nextStream.url) {
        audioRef.current.src = nextStream.url
      }
      try {
        await audioRef.current.play()
      } catch {
        setPlayingChannelId(null)
      } finally {
        isStartingPlaybackRef.current = false
      }
    }
  }

  function pausePlayback() {
    audioRef.current?.pause()
    setPlayingChannelId(null)
  }

  function toggleChannel(channelId) {
    if (playingChannelId === channelId) {
      pausePlayback()
      return
    }

    startChannel(channelId)
  }

  function toggleSelectedChannel() {
    if (isPlaying) {
      pausePlayback()
      return
    }

    startChannel(selectedChannel.id)
  }

  function changeStream(streamId) {
    setStreamByChannel((current) => ({
      ...current,
      [selectedChannel.id]: streamId,
    }))

    const nextStream =
      selectedChannel.streams.find((stream) => stream.id === streamId) ??
      selectedChannel.streams[0]

    if (isPlaying && audioRef.current) {
      isStartingPlaybackRef.current = true
      if (audioRef.current.src !== nextStream.url) {
        audioRef.current.src = nextStream.url
      }
      audioRef.current
        .play()
        .catch(() => setPlayingChannelId(null))
        .finally(() => {
          isStartingPlaybackRef.current = false
        })
    }
  }

  return (
    <main className="min-h-[100svh] overflow-x-hidden bg-white pb-[calc(var(--player-height)+env(safe-area-inset-bottom,0px))]">
      <audio ref={audioRef} preload="none" />
      {view === 'archive' ? (
        <SecondRadioPage onNavigateHome={() => navigate('home')} />
      ) : view === 'search' ? (
        <SongSearchPage onNavigateHome={() => navigate('home')} />
      ) : (
        <LandingPage playingChannelId={playingChannelId} onToggleChannel={toggleChannel} />
      )}
      <PlayerBar
        channel={playerChannel}
        isPlaying={isPlaying}
        selectedStreamId={selectedStreamId}
        streams={selectedChannel.streams}
        volume={volume}
        onChangeStream={changeStream}
        onChangeVolume={setVolume}
        onTogglePlay={toggleSelectedChannel}
      />
    </main>
  )
}

export default App
