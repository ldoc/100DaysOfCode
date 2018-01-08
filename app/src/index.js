import React from 'react';
import {render} from 'react-dom';

class App extends React.Component {
  render () {
    return <p> Hello from 100DaysOfCode!</p>;
  }
}

render(<App/>, document.getElementById('app'));