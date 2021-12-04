/** @format */

import { RESET_NEWS_LIST, SET_APP_LANGUAGE, SET_DARK_MODE, SET_NEWS_LIST } from "redux-types"
import { CommonStoreState } from "types"

export const commonInitialState: CommonStoreState = {
    newsList: [],
    canLoadMoreNews: true,
    locale: {
        languageCode: 'en'
    },
    isDarkMode: false
}

const common = (state = commonInitialState, action: any): CommonStoreState => {
    switch (action?.type) {
        case SET_NEWS_LIST:
            return { ...state, newsList: [...state.newsList, ...action.newsList], canLoadMoreNews: !!action.newsList.length }
        case RESET_NEWS_LIST:
            return { ...state, newsList: [], canLoadMoreNews: true }
        case SET_APP_LANGUAGE:
            return { ...state, locale: action.locale}
        case SET_DARK_MODE:
            return { ...state, isDarkMode: action.isDarkMode}
        default:
            return state
    }
}

export default common
