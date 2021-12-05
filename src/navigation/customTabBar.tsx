/** @format */

import React, { useEffect, useState } from 'react'
import { SafeAreaView, TouchableOpacity, View, StyleSheet, Keyboard } from 'react-native'
import { Navigator } from './navRef'
import { Icons } from 'assets'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { getThemeColor } from 'styles'
import { CommonStoreState } from 'types'
import { useSelector } from 'react-redux'
import { When } from 'utils'

export const CustomTabBar = ({ state, navigation }: BottomTabBarProps) => {

    const commonState: CommonStoreState = useSelector((state: any) => state.common),
        isDarkMode = commonState.isDarkMode
        
    const [darkMode, setDarkMode] = useState(isDarkMode)

    const [showTab, setShowTab] = useState(true)

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', _keyboardDidShow)
        Keyboard.addListener('keyboardDidHide', _keyboardDidHide)

        return () => {
            Keyboard.removeListener('keyboardDidShow', _keyboardDidShow)
            Keyboard.removeListener('keyboardDidHide', _keyboardDidHide)
        }
    }, [])

    const _keyboardDidShow = () => {
        setShowTab(false)
    }

    const _keyboardDidHide = () => {
        setShowTab(true)
    }


    const navigateToTab = (tabName: any, screen?: string) => {
        navigation.navigate(tabName, { screen: screen })
        Navigator.setActiveTab(tabName)
    }

    useEffect(() => {
        setDarkMode(isDarkMode)
    }, [isDarkMode])

    return (
        <SafeAreaView>
            <When condition={showTab}>
                <View style={darkMode ? styles.darkContainer : styles.lightContainer}>
                    <TouchableOpacity style={styles.navBarIcon} onPress={() => navigateToTab('HomeStack')}>
                        {state.index === 0 ? Icons.home('tabBarIconColor', isDarkMode) : Icons.homeInactive('tabBarIconColor', isDarkMode)}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navBarIcon} onPress={() => navigateToTab('ProfileStack', 'ProfileScreen')}>
                        {state.index === 1 ? Icons.settings('tabBarIconColor', isDarkMode) : Icons.settingsInactive('tabBarIconColor', isDarkMode)}
                    </TouchableOpacity>
                </View>
            </When>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    lightContainer: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: getThemeColor(false, 'navBarBackground')
    },
    darkContainer: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: getThemeColor(true, 'navBarBackground')
    },
    navBarIcon: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
    
