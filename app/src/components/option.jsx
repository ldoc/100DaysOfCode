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