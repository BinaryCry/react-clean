var webpack = require("webpack");
var htmlWebpackPlugin = require("html-webpack-plugin");
var resolve = require("path").resolve;

var DIR = {
  modules: resolve(__dirname, "node_modules"),
  source: resolve(__dirname, "src"),
  dist: resolve(__dirname, "dist"),
  static: resolve(__dirname, "static")
};

var ENV = process.env.ENV || "develop";

module.exports = {
  stats: {
    errorDetails: true
  },
  entry: ['babel-polyfill', './src/index.jsx'],
  output: {
    filename: "bundle.js",
    path: DIR.dist
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".css"],
    modules: [DIR.modules, DIR.source]
  },
  watch: ENV === "develop",
  watchOptions: {
    aggregateTimeout: 300
  },
  devtool: ENV ? "cheap-module-source-map" : null,
  plugins: [
    new htmlWebpackPlugin({
      template: "src/template.ejs",
      charset: "UTF-8",
      title: "React",
      appSelector: "root"
    }),
    new webpack.DefinePlugin({
      ENV: JSON.stringify(ENV)
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: DIR.source,
        exclude: DIR.modules,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader?modules&localIdentName=[local]_[hash:base64:5]",
          "postcss-loader"
        ]
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        use: ["file-loader"]
      }
    ]
  },
  devServer: {
    inline: true,
    compress: true,
    historyApiFallback: true,
    contentBase: DIR.static,
    port: 5000,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  }
};
