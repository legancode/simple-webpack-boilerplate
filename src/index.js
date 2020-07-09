import "./styles/styles.scss";
console.log("home page");
const myNumber = 20;
const myName = "Angel";
const hello = () => {
  return console.log("hello world");
};

// const HtmlWebpackPlugin = require("html-webpack-plugin");

// hello();

// const pages = [
//   {
//     name: "index",
//     chunks: ["home1", "home2"],
//   },
//   {
//     name: "about",
//     chunks: ["about1", "about2"],
//   },
//   {
//     name: "contact",
//     chunks: ["contact1", "contact2"],
//   },
// ];
// const templates = [];

// const createPages = (name, scripts = []) => {
//   const dirTemplates = "src/views";
//   const chunks = scripts.length ? { chunks: scripts } : null;
//   return {
//     template: `${dirTemplates}/${name}.pug`,
//     filename: `${name}/index.html`,
//     ...chunks,
//     inject: false,
//   };
// };

// pages.forEach((page) => {
//   //  crear una clase y pushear a templates
//   console.log(createPages(page.name, page.chunks));
// });
