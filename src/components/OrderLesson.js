import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import axios from 'axios';
import ServerUrl from '../config/server';
const closeIcon = require('../images/bxk_lesson_close.png');
const timeAm = require('../images/bxk_yuyue_am.png');
const timeBm = require('../images/bxk_yuyue_bm.png');
const timeWs = require('../images/bxk_yuyue_ws.png');

export default class OrderLesson extends React.Component {
    constructor() {
        super()
        this.state = {
            isShowOrder: false //约课窗口
        }
        this.closeOrder = ()=> { //关闭约课窗口
            this.setState({
                isShowOrder : false
            })
        }
        this.openOrder = () => { //打开约课窗口
            this.setState({
                isShowOrder : true
            })
        }
    }

    
    componentDidMount() {
       
    }

    render() {

        let isShowOrder = {'display' : this.state.isShowOrder ? 'block' : 'none' };

        return (
            <div>
                <div className="bxk_header">
                    <ul>
                        <li className="bxk_lesson_nav_item">
                            <a className="active" href="javascrit:;">全部外教</a>
                        </li>
                        <li className="bxk_lesson_nav_item">
                            <a href="javascrit:;">我的关注</a>
                        </li>
                    </ul>
                </div>
                <div className="bxk_content">
                    <ul className="bxk_lesson_teacher_box">
                        <li className="bxk_lesson_t_timebox">
                            <div className="bxk_lesson_time">
                                今日（周五）10：30
                    </div>
                            <div className="bxk_lesson_time_icon">
                                <img src="" alt="" />
                            </div>
                        </li>
                        <li className="bxk_lesson_teacher_item">
                            <div className="bxk_l_teacher_itembox">
                                <div className="bxk_l_teacher_imgbox fl">
                                    <img src="" alt="" />
                                </div>
                                {/* <!-- 
                            未关注 ：bxk_guanzhu_active
                        --> */}
                                <div className="bxk_l_teacher_msg fl">
                                    <div className="bxk_l_teacher_name">
                                        Ruisun
                            </div>
                                    <div className="bxk_l_teacher_guanzhu_buttion">
                                        +关注
                            </div>
                                </div>
                                <div className="bxk_l_teacher_yuyue fr">
                                    <a href="javascript:;">
                                        预约
                            </a>
                                </div>
                            </div>
                        </li>
                        <li className="bxk_lesson_teacher_item">
                            <div className="bxk_l_teacher_itembox">
                                <div className="bxk_l_teacher_imgbox fl">
                                    <img src="" alt="" />
                                </div>
                                <div className="bxk_l_teacher_msg fl">
                                    <div className="bxk_l_teacher_name">
                                        Ruisun
                            </div>
                                    <div className="bxk_l_teacher_guanzhu_buttion bxk_guanzhu_active">
                                        已关注
                            </div>
                                </div>
                                <div className="bxk_l_teacher_yuyue fr">
                                    <a href="javascript:;">
                                        预约
                            </a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                {/* <!-- 预约弹层 --> */}
                <div className="bxk_yuyue_art_box" style={ isShowOrder }>
                    {/* <!-- 关闭 --> */}
                    <div className="bxk_yuyue_art_close" onClick={ this.closeOrder }>
                        <img src={closeIcon} alt="" />
                    </div>
                    <div className="bxk_yuyue_art_header">
                        选择日期：
                    </div>
                    <div className="bxk_yuyue_art_header_date">
                        <ul>
                            <li className="active">
                                <div className="bxk_week">
                                    今日
                        </div>
                                <div className="bxk_date">
                                    11-6
                        </div>
                            </li>
                            <li>
                                <div className="bxk_week">
                                    周一
                        </div>
                                <div className="bxk_date">
                                    11-6
                        </div>
                            </li>
                            <li>
                                <div className="bxk_week">
                                    周一
                        </div>
                                <div className="bxk_date">
                                    11-6
                        </div>
                            </li>
                            <li>
                                <div className="bxk_week">
                                    周一
                        </div>
                                <div className="bxk_date">
                                    11-6
                        </div>
                            </li>
                            <li>
                                <div className="bxk_week">
                                    周一
                        </div>
                                <div className="bxk_date">
                                    11-6
                        </div>
                            </li>
                            <li>
                                <div className="bxk_week">
                                    周一
                        </div>
                                <div className="bxk_date">
                                    11-6
                        </div>
                            </li>
                            <li>
                                <div className="bxk_week">
                                    周一
                        </div>
                                <div className="bxk_date">
                                    11-6
                        </div>
                            </li>
                            <li>
                                <div className="bxk_week">
                                    周一
                        </div>
                                <div className="bxk_date">
                                    11-6
                        </div>
                            </li>
                            <li>
                                <div className="bxk_week">
                                    周一
                        </div>
                                <div className="bxk_date">
                                    11-6
                        </div>
                            </li>
                            <li>
                                <div className="bxk_week">
                                    周一
                        </div>
                                <div className="bxk_date">
                                    11-6
                        </div>
                            </li>
                            <li>
                                <div className="bxk_week">
                                    周一
                        </div>
                                <div className="bxk_date">
                                    11-6
                        </div>
                            </li>
                            <li>
                                <div className="bxk_week">
                                    周一
                        </div>
                                <div className="bxk_date">
                                    11-6
                        </div>
                            </li>
                            <li>
                                <div className="bxk_week">
                                    周一
                        </div>
                                <div className="bxk_date">
                                    11-6
                        </div>
                            </li>
                            <li>
                                <div className="bxk_week">
                                    周一
                        </div>
                                <div className="bxk_date">
                                    11-6
                        </div>
                            </li>
                        </ul>
                    </div>
                    <div className="bxk_yuyue_art_header">
                        选择时间：
                    </div>
                    <div className="bxk_yuyue_art_content_date">
                        <div className="bxk_yuyue_art_content_am">
                            <img src={timeAm} alt="" />
                        </div>
                        <div className="bxk_yuyue_art_content_am_box">
                            <ul>
                                <li className="active">
                                    08:80
                        </li>
                                <li className="noActive">
                                    08:30
                        </li>
                                <li>
                                    09:00
                        </li>
                                <li className="yiActive">
                                    09:30
                        </li>
                                <li>
                                    08:30
                        </li>
                                <li>
                                    09:00
                        </li>
                                <li>
                                    09:30
                        </li>
                            </ul>
                        </div>
                        <div className="bxk_yuyue_art_content_am">
                            <img src={timeBm} alt="" />
                        </div>
                        <div className="bxk_yuyue_art_content_am_box">
                        </div>
                        <div className="bxk_yuyue_art_content_am">
                            <img src={timeWs} alt="" />
                        </div>
                        <div className="bxk_yuyue_art_content_am_box">
                        </div>
                        {/* <!-- 确定按钮 --> */}
                        <div className="bxk_yuyue_art_submit">
                            确定
                </div>
                    </div>
                </div>
            </div>
        )
    }
}
