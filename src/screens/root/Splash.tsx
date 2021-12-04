/** @format */

import React, { useEffect } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { Images } from 'assets'
import { useNavigation } from '@react-navigation/native'
import { RootStackNavigation } from 'types'
import { Constants } from 'styles'
import { loadAppLanguage } from 'actions'

export const Splash = () => {
    const navigation = useNavigation< RootStackNavigation<'SplashScreen'>>()

    useEffect(() => {
        initApp()
    }, [])

    const initApp = async () => {
        await loadAppLanguage()
        navigation.replace('Home')
    }

    return (
        <View style={styles.container}>
            <Image source={Images.logo} style={styles.logo} resizeMode="contain" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        margin: 40,
        width: Constants.screen.width / 2,
        height: Constants.screen.width / 2,
        alignSelf: 'center',
    },
})
