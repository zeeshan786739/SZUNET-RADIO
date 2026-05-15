import brunoMars from '../assets/images/do-you-think-bruno-mars-i-just-might-can-debut-at-on-the-v0-xc35q46tylcg1.jpeg 1.png'
import heartCover from '../assets/images/ab67616d0000b2736ac3c7938191585c53c8180d 1.png'
import monochromeCover from '../assets/images/artworks-6DdY5PEGoslQdBYW-hYkfkg-t500x500.png 1.png'
import bandCover from '../assets/images/668466117_1415711460573623_7254924411462988607_n 1.png'

const baseCards = [
  {
    id: 'bruno',
    artist: 'Bruno Mars',
    title: 'Just Magic',
    image: brunoMars,
    imagePosition: 'center center',
    trend: 'up',
  },
  {
    id: 'raye',
    artist: 'Raye',
    title: "Where Is My Husband",
    image: heartCover,
    imagePosition: 'center center',
    trend: 'hot',
  },
  {
    id: 'olivia',
    artist: 'Olivia Dean',
    title: 'Man I Need',
    image: monochromeCover,
    imagePosition: 'center center',
    trend: 'up',
  },
  {
    id: 'bts',
    artist: 'BTS',
    title: 'Never',
    image: bandCover,
    imagePosition: 'center center',
    trend: 'hot',
  },
]

const chartCards = Array.from({ length: 30 }, (_, index) => {
  const card = baseCards[index % baseCards.length]

  return {
    ...card,
    id: `${card.id}-${index + 1}`,
  }
})

export const radioChartRows = [
  {
    id: 'szunet',
    label: 'SZUNET CHART',
    tone: 'szunet',
    cards: chartCards,
  },
  {
    id: 'oldschool',
    label: 'OLSCHOOL CHART',
    tone: 'oldschool',
    cards: chartCards,
  },
  {
    id: 'power',
    label: 'POWER CHART',
    tone: 'power',
    cards: chartCards,
  },
  {
    id: 'relax',
    label: 'RELAX CHART',
    tone: 'relax',
    cards: chartCards,
  },
  {
    id: 'electric',
    label: 'ELECTRIC CHART',
    tone: 'electric',
    cards: chartCards,
  },
]
