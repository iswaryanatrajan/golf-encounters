import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translation_en from './en/common.json'
import translation_ja from './ja/common.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    fallbackLng: 'ja',
    lng: 'ja',
    interpolation: {
      escapeValue: false,
      },
    resources: {
        en: {
            translation: translation_en
        },
        ja: {
            translation: translation_ja
        }
    }

  });

export default i18n;