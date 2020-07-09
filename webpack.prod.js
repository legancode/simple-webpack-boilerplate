const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // Incrustar src de JS
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // Extraer en archivo global el CSS
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin"); // Optimizar build de CSS
const CopyPlugin = require("copy-webpack-plugin"); // Copiar archivos tal cual al build
const MinifyPlugin = require("babel-minify-webpack-plugin"); // Minificacion de JS con babel
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // limpia la carpeta del build

module.exports = {
  mode: "production",
  optimization: {
    minimizer: [new OptimizeCssAssetsPlugin()],
  },
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
          attributes: false,
          minimize: true,
        },
      },
      {
        test: /\.(scss|sass|css)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(jpg|jpeg|svg|png|webp|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              esModule: false,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contentHash].css",
      ignoreOrder: false,
    }),
    new CopyPlugin([
      {
        from: "src/assets",
        to: "assets/",
      },
    ]),
    new MinifyPlugin(),
    new CleanWebpackPlugin(),
  ],
  output: {
    filename: "scripts/bundle.[contentHash].js",
    path: path.resolve(__dirname, "public"),
  },
};
