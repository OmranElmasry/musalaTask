/** @format */
import i18n from 'i18n-js'
import memoize from 'lodash.memoize'
import AsyncStorage from '@react-native-community/async-storage'
import { Locale } from 'types'
import en from './en.json'
import store from 'redux-store'
import { setAppLanguage } from 'actions'

export const translationGetters = {
    en: () => require('./en.json'),
    bgr: () => require('./bgr.json'),
}

export const translate = memoize(
    (key: keyof typeof en, config?: any) => i18n.t(key, config),
    (key: string, config?: any) => (config ? key + JSON.stringify(config) : key)
)
export const setI18nConfig = async () => {
    return new Promise<void>(async (resolve, reject) => {
        try {
            const data = await AsyncStorage.getItem('defaultLocale')
            if (!data) {
                await setLanguage({languageCode: 'en'})
            } else {
                await setLanguage({languageCode: data})
            }
            resolve()
        } catch (error) {
            console.log(error)
            reject()
        }
    })
}
const setLanguage = async (locale: Locale) => {
    i18n.translations = {
        [locale.languageCode]: translationGetters[locale.languageCode](),
    }
    i18n.locale = locale.languageCode
    store.dispatch(setAppLanguage(locale))
}