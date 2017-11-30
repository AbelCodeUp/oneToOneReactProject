import React, {PropTypes} from 'react';
import { hashHistory } from 'react-router';

import axios from 'axios';
import ServerUrl from '../config/server';

import { YueKeSureNextOne, QuXiaoGuanZhu, YueKeSureNextTwo } from './TanChuang';

export default class Attention extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tchDatas: [], //保存老师数据
      sysTime: {
        date: '',
        year: ''
      },
      teacerId : 0, //老师iD
      qxState : 0, //取消状态
      isShowGZ: 0 ,  //取消主注弹层
    }
    // 获取我的关注
    this.getTeacherData();

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

        tchDatas = tchDatas.some((el, i) => {
          return el.TeacherID === tchId;
        })
        console.log(tchDatas);
        this.setState({tchDatas});

      }
    })
  }
  // 跳转老师详情
  goTchInfo = (id) => {
    hashHistory.push(`/teacherInfo/${id}`);
  }

// 获取我的关注
  getTeacherData = (page) => {
    axios.get(ServerUrl.GetAttentionTeachers, {
      params: {
        pageIndex: 1
        // pageSize: 15
      }
    }).then((res) => {
      if (res.data.result == 1) {

        this.setState({tchDatas: res.data.data.AttentionTeachers})


      }
    })
  }

  render() {
    const {
      tchDatas,
      isShowGZ,
      teacerId
    } = this.state;
    return (
      <div>
        {/* 取消关注弹窗 */}
        {
          isShowGZ ?
          <QuXiaoGuanZhu
            QuXiaoGuanZhu1={ (id,state)=>{

              this.sendAttention( teacerId, 0);
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
        {
          tchDatas.length === 0 ?
          <div className="bxk_no_tch">
              <div className="bxk_no_tch_img">
                  <img src={ require('../images/bxk_no_guanzhu.png') } alt="" />
              </div>
              <div className="bxk_no_msg">
                  您还没有关注任何外教，赶紧去关注一下吧！
              </div>
          </div>
          :
          <ul className="bxk_lesson_teacher_box">
            {
              tchDatas.map((el) => {
                return (<li className="bxk_lesson_teacher_item" key={el.TeacherID}>
                  <div className="bxk_l_teacher_itembox">
                    <div className="bxk_l_teacher_imgbox fl" >
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
                      <div className="bxk_l_teacher_guanzhu_buttion bxk_guanzhu_active"
                          onClick={() => {
                                this.setState({
                                  isShowGZ : 1,
                                  teacerId: el.TeacherID
                                })
                              }}>
                          已关注
                      </div>

                    </div>
                    <div className="bxk_l_teacher_yuyue fr">
                      <a href="javascript:;" onClick={() => { this.goTchInfo( el.TeacherID )}}>
                        预约
                      </a>
                    </div>
                  </div>
                </li>)
              })

            }

          </ul>
        }

      </div>
    );
  }
}

Attention.propTypes = {
};
