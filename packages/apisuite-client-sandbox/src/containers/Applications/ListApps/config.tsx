import requireImage from 'util/requireImage'

export const docs = [
  {
    key: 'docs-1',
    title: 'Getting starteed docs',
    content: 'Our Getting started documentation is intended to get you up to speed on the basics and running the Sandbox in no time.',
    img: requireImage('apps-doc-1.png'),
  },
  {
    key: 'docs2',
    title: 'OAuth2 fundamentals',
    content: 'We use the Open Authentication 2 standards, and you might want to know how. In the OAuth2 fundamentals we also dive into the why.',
    img: requireImage('apps-doc-2.png'),
  },
  {
    key: 'docs-3',
    title: 'The Road to Live',
    content: 'The API Sandbox is a tremendously valuable tool. However, the goal of most developers is to go live at the end of the day.',
    img: requireImage('apps-doc-3.png'),
  },
]
