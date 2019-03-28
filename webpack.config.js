var webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    watch: true,
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 300,
        poll: 1000
      },
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    // externals: {
    //   'three.js': 'THREE'
    // },

    plugins: [
        new CopyPlugin([
          { from: './src/shaders/', to: './shaders/' },
        ]),

      ],
};