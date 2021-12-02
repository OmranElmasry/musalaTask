/** @format */

import { RESET_NEWS_LIST, SET_NEWS_LIST } from "redux-types"
import { CommonStoreState } from "types"

export const commonInitialState: CommonStoreState = {
    newsList: [],
    canLoadMoreNews: true
}

const common = (state = commonInitialState, action: any): CommonStoreState => {
    switch (action?.type) {
        case SET_NEWS_LIST:
            return { ...state, newsList: [...state.newsList, ...action.newsList], canLoadMoreNews: !!action.newsList.length }
        case RESET_NEWS_LIST:
            return { ...state, newsList: [], canLoadMoreNews: true }
        default:
            return state
    }
}

export default common
