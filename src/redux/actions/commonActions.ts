/** @format */

import { Common } from "api"
import { Dispatch } from "react"
import { RESET_NEWS_LIST, SET_APP_LANGUAGE, SET_DARK_MODE, SET_NEWS_LIST } from "redux-types"
import { setI18nConfig } from "translations"
import { Locale, NewsCard } from "types"

export const fetchNewsData = (query: string, page: number, category: string) => {
    return (dispatch: Dispatch<any>, _: any) => {
        return new Promise(async (resolve, reject) => {
            try {
                if (!!query) {
                    const { data }: any = await Common.get(query, page)
                    dispatch(setNewsList(data.articles))
                    resolve(data.articles)
                } else {
                    const { data }: any = await Common.getTopHeadlines(category, page)
                    dispatch(setNewsList(data.articles))
                    resolve(data.articles)
                }
            } catch (error) {
                console.log(error)
                reject(error)
            }
        })
    }
}

export const loadAppLanguage = () => {
    return new Promise<void>(async (resolve, reject) => {
        try {
            await setI18nConfig()
            resolve()
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}

export const setNewsList = (newsList: NewsCard[]) => {
    return {
        type: SET_NEWS_LIST,
        newsList,
    }
}

export const resetNewsList = () => {
    return {
        type: RESET_NEWS_LIST,
    }
}

export const setAppLanguage = (locale: Locale) => {
    return {
        type: SET_APP_LANGUAGE,
        locale
    }
}

export const setDarkMode = (isDarkMode: boolean) => {
    return {
        type: SET_DARK_MODE,
        isDarkMode
    }
}
