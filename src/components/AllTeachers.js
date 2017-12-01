import React from 'react';
import ReactDOM from 'react-dom';
import {Link, hashHistory} from 'react-router';
import axios from 'axios';
import ServerUrl from '../config/server';

import ReactLoading from 'react-loading';

import Swiper from 'swiper';

// 弹层组件
import { YueKeSureNextOne, QuXiaoGuanZhu, YueKeSureNextTwo } from './TanChuang';
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
      timeDatas: [], //日期
      timeArrs: { //时间数据初始化
        sw: [],
        xw: [],
        ws: []
      }, //时间
      activeTime: '', //选择的时间
      activeDate: '', //选择的日期
      activeWeek: '', //当前选择周
      tchDatas: [], //保存老师数据
      sysTime: {
        date: '',
        year: ''
      },

      teacerId : 0, //老师iD
      qxState : 0, //取消状态
      isShowGZ: 0 ,  //取消主注弹层
      isSuccess: 0, //约课成功
      isLoading: true

    }


    this.getSystemTime(); //获取服务器时间

    this.onActiveDate = this.onActiveDate.bind(this);
    this.onActiveTime = this.onActiveTime.bind(this);
    this.onSubmitDate = this.onSubmitDate.bind(this);
    // 获取时间内老师排课列表
  }

  // 获取服务器时间
  getSystemTime = () => {
    let {sysTime} = this.state;
    axios.get(ServerUrl.GetSystemTime, {}).then((res) => {
      if (res.data.result == 1) {
        sysTime = this.formatDate(res.data.data.Time * 1000);
        this.setState({
          sysTime,
          dataArrs: this.dataArrs(res.data.data.Time * 1000 )
        })
        this.getLessonTime(sysTime.date.split(' ')[0]);

      }
    })
  }
  //格式化日期：yyyy-MM-dd hh:mm
  formatDate = (date) => {

    var date = this.calcTime(date, 8);

    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10
      ? ('0' + m)
      : m;
    var d = date.getDate();
    d = d < 10
      ? ('0' + d)
      : d;
    var h = date.getHours();
    var minute = date.getMinutes();
    minute = minute < 10
      ? ('0' + minute)
      : minute;
    return {
      date: y + '-' + m + '-' + d + ' ' + h + ':' + minute,
      year: y,
      fdate : y + '-' + m + '-' + d
    }
  }

  closeOrder = () => { //关闭约课窗口
    this.setState({isShowOrder: false})
  }
  // 时间更改
  calcTime = (time, offset) => {
    // create Date object for current location
    var d = new Date(time);
    // convert to msec
    // add local time zone offset
    // get UTC time in msec
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    // create new Date object for different city
    // using supplied offset
    var nd = new Date(utc + (3600000 * offset));
    // return time as a string
    return nd;
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
  isToDay = (date) => {
    return this.formatDate(this.calcTime(new Date(), 8)).fdate === date;
  }

  //初始化日期
  dataArrs = (date) => {
    let nowDate = new Date(date);
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
      let futDate = this.calcTime(new Date(), 8);
      futDate.setDate(nowDate.getDate() + i);

      let m = (futDate.getMonth() + 1) < 10
        ? '0' + (
        futDate.getMonth() + 1)
        : (futDate.getMonth() + 1);

      let d = futDate.getDate() < 10
        ? '0' + futDate.getDate()
        : futDate.getDate();

      let timeStr = futDate.getFullYear() + "-" + m + "-" + d;
      console.log(timeStr);
      let dateStr = m + "-" + d;
      //转换时区

      if (i < 7) {
        arrays[0].push({
          data: dateStr,
          weekStr: weekArr[futDate.getDay()],
          week: this.isToDay(timeStr)
            ? '今日'
            : weekArr[futDate.getDay()],
          time: timeStr,
          val: i,
          isActive: this.isToDay(timeStr)
            ? true
            : false
        });
      } else {
        arrays[1].push({
          data: dateStr,
          weekStr: weekArr[futDate.getDay()],
          week: this.isToDay(timeStr)
            ? '今日'
            : weekArr[futDate.getDay()],
          time: timeStr,
          val: i,
          isActive: this.isToDay(timeStr)
            ? true
            : false
        });
      }
    }
    this.setState({
      activeDate: arrays[0][0].time,
      activeWeek: arrays[0][0].weekStr,
      timeDatas: arrays
    })
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
  onActiveTime(id) {
    let {timeArrs} = this.state;
    let time = '';
    let timeSW = null;
    let timeXW = null;
    let timeWS = null;
    timeSW = timeArrs.sw.map((e) => {
      e.isSelect = false;
      if (e.id === id) {
        e.isSelect = true;
        time = e.Time;
      }
      return e;
    })
    timeXW = timeArrs.xw.map((e) => {
      e.isSelect = false;
      if (e.id === id) {
        e.isSelect = true;
        time = e.Time;
      }
      return e;
    })
    timeWS = timeArrs.ws.map((e) => {
      e.isSelect = false;
      if (e.id === id) {
        e.isSelect = true;
        time = e.Time;
      }
      return e;
    })

    this.setState({
      timeArrs: {
        sw: timeSW,
        xw: timeXW,
        ws: timeWS
      },
      activeTime: time
    })
    this.getTeacherData();

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

    this.setState({timeDatas, activeDate: time, activeWeek: week});

  }

  onSubmitDate() {
    const {activeDate, activeTime} = this.state;
    let oDate;
    if (activeTime == null) {
      alert('请选择日期');
      return false;
    }

    oDate = `${activeDate} ${activeTime}`;
    this.setState({isShowOrder: false})
    // 初始化当前时间老师列表
    // this.getTeacherData();

  }

  componentDidMount() {}
  // 获取当前时间状态
  getLessonTime(date) {
    let {timeArrs} = this.state;
    axios.get(ServerUrl.GetTch_Lesson, {
      params: {
        LessonTime: date,
        teacerId: 0
      }
    }).then((res) => {
      if (res.data.result == 1) {
        let serverData = res.data.data;
        var isFirstDate = true;
        for (let i = 0, len = serverData.length; i < len; i++) {
          var oItems = serverData[i];
          for (let j = 0, slen = oItems.length; j < slen; j++) {
            var item = oItems[j];
            if (isFirstDate && item.Status == 1) {
              item.isSelect = true;
              isFirstDate = false;

              this.setState({activeTime: item.Time})

              this.getTeacherData();  //首次加载老师

            } else {
              item.isSelect = false;
            }
            item.id = Math.random();
          }
        }

        timeArrs.sw = serverData[0];
        timeArrs.xw = serverData[1];
        timeArrs.ws = serverData[2];

        this.setState({timeArrs})
      }
    })
  }

  // 跳转老师详情
  goTchInfo = (id) => {
    hashHistory.push(`/teacherInfo/${id}`);
  }

  // 通过时间获取当前时间段老师
  getTeacherData = () => {
    let {activeDate, activeTime} = this.state;
    axios.get(ServerUrl.GetTeachers, {
      params: {
        time: `${activeDate} ${activeTime}`,
        pageIndex: 1,
        pageSize: 15
      }
    }).then((res) => {
      if (res.data.result == 1) {

        this.setState({
          tchDatas: res.data.data.Teachers,
          isLoading:false})

      }
    })
  }
  // 关注老师
  sendAttention = (tchId , isGuanZhu) => {

    let {tchDatas} = this.state;

    axios.get(ServerUrl.AttentionTeacher, {
      params: {
        teacherId: tchId,
        status: isGuanZhu
      }
    }).then((res) => {
      if (res.data.result == 1) {

        tchDatas = tchDatas.map((el, i) => {
          if (el.TeacherID === tchId) {
            el.IsAttention = isGuanZhu
          }
          return el;
        })
        this.setState({tchDatas});

      }
    })
  }
  // 约课
  orderedTeacher = ( tchId ) => {
    let { activeDate, activeTime } = this.state;
    axios.get(ServerUrl.JoinAttendLesson, {
      params: {
        teacherId: tchId,
        LessonTime: `${activeDate} ${activeTime}`,
        attendLessonId: 0
      }
    })
    .then((res)=>{
      console.log(res);
    })
  }

  render() {
    const {
      timeDatas,
      isShowOrder,
      timeArrs,
      activeDate,
      activeTime,
      activeWeek,
      tchDatas,
      isShowGZ, //取消关注
      teacerId,
      qxState,
      isSuccess, //约课成功
      isLoading
    } = this.state;

    let aData = `${activeDate=== ''? '' : activeDate.split('-')[1]}-${activeDate=== ''?'':activeDate.split('-')[2]}`; //当前时间

    console.log(timeArrs);
    console.log(timeDatas);
    console.log(tchDatas);
    console.log(activeTime);

    let ShowOrderTime = {
      'display': isShowOrder
        ? 'block'
        : 'none'
    };

    const {
      onActiveTime,
      openOrder,
      onActiveDate,
      onSubmitDate,
      isToDay,
      sendAttention,
      goTchInfo,
      orderedTeacher //约课
    } = this;

    return (
    <div>
      {/* 取消关注弹窗 */}
      {
        isShowGZ ?
        <QuXiaoGuanZhu
          QuXiaoGuanZhu1={ (id,state)=>{
            sendAttention( teacerId, qxState);
            this.setState({
              isShowGZ:0
            })
          }}
          QuXiaoGuanZhu2={ ()=>{ //取消
            this.setState({
              isShowGZ:0
            })
          }}

         />
        :
        undefined
      }
      {/* 预约成功 */}
      {
        isSuccess ?
        <YueKeSureNextOne />
        :
        undefined
      }


      <div className="bxk_content">
        <ul className="bxk_lesson_teacher_box">
          <li className="bxk_lesson_t_timebox" style={{background:'#fff'}} onClick={openOrder}>
            <div className="bxk_lesson_time">
              {

                `${isToDay(activeDate)
                  ? '今日'
                  : aData} ( ${activeWeek} ) ${activeTime}`

              }

            </div>
            <div className="bxk_lesson_time_icon">
              <img src="" alt=""/>
            </div>
          </li>
          {
            isLoading ?
            <ReactLoading
              type={'spinningBubbles'}
              color={'#b6b6b6'}
              height='1.3rem'
              width='1.3rem' className='loading'/>
            :
            <div>
              {
                tchDatas.map((el) => {
                  return (<li className="bxk_lesson_teacher_item" key={el.TeacherID}>
                    <div className="bxk_l_teacher_itembox">
                      <div className="bxk_l_teacher_imgbox fl" onClick={() => {goTchInfo( el.TeacherID )}}>
                        <img src={el.HeaderImage} alt=""/>
                      </div>
                      {/* <!--
                                      未关注 ：bxk_guanzhu_active
                                  --> */
                      }
                      <div className="bxk_l_teacher_msg fl">
                        <div className="bxk_l_teacher_name">
                          {el.EnglishName}
                        </div>
                        {
                          el.IsAttention != 0
                            ? <div className="bxk_l_teacher_guanzhu_buttion bxk_guanzhu_active"
                                onClick={() => {
                                      this.setState({
                                        isShowGZ : 1,
                                        teacerId: el.TeacherID
                                      })
                                    }}>
                                已关注
                              </div>
                            : <div className="bxk_l_teacher_guanzhu_buttion" onClick={() => {
                                  sendAttention(el.TeacherID, 1)
                                }}>
                                +关注
                              </div>
                        }

                      </div>
                      <div className="bxk_l_teacher_yuyue fr">
                        <a href="javascript:;" onClick={ ()=>{ orderedTeacher( el.TeacherID )} }>
                          预约
                        </a>
                      </div>
                    </div>
                  </li>)
                })

              }
            </div>
          }



        </ul>
      </div>
      {/* <!-- 预约弹层 --> */}
      <div className="bxk_yuyue_art_box" style={ShowOrderTime}>
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
                timeArrs.sw.map((el, index, elm) => {
                  return (
                    el.Status == 1
                    ? <li onClick={() => onActiveTime(el.id)} className={`canActive ${el.isSelect
                        ? 'active'
                        : ''}`} key={el.id}>
                      {el.Time}
                    </li>
                    : <li className={`${el.Status == 2
                        ? 'yiActive'
                        : ''}`} onClick={() => onActiveTime(el.id)} key={el.id}>
                      {el.Time}
                    </li>)
                })
              }
            </ul>
          </div>
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
                timeArrs.xw.map((el, index, elm) => {
                  return (
                    el.Status == 1
                    ? <li onClick={() => onActiveTime(el.id)} className={`canActive ${el.isSelect
                        ? 'active'
                        : ''}`} key={el.id}>
                      {el.Time}
                    </li>
                    : <li className={`${el.Status == 2
                        ? 'yiActive'
                        : ''}`} onClick={() => onActiveTime(el.id)} key={el.id}>
                      {el.Time}
                    </li>)
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
                timeArrs.ws.map((el, index, elm) => {
                  return (
                    el.Status == 1
                    ? <li onClick={() => onActiveTime(el.id)} className={`canActive ${el.isSelect
                        ? 'active'
                        : ''}`} key={el.id}>
                      {el.Time}
                    </li>
                    : <li className={`${el.Status == 2
                        ? 'yiActive'
                        : ''}`} onClick={() => onActiveTime(el.id)} key={el.id}>
                      {el.Time}
                    </li>)
                })
              }
            </ul>
          </div>
          {/* <!-- 确定按钮 --> */}
          <div className="bxk_yuyue_art_submit" onClick={onSubmitDate}>
            确定
          </div>
        </div>
      </div>
    </div>)
  }
}
