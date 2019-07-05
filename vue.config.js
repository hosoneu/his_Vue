module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,
  devServer:{
    port: 8000,
    // proxy:{
    //   '/sm':{
    //     target:'https://sm.ms/api',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/sm':''
    //     }
    //   }
    // }
  },
};
