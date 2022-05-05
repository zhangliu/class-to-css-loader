const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  mode: 'development',
  entry: `${__dirname}/index.test.jsx`,
  output: {
    filename: 'bundle.js',
    path: __dirname
  },
  plugins: [new VueLoaderPlugin()],
  module: {
    rules: [{
        test: /\.jsx$/,
        use: [
          { loader: 'babel-loader' },
          {
            loader: `${__dirname}/../index.js`,
            options: { 
              import: false,
              rules: [
                // { key: 'center', valReg: /h/, css: () => 'display: flex; align-items: center;' },
              ]
            },
          },
        ],
      },
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