/**
 * /*
 *     read this carefully before using this implementation:
 *     https://reactnavigation.org/docs/typescript
 *
 *     we use these three types for the navigation as follows:
 *     - StackNavigation: is a generic custom type that accepts one parameter of type null or any key of StackParamList
 *     - BottomTabNavigation: is a generic custom type that accepts one parameter of type null or any key of BottomTabParamList
 *     - CompositeNavigation: is a generic custom type that accepts two parameters of type  StackNavigation or BottomTabNavigation
 *
 *     we use these two types for the route as follows:
 *     - StackRoute: is a generic custom type that accepts one parameter of type (key of StackParamList)
 *     - BottomTabRoute: is a generic custom type that accepts one parameter of type (key of BottomTabParamList)
 *
 * @format
 */

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { StackNavigationProp } from '@react-navigation/stack'
import { CompositeNavigationProp } from '@react-navigation/native'
import { RouteProp } from '@react-navigation/native'

export type HomeStackParamList = {
    HomeScreen: undefined
}

export type ProfileStackParamList = {
    ProfileScreen: undefined
}

export type RootStackParamList = {
    SplashScreen: undefined
    Home: undefined
}

export type BottomTabParamList = {
    HomeStack: undefined
    ProfileStack: undefined
}

// navigation types
export type StackNavigation<T extends keyof RootStackParamList | null> = StackNavigationProp<RootStackParamList, T | any>
export type BottomTabNavigation<T extends keyof BottomTabParamList | null> = BottomTabNavigationProp<BottomTabParamList, T | any>

type Navigation = StackNavigation<keyof RootStackParamList | null> | BottomTabNavigation<keyof BottomTabParamList | null>

export type CompositeNavigation<T extends Navigation, K extends Navigation> = CompositeNavigationProp<T, K>

// route types
export type StackRoute<T extends keyof RootStackParamList> = RouteProp<RootStackParamList, T>

export type HomeStackRoute<T extends keyof HomeStackParamList> = RouteProp<HomeStackParamList, T>

export type BottomTabRoute<T extends keyof BottomTabParamList> = RouteProp<BottomTabParamList, T>
