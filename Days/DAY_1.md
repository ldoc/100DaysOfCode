# Day 1
## (8 January 2018)

* First of all I have to install NPM

```
npm init
```

* Then I configure the project:
```
name: (100daysofcode)
version: (1.0.0)
description: Code of my 100DaysOfCode challange
entry point: (index.js)
test command:
git repository: (https://github.com/ldoc/100DaysOfCode.git)
keywords: 100daysofcode,LDOC
author: LDOC
license: (ISC)
```

* Now I have to install Webpack 

```
npm install --save-dev webpack
```

* The webpack module and his dependencies are installed in the node_modules directory, I have to avoid this external libraries or modules to be uploded to github, this way I create a .gitignore file and I add the "node_modules" to it.

* To use webpack easily I need to create a webpack.config.js file with the needed configuration. I will check the [https://webpack.js.org/](official webpack site) to remember the basic parameters.

```javascript
const path = require('path');                     // path module help us to access path routes

module.exports = {
  entry: './app/src/index.js',                    // My entry file
  output: {                                       // My output file
    path: path.resolve(__dirname, './app/dist/'),
    filename: 'bundle.js'
  }
};
```

* And after this I create a script to execute Webpack locally
```
  "scripts": {
    "build" : "webpack"
  }
```

* Executing the command "npm run build" it works and create the bundle.js file as output to the transpile process of the "./app/src/index.js" file.

* To use the last specification of Ecmascript I have to add the Babel compiler, installing the next modules:
```
npm install --save babel-core babel-loader babel-preset-es2015 babel-preset-react
```

* An then I must create the .babelrc config file:
```
{
  "presets" : ["es2015", "react"]
}
```

* Installing React:
```
npm install --save react react-dom
```

* Adding JSX loader to webpack config
```javascript
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : SRC_DIR,
        loader : 'babel-loader'
      }
    ]
  }
```

* Creating a very simple component
```javascript
const path = require('path');                     // path module help us to access path routes

module.exports = {
  entry: './app/src/index.js',                    // My entry file
  output: {                                       // My output file
    path: path.resolve(__dirname, './app/dist/'),
    filename: 'bundle.js'
  }
};
```