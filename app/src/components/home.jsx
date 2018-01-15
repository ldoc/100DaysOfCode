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