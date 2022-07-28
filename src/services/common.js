const CryptoJS = require('crypto-js')

const secretCode = 'Flyked'

// Encrypt Data using secret key.
export const encryptData = (data, secretKey) => {
    var excryptedData = CryptoJS.AES.encrypt(
        JSON.stringify(data),
        secretKey ? secretKey : secretCode
    ).toString()
    return excryptedData.replaceAll('/', 'aBcDeF123')
}

// Decrypt Data using secret key.
export const decryptData = (encryptedData, secretKey) => {
    if (encryptedData) {
        var bytes = CryptoJS.AES.decrypt(
            encryptedData.replaceAll('aBcDeF123', '/'),
            secretKey ? secretKey : secretCode
        )
        var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
        return decryptedData
    } else {
        return null
    }
}
