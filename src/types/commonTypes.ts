export type CommonStoreState = {
    newsList: NewsCard[]
    canLoadMoreNews: boolean
    locale: Locale
    isDarkMode: boolean
}

export type NewsCard = {
    author: string
    content: string
    description: string
    publishedAt: string
    source: {
        id: string
        name: string
    }
    title: string
    url: string
    urlToImage: string
}

export type NewsCategory = {
    id: string,
    index: number,
    text: string
}

export type Locale = {
    languageCode: 'en' | 'bgr',
}