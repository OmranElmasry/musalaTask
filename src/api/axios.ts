/** @format */

import axios from 'axios'
import { Alert } from 'react-native'
import { REQUEST_MAX_DURATION, UNAUTHORIZED, REQUEST_TIMEOUT } from './constants'
import Config from 'react-native-config'
import { optional } from 'optional-chain'

const showErrorAlert = (message = '', defaultMessage = 'unexpected error occurred!') => {
    Alert.alert(message || defaultMessage)
    console.log(message || defaultMessage)
}

export const mainAxios = axios.create({
    baseURL: Config.API_URL,
    timeout: REQUEST_MAX_DURATION,
})

// Add a response interceptor
mainAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const optionalError = optional(error)
        const optionalErrorStatus = optionalError.k('response').k('status').get()
        const message = optionalError.k('response').k('data').k('error').k('message').getOrElse(false)

        if (
            optionalError.k('__CANCEL__').getOrElse(false) ||
            optionalErrorStatus === REQUEST_TIMEOUT ||
            optionalError.k('code').get() === 'ECONNABORTED'
        ) {
            console.log('request timed out')
            return Promise.reject(error)
        } else if (error.toString() === 'Error: Network Error') {
            showErrorAlert('Your connection is unstable, please check your connection')
            return Promise.reject(error)
        } else if (optionalErrorStatus === UNAUTHORIZED) {
            showErrorAlert(message)
            return Promise.reject(error)
        }
    }
)

export default { mainAxios }
