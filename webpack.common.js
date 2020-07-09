const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // Incrustar src de JS
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // Extraer en archivo global el CSS
const CopyPlugin = require("copy-webpack-plugin"); // Copiar archivos tal cual al build
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // limpia la carpeta del build

const APP_DIR = path.resolve(__dirname, "./src");

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
  const chunks = scripts.length ? { chunks: scripts } : null;
  return {
    template: `${APP_DIR}/views/${name}.pug`,
    filename: name === "index" ? "index.html" : `${name}/index.html`,
    ...chunks,
  };
};

pages.forEach(({ name, chunks }) => {
  templates.push(new HtmlWebpackPlugin(createPages(name, chunks)));
});

// =======================================
// CONFIG
// =======================================
let commonConfig = {
  entry: {
    home: `${APP_DIR}/index.js`,
    about: `${APP_DIR}/about.js`,
    contact: `${APP_DIR}/contact.js`,
  },

  module: {
    rules: [styles, images],
  },
  plugins: [
    ...templates,
    new CopyPlugin([
      {
        from: "src/assets",
        to: "assets/",
      },
    ]),
    new CleanWebpackPlugin(),
  ],
};

module.exports = commonConfig;
