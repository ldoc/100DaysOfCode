# Day 19
## (26 January 2018)

* Today I have started a new round of my challange to add some useful thing that will help me to go faster next days

* I have started adding a action menu that could be populated from other components, passing by prop a function that change a state of this menu component

* In the app component you can see how this function works

```javascript
  constructor(props){
    super(props);
    this.state = {
      options : []
    }
  }

  setConfigOptions = (options) =>{
    this.setState({...this.state,...{options:options}});
  }  

  render () {
    return  ([
              <MenuBar key={'menu'} {...this.state}/>,
              <BrowserRouter key={'router'}>
                <Switch>
                  <Route exact path="/" component={LoadableHome}/>
                  <Route path="/camtest/" render={(props) => (<LoadableCamTest {...props} setConfigOptions = {this.setConfigOptions} />)}/>
                  <Route path="/camtestcanvas/"  render={(props) => (<LoadableCamTestCanvas {...props} setConfigOptions = {this.setConfigOptions} />)}/>
                </Switch>
              </BrowserRouter>
            ]);
  }  
```

* The function is passed to the route components and are executed at the contructor

```javascript
  constructor(props){
    super(props);
    this.props.setConfigOptions([]);
  }  
```

* When this happens the state is app state is modified and new options are passed to the menuBar, and it pass again by props to configMenu

```javascript
  export default class MenuBar extends Component {
    render(){
      return (
        <div className={"header"}>
          <Logo/>
          <span></span>
          <ConfigMenu options={this.props.options}/>
        </div>
      );
    }
  }  

  export default class ConfigMenu extends Component {

    constructor(props){
      super(props);
      this.state = {
        dropped: false
      }
    }

    renderOption = (option) => {
      return (
        <div className="optionConfig" onClick={() => { option.action(); this.setMenu(); }}>
          {option.text}
        </div>
      )
    }

    setMenu = () =>{
      if(this.state.dropped) this.setState({dropped:false});
      else this.setState({dropped:true});
    }

    render(){
      return (
        [
        <svg x="0" y="0" width="60" height="60" float="right" className="config" onClick = {this.setMenu}>
          <line x1="4" y1="10" x2="56" y2="10" className="line"/>
          <line x1="4" y1="30" x2="56" y2="30" className="line"/>
          <line x1="4" y1="50" x2="56" y2="50" className="line"/>
          {}
        </svg>, 
        <div className="optionsConfig" >
          {this.state.dropped ?
            this.props.options.map((o) => this.renderOption(o))
            :
            null  
          }
        </div>
        ]
      );
    }
  }
```

#### That's all folks,look at the commit for more info: https://github.com/ldoc/100DaysOfCode/commit/
