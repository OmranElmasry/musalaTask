/** @format */
// @ts-nocheck
import React from 'react'

import HomeIcon from './icons/home.svg'
import SettingsIcon from './icons/settings.svg'
import HomeInactiveIcon from './icons/homeInactive.svg'
import SettingsInactiveIcon from './icons/settingsInactive.svg'

export const Images = {
    logo: require('./images/appLogo.png'),
}
export const Icons = {
    home: () => <HomeIcon />,
    settings: () => <SettingsIcon />,
    homeInactive: () => <HomeInactiveIcon />,
    settingsInactive: () => <SettingsInactiveIcon />,
}