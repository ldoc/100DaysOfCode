# Day 7
## (15 January 2018)

* Today I have continue creating a basic responsive structure, with a menu and some mobile first buttons

* I have created dynamic routes too, using the withRouter HOC I can load dynamic urls and components

* The component that render the option buttons

```javascript
import React, { Component } from 'react';
import Option from './option';

export default class Home extends Component {
  render(){
    return  <div className="content">
              <Option id={1} name={'Snorlax'} img={'pokemon1'}/>
              <Option id={2} name={'Charmander'} img={'pokemon2'}/>
              <Option id={3} name={'Psyduck'} img={'pokemon3'}/>
              <Option id={4} name={'Meowth'} img={'pokemon4'}/>
              <Option id={5} name={'Pikachu'} img={'pokemon5'}/>
              <Option id={6} name={'Rattata'} img={'pokemon6'}/>
            </div>
  }
}
```

* The component that render a concrete option with a link to a parametrized url

```javascript
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

export default class Option extends PureComponent {
  render(){

    const {id,name,img,link} = this.props;

    return (
      <Link to={`/pokemon/${name}`} className={`option ${id}`} key={id}>
          <img src={`img/${img}.svg`}/>
      </Link>
    );
  }
}
```

* The component that match the urls from option buttons

```javascript
import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';

class Pokemon extends Component {
  render(){

    const name = this.props.match.params.name;
    
    return (
      <div style={{backgroundColor:'white'}}>
        <h1>{`Hi from pokemon ${name}`}</h1>
        <Link to="/">Go to menu</Link>
      </div>)
  }
}

export default withRouter(Pokemon)
```



