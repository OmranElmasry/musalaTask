export type CommonStoreState = {
    newsList: NewsCard[]
    canLoadMoreNews: boolean
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