const { merge } = require('webpack-merge');
const path = require("path");
const webpackCommonConfig = require("./webpack.common");

module.exports = merge(webpackCommonConfig, {
  mode: "development",
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    clean: true,
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.(s[ac]ss|css)$/i,
        use: [
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },      
    ],
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname + 'dist'),
    },    
    port: 8080,
    hot: true, // 開啟 HMR 支持
    open: true,
  },
});
