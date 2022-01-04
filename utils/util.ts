export default function toDate(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
    const formattedTime = date.getDate() +
        "/" + (date.getMonth() + 1) +
        "/" + date.getFullYear() +
        " " + date.getHours() +
        ":" + date.getMinutes();
    return formattedTime;
}
