import React, { Component } from 'react';
import Option from './option';

export default class Home extends Component {
  render(){
    return  <div className="content">
              <Option id={1} name={'CamTest'} img={'camtest.svg'} link={'CamTest'}/>
              <Option id={2} name={'CamTestCanvas'} img={'camtestcanvas.svg'} link={'CamTestCanvas'}/>
              <Option id={3} name={'nocontent'} img={'nocontent.svg'} link={'nocontent'}/>
              <Option id={4} name={'nocontent'} img={'nocontent.svg'} link={'nocontent'}/>
              <Option id={5} name={'nocontent'} img={'nocontent.svg'} link={'nocontent'}/>
              <Option id={6} name={'nocontent'} img={'nocontent.svg'} link={'nocontent'}/>
            </div>
  }
}