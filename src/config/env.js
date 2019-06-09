let baseUrl = '';

if (process.env.NODE_ENV === 'development') {
    baseUrl = '/api';

} else if (process.env.NODE_ENV === 'production') {
    baseUrl = '生产地址';//todo 待完善
}

export {
    baseUrl,//导出baseUrl
}