/**
 * @module LanguageProvider/LocaleSelect
 */

import React from 'react'
import { object, func } from 'prop-types'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

const LocaleSelect = ({ lang, onLocalChange }) => (
  <Select
    className='locale-select'
    value={lang.locale}
    onChange={onLocalChange}
  >
    {lang.locales.map(locale =>
      <MenuItem key={locale} value={locale}>{locale}</MenuItem>
    )}
  </Select>
)

LocaleSelect.propTypes = {
  /**
   * Selected locale and available locales object
   */
  lang: object.isRequired,
  /**
   * Triggers local change
   */
  onLocalChange: func.isRequired,
}

export default LocaleSelect
