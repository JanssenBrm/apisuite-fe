import React from 'react'
import Button from './button'

export default {
  title: 'Button',
  component: Button,
}

export const Default = (): React.ReactNode => (
  <Button variant="contained">
    Default
  </Button>
)

export const Primary = (): React.ReactNode => (
  <Button variant="contained" btncolor="primary">
    Primary
  </Button>
)

export const Secondary = (): React.ReactNode => (
  <Button variant="contained" btncolor="secondary">
    Secondary
  </Button>
)

export const Tertiary = (): React.ReactNode => (
  <Button variant="contained" btncolor="tertiary">
    Tertiary
  </Button>
)

export const Warning = (): React.ReactNode => (
  <Button variant="contained" btncolor="warning">
    Warning
  </Button>
)

export const Disabled = (): React.ReactNode => (
  <Button variant="contained" disabled>
    Disabled
  </Button>
)
