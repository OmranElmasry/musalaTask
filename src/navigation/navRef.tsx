/** @format */

import React from 'react'
import { NavigationContainerRef, CommonActions } from '@react-navigation/native'
import { StackActions } from '@react-navigation/native'
import { RootStackParamList, BottomTabParamList, ProfileStackParamList, HomeStackParamList } from 'types'

type Route = {
    name: Screen
    params?: object
}

type State = {
    index: number
    routes: Route[]
}

type Tab = keyof BottomTabParamList

type Screen = keyof RootStackParamList | keyof HomeStackParamList | keyof ProfileStackParamList | keyof BottomTabParamList

let currentState: State

let activeTab: Tab = 'HomeStack'

export const isReadyRef = React.createRef<null>()

export const navigationRef = React.createRef<NavigationContainerRef>()

function navigate(...args: [Screen, object] | [Screen]) {
    if (isReadyRef.current && navigationRef.current) {
        navigationRef.current.navigate(...args)
    } else {
        /*
      Todo:
        * log to sentry
    */
        console.log('navigation ref is not ready.')
    }
}

function push(name: Screen, params?: object) {
    if (isReadyRef.current && navigationRef.current) {
        params ? navigationRef.current.dispatch(StackActions.push(name, params)) : navigationRef.current.dispatch(StackActions.push(name))
    } else {
        /*
      Todo:
        * log to sentry
    */
        console.log('navigation ref is not ready.')
    }
}

function replace(name: Screen, params?: object) {
    if (isReadyRef.current && navigationRef.current) {
        params ? navigationRef.current.dispatch(StackActions.replace(name, params)) : navigationRef.current.dispatch(StackActions.replace(name))
    } else {
        /*
      Todo:
        * log to sentry
    */
        console.log('navigation ref is not ready.')
    }
}

function pop(count?: number) {
    if (isReadyRef.current && navigationRef.current) {
        count ? navigationRef.current.dispatch(StackActions.pop(count)) : navigationRef.current.dispatch(StackActions.pop())
    } else {
        /*
      Todo:
        * log to sentry
    */
        console.log('navigation ref is not ready.')
    }
}

function popToTop() {
    if (isReadyRef.current && navigationRef.current) {
        navigationRef.current.dispatch(StackActions.popToTop())
    } else {
        /*
      Todo:
        * log to sentry
    */
        console.log('navigation ref is not ready.')
    }
}

function reset(state: State) {
    if (isReadyRef.current && navigationRef.current) {
        navigationRef.current.dispatch(CommonActions.reset(state))
    } else {
        /*
      Todo:
        * log to sentry
    */
        console.log('navigation ref is not ready.')
    }
}

function goBack() {
    if (isReadyRef.current && navigationRef.current) {
        navigationRef.current.dispatch(CommonActions.goBack())
    } else {
        /*
      Todo:
        * log to sentry
    */
        console.log('navigation ref is not ready.')
    }
}

function setParams(params: object) {
    if (isReadyRef.current && navigationRef.current) {
        navigationRef.current.dispatch(CommonActions.setParams(params))
    } else {
        /*
      Todo:
        * log to sentry
    */
        console.log('navigation ref is not ready.')
    }
}

function setCurrentState(state: State) {
    currentState = state
}

function getCurrentState() {
    return currentState
}

function resetRoot(state: State) {
    if (isReadyRef.current && navigationRef.current) {
        navigationRef.current.resetRoot(state)
    } else {
        /*
      Todo:
        * log to sentry
    */
        console.log('navigation ref is not ready.')
    }
}

function getCurrentRoute() {
    if (isReadyRef.current && navigationRef.current) {
        return navigationRef.current.getCurrentRoute()
    } else {
        /*
      Todo:
        * log to sentry
    */
        console.log('navigation ref is not ready.')
    }
}

function setActiveTab(tab: Tab) {
    if (activeTab !== tab) {
        activeTab = tab
    }
}

function getActiveTab() {
    return activeTab
}

export const Navigator = {
    navigate: navigate,
    push: push,
    replace: replace,
    pop: pop,
    popToTop: popToTop,
    reset: reset,
    goBack: goBack,
    setParams: setParams,
    setCurrentState: setCurrentState,
    getCurrentState: getCurrentState,
    resetRoot: resetRoot,
    getCurrentRoute: getCurrentRoute,
    setActiveTab: setActiveTab,
    getActiveTab: getActiveTab,
}
