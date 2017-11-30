import React,{Component} from 'react';
import ReactDOM from 'react-dom';

class App extends Component{

    // 构造函数， react会把 props 当参数传进去
    constructor(props){
        // 因为这个类继承了 Component 类，所以要先调用一下 super
        // 把 props 传进去，否则 下面的 this.props 会是 undefined
        super(props);
        // console.log(this.props);

        // 声明好组件的 state， 他也叫组件的内部状态
        this.state = {
            magicNumber: Math.random()
        };

        // 把函数的 this 绑定到组件的实例， 以后不管谁调用， 这个函数的 this 都会执行组件实例
        this.onMagicNumberChange = this.onMagicNumberChange.bind(this);

    }

    onMagicNumberChange(){

        // 更改 state
        // 调用这个接口后， state 会更新， render 会执行
        this.setState({
            magicNumber: Math.random()
        });
    }

    // 组件必须实现一个 render 方法，render 所 return 的 jsx 结构就是 组件的样子
    render(){

        // 在组件里， 通过 this.props 能够访问到传过来的 props（属性）
        // console.log(this.props);
        let {firstName, lastName} = this.props;
        // 访问 state 的数据
        let {magicNumber} = this.state;

        let {onMagicNumberChange} = this;

        return (
            <div>
                {/* 组件可以嵌套其它的组件 */}
                <Sun/>
                <div>My name is : {`${firstName} ${lastName}`}</div>
                <div>
                    Magic number: {magicNumber}
                    <br/>
                    <button
                        onClick={ onMagicNumberChange }
                    >change Magic Number</button>
                </div>
            </div>
        )
    }
}

class Sun extends Component{
    render(){
        return (
            <div>bye bye 🍍 🍒 🍓 🍋 🥑 🍌 🍅 🍇</div>
        );
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

// react 的工作方式：
// 1. 先得到 virturlDOM , 接着把 virtualDOM 渲染到界面
// 2. 如果要更新视图，使用 setState, 会更新组件的状态， render 方法会执行，会得到一份新的 virturlDOM

// 更新之后， 会得到一份新的 virtualDOM（整个应用的virtualDOM）,
// 接下来， react 会比较两份新旧的 virtualDOM， 找到变化的部分， 重新渲染相应的部分
