import React from 'react';
import ReactDOM from 'react-dom';


//1、virtual DOM 虚拟DOM, React对虚拟DOM的修改 给不同的平台修改
export default class App extends React.Component {
  constructor() {
    super()

    // 把函数的this 绑定到组件的实例， 以后谁调用， 这个函数的this 都会执行组件实例
    this.onMagicNumber = this.onMagicNumber.bind(this);
  }

  onMagicNumber() {
    console.log(123);;
  }

  render() {
    return (
      <div>
        Hello Reactahhhh
        <button onClick={ this.onMagicNumber }>1234</button>
      </div>
    )
  }



}


//React : 声明式开发

ReactDOM.render(
  <App />,
   document.getElementById('root')
 );
