import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { localGet } from 'util/storage'

import enUS from './translations/en-US.json'

export const LOCALE_KEY = 'lng'

export async function changeLocale (locale: string) {
  if (locale !== 'en-US') {
    i18n.addResourceBundle(locale, 'translation', await import(`./translations/${locale}.json`), true, true)
  }

  i18n.changeLanguage(locale)
}

i18n
  .use(initReactI18next)
  .init({
    resources: { 'en-US': { translation: enUS } },
    lng: 'en-US',
    fallbackLng: 'en-US',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    react: {
      useSuspense: false,
    },
  })

const selected = localGet(LOCALE_KEY)

if (selected != null && selected !== 'en-US') {
  changeLocale(selected)
}

export default i18n
