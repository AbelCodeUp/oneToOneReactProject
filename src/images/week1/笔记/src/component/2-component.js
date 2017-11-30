import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component{

    // 组件必须实现一个 render 方法，render 所 return 的 jsx 结构就是 组件的样子
    render(){

        // 在组件里， 通过 this.props 能够访问到传过来的 props（属性）
        // console.log(this.props);

        let {firstName, lastName} = this.props;

        return (
            <div>
                <div>My name is : {`${firstName} ${lastName}`}</div>
                <div>
                    Magic number: {Math.random()}

                    <button>change Magic Number</button>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <div>
        {/* <button>click</button> */}
        {/* 组件标签大小开头 */}
        {/* 组件标签里定义的属性叫做 props */}
        <App
            firstName="Flowke"
            lastName="Hurley"
        />
        <br/>
        <App
            firstName="Mike"
            lastName="Hurley"
        />
    </div>,
    document.getElementById('root')
);
