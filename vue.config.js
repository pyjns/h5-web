const webpack = require('webpack');

module.exports = {
  publicPath: process.env.VUE_APP_PORT ? `/k12-h5-web/${process.env.VUE_APP_PORT}` : "/",
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        'window.Quill': 'quill/dist/quill.js',
        'Quill': 'quill/dist/quill.js'
      }),
    ]
  }
}