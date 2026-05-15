import bubbleGirl from '../assets/images/3000 1.png'
import foxPortrait from '../assets/images/659413695_18313433212286665_7974886186823747225_n 1.png'
import laufey from '../assets/images/feature-laufey-billboard-2026-bb4-molly-matalon-1-1800 1.png'
import mia from '../assets/images/M.I.A-LEAD-HI-RES-1 1.png'
import teqila from '../assets/images/93f7-409c-4739-a711-fd2ba6bed801 1.png'
import miley from '../assets/images/213b-240e-437c-982f-635bda5b5842 1.png'
import bandCover from '../assets/images/b7ac-0556-4a7c-ad7f-c97045ea3bf6 1.png'
import gdc40 from '../assets/images/4ea3-e07a-4a3e-b7a8-7e801a02171b 1.png'
import kungsTitle from '../assets/images/KUNGS.png'
import galaxyTitle from '../assets/images/GALAXY.png'
import mixcloudOneTitle from '../assets/images/MIXCLOUD 1.png'
import mixcloudThreeTitle from '../assets/images/MIXCLOUD 3.png'

export const topMixcloudItems = [
  {
    id: 'kungs-galaxy-one',
    title: 'Kungs',
    subtitle: 'Galaxy',
    image: bubbleGirl,
    imagePosition: 'center center',
    titleImage: kungsTitle,
    subtitleImage: galaxyTitle,
    active: true,
    showVotes: true,
  },
  {
    id: 'kungs-galaxy-two',
    title: 'Kungs',
    subtitle: 'Galaxy',
    image: foxPortrait,
    imagePosition: 'center center',
    titleImage: kungsTitle,
    subtitleImage: galaxyTitle,
  },
  {
    id: 'kungs-galaxy-three',
    title: 'Kungs',
    subtitle: 'Galaxy',
    image: laufey,
    imagePosition: 'center center',
    titleImage: kungsTitle,
    subtitleImage: galaxyTitle,
    showVotes: true,
  },
  {
    id: 'kungs-galaxy-four',
    title: 'Kungs',
    subtitle: 'Galaxy',
    image: mia,
    imagePosition: 'center center',
    titleImage: kungsTitle,
    subtitleImage: galaxyTitle,
  },
]

export const bottomMixcloudItems = [
  {
    id: 'mixcloud-one',
    title: 'Mixcloud 1',
    image: teqila,
    imagePosition: 'center top',
    titleImage: mixcloudOneTitle,
  },
  {
    id: 'mixcloud-two',
    title: 'Mixcloud 2',
    image: bandCover,
    imagePosition: 'center center',
    hideTitle: true,
  },
  {
    id: 'mixcloud-three',
    title: 'Mixcloud 3',
    eyebrow: 'Artist - To Mix',
    image: miley,
    imagePosition: 'center top',
    titleImage: mixcloudThreeTitle,
  },
  {
    id: 'gdc40',
    title: 'Mixcloud 3',
    image: gdc40,
    imagePosition: 'center center',
    titleImage: mixcloudThreeTitle,
  },
]
