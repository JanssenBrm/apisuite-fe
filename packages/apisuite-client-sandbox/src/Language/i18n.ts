import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { localGet } from 'util/storage'

import enUS from './translations/en-US.json'
import ptPT from './translations/pt-PT.json'

const resources = {
  'en-US': { translation: enUS },
  'pt-PT': { translation: ptPT },
}

export const LOCALE_KEY = 'lng'

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localGet(LOCALE_KEY) || 'en-US',
    fallbackLng: 'en-US',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    react: {
      useSuspense: false,
    },
  })

export default i18n
