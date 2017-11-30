import React from 'react';
import ReactDOM from 'react-dom';

// 支持所有的标准元素与自定义元素
let comp = (
    <div>
        <span>我是 span </span>
        <aa>kj</aa>
    </div>
);

// 可以被当成表达式，和嵌入表达式
// 只要表达式的返回值是合法的， 可以被渲染的
let firstName = 'Flowke',
    lastName = 'Hurley'

comp = (
    <div>
        <span>我是 span </span>
        <div>
            {`我的名字是: ${firstName} ${lastName}`}
        </div>
    </div>
);

// 某些属性要变成另一种方式
comp = (
    <div
        className="box"
    >写类名不能是： class, 要是： className</div>
);

// style 要变成一个对象
// 驼峰
// 某些值会自动添加 ‘px’ 后缀
comp = (
    <div
        style={ {
            color: '#fff',
            backgroundColor: 'red',
            width: 700,
            height: 400
        } }
        className="box"
    >写类名不能是： class, 要是： className</div>
);


ReactDOM.render(
    comp,
    document.getElementById('root')
);
