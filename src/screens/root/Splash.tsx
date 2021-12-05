/** @format */

import React, { useEffect } from 'react'
import { StyleSheet, View, Image, useColorScheme } from 'react-native'
import { Images } from 'assets'
import { useNavigation } from '@react-navigation/native'
import { CommonStoreState, RootStackNavigation } from 'types'
import { Colors, Constants } from 'styles'
import { loadAppLanguage, setDarkMode } from 'actions'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'

export const Splash = () => {
    const navigation = useNavigation< RootStackNavigation<'SplashScreen'>>()
    const dispatch = useDispatch()
    const commonState: CommonStoreState = useSelector((state: any) => state.common),
        isDarkMode = commonState.isDarkMode

    useEffect(() => {
        initApp()
    }, [])

    const initApp = async () => {
        await loadAppLanguage()
        const data = await AsyncStorage.getItem('isDarkMode')
        if (!data || data === 'false') {
            dispatch(setDarkMode(false))
        } else if (data === 'true') {
            dispatch(setDarkMode(true))
        }
        navigation.replace('Home')
    }

    return (
        <View style={isDarkMode ? styles.darkContainer : styles.lightContainer}>
            <Image source={Images.logo} style={styles.logo} resizeMode="contain" />
        </View>
    )
}

const styles = StyleSheet.create({
    darkContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.darkBackground 
    },
    lightContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.lightBackground 
    },
    logo: {
        margin: 40,
        width: Constants.screen.width / 2,
        height: Constants.screen.width / 2,
        alignSelf: 'center',
    },
})
