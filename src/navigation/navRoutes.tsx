/** @format */

import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
    RootStackParamList,
    BottomTabParamList,
    HomeStackParamList,
    ProfileStackParamList,
} from 'types'
import * as Screens from 'screens'
import { isReadyRef, navigationRef, Navigator } from './navRef'
import { CustomTabBar } from './customTabBar'


const RootStack = createStackNavigator<RootStackParamList>()
const HomeStack = createStackNavigator<HomeStackParamList>()
const ProfileStack = createStackNavigator<ProfileStackParamList>()

const Tab = createBottomTabNavigator<BottomTabParamList>()

function Home() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName={'HomeStack'}
            tabBar={(props: any) => <CustomTabBar {...props} />}
        >
            <Tab.Screen
                name="HomeStack"
                component={HomeStackNavigator}
               
                listeners={({ navigation, route }) => ({
                    tabPress: (e) => {
                        Navigator.setActiveTab('HomeStack')
                    },
                })}
            />
            <Tab.Screen
                name="ProfileStack"
                component={ProfileStackNavigator}
                
                listeners={({ navigation, route }) => ({
                    tabPress: (e) => {
                        Navigator.setActiveTab('ProfileStack')
                    },
                })}
            />
        </Tab.Navigator>
    )
}

function ProfileStackNavigator() {
    return (
        <ProfileStack.Navigator
            initialRouteName={'ProfileScreen'}
            screenOptions={{
                headerShown: false,
            }}
        >
            <ProfileStack.Screen
                name="ProfileScreen"
                component={Screens.Profile}
            />
        </ProfileStack.Navigator>
    )
}

function HomeStackNavigator() {
    return (
        <HomeStack.Navigator
            initialRouteName={'HomeScreen'}
            screenOptions={{
                headerShown: false,
            }}
        >
            <HomeStack.Screen name="HomeScreen" component={Screens.Home} />
            <HomeStack.Screen name="NewsDetails" component={Screens.NewsDetails} />
        </HomeStack.Navigator>
    )
}

export function Router() {
    return (
        <NavigationContainer
            ref={navigationRef}
            onReady={() => isReadyRef.current = true}
            onStateChange={(state: any) => Navigator.setCurrentState(state)}
        >
            <RootStack.Navigator
                initialRouteName={'SplashScreen'}
                screenOptions={{
                    headerShown: false,
                    cardStyleInterpolator: ({ current }) => ({
                        cardStyle: {
                            opacity: current.progress,
                        },
                    }),
                }}
            >
                <RootStack.Screen name="SplashScreen" component={Screens.Splash} />
                <RootStack.Screen name="Home" component={Home} />
            </RootStack.Navigator>
        </NavigationContainer>
    )
}
