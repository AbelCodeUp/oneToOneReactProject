import React, {PropTypes} from 'react';

import axios from 'axios';
import ServerUrl from '../config/server';

export default class Attention extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tchDatas: [], //保存老师数据
      sysTime: {
        date: '',
        year: ''
      }
    }
    // 获取我的关注
    this.getTeacherData();

  }

  // 通过时间获取当前时间段老师
  getTeacherData = () => {
    axios.get(ServerUrl.GetAttentionTeachers, {
      params: {
        // pageIndex: 1,
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
      tchDatas
    } = this.state;
    return (
      <div className="bxk_content">
        <ul className="bxk_lesson_teacher_box">
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
                    <div className="bxk_l_teacher_guanzhu_buttion bxk_guanzhu_active">
                        未关注
                    </div>

                  </div>
                  <div className="bxk_l_teacher_yuyue fr">
                    <a href="javascript:;">
                      预约
                    </a>
                  </div>
                </div>
              </li>)
            })

          }

        </ul>
      </div>
    );
  }
}

Attention.propTypes = {
};
