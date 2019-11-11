import { SlideConfig, ListConfig } from './types'

import slideOvalUrl from 'assets/slide-oval.png'
import slideFeatureslUrl from 'assets/features-illustration.png'

/**
 * Slides configuration
 */
export const slidesConfig: SlideConfig[] = [
  {
    key: 'slide-exp',
    title: 'Experience the Sandbox',
    p1: 'We have released a <b>Live Demo</b> of our Sandbox product. Browse through the features below to see what you can expect.',
    p2: 'The proof of the pudding is, as they say, in the eating.',
    btnStr: 'Register',
    btn: 1,
    imgUrl: slideOvalUrl,
  },
  {
    key: 'slide-proof',
    title: 'Secure Proof of Concepts',
    p1: 'With Cloudoki Sandbox, secure <b>proof of concepts</b> are as easy to manage as calling an Uber. (We have an app for that.)',
    p2: 'Talk to one of our humans for more information.',
    btnStr: 'Contact',
    btn: 2,
    imgUrl: slideOvalUrl,
  },
  {
    key: 'slide-features',
    title: 'Sail the Seas of Innovation',
    p1: 'Cloudoki <b>Sandbox</b> is built on open source technology, just ahead of the curve, in order to give you a long and smooth lifetime cycle.',
    p2: 'Docker, Kubernetes, Kong, it is all there.',
    btnStr: 'Features',
    btn: 3,
    imgUrl: slideFeatureslUrl,
  },
  {
    key: 'slide-docs',
    title: 'Extend and Customize',
    p1: 'The Cloudoki Sandbox is purpose built for customization. Do you need a manual onboarding process? <b>Extend</b>. Send your 2FA sms’es through Twillio? <b>Configure</b>. Support Korean i18n? <b>Customize</b>.',
    btnStr: 'Documentation',
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
    title: 'sandboxPage.features.left.tree.title',
    desc: 'sandboxPage.features.left.tree.desc',
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
    title: 'Dockerised on any cloud',
    desc: 'All you need is Docker. Sandbox is "cloud agnostic"',
    icon: 'cloud-outline',
  },
  {
    key: 'f-right-2',
    title: 'Managed test users (Oauth2)',
    desc: 'Depth of test data and PSU emulation, out of the box',
    icon: 'account-multiple-plus-outline',
  },
  {
    key: 'f-right-3',
    title: 'Two-factor authentication (2FA)',
    desc: 'Allow a leveled security grade throughout your ecosystem',
    icon: 'fingerprint',
  },
  {
    key: 'f-right-4',
    title: 'Multiple users per account',
    desc: 'Sandbox enables account RBAC for customer self-service',
    icon: 'account-multiple',
  },
  {
    key: 'f-right-5',
    title: '100% Open Source',
    desc: 'MIT license, no lock-in. Sandbox is simply open source.',
    icon: 'usb',
  },
]

/**
 * Other list left side configuration
 */
export const otherLeftConfig: ListConfig[] = [
  {
    key: 'f-right-1',
    title: 'Secure account access (OAuth2)',
    desc: 'Prove your salt, certainly in your Sandbox environment',
    icon: 'shield-check-outline',
  },
  {
    key: 'f-right-2',
    title: 'Live API reference docs',
    desc: 'You focus on proper API contracts, your sandbox generates the output',
    icon: 'book-open',
  },
  {
    key: 'f-right-3',
    title: 'Integrated Support',
    desc: 'Integrate your favourite support service where your user needs it',
    icon: 'headset',
  },
]

/**
 * Other list right side configuration
 */
export const otherRightConfig: ListConfig[] = [
  {
    key: 'f-right-1',
    title: 'Optimised for SaaS',
    desc: 'Cloudoki is a SaaS provider. It shows in the Sandbox DNA.',
    icon: 'briefcase',
  },
  {
    key: 'f-right-2',
    title: 'Scalable Portal',
    desc: 'Read more about the Cloudoki Developer Portal features',
    icon: 'fullscreen',
  },
  {
    key: 'f-right-3',
    title: 'Ready for SSO and SCA',
    desc: 'Read more about the Cloudoki SSO features',
    icon: 'key',
  },
]
