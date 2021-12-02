/** @format */

import { Common } from "api"
import { Dispatch } from "react"
import { RESET_NEWS_LIST, SET_NEWS_LIST } from "redux-types"
import { newsCard } from "types"

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

export const setNewsList = (newsList: newsCard[]) => {
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
