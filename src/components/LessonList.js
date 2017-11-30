import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ServerUrl from '../config/server';
import {Route, Link} from 'react-router';
import '../styles/smy_course.css'

class LessonList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      LessonRecords:[],
      LessonRecords2:[],
      IsOfficial:''
    }
  }

  componentDidMount() {
    let arr = [];
    let arr2=[];
    let TotlePage = '';
    let This = this;

    axios.get(ServerUrl.IsOfficial, {
      params: {
        status: 1,
        pageIndex: 1
      }
    })
      .then(function (response) {
        This.setState({IsOfficial: response.data.data.IsOfficial});

        if(response.data.data.IsOfficial===1){
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
                    This.setState({LessonRecords2: arr2})
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

      })
      .catch(function (error) {
        console.log(error);
      });

  }

  render() {
    return (
      <div>
        <div className="smy_course_box">
          {/*<!-- 头部 -->*/}
          <div className="smy_course_head">
            <span className="smy_course_head_xian"/>
            <div className="smy_course_head_itemBox">
              <div className="smy_course_head_item">
                <div className="smy_course_head_itemlist">
                  <Link to="/lessonlist/unfinish" activeClassName="smy_course_head_cur">未完成({this.state.LessonRecords.length})</Link>
                </div>
              </div>
              <div className="smy_course_head_item">
                <div className="smy_course_head_itemlist">
                  <Link to='/lessonlist/finished' activeClassName="smy_course_head_cur">已结束({this.state.LessonRecords2.length})</Link>
                </div>
              </div>
            </div>
          </div>
          {/*<!-- 未完成列表 -->*/}
          {
            this.props.children
          }
        </div>
      </div>
    )
  }
}

export default LessonList;
