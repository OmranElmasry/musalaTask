/** @format */

export const Colors = {
    lightBackground: '#EEEEEE',
    darkBackground: '#ff000000',
    colorGrey: '#e2e2e2',
    colorGrey2: '#ececec',
    colorGrey3: '#808080',
    black: '#000000',
    white: '#FFFFFF',
    red: '#c04141',
    blue: '#4da6ff'
}
/** @format */
export const getThemeColor = (isDarkMode: boolean, color: keyof typeof lightTheme) => {
    if (!!isDarkMode) {
        return darkTheme[color]
    } else {
        return lightTheme[color]
    }
}

export const lightTheme = {
    placeholderText: '#808080',
    backIcon: '#000000',
    modalBackground: '#FFFFFF',
    cardBackground: '#FFFFFF',
    navBarBackground: '#FFFFFF',
    normalText: '#000000',
    tabBarIconColor: '#000000',
    background: '#EEEEEE',
    colorGrey: '#e2e2e2',
    colorGrey2: '#ececec',
    colorGrey3: '#808080',
    black: '#000000',
    white: '#FFFFFF',
    red: '#c04141',
    blue: '#4da6ff'
}

export const darkTheme = {
    placeholderText: '#e2e2e2',
    backIcon: '#FFFFFF',
    modalBackground: '#424242',
    navBarBackground: '#1e1e1e',
    normalText: '#FFFFFF',
    cardBackground: '#424242',
    tabBarIconColor: '#FFFFFF',
    background: '#121212',
    colorGrey: '#e2e2e2',
    colorGrey2: '#141414',
    colorGrey3: '#808080',
    black: '#000000',
    white: '#FFFFFF',
    red: '#ff0101',
    blue: '#4da6ff'
}
