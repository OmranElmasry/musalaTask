/** @format */

import { fetchNewsData, resetNewsList } from 'actions'
import { Icons, Images } from 'assets'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, View, TextInput, FlatList, TouchableOpacity, ActivityIndicator, Text, Image, RefreshControl, Linking } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Colors, Constants, getThemeColor } from 'styles'
import { BottomTabNavigation, CommonStoreState, CompositeNavigation, NewsCard, NewsCategory, StackNavigation } from 'types'
import { Else, If, Then, When } from 'utils/conditional'
import { useNavigation } from '@react-navigation/core'
import { translate } from 'translations'

type HomeScreenNavigationProp = 
    CompositeNavigation<StackNavigation<'HomeScreen'>,
        CompositeNavigation<BottomTabNavigation<null>, StackNavigation<null>>
    >
export const Home = () => {
    const newsCategories =  [
        { index: 0, id: 'general', text: translate('static[newsCategories][general]') }, 
        { index: 1, id: 'business', text: translate('static[newsCategories][business]') }, 
        { index: 2, id: 'entertainment', text: translate('static[newsCategories][entertainment]') }, 
        { index: 3, id: 'health', text: translate('static[newsCategories][health]') }, 
        { index: 4, id: 'science', text: translate('static[newsCategories][science]') }, 
        { index: 5, id: 'sports', text: translate('static[newsCategories][sports]') }, 
        { index: 6, id: 'technology', text: translate('static[newsCategories][technology]')} 
    ]

    const [searchText, setSearchText] = useState('')
    const [page, setPage] = useState(0)
    const [isLoadingNews, setIsLoadingNews] = useState(true)
    const [isappendingNews, setIsappendingNews] = useState(false)
    const [updateThreshold, setUpdateThreshold] = useState(Constants.window.height)
    const [selectedCatgory, setSelectedCatgory] = useState(newsCategories[0])

    const dispatch = useDispatch()

    const navigation = useNavigation<HomeScreenNavigationProp>()

    const commonState: CommonStoreState = useSelector((state: any) => state.common),
        newsList = commonState.newsList,
        canLoadMoreNews = commonState.canLoadMoreNews,
        isDarkMode = commonState.isDarkMode

    useEffect(() => {
        fetchNews()
    }, [])

    useEffect(() => {
        // Get the deep link used to open the app
        getDeepLinkingAsync()
    }, [])
    
    const getDeepLinkingAsync = async () => {
        // Get the deep link used to open the app
        const initialUrl: any = await Linking.getInitialURL()
        handleDeepLinking(initialUrl)
        // Get the deep link if the app in foreground
        Linking.addEventListener('url', handleForegroundURL)
    }

    const handleForegroundURL = ({ url }: any) => {
        handleDeepLinking(url)
    }

    const handleDeepLinking = async (initialUrl: string) => {
        if (initialUrl) {
            const url = initialUrl.split('musalaSoftSomething://')[1]
            const card = JSON.parse(initialUrl.split('card=')[1])
            const selectedCatgory = JSON.parse(initialUrl.split('category=')[1])
            if (url) {
                switch (url) {
                    case 'newsDetails': // Navigate user to verify email screen
                        navigation.navigate('NewsDetails', { card, category: selectedCatgory })
                        break
                }
            }
        }
    }

    const fetchNews = async () => {
        try {
            setIsLoadingNews(true)
            await dispatch(fetchNewsData(searchText, page + 1, selectedCatgory.id))
            setPage(page => page + 1)
            setIsLoadingNews(false)
        } catch (error) {
            setIsLoadingNews(false)
        }
    }

    const appendNews = async () => {
        try {
            if (canLoadMoreNews) {
                setIsappendingNews(true)
                await dispatch(fetchNewsData(searchText, page + 1, selectedCatgory.id))
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
            setIsLoadingNews(true)
            dispatch(resetNewsList())
            await dispatch(fetchNewsData(searchText, 1, selectedCatgory.id))
            setIsLoadingNews(false)
        } catch (error) {
            setIsLoadingNews(false)
        }
    }

    const onScroll = async ({ nativeEvent: { _, __, contentOffset } }: any) => {
        if (contentOffset.y > updateThreshold) {
            appendNews()
            setUpdateThreshold(updateThreshold => updateThreshold + Constants.window.height)
        } 
    }

    const selectCategory = (category: NewsCategory) => {
        setSelectedCatgory(category)
        onSubmitSearch()
    }

    const onCardPress = (card: NewsCard) => {
        navigation.navigate('NewsDetails', { card, category: selectedCatgory })
    }

    const $RefreshControl: any = <RefreshControl onRefresh={onSubmitSearch} refreshing={isLoadingNews} />
    
    const renderSearchBar = () => {
        return (
            <View style={isDarkMode ? styles.darkSearchBarRow : styles.searchBarRow}>
                {Icons.search('black')}
                <TextInput
                    value={searchText}
                    placeholder={translate('home[search][placeholder]')}
                    onChangeText={setSearchText}
                    placeholderTextColor={getThemeColor(isDarkMode, 'placeholderText')}
                    style={styles.searchTextInput}
                    onSubmitEditing={onSubmitSearch}
                />
            </View>
        )
    }

    const renderNewsCard = (card: NewsCard, index: number) => {
        return (
            <TouchableOpacity
                activeOpacity={1}
                key={index}
                style={isDarkMode ? styles.darkNewsCard : styles.newsCard}
                onPress={() => onCardPress(card)}
            >
                <View style={styles.cardDetails}>
                    <Text style={isDarkMode ? styles.darkTitleText : styles.titleText}>{card.title}</Text>
                    <View>
                        <Text style={styles.sourceText}>{card?.source?.name}</Text>
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
                data={newsCategories}
                renderItem={(tag) => renderAnchorTag(tag.item, tag.index)}
            />
        )
    }

    const renderAnchorTag = (tag: any, index: number) => {
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => selectCategory(tag)}
                key={index}
                style={selectedCatgory.id === tag.id? styles.activeTag : styles.inactiveTag}
            >
                <Text style={selectedCatgory.id === tag.id ? styles.activeTagText : styles.inactiveTagText}>
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
                    refreshControl={$RefreshControl}
                    onScroll={onScroll}
                    data={newsList}
                    renderItem={({ item, index }) => renderNewsCard(item, index)}
                />
                <When condition={isappendingNews}>
                    <ActivityIndicator style={styles.appendingActivityIndicator} size={'large'} animating color={getThemeColor(true,'colorGrey3')}/>
                </When>
            </View>
        )
    }

    return (
        <SafeAreaView style={isDarkMode ? styles.darkContainer : styles.container}>
            {renderSearchBar()}
            <If condition={isLoadingNews}>
                <Then>
                    <ActivityIndicator style={styles.activityIndicator} size="large" animating color={getThemeColor(true,'colorGrey3')}/>
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
        paddingBottom: 130,
        backgroundColor: getThemeColor(false, 'background')
    },
    darkContainer: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 32,
        paddingBottom: 130,
        backgroundColor: getThemeColor(true, 'background')
    },
    activeTag: {
        height: 35,
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingTop: 6,
        paddingBottom: 7,
        backgroundColor: getThemeColor(true,'blue'),
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
        color: getThemeColor(true,'white'),
    },
    inactiveTagText: {
        fontSize: 16,
        fontWeight: '400',
        color: getThemeColor(true,'blue'),
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
        backgroundColor: getThemeColor(false, 'cardBackground'),
        flexDirection: 'row'
    },
    darkNewsCard: {
        marginVertical: 6,
        padding: 20,
        backgroundColor: getThemeColor(true, 'cardBackground'),
        flexDirection: 'row'
    },
    searchBarRow: {
        paddingStart: 12,
        paddingEnd: 32,
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 24,
        backgroundColor: getThemeColor(false, 'colorGrey')
    },
    darkSearchBarRow: {
        paddingStart: 12,
        paddingEnd: 32,
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 24,
        backgroundColor: getThemeColor(true, 'colorGrey3')
    },
    searchTextInput: {
        marginStart: 4,
        color: Colors.black,
        flex: 1
    },
    newsListContainer: {
    },
    titleText: {
        color: getThemeColor(false, 'normalText'),
        paddingEnd: 8,
        fontWeight: '600'
    },
    darkTitleText: {
        color: getThemeColor(true, 'normalText'),
        paddingEnd: 8,
        fontWeight: '600'
    },
    sourceText: {
        color: getThemeColor(true,'red'),
        fontWeight: '400'
    },
    dateText: {
        color: getThemeColor(true,'colorGrey3'),
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
