import bubbleGirl from '../assets/images/3000 1.png'
import foxPortrait from '../assets/images/659413695_18313433212286665_7974886186823747225_n 1.png'
import laufey from '../assets/images/feature-laufey-billboard-2026-bb4-molly-matalon-1-1800 1.png'
import mia from '../assets/images/M.I.A-LEAD-HI-RES-1 1.png'
import teqila from '../assets/images/93f7-409c-4739-a711-fd2ba6bed801 1.png'
import miley from '../assets/images/213b-240e-437c-982f-635bda5b5842 1.png'
import bandCover from '../assets/images/b7ac-0556-4a7c-ad7f-c97045ea3bf6 1.png'
import gdc40 from '../assets/images/4ea3-e07a-4a3e-b7a8-7e801a02171b 1.png'

const mixcloudFeatureDescription =
  'How Raye got over impostor syndrome to make a smash hit solo record'

const loremDescription =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

export const topMixcloudItems = [
  {
    id: 'olivia-rodrigo',
    artistName: 'OLIVIA RODRIGO',
    description: loremDescription,
    titleStyle: 'artist-feature',
    image: bubbleGirl,
    imagePosition: 'center center',
    showVotes: true,
  },
  {
    id: 'raye',
    artistName: 'RAYE',
    description: mixcloudFeatureDescription,
    descriptionUppercase: true,
    titleStyle: 'artist-feature',
    image: foxPortrait,
    imagePosition: 'center center',
    showVotes: true,
  },
  {
    id: 'laufey',
    artistName: 'LAUFEY',
    description: mixcloudFeatureDescription.replace(/^How Raye/, 'How Laufey'),
    descriptionUppercase: true,
    titleStyle: 'artist-feature',
    image: laufey,
    imagePosition: 'center center',
    showVotes: true,
  },
  {
    id: 'mia',
    artistName: 'M.I.A',
    description: loremDescription,
    titleStyle: 'artist-feature',
    image: mia,
    imagePosition: 'center center',
    showVotes: true,
  },
]

export const bottomMixcloudItems = [
  {
    id: 'mixcloud-one',
    displayTitle: 'MIXCLOUD 1',
    description: loremDescription,
    titleStyle: 'mixcloud-feature',
    image: teqila,
    imagePosition: 'center top',
  },
  {
    id: 'mixcloud-two',
    displayTitle: 'MIXCLOUD 2',
    description: mixcloudFeatureDescription.replace(/^How Raye/, 'How Laufey'),
    descriptionUppercase: true,
    titleStyle: 'mixcloud-feature',
    image: bandCover,
    imagePosition: 'center center',
  },
  {
    id: 'mixcloud-three',
    displayTitle: 'MIXCLOUD 3',
    eyebrow: 'Artist - To Mix',
    description: mixcloudFeatureDescription.replace(/^How Raye/, 'How Laufey'),
    descriptionUppercase: true,
    titleStyle: 'mixcloud-feature',
    image: miley,
    imagePosition: 'center top',
  },
  {
    id: 'mixcloud-four',
    displayTitle: 'MIXCLOUD 4',
    description: loremDescription,
    titleStyle: 'mixcloud-feature',
    image: gdc40,
    imagePosition: 'center center',
  },
]
