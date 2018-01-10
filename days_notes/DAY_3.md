# Day 3
## (10 January 2018)

* Today I don´t have too much time, but I will try to finish the basic project configuration adding code splitting and lazy loading with webpack and react-router

* I will use the react-loadable HOC to perform lazy loading

```
npm install --save-dev react-loadable
``` 

* To do an example I will separate the last component examples in different files

* Here are some useful links to learn about this topic:

- [Tutorial about Lazy loading and chunk bundles](https://react.christmas/12)
- [Official page of react-loadable](https://github.com/thejameskyle/react-loadable)

* Finally I got it but I have had some problems with dynamic use of import ES6 function. I have solved it installing this two modules:

- [babel-plugin-syntax-dynamic-import](https://www.npmjs.com/package/babel-plugin-syntax-dynamic-import)
- [babel-preset-stage-3](https://www.npmjs.com/package/babel-preset-stage-3)

* And modifiyin the ".babelrc" file:

```
{
  "presets" : ["stage-3", "react"],
  "plugins": ["syntax-dynamic-import"]
}
```

* The lazy loading works incredible and now I can do a more faster and dynamic app.


