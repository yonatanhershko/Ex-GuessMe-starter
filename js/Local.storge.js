'use strict'


function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))///שולח בסטרינג ללוקל סטורג את התוכן
}

function loadFromStorage(key) {
    const val = localStorage.getItem(key)/// טוען את התוכן שנוכל לראות בלוקל
    console.log(val);
    return JSON.parse(val)
}
