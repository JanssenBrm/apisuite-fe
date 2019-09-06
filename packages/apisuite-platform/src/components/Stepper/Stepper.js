import React, { Component } from 'react'
import { bool, string, object, array, number } from 'prop-types'
import themeVariables from 'styles/variables.scss'
import classnames from 'classnames'

const hex = (x) => {
  x = x.toString(16)
  return (x.length === 1) ? '0' + x : x
}

export const pickHex = (color1, color2, percentage) => {
  let midColor = color2

  const r = Math.ceil(parseInt(color1.substring(0, 2), 16) * percentage + parseInt(color2.substring(0, 2), 16) * (1 - percentage))
  const g = Math.ceil(parseInt(color1.substring(2, 4), 16) * percentage + parseInt(color2.substring(2, 4), 16) * (1 - percentage))
  const b = Math.ceil(parseInt(color1.substring(4, 6), 16) * percentage + parseInt(color2.substring(4, 6), 16) * (1 - percentage))

  if (r && g && b) {
    midColor = hex(r) + hex(g) + hex(b)
  }

  return midColor
}

class Stepper extends Component {
  render () {
    const { currentStep, steps, simple, labelColor } = this.props
    const { tealColor, lightGreen, midGrey } = typeof themeVariables === 'object' ? themeVariables : this.props.colors

    return (
      <div className={classnames(
        'stepper',
        {'simple': simple}
      )}>
        <div className='stepper-line' />
        <div className='stepper-content'>
          {steps.map((step, index) => {
            const stepPercentage = 100 / (currentStep - 1)
            const start = index * stepPercentage
            const end = (index + 1) * stepPercentage
            const startColor = simple ? midGrey.slice(1) : pickHex(tealColor.slice(1), lightGreen.slice(1), start / 100)
            const endColor = simple ? midGrey.slice(1) : pickHex(tealColor.slice(1), lightGreen.slice(1), end / 100)

            const isCurrent = currentStep === index + 1
            const isActive = currentStep > index + 1
            const isNotActive = currentStep < index + 1

            return (
              <div
                key={index}
                className={classnames(
                  'step',
                  { 'current': isCurrent },
                  { 'active': isActive },
                  { 'not-active': isNotActive }
                )}
                ref={index}
              >
                <div className='step-image'>
                  { (isCurrent || isActive) &&
                    <div className='step-circle' style={{background: `#${startColor}`}} />
                  }
                </div>
                <div className='step-label'>
                  {index + 1}
                </div>
                <div className='step-name' style={labelColor ? {color: labelColor} : {}}>{step.name}</div>
                { isActive && (index + 1) < steps.length &&
                  <div
                    className='stepper-progress-line'
                    style={{background: `linear-gradient(to right, #${startColor} 0%,#${endColor} 100%)`}}
                  />
                }
                { index === 0 && !isActive && !simple &&
                  <div
                    className='stepper-progress-line'
                    style={{background: `linear-gradient(to right, ${lightGreen} 0%, ${tealColor} 50%, #FFFFFF 100%)`}}
                  />
                }
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

Stepper.defaultProps = {
  colors: {
    tealColor: '#2DB7BA',
    lightGreen: '#14DE2D',
    midGrey: '#AAAAAA'
  }
}

Stepper.propTypes = {
  currentStep: number,
  steps: array,
  simple: bool,
  labelColor: string,
  colors: object // for testing purposes
}

export default Stepper
