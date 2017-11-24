require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import ReactDOM from 'react-dom';
import DatePicker from 'react-mobile-datepicker';

export default class AppComponent extends React.Component {
  constructor() {
    super()
    this.state = {
      time: new Date(),
      isOpen: false,
      theme: 'ios'
    }
  }


  handleClick = () => {
    this.setState({ isOpen: true });
  }

  handleCancel = () => {
    this.setState({ isOpen: false });
  }

  handleSelect = (time) => {
    this.setState({ time, isOpen: false });
  }

  render(){
    return (
      <div className="App">
        <a 
          className="select-btn"
          onClick={this.handleClick}
           >
          select time
                </a>
                {
                  this.state.time.toLocaleDateString()
                }
          
        <DatePicker
          value={this.state.time}
          isOpen={this.state.isOpen}
          onSelect={this.handleSelect}
          onCancel={this.handleCancel} 
          theme={this.state.theme} />
      </div>
    );
  }
}
