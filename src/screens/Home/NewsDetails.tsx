/** @format */

import { useNavigation, useRoute } from '@react-navigation/core'
import { Icons, Images } from 'assets'
import React from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, Linking } from 'react-native'
import { Colors, Constants } from 'styles'
import { HomeStackRoute } from 'types'

type NewsDetailsRoute = HomeStackRoute<'NewsDetails'>

export const NewsDetails = () => {

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
            <View style={styles.navBar}>
                <TouchableOpacity activeOpacity={0.5} onPress={onPressBack} style={styles.backButton}>
                    {Icons.back()}
                </TouchableOpacity>
                <Text style={styles.titleText}>{"Details"}</Text>
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
            <ScrollView style={styles.detailsBody}>
                <Text style={styles.newsTitleText}>{card.title}</Text>
                <Text style={styles.authorText}>{card.author}</Text>
                <Image
                    source={!!card.urlToImage ? { uri: card.urlToImage } : Images.brokenImage}
                    style={styles.image}
                    resizeMethod={'auto'}
                    resizeMode={'cover'}
                />
                <Text style={styles.descriptionText}>{card.description}</Text>
                <TouchableOpacity onPress={onPressReadMore}>
                    <Text style={styles.moreInfo}>{"for more info read full article"}</Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderTopBar()}
            {renderHeaderSection()}
            {renderDetailsBody()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        marginTop: 26,
        height: 300,
        width: Constants.window.width - 32
    },
    authorText: {
        color: Colors.colorGrey3,
        fontWeight: '400',
        marginTop: 16,
        fontSize: 16
    },
    detailsBody: {
        padding: 16,
        backgroundColor: Colors.white,
        flex: 1
    },
    titleText: {
        color: Colors.black,
        alignSelf: 'center',
        flex: 1,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '600'
    },
    descriptionText: {
        color: Colors.black,
        alignSelf: 'center',
        fontSize: 18,
        marginTop: 16
    },
    moreInfo: {
        color: Colors.blue,
        fontSize: 18,
        marginTop: 16
    },
    newsTitleText: {
        color: Colors.black,
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
        backgroundColor: Colors.white,
        padding: 30
    }
})
