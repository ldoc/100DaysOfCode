# Day 2
## (9 January 2018)

* Yesterday I forgot to add some things to .gitignore file
```
npm-debug.log
/dist
```

* Today I will start adding the useful tool [Hot Module Replacement](https://webpack.js.org/concepts/hot-module-replacement/) to webpack config that will allow me to get instant changes when I modify any file

* As I had to change de webpack-dev-server default config to set the "hot" parameter to true I take this opprtunity to add a minor structure change: move my index.html to the dist folder

* HMR running ¡¡ great ¡¡

* Now I have to add the module that will help with the app routes

```
npm install --save react-router react-router-dom
```

* Now I will try to make some accesible routes associated to some example components

* Finally I got it, but I have had that the "exact" prop to the Routes components.

```javascript
import React, {Component} from 'react';
import {render} from 'react-dom';
import { BrowserRouter, Route, Switch, Link  } from 'react-router-dom'

class Home extends Component {
  render(){
      return (
        <div>
          <h1>Hi from home route</h1>
          <Link to="/pathToOtherComponent">Go to OtherComponent</Link>
        </div>
      );
  }
}

class OtherComponent extends Component {
  render(){
      return (
        <div>
          <h1>Hi from home other component</h1>
          <Link to="/">Go to sweet home</Link>
        </div>
      );
  }
}

class App extends Component {
  render () {
    return  <BrowserRouter>
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/pathToOtherComponent" component={OtherComponent}/>
              </Switch>
            </BrowserRouter>;
  }
}

render(<App/>, document.getElementById('app'));
```

* When I was fighting with the basics of "react-router" I have had some problems and I have not been able to debug the code or see the concrete line, because the code is bundled. I´m gonna add next parameter to "web.config.js" to can debug code from original source files:
```
devtool: 'source-map'
```

* Sooner or later I will need to add styles or images: I´m gonna add loaders for it

```
npm install --save-dev css-loader style-loader
```

```
npm install --save-dev css-loader style-loader
```

```
npm install --save-dev url-loader file-loader
```

* Finally I add the proper config loader to webpack config file

#### That's all folks,look at the commit for more info: https://github.com/ldoc/100DaysOfCode/commit/2a7c099a0c76552c9c52dd8cd7aaba154371aa19
