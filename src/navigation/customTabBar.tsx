/** @format */

import React from 'react'
import { SafeAreaView, TouchableOpacity, View, StyleSheet } from 'react-native'
import { Navigator } from './navRef'
import { Icons } from 'assets'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'

export const CustomTabBar = ({ state, navigation }: BottomTabBarProps) => {
    const navigateToTab = (tabName: any, screen?: string) => {
        navigation.navigate(tabName, { screen: screen })
        Navigator.setActiveTab(tabName)
    }

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <TouchableOpacity style={styles.navBarIcon} onPress={() => navigateToTab('HomeStack')}>
                    {state.index === 0 ? Icons.home() : Icons.homeInactive()}
                </TouchableOpacity>
                <TouchableOpacity style={styles.navBarIcon} onPress={() => navigateToTab('ProfileStack', 'ProfileScreen')}>
                    {state.index === 1 ? Icons.settings() : Icons.settingsInactive()}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    navBarIcon: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
    
