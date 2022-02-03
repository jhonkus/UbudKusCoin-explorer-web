var numeral = require('numeral');

import { format } from 'timeago.js';



export function timeAgo(unixTimestamp) {
    return format(new Date(unixTimestamp * 1000));
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
    return numeral(amount).format('0,0.00000')
}

export function formatTotalReward(amount) {
    return numeral(amount).format('0,0.00')
}

export function formatNum(amount) {
    return numeral(amount).format('0,0')
}

export function formatTotalTxns(amount) {
    return numeral(amount).format('0,0.00')
}

export function formatFee(amount) {
    return numeral(amount).format('0,0.00000000')
}

export function formatBytes(amount) {
    return numeral(amount).format('0,0')
}

export function convertDate(unixTimestamp: string) {

    const date = new Date(parseInt(unixTimestamp) * 1000);
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    // var seconds = "0" + date.getSeconds();
  
    // var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    const formattedTime = hours + ':' + minutes.substr(-2);
    return formattedTime
  }