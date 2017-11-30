import React from 'react';
import FinishList from './FinishList';

class Finished extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 2
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

export default Finished;
