export type CommonStoreState = {
    newsList: newsCard[]
    canLoadMoreNews: boolean
}

export type newsCard = {
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