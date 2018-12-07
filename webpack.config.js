const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

function isProduction(argv) {
  return argv.mode === "production";
}

module.exports = (env, argv) => {
  return {
    entry: path.resolve(__dirname, "src/App.js"),
    output: {
      path: path.resolve(__dirname, "dist/"),
      filename: "bundle-[hash].js"
    },
    devtool: isProduction(argv) ? "cheap-source-map" : "cheap-eval-source-map",
    devServer: {
      contentBase: path.resolve(__dirname, "dist"),
      compress: false,
      port: 3000,
      watchContentBase: true,
      historyApiFallback: true
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: "./index.html",
        inject: "body"
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      })
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: { loader: "babel-loader" }
        },
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: { loader: "ts-loader" }
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: { publicPath: "../" }
            },
            "css-loader"
          ]
        }
      ]
    }
  };
};
