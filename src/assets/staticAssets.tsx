/** @format */
// @ts-nocheck
import React from 'react'
import { Colors, getThemeColor, lightTheme } from 'styles'

import HomeIcon from './icons/home.svg'
import SettingsIcon from './icons/settings.svg'
import HomeInactiveIcon from './icons/homeInactive.svg'
import SettingsInactiveIcon from './icons/settingsInactive.svg'
import Search from './icons/search.svg'
import Back from './icons/back.svg'
import Language from './icons/language.svg'
import DarkMode from './icons/darkMode.svg'
import store from 'redux-store'

const isDarkMode = store.getState().common.isDarkMode

export const Images = {
    logo: require('./images/appLogo.png'),
    brokenImage: require('./images/brokenImage.png'),
}
export const Icons = {
    home: (color: keyof typeof lightTheme, darkMode: boolean = isDarkMode) => <HomeIcon fill={getThemeColor(darkMode, color)} stroke={getThemeColor(darkMode, color)} width={30} height={30}/>,
    settings: (color: keyof typeof lightTheme, darkMode: boolean = isDarkMode) => <SettingsIcon fill={getThemeColor(darkMode, color)} stroke={getThemeColor(darkMode, color)} width={30} height={30} />,
    homeInactive: (color: keyof typeof lightTheme, darkMode: boolean = isDarkMode) => <HomeInactiveIcon fill={getThemeColor(darkMode, color)} stroke={getThemeColor(darkMode, color)} width={30} height={30}/>,
    settingsInactive: (color: keyof typeof lightTheme, darkMode: boolean = isDarkMode) => <SettingsInactiveIcon fill={getThemeColor(darkMode, color)} stroke={getThemeColor(darkMode, color)} width={30} height={30}/>,
    search: (color: keyof typeof lightTheme, darkMode: boolean = isDarkMode) => <Search width={20} height={20} fill={getThemeColor(darkMode, color)} stroke={getThemeColor(darkMode, color)}/>,
    back: (color: keyof typeof lightTheme, darkMode: boolean = isDarkMode) => <Back fill={getThemeColor(darkMode, color)} stroke={getThemeColor(darkMode, color)}/>,
    language: (color: keyof typeof lightTheme, darkMode: boolean = isDarkMode) => <Language fill={getThemeColor(darkMode, color)} stroke={getThemeColor(darkMode, color)}/>,
    darkMode: (color: keyof typeof lightTheme, darkMode: boolean = isDarkMode) => <DarkMode fill={getThemeColor(darkMode, color)} stroke={getThemeColor(darkMode, color)}/>,
}