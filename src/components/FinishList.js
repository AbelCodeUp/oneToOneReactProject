import React from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import ServerUrl from '../config/server';
import {YueKe, WanShanContent, QuXiaoGuanZhu} from './TanChuang';
import {YueKeNoNext, YueKeNoNext2} from './TanChuang'

class FinishList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num: this.props.num,
      LessonRecords: [],
      LessonRecords2: [],
      LessonRecords3: [],
      time: 1,
      xXing: [1, 2, 3, 4, 5],
      index: -1,
      LessonState: '',
      AttendLessonID: '',
      IsOfficial: '',
      nowState: false

    }
  }

  LessonStateFn(LessonTime) {
    let lessonTime = new Date(LessonTime);
    let nowTime = new Date();
    let LessonState = (lessonTime - nowTime) / 60000;
    return LessonState
  }

  componentDidMount() {

    let TotlePage = '';
    let This = this;
    let arr = [];
    let arr2 = [];

    //是否正式学员
    axios.get(ServerUrl.IsOfficial, {
      params: {
        status: 1,
        pageIndex: 1
      }
    })
      .then(function (response) {
        This.setState({IsOfficial: response.data.data.IsOfficial});
      })
      .catch(function (error) {
        console.log(error);
      });

    //获取已经预约的数据
    //未完成
    axios.get(ServerUrl.GetLessonRecords, {
      params: {
        status: 1,
        pageIndex: 1
      }
    })
      .then(function (response) {
        TotlePage = response.data.data.TotlePage;
        for (let i = 0; i < TotlePage; i++) {


          axios.get(ServerUrl.GetLessonRecords, {
            params: {
              status: 1,
              pageIndex: i + 1
            }
          })
            .then(function (response) {
              for (let j = 0; j < 10; j++) {
                if (response.data.data.LessonRecords[j] === undefined) {

                } else {
                  response.data.data.LessonRecords[j].LessonState = This.LessonStateFn(response.data.data.LessonRecords[j].LessonTime);
                  arr.push(response.data.data.LessonRecords[j])
                }
              }
              This.setState({LessonRecords: arr})
            })
            .catch(function (error) {
              console.log(error);
            });


        }
      })
      .catch(function (error) {
        console.log(error);
      });

    //已完成
    axios.get(ServerUrl.GetLessonRecords, {
      params: {
        status: 2,
        pageIndex: 1
      }
    })
      .then(function (response) {
        TotlePage = response.data.data.TotlePage;
        for (let i = 0; i < TotlePage; i++) {


          axios.get(ServerUrl.GetLessonRecords, {
            params: {
              status: 2,
              pageIndex: i + 1
            }
          })
            .then(function (response) {
              for (let j = 0; j < 10; j++) {
                if (response.data.data.LessonRecords[j] === undefined) {

                } else {
                  arr2.push(response.data.data.LessonRecords[j])
                }
              }
              This.setState({LessonRecords2: arr2, nowState: true})
            })
            .catch(function (error) {
              console.log(error);
            });


        }
      })
      .catch(function (error) {
        console.log(error);
      });


  }

  quXiaoYuYue(index, LessonState, AttendLessonID) {
    this.setState({time: 2, index: index, LessonState: LessonState, AttendLessonID: AttendLessonID})
  }

  YueKeNoNext1(LessonState, AttendLessonID) {
    let This = this;
    let arr = [];
    if (LessonState < 1440) {
      axios.get(ServerUrl.CancelLessonCount)
        .then(function (response) {
          arr.push(response.data);
          This.setState({time: 3, LessonRecords3: arr})
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      axios.get(ServerUrl.CancelAttendLesson, {
        params: {
          attendLessonId: AttendLessonID
        }
      })
        .then(function (response) {

        })
        .catch(function (error) {
          console.log(error);
        });
      history.go(0)
    }
  }

  YueKeNoNext2() {
    this.setState({time: 1})
  }

  YueKeNoNext4(AttendLessonID) {
    axios.get(ServerUrl.CancelAttendLesson, {
      params: {
        attendLessonId: AttendLessonID
      }
    })
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error);
      });
    history.go(0)
  }

  guanZhu(teacherId,AttentionStatus,index){
    let arr1=this.state.LessonRecords;
    let arr2=this.state.LessonRecords2;
    if(AttentionStatus===1){
      AttentionStatus=0;
      arr1[index].AttentionStatus=AttentionStatus;
      arr2[index].AttentionStatus=AttentionStatus;

    }else{
      AttentionStatus=1;
      arr1[index].AttentionStatus=AttentionStatus;
      arr2[index].AttentionStatus=AttentionStatus;

    }
    let This=this;
    axios.get(ServerUrl.AttentionTeacher, {
      params: {
        teacherId:teacherId,
        status:AttentionStatus
      }
    })
      .then(function (response) {
        console.log(response);
        This.setState({LessonRecords:arr1,LessonRecords2:arr2});
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    let state = this.state, {num, LessonRecords, LessonRecords2, IsOfficial, nowState} = state;
    return (
      <div>
        {IsOfficial === 0 ?
          <div className="smy_course_unfinish_list_box">
            <div className="smy_course_unfinish_none">
              <img className="smy_course_unfinish_none_img" src="../images/smy_course_uf_unpaid.png"/>
              <p className="smy_course_unfinish_none_text">您还没有购买任何课程套餐，马上订购吧！</p>
            </div>
          </div>
          :
          num === 1 ?
            <div>
              {LessonRecords.length === 0 && nowState === true ?

                <div className="smy_course_unfinish_none">
                  <img className="smy_course_unfinish_none_img" src="../images/smy_course_uf_unorder.png"/>
                  <p className="smy_course_unfinish_none_text">您还没有预约课程，快去预约一节吧！</p>
                </div>

                :
                LessonRecords.map((data, index) =>
                  (
                    <div className="smy_course_unfinish_list_box">
                      <div key={index} className="smy_course_unfinish_list_item">
                        <div className="smy_course_unfinish_list_item_time">{data.LessonTime}</div>
                        <div className="smy_course_unfinish_list_item_middle">
                          <div className="smy_course_unfinish_list_item_teacherImg">
                            {/*data.BookName.HeaderImage*/}
                            <img src="../images/smy_course_uf_teacherImage.png"/>
                          </div>
                          <div className="smy_course_unfinish_list_item_imgRight">
                            <div className="smy_course_unfinish_list_item_courseTitle"><span
                              className="smy_course_unfinish_list_item_courseTitleRel">{data.BookName}&#x3000;{data.LessonType}</span><span
                              className="smy_course_unfinish_tiyan">{/*data.LessonType*/}</span></div>
                            {/*<!-- 关注状态 -->*/}
                            <div className="smy_course_unfinish_list_item_imgRightBot">
                              <div
                                className="smy_course_unfinish_list_item_teacherName">{data.EnglishName}&#x3000;</div>
                              <div className="smy_course_unfinish_list_item_follow"><img
                                onTouchStart={this.guanZhu.bind(this,data.TeacherID,data.AttentionStatus,index)}
                                ref="guanzhuImg" src={
                                data.AttentionStatus == 1 ? "../images/smy_course_uf_follow2.png" : "../images/smy_course_uf_follow1.png"
                              }/>
                              </div>
                            </div>
                          </div>
                        </div>
                        {
                          data.Status == 1 ?
                            <button className="smy_course_unfinish_list_item_button_hong"
                                    onClick={this.quXiaoYuYue.bind(this, index, data.LessonState, data.AttendLessonID)}>
                              取消预约</button> :
                            <button className="smy_course_unfinish_list_item_button_hui">取消预约</button>
                        }


                        {/*<!-- 正在上课 -->*/}
                        {data.LessonState < 10 ? data.LessonState < 0 && data.LessonState < (-30) ?
                          <div className="smy_course_unfinish_list_item_state"><span>正在上课</span><img
                            src="../images/smy_course_uf_state1.png"/>
                          </div>
                          :
                          <div className="smy_course_unfinish_list_item_state2"><span>即将开课</span><img
                            src="../images/smy_course_uf_state2.png"/>
                          </div>
                          : null}

                      </div>
                    </div>
                  )
                )
              }
              {
                this.state.time === 2 ?
                  <YueKeNoNext
                    YueKeNoNext1={this.YueKeNoNext1.bind(this, this.state.LessonState, this.state.AttendLessonID)}
                    YueKeNoNext2={this.YueKeNoNext2.bind(this)}/>
                  : this.state.time === 3 ?
                  <YueKeNoNext2 LessonRecords3={this.state.LessonRecords3}
                                YueKeNoNext3={this.YueKeNoNext2.bind(this)}
                                YueKeNoNext4={this.YueKeNoNext4.bind(this, this.state.AttendLessonID)}/>
                  : null
              }
            </div>
            :
            <div className="smy_course_finished_list_box">
              {LessonRecords2.length === 0 && nowState === true ?
                <div className="smy_course_unfinish_none">
                  <img className="smy_course_unfinish_none_img" src="../images/smy_course_uf_unorder.png"/>
                  <p className="smy_course_unfinish_none_text">您还没有结束的课程，马上去上课吧！</p>
                </div>
                :
                LessonRecords2.map((data, index) =>
                  (
                    <div key={index} className="smy_course_finished_list_item">
                      <div className="smy_course_finished_list_item_time">{data.LessonTime}</div>
                      <div className="smy_course_finished_list_item_middle">
                        <div className="smy_course_finished_list_item_teacherImg">
                          {/*data.BookName.HeaderImage*/}
                          <img src="../images/smy_course_uf_teacherImage.png"/>
                        </div>
                        <div className="smy_course_finished_list_item_imgRight">
                          <div className="smy_course_finished_list_item_courseTitle"><span
                            className="smy_course_finished_list_item_courseTitleRel">{data.BookName}&#x3000;{data.LessonType}</span><span
                            className="smy_course_finished_tiyan">{/*data.LessonType*/}</span></div>
                          {/*<!-- 关注状态 -->*/}
                          <div className="smy_course_finished_list_item_imgRightBot">
                            <div className="smy_course_finished_list_item_teacherName">{data.EnglishName}&#x3000;</div>
                            <div className="smy_course_finished_list_item_follow"><img
                              onTouchStart={this.guanZhu.bind(this,data.TeacherID,data.AttentionStatus,index)}
                              src={data.AttentionStatus == 1 ? "../images/smy_course_uf_follow2.png" : "../images/smy_course_uf_follow1.png"}/>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="smy_course_finished_list_item_bottom">
                        <div className="smy_course_finished_list_item_bottom_text">外交点评</div>
                        <div className="smy_course_finished_list_item_xing">
                          {this.state.xXing.map((data2, index) => (
                            <img key={index}
                                 src={index < (data.TCommentPoint - 1) ? "../images/smy_course_dp_xing1.png" : "../images/smy_course_dp_xing2.png"}
                                 alt=""
                                 className="smy_course_finished_list_item_xing_img"/>

                          ))}
                        </div>
                        <div className="smy_course_finished_list_item_trophy"><img
                          src="../images/smy_course_fini_bei.png"
                          alt=""
                          className="smy_course_finished_list_item_trophyImg"/><span
                          className="smy_course_finished_list_item_trophyText">×{data.Gift}</span></div>
                        {data.IsComment === 0 ?
                          <Link to={{pathname: '/pingjia', query: {RecordID: data.RecordID}}}
                                className="smy_course_finished_list_item_btu_hong">待评价</Link> :
                          <button className="smy_course_finished_list_item_btu_hui">已评价</button>}
                      </div>
                      {/*<!-- 外教缺席 -->*/}
                      <div className="smy_course_finished_list_item_state"><span>{data.WorkAttendance}</span></div>
                    </div>
                  )
                )
              }
            </div>


        }


      </div>
    )
  }
}

export default FinishList;
