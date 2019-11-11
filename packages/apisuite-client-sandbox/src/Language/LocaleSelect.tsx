import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { localPut } from 'util/storage'
import options from './localOptions'
import { LOCALE_KEY } from './i18n'

const LocaleSelect: React.FC<{}> = () => {
  const { i18n } = useTranslation()

  function handleLocaleChange ({ target: { value } }: React.ChangeEvent<HTMLSelectElement>) {
    i18n.changeLanguage(value)
    localPut(LOCALE_KEY, value)
  }

  return (
    <select value={i18n.language} onChange={handleLocaleChange} style={{ maxWidth: 140 }}>
      {options.map((opt) => (
        <option key={opt.locale} value={opt.locale}>{opt.label}</option>
      ))}
    </select>
  )
}

export default LocaleSelect
