import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/config.css';

export default class ConfigMenu extends Component {

  constructor(props){
    super(props);
    this.state = {
      dropped: false
    }
  }

  renderOption = (option) => {
    return (
      <div className="optionConfig" onClick={() => this.optionAction(option)} key={option.id}>
        {option.text}
      </div>
    )
  }

  optionAction = (option) => {
    option.action(); 
    if(!option.keepOpen) this.setMenu(); 
  }

  setMenu = () =>{
    if(this.state.dropped) this.setState({dropped:false});
    else this.setState({dropped:true});
  }

  render(){
    const {options} = this.props;
    return (
      [
      <svg x="0" y="0" width="60" height="60" float="right" className="config" onClick = {this.setMenu} key="button">
        <line x1="4" y1="10" x2="56" y2="10" className="line"/>
        <line x1="4" y1="30" x2="56" y2="30" className="line"/>
        <line x1="4" y1="50" x2="56" y2="50" className="line"/>
      </svg>
      , 
      <div className="optionsConfig" key="options">
        {this.state.dropped ?
          options.map((o) => this.renderOption(o))
          :
          null  
        }
      </div>
      ]
    );
  }

  static propTypes = {
    options: PropTypes.array
  }
}