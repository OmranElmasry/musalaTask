/** @format */

import { fetchNewsData, resetNewsList } from 'actions'
import { Icons, Images } from 'assets'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, View, TextInput, FlatList, TouchableOpacity, ActivityIndicator, Text, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Colors, Constants } from 'styles'
import { CommonStoreState, newsCard } from 'types'
import { Else, If, Then, When } from 'utils/conditional'

export const Home = () => {
    const [searchText, setSearchText] = useState('')
    const [page, setPage] = useState(0)
    const [isLoadingNews, setisLoadingNews] = useState(true)
    const [isappendingNews, setIsappendingNews] = useState(false)
    const [updateThreshold, setUpdateThreshold] = useState(Constants.window.height)
    const [selectedCatgory, setSelectedCatgory] = useState('general')

    const dispatch = useDispatch()

    const commonState: CommonStoreState = useSelector((state: any) => state.common),
        newsList = commonState.newsList,
        canLoadMoreNews = commonState.canLoadMoreNews

    const tags = [
        { id: 'general', text: 'general' }, { id: 'business', text: 'business' }, { id: 'entertainment', text: 'entertainment' }, 
        { id: 'health', text: 'health' }, { id: 'science', text: 'science' }, { id: 'sports', text: 'sports' }, 
        { id: 'technology', text: 'technology'} 
    ]

    useEffect(() => {
        fetchNews()
    }, [])

    const fetchNews = async () => {
        try {
            setisLoadingNews(true)
            await dispatch(fetchNewsData(searchText, page + 1, selectedCatgory))
            setPage(page => page + 1)
            setisLoadingNews(false)
        } catch (error) {
            setisLoadingNews(false)
        }
    }

    const appendNews = async () => {
        try {
            if (canLoadMoreNews) {
                setIsappendingNews(true)
                await dispatch(fetchNewsData(searchText, page + 1, selectedCatgory))
                setPage(page => page + 1)
                setIsappendingNews(false)
            }
        } catch (error) {
            setIsappendingNews(false)
        }
    }

    const onSubmitSearch = async () => {
        try {
            setPage(1)
            setisLoadingNews(true)
            dispatch(resetNewsList())
            await dispatch(fetchNewsData(searchText, 1, selectedCatgory))
            setisLoadingNews(false)
        } catch (error) {
            setisLoadingNews(false)
        }
    }

    const onScroll = async ({ nativeEvent: { _, __, contentOffset } }: any) => {
        console.log('contentOffset', contentOffset);
        
        if (contentOffset.y > updateThreshold) {
            appendNews()
            setUpdateThreshold(updateThreshold => updateThreshold + Constants.window.height)
        } 
    }

    const selectCategory = (category: string) => {
        setSelectedCatgory(category)
        onSubmitSearch()
    }

    const renderSearchBar = () => {
        return (
            <View style={styles.searchBarRow}>
                {Icons.search()}
                <TextInput
                    value={searchText}
                    placeholder={'Filter News'}
                    onChangeText={setSearchText}
                    placeholderTextColor={Colors.colorGrey3}
                    style={styles.searchTextInput}
                    onSubmitEditing={onSubmitSearch}
                />
            </View>
        )
    }

    const renderNewsCard = (card: newsCard, index: number) => {
        return (
            <TouchableOpacity
                activeOpacity={1}
                key={index}
                style={styles.newsCard}
            >
                <View style={styles.cardDetails}>
                    <Text style={styles.titleText}>{card.title}</Text>
                    <View>
                        <Text style={styles.authorText}>{card.author}</Text>
                        <Text style={styles.dateText}>{card.publishedAt.split('T')[0]}</Text>
                    </View>
                </View>
                <Image
                    source={!!card.urlToImage ? { uri: card.urlToImage } : Images.brokenImage}
                    style={styles.image}
                />
            </TouchableOpacity>
        )
    }

    const renderTags = () => {
        return (
            <FlatList
                showsHorizontalScrollIndicator={false}
                style={styles.anchorTagsList}
                horizontal
                data={tags}
                renderItem={(tag) => renderAnchorTag(tag.item, tag.index)}
            />
        )
    }

    const renderAnchorTag = (tag: any, index: number) => {
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => selectCategory(tag.id)}
                key={index}
                style={selectedCatgory === tag.id? styles.activeTag : styles.inactiveTag}
            >
                <Text allowFontScaling={false} style={selectedCatgory === tag.id ? styles.activeTagText : styles.inactiveTagText}>
                    {tag.text}
                </Text>
            </TouchableOpacity>
        )
    }

    const renderNewsList = () => {
        return (
            <View style={styles.newsListContainer}>
                {renderTags()}
                <FlatList
                    onScroll={onScroll}
                    data={newsList}
                    renderItem={({ item, index }) => renderNewsCard(item, index)}
                />
                <When condition={isappendingNews}>
                    <ActivityIndicator style={styles.appendingActivityIndicator} size={'large'} animating color={Colors.colorGrey3}/>
                </When>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderSearchBar()}
            <If condition={isLoadingNews}>
                <Then>
                    <ActivityIndicator style={styles.activityIndicator} size="large" animating color={Colors.colorGrey3}/>
                </Then>
                <Else>
                    {renderNewsList()}
                </Else>
            </If>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 16,
        marginTop: 32,
        paddingBottom: 130
    },
    activeTag: {
        height: 35,
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingTop: 6,
        paddingBottom: 7,
        backgroundColor: Colors.blue,
        justifyContent: 'center',
        alignItems: 'center',
        marginEnd: 5,
    },
    inactiveTag: {
        height: 35,
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingTop: 6,
        paddingBottom: 7,
        justifyContent: 'center',
        alignItems: 'center',
        marginEnd: 5,
    },
    activeTagText: {
        fontSize: 16,
        fontWeight: '400',
        color: Colors.white,
    },
    inactiveTagText: {
        fontSize: 16,
        fontWeight: '400',
        color: Colors.blue,
    },
    image: {
        height: 100,
        width: 100,
        flex: 0.4
    },
    activityIndicator: {
        flex: 1 
    },
    appendingActivityIndicator: {
        marginTop: 20
    },
    newsCard: {
        marginVertical: 6,
        padding: 20,
        backgroundColor: Colors.white,
        flexDirection: 'row'
    },
    searchBarRow: {
        paddingStart: 12,
        paddingEnd: 32,
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 24,
        backgroundColor: Colors.colorGrey
    },
    searchTextInput: {
        marginStart: 4,
        color: Colors.black
    },
    newsListContainer: {
    },
    titleText: {
        color: Colors.black,
        fontWeight: '600'
    },
    authorText: {
        color: Colors.red,
        fontWeight: '400'
    },
    dateText: {
        color: Colors.colorGrey3,
        fontWeight: '400'
    },
    cardDetails: {
        flex: 0.6,
        justifyContent: 'space-between'
    },
    anchorTagsList: {
        marginStart: 0,
        paddingEnd: 26,
        marginTop: 16,
        marginBottom: -10,
        height: 65,
        paddingBottom: 0,
    },
})
