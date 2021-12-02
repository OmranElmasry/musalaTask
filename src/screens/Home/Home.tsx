/** @format */

import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { Colors } from 'styles'


export const Home = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <Text>{'HOME'}</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.colorGrey01,
    },
})
