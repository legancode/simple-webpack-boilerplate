const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // Incrustar src de JS
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // Extraer en archivo global el CSS
const CopyPlugin = require("copy-webpack-plugin"); // Copiar archivos tal cual al build
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // limpia la carpeta del build

// =======================================
// HTML / PUG
// =======================================
const html = {
  test: /\.html$/i,
  loader: "html-loader",
  options: {
    attributes: false,
    minimize: false,
  },
};

const pug = {
  test: /\.pug$/,
  loader: "pug-loader",
  options: { pretty: true },
};

// =======================================
// CSS / SASS
// =======================================
const styles = {
  test: /\.(scss|sass|css)$/,
  use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
};

// =======================================
// JPG / PNG / SVG / ETC...
// =======================================
const images = {
  test: /\.(jpg|jpeg|svg|png|webp|gif)$/,
  use: [
    {
      loader: "file-loader",
      options: {
        esModule: false,
      },
    },
  ],
};

// =======================================
// DEV SERVER
// =======================================
const devServer = {
  contentBase: path.join(__dirname, "public"),
  compress: true,
  port: 3000,
};

// =======================================
// GENERADOR DE MULTIPLES HTML
// =======================================
// let templates = [];
// let dirPug = "src/views";
// let files = fs.readdirSync(dirPug);

// files.forEach((file) => {
//   if (file.match(/\.pug$/)) {
//     let filename = file.substring(0, file.length - 4);
//     templates.push(
//       new HtmlWebpackPlugin({
//         template: `${dirPug}/${filename}.pug`,
//         filename: `${filename}.html`,
//       })
//     );
//   }
// });

// =======================================
// GENERADOR DE MULTIPLES HTML
// =======================================
const pages = [
  {
    name: "index",
    chunks: ["home"],
  },
  {
    name: "about",
    chunks: ["about"],
  },
  {
    name: "contact",
    chunks: ["contact"],
  },
];
const templates = [];

const createPages = (name, scripts = []) => {
  const dirTemplates = "src/views";
  const chunks = scripts.length ? { chunks: scripts } : null;
  return {
    template: `${dirTemplates}/${name}.pug`,
    filename: `${name}/index.html`,
    ...chunks,
    // inject: false,
  };
};

pages.forEach((page) => {
  templates.push(new HtmlWebpackPlugin(createPages(page.name, page.chunks)));
});

// =======================================
// CONFIG
// =======================================
const config = {
  mode: "development",
  entry: {
    home: "./src/index.js",
    about: "./src/about.js",
    contact: "./src/contact.js",
  },
  output: {
    filename: "scripts/[name].bundle.js",
    path: path.resolve(__dirname, "public"),
  },
  module: {
    rules: [html, pug, styles, images],
  },
  plugins: [
    ...templates,
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      ignoreOrder: false,
    }),
    new CopyPlugin([
      {
        from: "src/assets",
        to: "assets/",
      },
    ]),
    new CleanWebpackPlugin(),
  ],
  devServer,
};

module.exports = config;
