import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../css/button.css';

export default class Button extends Component {
  render(){
    const {img,text,link} = this.props;
    return (
      <div className={"button"}>
        <Link to={`${link}`}>
          <img src={`img/${img}`}/>
          <span>{text}</span>
        </Link>
      </div>
    );
  }

  static propTypes = {
    img: PropTypes.string,
    text: PropTypes.string,
    link: PropTypes.string.isRequired
  }
}