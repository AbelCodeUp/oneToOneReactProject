import React, {PropTypes} from 'react';
import axios from 'axios';
import ServerUrl from '../config/server';

import Swiper from 'swiper';
require('../common/swiper/swiper.min.css');
const timeAm = require('../images/bxk_yuyue_am.png');
const timeBm = require('../images/bxk_yuyue_bm.png');
const timeWs = require('../images/bxk_yuyue_ws.png');

export default class TeacherInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tchDatas: {},
      sysTime: {
        date: '',
        year: ''
      },
      timeDatas: this.dataArrs(), //日期
      timeArrs: { //时间数据初始化
        sw: [],
        xw: [],
        ws: []
      }, //时间
      activeDate: this.dataArrs()[0][0].time, //选择的日期
      activeTime: '', //选择的时间
      activeWeek: this.dataArrs()[0][0].weekStr, //当前选择周
      activeTimeId : 0 //当前时间ID
    }

    this.getSystemTime(); //获取服务器时间
    this.loadTchInfo(); //初始化

    this.onActiveDate = this.onActiveDate.bind(this);
    this.onActiveTime = this.onActiveTime.bind(this);
    this.onSubmitDate = this.onSubmitDate.bind(this);

    setTimeout(() => {
      // 初始化swiper
      new Swiper('.swiper-container', {
        pagination: {
          el: '.swiper-pagination'
        }
      });
    })

  }
  onSubmitDate() {
    const {activeDate, activeTime} = this.state;
    const { id } = this.props.params
    alert(activeDate)
    let oDate;
    if (activeTime == null) {
      alert('请选择日期');
      return false;
    }

    oDate = `${activeDate} ${activeTime}`;

    this.orderedTeacher( id , oDate )

  }
  // 约课
  orderedTeacher = ( tchId ,date ) => {
    let { activeDate, activeTime } = this.state;
    axios.get(ServerUrl.JoinAttendLesson, {
      params: {
        teacherId: tchId,
        LessonTime: date,
        attendLessonId: 0
      }
    })
    .then((res)=>{
      var state = res.data.result;
      let { activeTimeId } = this.state;
      if(res.data.result == 1){
        alert(res.data.msg);
      }else if(state == 3){
        alert(res.data.msg);
      }
      // id: 当前时间 ID
      this.onActiveTime(id,activeTimeId);

    })
  }
  isToDay = (date) => {
    return this.calcTime(new Date(), 8).toLocaleDateString().replace(/\//g, '-') === date;
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
        e.activeTimeId = id;
        e.isSelect = true;
        time = e.Time;
      }
      return e;
    })
    timeXW = timeArrs.xw.map((e) => {
      e.isSelect = false;
      if (e.id === id) {
        e.activeTimeId = id;
        e.isSelect = true;
        time = e.Time;
      }
      return e;
    })
    timeWS = timeArrs.ws.map((e) => {
      e.isSelect = false;
      if (e.id === id) {
        e.activeTimeId = id;
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

  }
  // 获取服务器时间
  getSystemTime = () => {
    let {sysTime} = this.state;
    axios.get(ServerUrl.GetSystemTime, {}).then((res) => {
      if (res.data.result == 1) {
        sysTime = this.formatDate(res.data.data.Time * 1000);
        this.setState({sysTime})
        this.getLessonTime(sysTime.date);
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
      year: y
    }
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
    return arrays;
  }

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
        let isFirstDate = true;
        for (let i = 0, len = serverData.length; i < len; i++) {
          var oItems = serverData[i];
          for (let j = 0, slen = oItems.length; j < slen; j++) {
            var item = oItems[j];
            if (isFirstDate && item.Status == 1) {
              item.isSelect = true;
              isFirstDate = false;
              this.setState({activeTime: item.Time,activeTimeId : item.id})
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
        // 初始化当前时间老师列表
        this.getTeacherData();
      }
    })
  }

  loadTchInfo = () =>{
    const { params } = this.props;

    axios.get(ServerUrl.GetTeacherInfo, {
      params: {
        teacherId: params.id
      }
    })
    .then((res)=>{
      if(res.data.result == 1){
        this.setState({
          tchDatas: res.data.data
        })
      }
    })
  }

  render() {
    const {
      timeDatas,
      timeArrs,
      activeDate,
      activeTime,
      activeWeek,
      tchDatas
    } = this.state;

    const {
      onActiveTime,
      onActiveDate,
      onSubmitDate,
      isToDay,
    } = this;

    return (
      <div className="bxk_container">
          <div className="bxk_teacher_info_header">
              <div className="bxk_l_teacher_imgbox fl">
                  <img src="" alt="" />
              </div>
              <div className="bxk_tch_info_msg fl">
                  <div className="bxk_tch_name">
                      {
                        tchDatas.EnglishName
                      }
                  </div>
                  <div className="bxk_tch_sex">
                      <img src="img/bxk_icon_women.png" alt="" />
                  </div>
              </div>
              {/* <!--
                  未关注 ：bxk_guanzhu_active
               --> */}
              <div className="fr bxk_l_teacher_guanzhu_buttion bxk_tch_guanzhu">
                  +关注
              </div>
          </div>
          <div className="bxk_teacher_info_content">
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
      </div>
    );
  }
}

TeacherInfo.propTypes = {
};
