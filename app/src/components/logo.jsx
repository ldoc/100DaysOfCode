import React, { Component } from 'react';

export default class Logo extends Component {
  render(){
    return (
      <svg float="left">

        <defs>

          <linearGradient id="initText" x1="0" y1="0" x2="100%" y2="0">
            <stop offset="0%" stopColor="#399c7d" />
            <stop offset="100%" stopColor="#f8cb43" />
          </linearGradient>
          
          <linearGradient id="finalText" x1="0" y1="0" x2="100%" y2="0">
            <stop offset="0%" stopColor="#f8cb43" />
            <stop offset="100%" stopColor="#399c7d" />
          </linearGradient>
          
          <radialGradient id="cam">
            <stop offset="10%" stopColor="#86bd78"/>
            <stop offset="95%" stopColor="#5882FA"/>
          </radialGradient>
          
        </defs>
        <g className="logo">
          <text x="4" y="40" fill= "url(#initText)" className="text">FUN</text>
          <path d="M70 60 L100 40 L130 60 Z" strokeWidth="4" stroke="#222222" fill="#86bd78"/>
          <circle cx="100" cy="30" r="25" stroke="#222222" strokeWidth="4" fill="url(#cam)" />
          <circle cx="100" cy="30" r="8" strokeWidth="1" fill="lightblue" />
          <text x="129" y="40" fill= "url(#finalText)" className="text">CAM</text>
        </g>
      </svg>
    );
  }
}


