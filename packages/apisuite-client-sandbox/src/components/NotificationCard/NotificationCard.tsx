import * as React from 'react'

import Button from '../Button'

import CloseRoundedIcon from '@material-ui/icons/CloseRounded'

import useStyles from './styles'

import { NotificationCardProps } from './types'

const NotificationCard: React.FC<NotificationCardProps> = ({
  // Temporary until notification cards become clearer
  notificationCards,
  notificationCardText,
  notificationCardTitle,
  notificationCardButtonAction,
  notificationCardButtonClassName,
  notificationCardButtonLabel,
  notificationCardButtonLink,
  // Temporary until notification cards become clearer
  toggleNotificationCards,
}) => {
  const classes = useStyles()

  const [showing, setShowing] = React.useState(notificationCards.showNotificationCards)

  React.useEffect(() => {
    if (showing !== notificationCards.showNotificationCards) {
      setShowing(notificationCards.showNotificationCards)
    }
  }, [notificationCards])

  return (
    showing
      ? (
        <section className={classes.notificationCardContentsContainer}>
          <div>
            <p className={classes.notificationCardTitle}>
              {notificationCardTitle}
            </p>

            {
              typeof notificationCardText === 'string'
                ? (
                  <p className={classes.notificationCardText}>
                    {notificationCardText}
                  </p>
                )
                : notificationCardText
            }
          </div>

          {
            notificationCardButtonClassName
              ? (
                <Button
                  customButtonClassName={notificationCardButtonClassName}
                  href={notificationCardButtonLink}
                  label={notificationCardButtonLabel}
                  onClick={notificationCardButtonAction}
                />
              )
              : (
                <Button
                  background='tertiary'
                  color='tertiary'
                  fullWidth
                  href={notificationCardButtonLink}
                  label={notificationCardButtonLabel}
                  onClick={notificationCardButtonAction}
                />
              )
          }

          <CloseRoundedIcon
            className={classes.notificationCardCloseButton}
            onClick={toggleNotificationCards}
          />
        </section>
      )
      : null
  )
}

export default NotificationCard
