var numeral = require('numeral');

import TimeAgo from 'javascript-time-ago';
// English.
import en from 'javascript-time-ago/locale/en.json'

TimeAgo.addDefaultLocale(en)
// Create formatter (English).
const timeFormater = new TimeAgo('en-US')



export function timeAgo(unixTimestamp) {
    return timeFormater.format(new Date(unixTimestamp * 1000));
}


export function toDate(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
    const formattedTime = date.getDate() +
        "/" + (date.getMonth() + 1) +
        "/" + date.getFullYear() +
        " " + date.getHours() +
        ":" + date.getMinutes();
    return formattedTime;
}

export function formatAmount(amount) {
    return numeral(amount).format('0,0.000')
}

export function formatFee(amount) {
    return numeral(amount).format('0,0.00000000')
}