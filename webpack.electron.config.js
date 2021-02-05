const path = require("path");

module.exports = {
  mode: 'development',
  entry: './electron/main.ts',
  target: 'electron-main',
  resolve: {
    alias: {
      ['@']: path.resolve(__dirname, 'src')
    },
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules: [{
      test: /\.(js|ts|tsx)$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
      },
    }]
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js'
  }
};