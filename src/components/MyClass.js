import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import axios from 'axios';
import ServerUrl from '../config/server';
import '../styles/xjr_myclass.css';
// import ReactPullToRefresh from 'react-pull-to-refresh'



export default class MyClass extends React.Component {
    constructor() {
        super()
        this.state = {
            LessonList:[],
            classInfo:{
                leaveClass:0,
                totalClass:0,
                leaveTime:0,
                buyClass:0,
                giveClass:0,
                percent:0
            }
        }
    }
    xjrCanvas(deg){
        var canvas = document.getElementById('xjr_mycanvas');
        //获取屏幕的宽度
        var  clientWidth = document.getElementsByClassName('xjr_class_info')[0].clientWidth;
        //根据设计图中的canvas画布的占比进行设置
        var canvasWidth = Math.floor(clientWidth*148/750);
        if(clientWidth>=760){
            canvasWidth = 116.38;
            canvas.setAttribute('width',canvasWidth+'px');
            canvas.setAttribute('height',canvasWidth+'px');
            var ctx = canvas.getContext("2d");
            var p=Math.PI;
            var degP = (deg/180+1.5)*p;
            ctx.beginPath();
            ctx.translate(canvasWidth/2, canvasWidth/2);
            ctx.moveTo(0, 0);
            ctx.arc(0, 0, canvasWidth/2, p*270/180, degP);
            ctx.closePath();
            ctx.fillStyle="#DC2828";
            ctx.fill();
        }else{
            canvas.setAttribute('width',canvasWidth+'px');
            canvas.setAttribute('height',canvasWidth+'px');
            var ctx = canvas.getContext("2d");
            var p=Math.PI;
            var degP = (deg/180+1.5)*p;
            ctx.beginPath();
            ctx.translate(canvasWidth/2, canvasWidth/2);
            ctx.moveTo(0, 0);
            ctx.arc(0, 0, canvasWidth/2, p*270/180, degP);
            ctx.closePath();
            ctx.fillStyle="#DC2828";
            ctx.fill();
        }
    }
    componentDidMount() {

        var that=this;
        axios.get(ServerUrl.GetClassHourPage, {//课时记录
            params: {
                pageIndex:1,
                pageSize:10
            }
          })
          .then(function (res) {
            that.setState({
                LessonList:res.data.data.LessonHistory
            })

          })
          .catch(function (error) {
            console.log(error);
          });

        axios.get(ServerUrl.GetLessonStock)//课时信息
          .then(function (res) {
              console.log(res.data.data.LessonStock)
              console.log(res)
              let ClassInfo=res.data.data.LessonStock
              that.setState({
                classInfo:{
                    leaveClass:ClassInfo.StudentLesson-ClassInfo.TotalUsed,//剩余课时
                    totalClass:ClassInfo.StudentLesson,//总课时
                    leaveTime:ClassInfo.SurplusCount,//剩余有效期
                    buyClass:ClassInfo.StudentLesson-ClassInfo.TotalGiveLesson,//购买课时
                    giveClass:ClassInfo.TotalGiveLesson,//赠送课时
                    percent:ClassInfo.Percent//百分比
                }
            })

          })
          .catch(function (error) {
            console.log(error);
          });

    }
    toPoint(percent){
        var str=percent.replace("%","");
        str= str/100;
        return str;
    }
    componentDidUpdate(){
        let a = (1-this.toPoint(this.state.classInfo.percent))*360;//画布角度
        this.xjrCanvas(a)
    }
    createLesson(Lessonlist){
        let brr=[]
        Lessonlist.forEach((item,index)=>{
            brr.push(
                // <div className="xjr_note_item">
                //     <p className="xjr_note_itemName">{item.TypeName}</p>
                //     <p className="xjr_note_itemVal">{item.Hours}</p>
                //     <p className="xjr_note_itemTime">{item.CreateTime}</p>
                // </div>
                <div className="xjr_note_item" key={ index }>
                    <p className="xjr_note_itemName">{item.TypeName}</p>
                    <div className='xjr_note_right'>
                        <p className="xjr_note_itemVal">{item.Hours}</p>
                        <p className="xjr_note_itemTime">{item.CreateTime}</p>
                    </div>

                </div>
            )
        })
        return brr
    }
    render() {
        return (
            <div>
                <div className="xjr_class_box">
                    <div className="xjr_class_info">
                        <div className="xjr_canvas_box">
                            <canvas id="xjr_mycanvas"></canvas>
                            <span className="xjr_canvas_zks">{this.state.classInfo.totalClass}</span>
                            <span className="xjr_canvas_syks">{this.state.classInfo.leaveClass}</span>
                        </div>
                        <div >
                            <div className="xjr_syks_box">
                                <p className="xjr_syks"><span className="xjr_dian_red"></span>剩余课时<span className="xjr_ks">{this.state.classInfo.leaveClass}</span></p>
                                <p className="xjr_syyxq">剩余有效期：{this.state.classInfo.leaveTime}天</p>
                            </div>
                            <div className="xjr_syks_box">
                                <p className="xjr_zks"><span className="xjr_dian_black"></span>总课时<span className="xjr_ks">{this.state.classInfo.totalClass}</span></p>
                                <p className="xjr_gmks">购买课时 {this.state.classInfo.buyClass}  赠送课时 {this.state.classInfo.giveClass}</p>
                            </div>
                        </div>
                    </div>
                    <div className="xjr_class_note">
                        <div className="xjr_note_itemHead">
                            <div>
                                <div className="xjr_mine_gang1"></div><span>课时记录</span>
                            </div>
                        </div>
                        {/* <div className="xjr_note_item">
                            <p className="xjr_note_itemName">返还课时</p>
                            <p className="xjr_note_itemVal">+1.0</p>
                            <p className="xjr_note_itemTime">2017-07-25</p>
                        </div>
                        <div className="xjr_note_item">
                            <p className="xjr_note_itemName">赠课</p>
                            <p className="xjr_note_itemVal">+1.0</p>
                            <p className="xjr_note_itemTime">2017-07-25</p>
                        </div>
                        <div className="xjr_note_item">
                            <p className="xjr_note_itemName">约课</p>
                            <p className="xjr_note_itemVal">-1.0</p>
                            <p className="xjr_note_itemTime">2017-07-25</p>
                        </div> */}
                        {/* <div className="xjr_note_item">
                            <p className="xjr_note_itemName">购买课时刷一单多少</p>
                            <div className='xjr_note_right'>
                                <p className="xjr_note_itemVal">+360</p>
                                <p className="xjr_note_itemTime">2017-07-25</p>
                            </div>

                        </div> */}
                        {
                            this.createLesson(this.state.LessonList)
                        }
                    </div>
                </div>

            </div>
        )
    }
}
