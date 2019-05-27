import VueI18n from 'vue-i18n'
import messages from './messages'

/**
 * Create new instance for i18n, set current locale
 * and all messages
 *
 * @param  String locale
 * @return VueI18n
 */
export const createI18n = (locale = 'pt_BR', fallbackLocale = 'pt_BR') => {
  return new VueI18n({
    locale,
    fallbackLocale,
    messages
  })
}
