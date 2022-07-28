import { decryptData, encryptData } from './common'

// Saving encrypted data in local storage
export const saveLocalStorage = (key, value) => {
    const encryptSave = encryptData(value)
    return localStorage.setItem(key, encryptSave)
}

// Retrieve encrypted data in local storage
export const retrieveLocalStorage = (key) => {
    const data = typeof window !== 'undefined' ? localStorage.getItem(key) : ' '
    try {
        const decryptRetrieve = decryptData(data)
        return decryptRetrieve
    } catch (err) {
        return err
    }
}

// Remove encrypted data in local storage
export const removeLocalStorage = (key) => {
    localStorage.removeItem(key)
}
