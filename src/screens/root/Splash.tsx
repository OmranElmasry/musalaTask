/** @format */

import React, { useEffect } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { Images } from 'assets'
import { useNavigation } from '@react-navigation/native'
import { StackNavigation } from 'types'
import { Constants } from 'styles'

type LoginWithMobileScreenNavigationProp = StackNavigation<'SplashScreen'>

export const Splash = () => {
    const navigation = useNavigation<LoginWithMobileScreenNavigationProp>()

    useEffect(() => {
        setTimeout(() => {
            navigation.replace('Home')
        }, 1000)
    }, [])

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
