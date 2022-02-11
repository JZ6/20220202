// ==UserScript==
// @name         Gitlab TOTP
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Bros
// @author       JZ6
// @match        *://gitlab.com/*
// @icon         https://www.google.com/s2/favicons?domain=gitlab.com
// @grant        none
// @require      https://raw.githubusercontent.com/Caligatio/jsSHA/master/dist/sha1.js
// ==/UserScript==

const config = {
    TOTPKey: "",
    autoSubmit: false,
    localStorageKey: "bros",
    entry: init
}

config.entry()

function init() {
    loadTOTPKey()
    if (!config.TOTPKey) {
        let key = prompt("sometext", "defaultText");
    }
}

function loadTOTPKey() {
    config.TOTPKey = localStorage.getItem(config.localStorageKey) || ''
}

function saveTOTPKey() {
    localStorage.setItem(config.localStorageKey, config.TOTPKey)
}

