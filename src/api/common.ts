/** @format */

import Requests from './constants'
import { mainAxios } from './axios'
import { AxiosPromise } from 'axios'
import { newsCard } from 'types'

interface NewsListRequest extends AxiosPromise<newsCard[]> {}

export const Common = {
    get: (query: string, page: number): NewsListRequest => mainAxios.get(Requests.get(query, page)),
    getTopHeadlines: (category: string, page: number): NewsListRequest => mainAxios.get(Requests.getTopHeadlines(category, page)),
}
