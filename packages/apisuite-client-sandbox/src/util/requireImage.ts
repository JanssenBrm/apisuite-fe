
/** requires image url in assets folder if not external resource */
export default function (url: string) {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }

  return require(`assets/${url}`)
}
