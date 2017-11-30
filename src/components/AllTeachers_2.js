import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import axios from 'axios';
import ServerUrl from '../config/server';

import Swiper from 'swiper';
require('../common/swiper/swiper.min.css');

const closeIcon = require('../images/bxk_lesson_close.png');
const timeAm = require('../images/bxk_yuyue_am.png');
const timeBm = require('../images/bxk_yuyue_bm.png');
const timeWs = require('../images/bxk_yuyue_ws.png');

export default class ALlTeachers extends React.Component {
  constructor() {
    super()

    this.state = {
      isShowOrder: false, //约课窗口
      timeDatas: this.dataArrs(),//日期
      timeArrs: null,//时间
      activeTime: null, //选择的时间
      activeDate: this.dataArrs()[0][0].time, //选择的日期
    }

    this.timeArrs(this.dataArrs()[0][0].time);

    this.onActiveDate = this.onActiveDate.bind(this);
    this.onActiveTime = this.onActiveTime.bind(this);
    this.onSubmitDate = this.onSubmitDate.bind(this);
  }

  closeOrder = () => { //关闭约课窗口
    this.setState({isShowOrder: false})

  }
  timeArrs = (date) => {
    axios.get(ServerUrl.GetTch_Lesson, {
        params: {
          LessonTime: date,
          teacerId: 0
        }
      })
      .then((res) => {
        if(res.data.result == 1){
          let timeArray = res.data.data;

          let timeDatas = {};
          const sxw = [ 'sw', 'xw', 'ws' ];
          let newTimeArray;
          for(let i=0,l=sxw.length;i<l;i++){
            if(i == 0){
              timeDatas[`${sxw[i]}`] = [];
              for(var j=0;j<timeArray[];j++)
            }else if(i == 1){
              timeDatas[`${sxw[i]}`] = timeArray[i];
            }else{
              timeDatas[`${sxw[i]}`] = timeArray[i];
            }
          }
          console.log(timeDatas);
        }
      })
  }
  //初始化日期
  dataArrs = () => {
    let nowDate = new Date();
    let arrays = [[], []];
    const weekArr = [
      '周日',
      '周一',
      '周二',
      '周三',
      '周四',
      '周五',
      '周六'
    ];
    for (let i = 0; i < 14; i++) {
      let futDate = new Date(nowDate);
      futDate.setDate(nowDate.getDate() + i);

      let m = (futDate.getMonth() + 1) < 10
        ? '0' + (
        futDate.getMonth() + 1)
        : (futDate.getMonth() + 1);

      let d = futDate.getDate() < 10
        ? '0' + futDate.getDate()
        : futDate.getDate();

      let timeStr = futDate.getFullYear() + "-" + m + "-" + d;
      let dateStr = m + "-" + d;

      if (i < 7) {
        arrays[0].push({
          data: dateStr,
          week: new Date().toLocaleDateString() === timeStr
            ? '今日'
            : weekArr[futDate.getDay()],
          time: timeStr,
          val: i,
          isActive: new Date().toLocaleDateString() === timeStr
            ? true
            : false
        });
      } else {
        arrays[1].push({
          data: dateStr,
          week: new Date().toLocaleDateString() === timeStr
            ? '今日'
            : weekArr[futDate.getDay()],
          time: timeStr,
          val: i,
          isActive: new Date().toLocaleDateString() === timeStr
            ? true
            : false
        });
      }
    }
    return arrays;
  }

  openOrder = (id) => { //打开约课窗口
    //获取两周的时间

    this.setState({isShowOrder: true})
    setTimeout(() => {
      // 初始化swiper
      new Swiper('.swiper-container', {
        pagination: {
          el: '.swiper-pagination'
        }
      });
    })
  }
  // 改变选择时间选中状态
  onActiveTime(id) {

  }

  // 改变选择日期选中状态
  onActiveDate(id) {

  }

  onSubmitDate() {
    const { activeDate , activeTime } = this.state;
    let oDate;
    if( activeTime == null ){
      alert('请选择日期');
      return false;
    }

    oDate  = `${activeDate} ${activeTime}`;
    console.log(oDate);

  }

  componentDidMount() {}
  render() {
    const { timeDatas, isShowOrder, timeArrs , activeDate , activeTime } = this.state;

    console.log(timeArrs);
    console.log(timeDatas);
    let ShowOrder = {
      'display': isShowOrder
        ? 'block'
        : 'none'
    };

    const {onActiveTime, openOrder, onActiveDate, onSubmitDate} = this;

    return (<div>
      <div className="bxk_content">
        <ul className="bxk_lesson_teacher_box">
          <li className="bxk_lesson_t_timebox" onClick={openOrder}>
            <div className="bxk_lesson_time">
              今日（周五）10：30
            </div>
            <div className="bxk_lesson_time_icon">
              <img src="" alt=""/>
            </div>
          </li>
          <li className="bxk_lesson_teacher_item">
            <div className="bxk_l_teacher_itembox">
              <div className="bxk_l_teacher_imgbox fl">
                <img src="" alt=""/>
              </div>
              {/* <!--
                            未关注 ：bxk_guanzhu_active
                        --> */
              }
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
        </ul>
      </div>
      {/* <!-- 预约弹层 --> */}
      <div className="bxk_yuyue_art_box" style={ShowOrder}>
        {/* <!-- 关闭 --> */}
        <div className="bxk_yuyue_art_close" onClick={this.closeOrder}>
          <img src={closeIcon} alt=""/>
        </div>
        <div className="bxk_yuyue_art_header">
          选择日期：
        </div>
        <div className="bxk_yuyue_art_header_date">
          <div className="swiper-container">
            <div className="swiper-wrapper">
              {
                timeDatas.map((el, i) => {
                  return (<div className="swiper-slide" key={i}>
                    <ul>
                      {
                        el.map((e, index) => {
                          return (<li className={e.isActive
                              ? 'active'
                              : ''} onClick={() => {
                              onActiveDate(e.val)
                            }} key={e.val}>
                            <div className="bxk_week">
                              {e.week}
                            </div>
                            <div className="bxk_date">
                              {e.data}
                            </div>
                          </li>)
                        })
                      }
                    </ul>
                  </div>)
                })
              }
            </div>
            <div className="swiper-pagination"></div>
          </div>

        </div>
        <div className="bxk_yuyue_art_header">
          选择时间：
        </div>
        <div className="bxk_yuyue_art_content_date">
          <div className="bxk_yuyue_art_content_am">
            <img src={timeAm} alt=""/>
          </div>
          <div className="bxk_yuyue_art_content_am_box">
            {/*
              active : 选中
              noActive : 不可选
              yiActive : 已预约
            */
            }
            <ul>
              {
                // timeArrs.sw.map((el, index, elm) => {
                //   return (
                //     el.isCanActive  ?
                //       <li
                //       onClick={ ()=> onActiveTime(el.id) }
                //       className={el.isSelect ? 'canActive active' : 'canActive'}
                //       key={index}>
                //       {el.times}
                //       </li>
                //       :
                //       <li
                //       onClick={ ()=> onActiveTime(el.id) }
                //       className={ el.isYiYuYue ? 'yiActive' : '' }
                //       key={index}>
                //       {el.times}
                //     </li>
                //   )
                // })
              }
            </ul>
          </div>
          <div className="bxk_yuyue_art_content_am">
            <img src={timeBm} alt=""/>
          </div>
          <div className="bxk_yuyue_art_content_am_box">
            {/*
              active : 选中
              noActive : 不可选
              yiActive : 已预约
            */
            }
            <ul>
              {
                // timeArrs.xw.map((el, index, elm) => {
                //   return (
                //     el.isCanActive  ?
                //     <li
                //     onClick={ ()=> onActiveTime(el.id) }
                //     className={el.isSelect ? 'canActive active' : 'canActive'}
                //     key={index}>
                //     {el.times}
                //     </li>
                //     :
                //     <li
                //     onClick={ ()=> onActiveTime(el.id) }
                //     className={ el.isYiYuYue ? 'yiActive' : '' }
                //     key={index}>
                //     {el.times}
                //   </li>
                //   )
                // })
              }
            </ul>
          </div>
          <div className="bxk_yuyue_art_content_am">
            <img src={timeWs} alt=""/>
          </div>
          <div className="bxk_yuyue_art_content_am_box">
            {/*
              active : 选中
              noActive : 不可选
              yiActive : 已预约
            */
            }
            <ul>
              {
                // timeArrs.ws.map((el, index, elm) => {
                //   return (
                //       el.isCanActive  ?
                //       <li
                //       onClick={ ()=> onActiveTime(el.id) }
                //       className={el.isSelect ? 'canActive active' : 'canActive'}
                //       key={index}>
                //       {el.times}
                //       </li>
                //       :
                //       <li
                //       onClick={ ()=> onActiveTime(el.id) }
                //       className={ el.isYiYuYue ? 'yiActive' : '' }
                //       key={index}>
                //       {el.times}
                //     </li>
                // )
                // })
              }
            </ul>
          </div>
          {/* <!-- 确定按钮 --> */}
          <div className="bxk_yuyue_art_submit" onClick={ onSubmitDate }>
            确定
          </div>
        </div>
      </div>
    </div>)
  }
}
