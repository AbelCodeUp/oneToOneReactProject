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
      timeArrs: {  //时间数据初始化
        sw:[],
        xw:[],
        ws:[]
      }, //时间
      activeTime: null, //选择的时间
      activeDate: this.dataArrs()[0][0].time, //选择的日期
      activeWeek: this.dataArrs()[0][0].weekStr
    }

    axios.get(ServerUrl.GetLessonRecords, {
      params: {
        status: 1,
        pageIndex: 0
      }
    })
      .then((res) =>{
        console.log(res);
      })

    this.getLessonTime(this.dataArrs()[0][0].time);


    this.onActiveDate = this.onActiveDate.bind(this);
    this.onActiveTime = this.onActiveTime.bind(this);
    this.onSubmitDate = this.onSubmitDate.bind(this);
  }

  closeOrder = () => { //关闭约课窗口
    this.setState({isShowOrder: false})

  }
  // 时间更改
  calcTime = (time,offset) => {
    // create Date object for current location
    var d = new Date(time);
    // convert to msec
    // add local time zone offset
    // get UTC time in msec
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    // create new Date object for different city
    // using supplied offset
    var nd = new Date(utc + (3600000*offset));
    // return time as a string
    return  nd;
  }

  // 判断是否两小时
  isCanActive = (time) =>{

    var oDate = this.calcTime(new Date(),8); //实例一个时间对象；


    oDate.setHours( oDate.getHours() + 2 );

    var tHour = oDate.getHours();
    var tMin = oDate.getMinutes();

    // console.log(tHour,time.split(':')[0],tHour <= time.split(':')[0]);
    // 判断2小时时间
    if( tHour < time.split(':')[0] ){
      return true;
    }else if( tHour == time.split(':')[0] && tHour <= 22){
      // console.log(time.split(':')[1] == '30'&& tMin < 30)|| tMin >= 0 );
      if( time.split(':')[1] == '30' && (tMin < 30 || tMin >= 0 )){
        return true;
      }else if( time.split(':')[1] == '00' && (tMin >= 30 || tMin < 0)){
        return true;
      }else{
        return false;
      }
    }else {
      return false;
    }
  }

  /*
    数据结构
    {
      {
      times
      isCanActive
      isHaveLesson
    }
    }
  */
  isToDay = (date) =>{
    return this.calcTime(new Date(),8).toLocaleDateString().replace(/\//g,'-') === date;
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
      let futDate = this.calcTime(new Date(),8);
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
      //转换时区

      if (i < 7) {
        arrays[0].push({
          data: dateStr,
          weekStr: weekArr[futDate.getDay()],
          week: this.isToDay( timeStr )
            ? '今日'
            : weekArr[futDate.getDay()],
          time: timeStr,
          val: i,
          isActive: this.isToDay( timeStr )
            ? true
            : false
        });
      } else {
        arrays[1].push({
          data: dateStr,
          weekStr: weekArr[futDate.getDay()],
          week: this.isToDay( timeStr )
            ? '今日'
            : weekArr[futDate.getDay()],
          time: timeStr,
          val: i,
          isActive: this.isToDay( timeStr )
            ? true
            : false
        });
      }
    }
    return arrays;
  }

  openOrder = () => { //打开约课窗口
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
  onActiveTime (id) {
    let {timeArrs} = this.state;
    let time = '';
    let timeSW = null;
    let timeXW = null;
    let timeWS = null;
    timeSW = timeArrs.sw.map((e) => {
      e.isSelect = false;
      if (e.id === id) {
        e.isSelect = true;
        time = e.times;
      }
      return e;
    })
    timeXW = timeArrs.xw.map((e) => {
      e.isSelect = false;
      if (e.id === id) {
        e.isSelect = true;
        time = e.times;
      }
      return e;
    })
    timeWS = timeArrs.ws.map((e) => {
      e.isSelect = false;
      if (e.id === id) {
        e.isSelect = true;
        time = e.times;
      }
      return e;
    })

    this.setState({
      timeArrs : {
        sw : timeSW,
        xw : timeXW,
        ws : timeWS
      },
      activeTime : time
    })

  }

  // 改变选择日期选中状态
  onActiveDate(id) {
    let {timeDatas} = this.state;
    let time = '';
    let week = '';

    timeDatas = timeDatas.map((el) => {
      el.map((e) => {
        e.isActive = false;
        if (e.val === id) {
          e.isActive = true;
          time = e.time;
          week = e.week;
          this.getLessonTime(e.time);
        }
        return e;
      })
      return el;
    })

    this.setState({
        timeDatas,
        activeDate: time,
        activeWeek: week
      });

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

  componentDidMount() {

  }

  getLessonTime(date) {
    axios.get(ServerUrl.GetTch_Lesson, {
        params: {
          LessonTime: date,
          teacerId: 0
        }
      })
      .then((res) => {
        if(res.data.result == 1){
          let serverData = res.data.data;
          const mins = ['00', '30'];
          const m = ['sw', 'xw', 'ws'];
          let timeDatas = {};
          var sw = 0;
          var xw = 0;
          var ws = 0;
          for (let i = 0, mLength = m.length; i < mLength; i++) {
            timeDatas[`${m[i]}`] = [];
            for (let j = 8; j <= 22; j++) {
              if (j <= 12 && j >= 8 && i == 0) {
                sw ++ ;
                for (let z = 0; z < mins.length; z++) {
                  timeDatas[`${m[i]}`].push({
                    times: `${j < 10
                      ? '0' + j
                      : j}:${mins[z]}`,
                    isCanActive: this.isCanActive(`${j < 10  //传入显示时间判断是否过两小时
                      ? '0' + j
                      : j}:${mins[z]}`), // 是否两小时后
                    isHaveLesson: false, //当前时间是否有课  没有用
                    isSelect : false,
                    isYiYuYue: serverData[i][sw].Status == 0 ? true : false, //是否有课
                    id:Math.random()
                  })

                }

              } else if (j > 12 && j <= 17 && i == 1) {
                xw ++ ;
                for (let z = 0; z < mins.length; z++) {
                  timeDatas[`${m[i]}`].push({
                    times: `${j < 10
                      ? '0' + j
                      : j}:${mins[z]}`,
                    isCanActive: this.isCanActive(`${j < 10  //传入显示时间判断是否过两小时
                      ? '0' + j
                      : j}:${mins[z]}`),
                    isHaveLesson: false, //当前时间是否有课
                    isSelect : false,
                    isYiYuYue: serverData[i][xw].Status == 0 ? true : false,
                    id:Math.random()
                  })
                }
              } else if (j > 17 && j <= 22 && i == 2) {
                ws ++;
                for (let z = 0; z < mins.length; z++) {
                  if (j == 22 && z == 1) {
                    continue;
                  } else {
                    timeDatas[`${m[i]}`].push({
                      times: `${j < 10
                        ? '0' + j
                        : j}:${mins[z]}`,
                      isCanActive: this.isCanActive(`${j < 10  //传入显示时间判断是否过两小时
                        ? '0' + j
                        : j}:${mins[z]}`),
                      isHaveLesson: false, //当前时间是否有课
                      isSelect : false,
                      isYiYuYue: serverData[i][xw].Status != 0 ? true : false,
                      id:Math.random()
                    })
                  }

                }
              }

            }
          }
          this.setState({
            timeArrs: timeDatas
          })
        }
      })
  }

  render() {
    const {timeDatas, isShowOrder, timeArrs , activeDate , activeTime , activeWeek} = this.state;

    let aData = `${activeDate.split('-')[1]}-${activeDate.split('-')[2]}`

    console.log(timeArrs);
    console.log(timeDatas);
    let ShowOrder = {
      'display': isShowOrder
        ? 'block'
        : 'none'
    };

    const {onActiveTime, openOrder, onActiveDate ,onSubmitDate, isToDay} = this;



    return (<div>
      <div className="bxk_content">
        <ul className="bxk_lesson_teacher_box">
          <li className="bxk_lesson_t_timebox" onClick={openOrder}>
            <div className="bxk_lesson_time">
              {

                `${ isToDay(activeDate) ? '今日': aData } ( ${activeWeek} ) ${activeTime}`

              }

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
                timeArrs.sw.map((el, index, elm) => {
                  return (
                    el.isCanActive  ?
                      <li
                      onClick={ ()=> onActiveTime(el.id) }
                      className={ `${el.isSelect ? 'canActive active' : 'canActive'} ${el.isYiYuYue ? 'yiActive' : ''}`}
                      key={index}>
                      {el.times}
                      </li>
                      :
                      <li
                      onClick={ ()=> onActiveTime(el.id) }
                      key={index}>
                      {el.times}
                    </li>
                  )
                })
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
                timeArrs.xw.map((el, index, elm) => {
                  return (
                    el.isCanActive  ?
                    <li
                    onClick={ ()=> onActiveTime(el.id) }
                    className={ `${el.isSelect ? 'canActive active' : 'canActive'} ${el.isYiYuYue ? 'yiActive' : ''}`}
                    key={index}>
                    {el.times}
                    </li>
                    :
                    <li
                    onClick={ ()=> onActiveTime(el.id) }
                    key={index}>
                    {el.times}
                  </li>
                  )
                })
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
                timeArrs.ws.map((el, index, elm) => {
                  return (
                      el.isCanActive  ?
                      <li
                      onClick={ ()=> onActiveTime(el.id) }
                      className={`${el.isSelect ? 'canActive active' : 'canActive'} ${el.isYiYuYue ? 'yiActive' : ''}`}
                      key={index}>
                      {el.times}
                      </li>
                      :
                      <li
                      onClick={ ()=> onActiveTime(el.id) }
                      key={index}>
                      {el.times}
                    </li>
                )
                })
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
