import * as React from 'react'

import { useTranslation } from 'react-i18next'

import { LOCALE_KEY, changeLocale } from './i18n'

import { config } from 'constants/global'

import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

import { localPut } from 'util/storage'

import useStyles from './styles'

const LocaleSelect: React.FC<{}> = () => {
  const classes = useStyles()

  const { i18n } = useTranslation()

  const handleLocaleChange = ({ target: { value } }: React.ChangeEvent<HTMLSelectElement>) => {
    changeLocale(value)
    localPut(LOCALE_KEY, value)
  }

  const selectionMenuItems = config.i18n.map((opt) => (
    <MenuItem
      key={opt.locale}
      value={opt.locale}
    >
      {opt.label}
    </MenuItem>
  ))

  return (
    <Select
      className={classes.languageSelector}
      id='selectionMenuLabel'
      onChange={handleLocaleChange}
      value={i18n.language}
    >
      {selectionMenuItems}
    </Select>
  )
}

export default LocaleSelect
