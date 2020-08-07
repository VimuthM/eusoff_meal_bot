// Edit botKey and webHookLink
const botKey = "1220506182:AAEnw_FM9WDwubT0Tld0adPKwBdcb3D89ac";
const webHookLink = "https://script.google.com/macros/s/AKfycbyr4vsWJFnXX5v5ekHT2daiwC-65xRvu5vc5rnavRgn5VCN4c1t/exec";

// Run function setWebHook
const telegramUrl = "https://api.telegram.org/bot" + botKey;
function setWebHook() {
    UrlFetchApp.fetch(telegramUrl + "/setWebHook?url=" + webhookLink);
}