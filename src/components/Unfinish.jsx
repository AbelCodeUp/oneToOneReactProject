import React from 'react';
import FinishList from './FinishList';

class UnFinish extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 1
    }
  }

  componentDidMount(){

  }

  render() {
    return (
      <div>
        <FinishList num={this.state.num}/>
      </div>
    )
  }
}

export default UnFinish;
