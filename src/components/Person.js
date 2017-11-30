import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import axios from 'axios';
import ServerUrl from '../config/server';
import '../styles/xjr_main.css';

const xjr_nantou = require('../images/xjr_nantou.png');
const xjr_sex_man = require('../images/xjr_sex_man.png');
const xjr_sex_women = require('../images/xjr_sex_women.png');
const xjr_jiangbei = require('../images/xjr_jiangbei.png');
const xjr_router_info = require('../images/xjr_router_info.png');
const xjr_router_class = require('../images/xjr_router_class.png');
const xjr_router_dingdan = require('../images/xjr_router_dingdan.png');
const xjr_router_changePwd = require('../images/xjr_router_changePwd.png');
const xjr_jiantou = require('../images/xjr_jiantou.png');

export default class Person extends React.Component {
    constructor() {
        super()
        this.state = {
            Ename:'',
            sex:'',
            jiangbeiNum:'',
            readMinute:'',
            late:'',
            absence:'',
            classInfo:{
                leaveClass:0
            }

        }
    }
    componentDidMount() {
        var that=this;
        axios.get(ServerUrl.LearningSituation)
          .then(function (res) {
            console.log(res.data.data);
            let info=res.data.data;
            that.setState({
                Ename:info.RealName,
                // sex:info.Sex,
                jiangbeiNum:info.Gift,
                readMinute:info.TotalUsedTime,
                late:info.LateCount,
                absence:info.AbsenceCount
            })
          })
          .catch(function (error) {
            console.log(error);
          });
          axios.get(ServerUrl.GetLessonStock)//课时信息
          .then(function (res) {
              let ClassInfo=res.data.data.LessonStock
              that.setState({
                classInfo:{
                    leaveClass:ClassInfo.StudentLesson-ClassInfo.TotalUsed//剩余课时
                }
            })
               
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    render() {
        return (
                <div className="xjr_mine_main1">
                    <div className="xjr_main_info">
                        <div className="xjr_info_photo">
                            <img src={xjr_nantou} alt=""/>
                        </div>
                        <div className="xjr_info_name">
                        <p>{this.state.Ename}</p>
                        {
                            this.state.sex==1?<img src={xjr_sex_man} alt=""/>:<img src={xjr_sex_women} alt=""/>
                        }
                        </div>
                        <div className="xjr_info_jiangbei">
                            <img src={xjr_jiangbei} alt=""/>
                            <p>X{this.state.jiangbeiNum}</p>  
                        </div>
                        <div className="xjr_info_time">
                            <div className="xjr_time_1">
                                <p className="p1">{this.state.readMinute}</p>
                                <p className="p2">已说英语(min)</p>
                            </div>
                            <div className="xjr_border"></div>
                            <div className="xjr_time_1">
                                <p className="p1">{this.state.late}</p>
                                <p className="p2">迟到(次)</p>
                            </div>
                            <div className="xjr_border"></div>
                            <div className="xjr_time_1">
                                <p className="p1">{this.state.absence}</p>
                                <p className="p2">缺席(次)</p>
                            </div>
                        </div>   
                    </div>
                    <div className="xjr_main_router">
                        <Link to='/personinfo' className="xjr_router_route xjr_router_info">
                            <div className="xjr_router_item">
                                <img src={xjr_router_info} alt=""/>
                                <p>个人信息</p>  
                            </div>
                            <div className="xjr_router_jiantou">></div>
                        </Link>
                        <Link to='/myclass' className="xjr_router_route xjr_router_className">
                            <div className="xjr_router_item">
                                <img src={xjr_router_class} alt=""/>
                                <p>我的课时</p>  
                            </div>
                            <div className="xjr_router_jiantou"><span>剩余{this.state.classInfo.leaveClass}课时</span>></div>  
                        </Link>
                        <Link to='/mydingdan' className="xjr_router_route xjr_router_dingdan">
                            <div className="xjr_router_item">
                                <img src={xjr_router_dingdan} alt=""/>
                                <p>我的订单</p>  
                            </div>
                            <div className="xjr_router_jiantou">></div>   
                        </Link>
                        <div className="xjr_router_route xjr_router_changePwd">
                            <div className="xjr_router_item">
                                <img src={xjr_router_changePwd} alt=""/>
                                <p>修改密码</p>  
                            </div>
                            <div className="xjr_router_jiantou">></div>   
                        </div>  
                    </div>
                    <a href="#" className="xjr_exitLogin">退出登录</a>
                </div>
        )
    }
}
