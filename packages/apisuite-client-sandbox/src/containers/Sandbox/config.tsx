import { SlideConfig, ListConfig } from './types'

import slideOvalUrl from 'assets/slide-oval.png'
import slideFeatureslUrl from 'assets/features-illustration.png'

/**
 * Slides configuration
 */
export const slidesConfig: SlideConfig[] = [
  {
    key: 'slide-exp',
    title: 'sandboxPage.slides.one.title',
    p1: 'sandboxPage.slides.one.p1',
    p2: 'sandboxPage.slides.one.p2',
    btnStr: 'sandboxPage.slides.one.btnStr',
    btn: 1,
    imgUrl: slideOvalUrl,
  },
  {
    key: 'slide-proof',
    title: 'sandboxPage.slides.two.title',
    p1: 'sandboxPage.slides.two.p1',
    p2: 'sandboxPage.slides.two.p2',
    btnStr: 'sandboxPage.slides.two.btnStr',
    btn: 2,
    imgUrl: slideOvalUrl,
  },
  {
    key: 'slide-features',
    title: 'sandboxPage.slides.three.title',
    p1: 'sandboxPage.slides.three.p1',
    p2: 'sandboxPage.slides.three.p2',
    btnStr: 'sandboxPage.slides.three.btnStr',
    btn: 3,
    imgUrl: slideFeatureslUrl,
  },
  {
    key: 'slide-docs',
    title: 'sandboxPage.slides.four.title',
    p1: 'sandboxPage.slides.four.p1',
    btnStr: 'sandboxPage.slides.four.btnStr',
    btn: 2,
    imgUrl: slideOvalUrl,
  },
]

/**
 * Features list left side configuration
 */
export const featuresLeftConfig: ListConfig[] = [
  {
    key: 'f-left-1',
    title: 'sandboxPage.features.left.one.title',
    desc: 'sandboxPage.features.left.one.desc',
    icon: 'airplane-landing',
  },
  {
    key: 'f-left-2',
    title: 'sandboxPage.features.left.two.title',
    desc: 'sandboxPage.features.left.two.desc',
    icon: 'paw',
  },
  {
    key: 'f-left-3',
    title: 'sandboxPage.features.left.three.title',
    desc: 'sandboxPage.features.left.three.desc',
    icon: 'infinity',
  },
  {
    key: 'f-left-4',
    title: 'sandboxPage.features.left.four.title',
    desc: 'sandboxPage.features.left.four.desc',
    icon: 'human-pregnant',
  },
  {
    key: 'f-left-5',
    title: 'sandboxPage.features.left.five.title',
    desc: 'sandboxPage.features.left.five.desc',
    icon: 'animation-play-outline',
  },
]

/**
 * Features list right side configuration
 */
export const featuresRightConfig: ListConfig[] = [
  {
    key: 'f-right-1',
    title: 'sandboxPage.features.right.one.title',
    desc: 'sandboxPage.features.right.one.desc',
    icon: 'cloud-outline',
  },
  {
    key: 'f-right-2',
    title: 'sandboxPage.features.right.two.title',
    desc: 'sandboxPage.features.right.two.desc',
    icon: 'account-multiple-plus-outline',
  },
  {
    key: 'f-right-3',
    title: 'sandboxPage.features.right.three.title',
    desc: 'sandboxPage.features.right.three.desc',
    icon: 'fingerprint',
  },
  {
    key: 'f-right-4',
    title: 'sandboxPage.features.right.four.title',
    desc: 'sandboxPage.features.right.four.desc',
    icon: 'account-multiple',
  },
  {
    key: 'f-right-5',
    title: 'sandboxPage.features.right.five.title',
    desc: 'sandboxPage.features.right.five.desc',
    icon: 'usb',
  },
]

/**
 * Other list left side configuration
 */
export const otherLeftConfig: ListConfig[] = [
  {
    key: 'f-right-1',
    title: 'sandboxPage.otherTreats.left.one.title',
    desc: 'sandboxPage.otherTreats.left.one.desc',
    icon: 'shield-check-outline',
  },
  {
    key: 'f-right-2',
    title: 'sandboxPage.otherTreats.left.two.title',
    desc: 'sandboxPage.otherTreats.left.two.desc',
    icon: 'book-open',
  },
  {
    key: 'f-right-3',
    title: 'sandboxPage.otherTreats.left.three.title',
    desc: 'sandboxPage.otherTreats.left.three.desc',
    icon: 'headset',
  },
]

/**
 * Other list right side configuration
 */
export const otherRightConfig: ListConfig[] = [
  {
    key: 'f-right-1',
    title: 'sandboxPage.otherTreats.right.one.title',
    desc: 'sandboxPage.otherTreats.right.one.desc',
    icon: 'briefcase',
  },
  {
    key: 'f-right-2',
    title: 'sandboxPage.otherTreats.right.two.title',
    desc: 'sandboxPage.otherTreats.right.two.desc',
    icon: 'fullscreen',
  },
  {
    key: 'f-right-3',
    title: 'sandboxPage.otherTreats.right.three.title',
    desc: 'sandboxPage.otherTreats.right.three.desc',
    icon: 'key',
  },
]
