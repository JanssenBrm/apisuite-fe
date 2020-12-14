import * as React from 'react'

import Button from '../Button'

import useStyles from './styles'

import { GreetingCardProps } from './types'

const GreetingCard: React.FC<GreetingCardProps> = ({
  greetingCardText,
  greetingCardButtonAction,
  greetingCardButtonClassName,
  greetingCardButtonLabel,
  greetingCardButtonLink,
}) => {
  const classes = useStyles()

  return (
    <section className={classes.greetingCardContentsContainer}>
      {
        typeof greetingCardText === 'string'
          ? (
            <p className={classes.greetingCardText}>
              {greetingCardText}
            </p>
          )
          : greetingCardText
      }

      {
        greetingCardButtonClassName
          ? (
            <Button
              customButtonClassName={greetingCardButtonClassName}
              href={greetingCardButtonLink}
              label={greetingCardButtonLabel}
              onClick={greetingCardButtonAction}
            />
          )
          : (
            <Button
              background='tertiary'
              color='tertiary'
              fullWidth
              href={greetingCardButtonLink}
              label={greetingCardButtonLabel}
              onClick={greetingCardButtonAction}
            />
          )
      }
    </section>
  )
}

export default GreetingCard
