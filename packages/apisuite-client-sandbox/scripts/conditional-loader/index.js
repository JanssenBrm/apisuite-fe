const os = require('os')
const { getOptions } = require('loader-utils')

let includes

module.exports = function (source) {
  try {
    if (!includes) {
      const options = Object.assign({}, getOptions(this))
      includes = Object.assign({}, options.includes)
    }

    const sourceByLine = source.split(os.EOL)
    const transformedSource = []

    let started = false
    let i = 0
    const len = sourceByLine.length
    for (; i < len; i++) {
      const line = sourceByLine[i]

      if (started) {
        const match = line.match(/#conditional-loader-end/)

        if (Array.isArray(match)) {
          started = false
        }

        continue
      } else {
        const match = line.match(/#conditional-loader-start: .*/)

        if (Array.isArray(match)) {
          const variable = match[0].split(' ')[1]

          if (!includes[variable]) {
            started = true

            continue
          }
        }
      }

      transformedSource.push(line)
    }

    return transformedSource.join('\n')
  } catch (error) {
    console.error(error)
    throw error
  }
}
