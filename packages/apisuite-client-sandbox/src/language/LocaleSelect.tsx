import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { localPut } from 'util/storage'
import { config } from 'constants/global'
import { LOCALE_KEY, changeLocale } from './i18n'

const LocaleSelect: React.FC<{}> = () => {
  const { i18n } = useTranslation()

  function handleLocaleChange ({ target: { value } }: React.ChangeEvent<HTMLSelectElement>) {
    changeLocale(value)
    localPut(LOCALE_KEY, value)
  }

  return (
    <select value={i18n.language} onChange={handleLocaleChange} style={{ maxWidth: 140 }}>
      {config.i18n.map((opt) => (
        <option key={opt.locale} value={opt.locale}>{opt.label}</option>
      ))}
    </select>
  )
}

export default LocaleSelect
