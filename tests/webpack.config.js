const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  mode: 'development',
  entry: `${__dirname}/index.test.vue`,
  output: {
    filename: 'bundle.js',
    path: __dirname
  },
  plugins: [new VueLoaderPlugin()],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.vue$/,
        use: [
          { loader: 'vue-loader' },
          {
            loader: `${__dirname}/../index.js`,
            options: { 
              rules: [
                // { key: 'center', valReg: /h/, css: () => 'display: flex; align-items: center;' },
              ]
            },
          },
        ],
      },
    ],
  },
};