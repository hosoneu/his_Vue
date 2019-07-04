module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,
  devServer:{
<<<<<<< HEAD
    port: 8000,
    proxy:{
      '/sm':{
        target:'https://sm.ms/api',
        changeOrigin: true,
        pathRewrite: {
          '^/sm':''
        }
      }
    }
  },
=======
    port:8000
  }
>>>>>>> 69c79112271136a43184cc6b0815548696ed8218
};
