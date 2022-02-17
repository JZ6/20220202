// ==UserScript==
// @name         Gitlab 2FA Token Input
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
    defaultInput: 'Get it from: https://git.geotab.com/-/profile/account',
}

config.entry()

function init() {
    loadTOTPKey()
    if (!config.TOTPKey) {
        let key = prompt("Gitlab 2 Factor Key", "https://git.geotab.com/-/profile/account");
        config.TOTPKey = key.replace(/\s+/g, '');
        saveTOTPKey()
    }
    console.log(getToken(config.TOTPKey))
}

function loadTOTPKey() {
    config.TOTPKey = localStorage.getItem(config.localStorageKey) || ''
}

function saveTOTPKey() {
    localStorage.setItem(config.localStorageKey, config.TOTPKey)
}


function getToken(key) {
}
