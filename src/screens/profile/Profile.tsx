/** @format */

import React from 'react'
import { StackNavigation, BottomTabNavigation, CompositeNavigation } from 'types'
import { StyleSheet, View, SafeAreaView, Text } from 'react-native'

import { Colors } from 'styles'

type ProfileScreenNavigationProp = CompositeNavigation<
    StackNavigation<'ProfileScreen'>,
    CompositeNavigation<BottomTabNavigation<null>, StackNavigation<null>>
>

export const Profile = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <Text>{'PROFILE'}</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.colorGrey,
    },
})
