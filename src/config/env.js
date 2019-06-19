import localConfig from "./config.local.js"

let baseUrl = '';

if (process.env.NODE_ENV === 'development') {
    baseUrl = localConfig.developUrl;

} else if (process.env.NODE_ENV === 'production') {
    baseUrl = 'https://120.79.88.98:8080/hoso';
}

export {
    baseUrl,//导出baseUrl
}
