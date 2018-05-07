var path = require("path");
module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: './client/src/index.ts',
    output: {
      path: path.resolve(__dirname, "client/public"),
      filename: 'post_reality.js'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    },
    externals: {
      oimo: 'OIMO', //or true
      cannon: 'CANNON', //or true
      earcut: 'EARCUT'
    },
    performance: {
    hints: process.env.NODE_ENV === 'production' ? "warning" : false
    },
    module: {
      rules: [
        { test: /\.tsx?$/, loader: 'ts-loader', exclude: [/public/] }
      ]
    }
  }