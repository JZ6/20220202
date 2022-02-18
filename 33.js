// ==UserScript==
// @name         Gitlab 2FA Token Auto Fill 
// @namespace    https://github.com/JZ6/20220202
// @version      1.0
// @description  Bros
// @author       JZ6
// @match        *://gitlab.com/*
// @match        *://git.*
// @icon         https://www.google.com/s2/favicons?domain=gitlab.com
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/jsSHA/3.2.0/sha1.min.js
// ==/UserScript==

const config = {
    entry: init,
    TOTPKey: '',
    autoSubmit: false,
    tokenRefreshPeriod: 30,
    localStorageKey: 'bros',
    defaultInput: 'Get the key from your profile/account page!',
}

config.entry()

function init() {

    const TOTPInput = document.getElementById('user_otp_attempt')
    if (!TOTPInput) return

    loadTOTPKey()

    const TOTPToken = get2FAToken(config.TOTPKey)
    console.log(TOTPToken)
    TOTPInput.value = TOTPToken
    if (config.autoSubmit) {
        const submitButton = document.querySelector("div.prepend-top-20 input[name='commit']")
        submitButton.click()
    }
    console.log(getToken(config.TOTPKey))
}

function loadTOTPKey() {
    config.TOTPKey = localStorage.getItem(config.localStorageKey) || ''
    if (!config.TOTPKey || config.TOTPKey == 'null') {
        promptKeyInput()
        loadTOTPKey()
        return
    }

    if (config.TOTPKey == config.defaultInput) {
        alert('Please enter your 2FA Key from from your profile/account page!')
        promptKeyInput()
        loadTOTPKey()
    }
}

function saveTOTPKey() {
    localStorage.setItem(config.localStorageKey, config.TOTPKey)
}

function promptKeyInput() {
    let key = prompt('Enter your Gitlab Two Factor Key', config.defaultInput)
    config.TOTPKey = key
    saveTOTPKey()
}

function getHexadecimalKey(TOTPKey) {

    const base32chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
    cleanKey = TOTPKey.replace(/\s+/g, '').replace(/=+$/, '')

    let binary = ''
    for (const c of cleanKey) {
        let val = base32chars.indexOf(c.toUpperCase())
        binary += paddingFill(val.toString(2), 5)
    }

    let hexadecimalKey = ''
    for (let i = 0; i + 8 <= binary.length; i += 8) {
        const byte = binary.slice(i, i + 8)
        const hexByte = parseInt(byte, 2).toString(16)
        hexadecimalKey += paddingFill(hexByte, 2)
    }

    return hexadecimalKey
}

function getHexTime() {
}
