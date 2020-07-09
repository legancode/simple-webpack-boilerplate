# 📦 SIMPLE WEBPACK BOILERPLATE

![simple webpack boilerplate by angel salvador](https://repository-images.githubusercontent.com/278226606/820fad80-c188-11ea-93e6-c80fd7384736)

## 📝 Resumen

Boilerplate con configuraciones necesarias para automatizar el trabajo en el desarrollo de un sitio web.

## 🧐 ¿Qué contiene?

```
.
├── src
     ├─ assets
     ├─ styles
     ├─ views
├── .babelrc
├── .gitignore
├── package-lock.json
├── package.json
├── webpack.config.js
├── webpack.prod.js
└── README.md
```

## 💻 Para ejecutar

```
  Paso 1: npm install
  Paso 2: npm start
```

## 💡 Implementaciones

- SASS
- PUG (Crea un html por cada archivo .pug creado)
- BABEL
- IMAGES (PNG, SVG, JPG, WEBP)
- WDS (Webpack dev server)

## Scripts

1. `npm start` : Crea un servidor de desarrollo gracias a `webpack-dev-server` en el puerto `3300` por default.
2. `npm run build:dev` : Empaqueta el proyecto en una carpeta `public` sin minificar, usando el archivo `webpack.dev.js`.
3. `npm run build` : Empaqueta el proyecto en una carpeta `public` minificado, usando el archivo `webpack.prod.js` listo para producción.

## 🔗 Recursos

[Documentación Webpack](https://webpack.js.org/concepts/)
