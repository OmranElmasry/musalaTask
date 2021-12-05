/** @format */

import { Icons } from 'assets'
import React, { useState } from 'react'
import { StyleSheet, View, SafeAreaView, Text, TouchableOpacity } from 'react-native'
import { Switch } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { Colors, Constants, getThemeColor } from 'styles'
import { setI18nConfig, translate } from 'translations'
import { setAppLanguage as updateAppLanguage, setDarkMode } from 'actions'
import { CommonStoreState } from 'types'
import Modal from 'react-native-modal'
import AsyncStorage from '@react-native-community/async-storage'

export const Profile = () => {

    const commonState: CommonStoreState = useSelector((state: any) => state.common),
        storeDarkMode = commonState.isDarkMode,
        locale = commonState.locale
        
    const [isDarkMode, setIsDarkMode] = useState(storeDarkMode)
    const [appLanguage, setAppLanguage] = useState(locale)
    const [languagesModalIsVisible, setLanguagesModalIsVisible] = useState(false)

    const dispatch = useDispatch()

    const mapISOToText = (ISO: string) => {
        switch (ISO) {
            case 'en':
                return translate('english')
            case 'bgr':
                return translate('bulgarian')
        }
    }

    const onPressSave = async () => {
        dispatch(setDarkMode(isDarkMode))
        await AsyncStorage.multiSet([
                            ['defaultLocale', appLanguage.languageCode],
                            ['isDarkMode', String(isDarkMode)]
                        ])
        await setI18nConfig()
        dispatch(updateAppLanguage(locale))
    }

    const onPressLanguage = (language: 'en' | 'bgr') => {
        setLanguagesModalIsVisible(false)
        setAppLanguage({languageCode: language})
    } 

    const getTagColor = (language: 'en' | 'bgr') => {
        if (language === 'en') {

        } else {
            
        }
    }

    const renderTopBar = () => {
        return (
            <View style={storeDarkMode ? styles.darkNavBar : styles.navBar }>
                <Text style={styles.titleText}>{translate('settings[title]')}</Text>
            </View>
        )
    }

    const renderSaveButton = () => {
        return (
            <TouchableOpacity onPress={onPressSave} style={styles.saveButton}>
                <Text style={styles.saveText}>{translate('settings[save]')}</Text>
            </TouchableOpacity>
        )
    }

    const renderSettings = () => {
        return (
            <View style={styles.settingContainer}>
                <View style={storeDarkMode ? styles.darkSettingRow : styles.settingRow}>
                    <View style={styles.iconWrapper}>
                        {Icons.darkMode('tabBarIconColor', storeDarkMode)}
                    </View>
                    <Text style={storeDarkMode ? styles.darkSettingText : styles.settingText}>{translate('settings[darkMode]')}</Text>
                    <Switch
                        value={isDarkMode}
                        onValueChange={setIsDarkMode}
                        style={styles.dynamicValue}
                        trackColor={{false: Colors.colorGrey3}}
                    />
                </View>
                <View style={storeDarkMode ? styles.darkSettingRow : styles.settingRow}>
                    <View style={styles.iconWrapper}>
                        {Icons.language('tabBarIconColor', storeDarkMode)}
                    </View>
                    <Text style={storeDarkMode ? styles.darkSettingText : styles.settingText}>{translate('settings[language]')}</Text>
                    <TouchableOpacity onPress={() => setLanguagesModalIsVisible(true)} style={styles.dynamicValue}>
                        <Text style={styles.dynamicText}>{mapISOToText(appLanguage.languageCode)}</Text>
                    </TouchableOpacity>
                </View>
                {renderSaveButton()}
            </View>
        )
    }

    const renderLanguagesModal = () => {
        return (
            <Modal
                isVisible={!!languagesModalIsVisible}
                animationIn={'fadeInUp'}
                animationOut={'fadeOutDown'}
                onBackButtonPress={() => setLanguagesModalIsVisible(false)}
                style={styles.modal}
            >
                <View style={storeDarkMode ? styles.darkModalBody : styles.modalBody}>
                    <Text style={storeDarkMode ? styles.darkModalTitle : styles.modalTitle}>{translate('settings[modal][title]')}</Text>
                    <View style={styles.languageOptions}>
                        <TouchableOpacity onPress={() => onPressLanguage('en')} style={appLanguage.languageCode === 'en' ? styles.activeTag : styles.inactiveTag}>
                            <Text style={appLanguage.languageCode === 'en' ? styles.activeTagText : styles.inactiveTagText}>{mapISOToText('en')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onPressLanguage('bgr')} style={appLanguage.languageCode === 'bgr' ? styles.activeTag : styles.inactiveTag}>
                            <Text style={appLanguage.languageCode === 'bgr' ? styles.activeTagText : styles.inactiveTagText}>{mapISOToText('bgr')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }

    return (
        <SafeAreaView style={storeDarkMode ? styles.darkContainer : styles.container}>
            {renderTopBar()}
            {renderSettings()}
            {renderLanguagesModal()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: getThemeColor(false, 'background')
    },
    darkContainer: {
        flex: 1,
        backgroundColor: getThemeColor(true, 'background')
    },
    modalTitle: {
        color: getThemeColor(false, 'normalText'),
        fontSize: 20,
        alignSelf: 'center',
        fontWeight: '600'
    },
    darkModalTitle: {
        color: getThemeColor(true, 'normalText'),
        fontSize: 20,
        alignSelf: 'center',
        fontWeight: '600'
    },
    languageOptions: {
        marginTop: 20,
        flexDirection: 'row',
        alignSelf: 'center'
    },
    modalBody: {
        backgroundColor: getThemeColor(false, 'modalBackground'),
        paddingVertical: 60,
        borderRadius: 16
    },
    darkModalBody: {
        backgroundColor: getThemeColor(true, 'modalBackground'),
        paddingVertical: 60,
        borderRadius: 16
    },
    modal: {
        position: 'absolute',
        zIndex: 100,
        bottom: -30,
        width: Constants.window.width,
        marginLeft: 0
    },
    activeTag: {
        borderRadius: 20,
        paddingHorizontal: 36,
        paddingTop: 6,
        paddingBottom: 7,
        backgroundColor: Colors.blue,
        justifyContent: 'center',
        alignItems: 'center',
        marginEnd: 5,
    },
    inactiveTag: {
        borderRadius: 20,
        paddingHorizontal: 36,
        paddingTop: 6,
        paddingBottom: 7,
        backgroundColor: Colors.white,
        borderColor: Colors.blue,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginEnd: 5,
    },
    activeTagText: {
        fontSize: 22,
        fontWeight: '400',
        color: Colors.white,
    },
    inactiveTagText: {
        fontSize: 22,
        fontWeight: '400',
        color: Colors.blue,
    },
    dynamicText: {
        color: Colors.blue,
        fontSize: 20,
        fontWeight: '800',
    },
    saveButton: {
        margin: 16,
        marginTop: 50,
        backgroundColor: Colors.blue,
        paddingHorizontal: 60,
        paddingVertical: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 32
    },
    settingText: {
        color: getThemeColor(false, 'normalText'),
        marginEnd: 32,
        fontSize: 20,
        fontWeight: '600',
        flex: 0.4
    },
    darkSettingText: {
        color: getThemeColor(true, 'normalText'),
        marginEnd: 32,
        fontSize: 20,
        fontWeight: '600',
        flex: 0.4
    },
    iconWrapper: {
        margin: 22,
        flex: 0.1
    },
    dynamicValue: {
        flex: 0.4,
        alignItems: 'flex-end'
    },
    navBar: {
        backgroundColor: getThemeColor(false, 'navBarBackground'),
        padding: 30
    },
    darkNavBar: {
        backgroundColor: getThemeColor(true, 'navBarBackground'),
        padding: 30
    },
    settingContainer: {
        flex: 1,
        margin: 8,
        marginTop: 32,
        marginBottom: 0,
    },
    titleText: {
        color: Colors.colorGrey3,
        fontSize: 40,
        fontWeight: '800'
    },
    saveText: {
        color: Colors.white,
        fontSize: 20,
        fontWeight: '600'
    },
    settingRow: {
        flexDirection: 'row',
        marginVertical: 12,
        marginHorizontal: 12,
        backgroundColor: getThemeColor(false, 'cardBackground'),
        alignItems: 'center',
        borderRadius: 24
    },
    darkSettingRow: {
        flexDirection: 'row',
        marginVertical: 12,
        marginHorizontal: 12,
        backgroundColor: getThemeColor(true, 'cardBackground'),
        alignItems: 'center',
        borderRadius: 24
    }
})
