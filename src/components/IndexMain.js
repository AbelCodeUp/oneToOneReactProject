import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import axios from 'axios';
import ServerUrl from '../config/server';
require('styles/footerNav.css');

export default class IndexMain extends React.Component {
    constructor() {
        super()
        this.state = {

        }
    }
    componentDidMount() {
      // isCanActive : false, // 是否两小时后
      // isHaveLesson : false, //当前时间是否有课
    }

    render() {
        return (
            <div  className="bxk_container">
                <div>
                {
                    this.props.children
                }
                </div>
                <ul className="zjb_footerNav">
                    <li>
                        <Link to="/orderLesson" activeClassName="active" >
                            <div className="footerNavImg1_1 footerNavImg1" />
                            <div className="color">约课</div>
                        </Link>
                    </li>
                    <li>
                        <Link to="/lessonlist" activeClassName="active">
                            <div className="footerNavImg2_1 footerNavImg2" />
                            <div className='color'>课表</div>
                        </Link>
                    </li>
                    <li>
                        <Link to="/person" activeClassName="active">
                            <div className="footerNavImg3_1 footerNavImg3" />
                            <div className='color' >我的</div>
                        </Link>
                    </li>
                </ul>
            </div>
        )
    }
}
