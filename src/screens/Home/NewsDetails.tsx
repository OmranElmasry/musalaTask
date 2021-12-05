/** @format */

import { useNavigation, useRoute } from '@react-navigation/core'
import { Icons, Images } from 'assets'
import React from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, Linking } from 'react-native'
import { useSelector } from 'react-redux'
import { Colors, Constants, getThemeColor } from 'styles'
import { translate } from 'translations'
import { CommonStoreState, HomeStackRoute } from 'types'

type NewsDetailsRoute = HomeStackRoute<'NewsDetails'>

export const NewsDetails = () => {

    const commonState: CommonStoreState = useSelector((state: any) => state.common),
        isDarkMode = commonState.isDarkMode

    const navigation = useNavigation()
    const route = useRoute<NewsDetailsRoute>()
    const card = route.params.card,
        category = route.params.category

    const onPressBack = () => {
        navigation.goBack()
    }

    const onPressReadMore = () => {
        Linking.openURL(card.url);
    }

    const renderTopBar = () => {
        return (
            <View style={isDarkMode ? styles.darkNavBar : styles.navBar}>
                <TouchableOpacity activeOpacity={0.5} onPress={onPressBack} style={styles.backButton}>
                    {Icons.back('backIcon', isDarkMode)}
                </TouchableOpacity>
                <Text style={isDarkMode ? styles.darkTitleText : styles.titleText}>{translate('newsDetails[title]')}</Text>
            </View>
        )
    }

    const renderHeaderSection = () => {
        return (
            <View style={styles.headerSection}>
                <View style={styles.activeTag}>
                    <Text style={styles.activeTagText}>{category.text}</Text>
                </View>
                <Text style={styles.dateText}>{card.publishedAt.split('T')[0]}</Text>
            </View>
        )
    }

    const renderDetailsBody = () => {
        return (
            <ScrollView style={isDarkMode ? styles.darkDetailsBody : styles.detailsBody}>
                <Text style={isDarkMode ? styles.darkNewsTitleText : styles.newsTitleText}>{card.title}</Text>
                <Text style={isDarkMode ? styles.darkAuthorText : styles.authorText}>{card.author}</Text>
                <Image
                    source={!!card.urlToImage ? { uri: card.urlToImage } : Images.brokenImage}
                    style={styles.image}
                    resizeMethod={'auto'}
                    resizeMode={'cover'}
                />
                <Text style={isDarkMode ? styles.darkDescriptionText : styles.descriptionText}>{card.description}</Text>
                <TouchableOpacity onPress={onPressReadMore}>
                    <Text style={styles.moreInfo}>{translate('newsDetails[seeMore][text]')}</Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }

    return (
        <SafeAreaView style={isDarkMode ? styles.darkContainer : styles.container}>
            {renderTopBar()}
            {renderHeaderSection()}
            {renderDetailsBody()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: getThemeColor(false, 'background')
    },
    darkContainer: {
        flex: 1,
        backgroundColor: getThemeColor(true, 'background')
    },
    image: {
        marginTop: 26,
        height: 300,
        width: Constants.window.width - 32
    },
    authorText: {
        color: getThemeColor(false, 'red'),
        fontWeight: '400',
        marginTop: 16,
        fontSize: 16
    },
    darkAuthorText: {
        color: getThemeColor(true, 'red'),
        fontWeight: '400',
        marginTop: 16,
        fontSize: 16
    },
    detailsBody: {
        padding: 16,
        backgroundColor: getThemeColor(false, 'cardBackground'),
        flex: 1
    },
    darkDetailsBody: {
        padding: 16,
        backgroundColor: getThemeColor(true, 'cardBackground'),
        flex: 1
    },
    titleText: {
        color: getThemeColor(false, 'normalText'),
        alignSelf: 'center',
        flex: 1,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '600'
    },
    darkTitleText: {
        color: getThemeColor(true, 'normalText'),
        alignSelf: 'center',
        flex: 1,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '600'
    },
    descriptionText: {
        color: getThemeColor(false, 'normalText'),
        alignSelf: 'center',
        fontSize: 18,
        marginTop: 16
    },
    darkDescriptionText: {
        color: getThemeColor(true, 'normalText'),
        alignSelf: 'center',
        fontSize: 18,
        marginTop: 16
    },
    moreInfo: {
        color: Colors.blue,
        fontSize: 18,
        marginTop: 16,
        textDecorationLine: 'underline',
    },
    newsTitleText: {
        color: getThemeColor(false, 'normalText'),
        fontWeight: '500',
        fontSize: 30,
        lineHeight: 40
    },
    darkNewsTitleText: {
        color: getThemeColor(true, 'normalText'),
        fontWeight: '500',
        fontSize: 30,
        lineHeight: 40
    },
    dateText: {
        color: Colors.colorGrey3,
        fontWeight: '400'
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
    activeTagText: {
        fontSize: 16,
        fontWeight: '400',
        color: Colors.white,
    },
    headerSection: {
        flexDirection: 'row',
        margin: 16,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    backButton: {
        padding: 12,
        position: 'absolute',
        left: 4, 
        top: 18
    },
    navBar: {
        flexDirection: 'row',
        backgroundColor: getThemeColor(false, 'navBarBackground'),
        padding: 30
    },
    darkNavBar: {
        flexDirection: 'row',
        backgroundColor: getThemeColor(true, 'navBarBackground'),
        padding: 30
    }
})
