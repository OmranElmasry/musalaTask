/** @format */
// @ts-nocheck
import React from 'react'
import { Colors } from 'styles'

import HomeIcon from './icons/home.svg'
import SettingsIcon from './icons/settings.svg'
import HomeInactiveIcon from './icons/homeInactive.svg'
import SettingsInactiveIcon from './icons/settingsInactive.svg'
import Search from './icons/search.svg'
import Back from './icons/back.svg'

export const Images = {
    logo: require('./images/appLogo.png'),
    brokenImage: require('./images/brokenImage.png'),
}
export const Icons = {
    home: () => <HomeIcon width={30} height={30}/>,
    settings: () => <SettingsIcon width={30} height={30} />,
    homeInactive: () => <HomeInactiveIcon width={30} height={30}/>,
    settingsInactive: () => <SettingsInactiveIcon width={30} height={30}/>,
    search: () => <Search width={20} height={20} stroke={Colors.colorGrey}/>,
    back: () => <Back stroke={Colors.black}/>,
}