import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

export default class Option extends PureComponent {
  render(){
    const {id,name,img,link} = this.props;
    const enabled = (link != 'nocontent');
    const stl = (!enabled ? {backgroundColor:'rgba(20,20,20,0.1)'} : {backgroundColor:'#F8CB43',border:'solid 5px orange'});
    return (
      (enabled ?
        <Link to={`${link}`} className={`option ${id}`} key={id} style={stl}>
          <img src={`img/${img}`} width={'100px'}/>
        </Link>
        :
        <div className={`option ${id}`} key={id} style={stl}>
          <img src={`img/${img}`} width={'100px'}/>
        </div>  
      )
    );
  }
}