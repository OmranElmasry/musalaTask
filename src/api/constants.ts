/** @format */


import Config from 'react-native-config'

export const REQUEST_MAX_DURATION = 20000
export const OK = 200
export const NO_CONTENT = 204
export const UNAUTHORIZED = 401
export const REQUEST_TIMEOUT = 408

const apiKey = Config.API_KEY

export const Constants = {
    get: (query: string, page: number) => `everything?q=${query}&sortBy=publishedAt&apiKey=${apiKey}&pageSize=10&page=${page}`,
    getTopHeadlines: (category: string, page: number) => `top-headlines?country=us&category=${category}&apiKey=${apiKey}&pageSize=10&page=${page}`,
}

export default Constants
