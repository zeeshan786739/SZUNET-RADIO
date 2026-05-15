import electricLabel from '../assets/images/ELECTRIC.png'
import oldschoolLabel from '../assets/images/OLDSCHOOL.png'
import powerLabel from '../assets/images/POWER.png'
import relaxLabel from '../assets/images/RELAX.png'
import stationLogo from '../assets/images/Szünet logo.png'
import electricPanel from '../assets/images/Clip path group (4).png'
import oldschoolPanel from '../assets/images/Clip path group (3).png'
import mainPanel from '../assets/images/Clip path group (2).png'
import powerPanel from '../assets/images/Clip path group (1).png'
import relaxPanel from '../assets/images/Clip path group.png'
import electricPlay from '../assets/images/Polygon 17.png'
import oldschoolPlay from '../assets/images/Polygon 16.png'
import mainPlay from '../assets/images/Polygon 15.png'
import powerPlay from '../assets/images/Polygon 14.png'
import relaxPlay from '../assets/images/Polygon 1.png'
import teqila from '../assets/images/500x500-000000-80-0-0 1.png'
import nicole from '../assets/images/500x500-000000-80-0-0 2 1.png'
import phoenix from '../assets/images/500x500-000000-80-0-0 3 1.png'
import bush from '../assets/images/500x500-000000-80-0-0 4 1.png'
import band from '../assets/images/500x500-000000-80-0-0 5 1.png'

export const defaultChannelId = 'prime'

export const brandAssets = {
  stationLogo,
}

export const channels = [
  {
    id: 'electric',
    title: 'Electric',
    artist: 'Hollavy',
    track: 'Teqila',
    portrait: teqila,
    panel: electricPanel,
    label: electricLabel,
    playIcon: electricPlay,
    size: 'regular',
    playerName: 'ELECTRIC',
    streams: [
      {
        id: 'electric-192',
        label: '192 kb/s',
        url: 'https://stream.szunetrad.io/listen/szunetradio/stream_electric.mp3',
      },
    ],
  },
  {
    id: 'oldschool',
    title: 'Oldschool',
    artist: 'Cledbanger',
    track: 'In The Middle',
    portrait: nicole,
    panel: oldschoolPanel,
    label: oldschoolLabel,
    playIcon: oldschoolPlay,
    size: 'regular',
    playerName: 'OLDSCHOOL',
    streams: [
      {
        id: 'oldschool-192',
        label: '192 kb/s',
        url: 'https://stream.szunetrad.io/listen/szunetradio/stream_oldschool.mp3',
      },
    ],
  },
  {
    id: 'prime',
    title: 'Prime',
    artist: 'Miley Cyrus',
    track: 'Prisoner',
    portrait: phoenix,
    panel: mainPanel,
    label: null,
    playIcon: mainPlay,
    size: 'feature',
    playerName: 'SZÜNET',
    streams: [
      {
        id: 'prime-192',
        label: '192 kb/s',
        url: 'https://stream.szunetrad.io/listen/szunetradio/stream_sq.mp3',
      },
      {
        id: 'prime-320',
        label: '320 kb/s',
        url: 'https://stream.szunetrad.io/listen/szunetradio/stream_hq.mp3',
      },
      {
        id: 'prime-64',
        label: '64 kb/s',
        url: 'https://stream.szunetrad.io/listen/szunetradio/stream_lq.aac',
      },
    ],
  },
  {
    id: 'power',
    title: 'Power',
    artist: 'Jaden Bojsen',
    track: "Let's Go",
    portrait: bush,
    panel: powerPanel,
    label: powerLabel,
    playIcon: powerPlay,
    size: 'regular',
    playerName: 'POWER',
    streams: [
      {
        id: 'power-192',
        label: '192 kb/s',
        url: 'https://stream.szunetrad.io/listen/szunetradio/stream_power.mp3',
      },
    ],
  },
  {
    id: 'relax',
    title: 'Relax',
    artist: 'Akusztik',
    track: 'Talk',
    portrait: band,
    panel: relaxPanel,
    label: relaxLabel,
    playIcon: relaxPlay,
    size: 'regular',
    playerName: 'RELAX',
    streams: [
      {
        id: 'relax-192',
        label: '192 kb/s',
        url: 'https://stream.szunetrad.io/listen/szunetradio/stream_relax.mp3',
      },
    ],
  },
]
