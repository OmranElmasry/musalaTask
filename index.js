/**
 * @format
 */
import 'react-native-gesture-handler'
import { AppRegistry } from 'react-native'
import App from './App'
import React from 'react'
import { Provider } from 'react-redux'
import { name as appName } from './app.json'
import store from 'redux-store'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const Root = () => (
    <Provider store={store}>
        <SafeAreaProvider>
            <App />
        </SafeAreaProvider>
    </Provider>
)

AppRegistry.registerComponent(appName, () => Root)
