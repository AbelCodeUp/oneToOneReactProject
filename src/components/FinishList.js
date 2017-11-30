import React from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import ServerUrl from '../config/server';

class FinishList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num: this.props.num
    }
  }

  componentDidMount(){
    axios.get(ServerUrl.GetLessonRecords,{
      params: {
        status: 1,
        pageIndex: 0
      }
    })
      .then(function (response) {
        alert(1);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>

        {
          this.state.num === 1 ?
            <div className="smy_course_unfinish_list_box">

              <div className="smy_course_unfinish_list_item">
                <div className="smy_course_unfinish_list_item_time">今日（周二）21：00</div>
                <div className="smy_course_unfinish_list_item_middle">
                  <div className="smy_course_unfinish_list_item_teacherImg">
                    <img src="../images/smy_course_uf_teacherImage.png"/>
                  </div>
                  <div className="smy_course_unfinish_list_item_imgRight">
                    <div className="smy_course_unfinish_list_item_courseTitle"><span
                      className="smy_course_unfinish_list_item_courseTitleRel">Get Ready 2 Get Ready </span><span
                      className="smy_course_unfinish_tiyan">体验课</span></div>
                    {/*<!-- 关注状态 -->*/}
                    <div className="smy_course_unfinish_list_item_imgRightBot">
                      <div className="smy_course_unfinish_list_item_teacherName">ruisun</div>
                      <div className="smy_course_unfinish_list_item_follow"><img
                        src="../images/smy_course_uf_follow1.png"/>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="smy_course_unfinish_list_item_button_hui">取消预约</button>
                {/*<!-- 正在上课 -->*/}
                <div className="smy_course_unfinish_list_item_state"><span>正在上课</span><img
                  src="../images/smy_course_uf_state1.png"/>
                </div>
              </div>

              <div className="smy_course_unfinish_list_item">
                <div className="smy_course_unfinish_list_item_time">明日（周三）12：00</div>
                <div className="smy_course_unfinish_list_item_middle">
                  <div className="smy_course_unfinish_list_item_teacherImg">
                    <img src="../images/smy_course_uf_teacherImage.png"/>
                  </div>
                  <div className="smy_course_unfinish_list_item_imgRight">
                    <div className="smy_course_unfinish_list_item_courseTitle"><span
                      className="smy_course_unfinish_list_item_courseTitleRel">Get Ready 2 Get Ready </span></div>
                    {/*<!-- 关注状态 -->*/}
                    <div className="smy_course_unfinish_list_item_imgRightBot">
                      <div className="smy_course_unfinish_list_item_teacherName">ruisun</div>
                      <div className="smy_course_unfinish_list_item_follow"><img
                        src="../images/smy_course_uf_follow2.png"/>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="smy_course_unfinish_list_item_button_hong">取消预约</button>
                {/*<!-- 即将开课 -->*/}
                <div className="smy_course_unfinish_list_item_state2"><span>即将开课</span><img
                  src="../images/smy_course_uf_state2.png"/>
                </div>

              </div>

              <div className="smy_course_unfinish_list_item">
                <div className="smy_course_unfinish_list_item_time">9月23日（周四）20：30</div>
                <div className="smy_course_unfinish_list_item_middle">
                  <div className="smy_course_unfinish_list_item_teacherImg">
                    <img src="../images/smy_course_uf_teacherImage.png"/>
                  </div>
                  <div className="smy_course_unfinish_list_item_imgRight">
                    <div className="smy_course_unfinish_list_item_courseTitle"><span
                      className="smy_course_unfinish_list_item_courseTitleRel">Get Ready 2 Get Ready </span></div>
                    {/*<!-- 关注状态 -->*/}
                    <div className="smy_course_unfinish_list_item_imgRightBot">
                      <div className="smy_course_unfinish_list_item_teacherName">ruisun</div>
                      <div className="smy_course_unfinish_list_item_follow"><img
                        src="../images/smy_course_uf_follow1.png"/>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="smy_course_unfinish_list_item_button_hong">取消预约</button>
              </div>

            </div>
            :
            <div className="smy_course_finished_list_box">

              <div className="smy_course_finished_list_item">
                <div className="smy_course_finished_list_item_time">昨日（周一）09：00</div>
                <div className="smy_course_finished_list_item_middle">
                  <div className="smy_course_finished_list_item_teacherImg">
                    <img src="../images/smy_course_uf_teacherImage.png"/>
                  </div>
                  <div className="smy_course_finished_list_item_imgRight">
                    <div className="smy_course_finished_list_item_courseTitle"><span
                      className="smy_course_finished_list_item_courseTitleRel">Get Ready 2 Get Ready </span><span
                      className="smy_course_finished_tiyan">体验课</span></div>
                    {/*<!-- 关注状态 -->*/}
                    <div className="smy_course_finished_list_item_imgRightBot">
                      <div className="smy_course_finished_list_item_teacherName">ruisun</div>
                      <div className="smy_course_finished_list_item_follow"><img
                        src="../images/smy_course_uf_follow1.png"/></div>
                    </div>
                  </div>
                </div>
                <div className="smy_course_finished_list_item_bottom">
                  <div className="smy_course_finished_list_item_bottom_text">外交点评</div>
                  <div className="smy_course_finished_list_item_xing">
                    <img src="../images/smy_course_dp_xing1.png" alt=""
                         className="smy_course_finished_list_item_xing_img"/>
                    <img src="../images/smy_course_dp_xing1.png" alt=""
                         className="smy_course_finished_list_item_xing_img"/>
                    <img src="../images/smy_course_dp_xing1.png" alt=""
                         className="smy_course_finished_list_item_xing_img"/>
                    <img src="../images/smy_course_dp_xing2.png" alt=""
                         className="smy_course_finished_list_item_xing_img"/>
                    <img src="../images/smy_course_dp_xing2.png" alt=""
                         className="smy_course_finished_list_item_xing_img"/>
                  </div>
                  <div className="smy_course_finished_list_item_trophy"><img src="../images/smy_course_fini_bei.png"
                                                                             alt=""
                                                                             className="smy_course_finished_list_item_trophyImg"/><span
                    className="smy_course_finished_list_item_trophyText">×3</span></div>
                  <button className="smy_course_finished_list_item_btu_hong">
                    <Link to='/pingjia'>待评价</Link>
                  </button>
                </div>
                {/*<!-- 外教缺席 -->*/}
                <div className="smy_course_finished_list_item_state"><span>外教缺席</span></div>
              </div>

              <div className="smy_course_finished_list_item">
                <div className="smy_course_finished_list_item_time">9月20日（周日）18：00</div>
                <div className="smy_course_finished_list_item_middle">
                  <div className="smy_course_finished_list_item_teacherImg">
                    <img src="../images/smy_course_uf_teacherImage.png"/>
                  </div>
                  <div className="smy_course_finished_list_item_imgRight">
                    <div className="smy_course_finished_list_item_courseTitle"><span
                      className="smy_course_finished_list_item_courseTitleRel">Get Ready 2 Get Ready </span></div>
                    {/*<!-- 关注状态 -->*/}
                    <div className="smy_course_finished_list_item_imgRightBot">
                      <div className="smy_course_finished_list_item_teacherName">ruisun</div>
                      <div className="smy_course_finished_list_item_follow"><img
                        src="../images/smy_course_uf_follow1.png"/></div>
                    </div>
                  </div>
                </div>
                <div className="smy_course_finished_list_item_bottom">
                  <div className="smy_course_finished_list_item_bottom_text">外交点评</div>
                  <div className="smy_course_finished_list_item_xing">
                    <img src="../images/smy_course_dp_xing1.png" alt=""
                         className="smy_course_finished_list_item_xing_img"/>
                    <img src="../images/smy_course_dp_xing1.png" alt=""
                         className="smy_course_finished_list_item_xing_img"/>
                    <img src="../images/smy_course_dp_xing1.png" alt=""
                         className="smy_course_finished_list_item_xing_img"/>
                    <img src="../images/smy_course_dp_xing2.png" alt=""
                         className="smy_course_finished_list_item_xing_img"/>
                    <img src="../images/smy_course_dp_xing2.png" alt=""
                         className="smy_course_finished_list_item_xing_img"/>
                  </div>
                  <div className="smy_course_finished_list_item_trophy"><img src="../images/smy_course_fini_bei.png"
                                                                             alt=""
                                                                             className="smy_course_finished_list_item_trophyImg"/><span
                    className="smy_course_finished_list_item_trophyText">×0</span></div>
                  <button className="smy_course_finished_list_item_btu_hui">已评价</button>
                </div>
                {/*<!-- 迟到 -->*/}
                <div className="smy_course_finished_list_item_state"><span>迟到12min</span></div>
              </div>

              <div className="smy_course_finished_list_item">
                <div className="smy_course_finished_list_item_time">9月20日（周日）18：00</div>
                <div className="smy_course_finished_list_item_middle">
                  <div className="smy_course_finished_list_item_teacherImg">
                    <img src="../images/smy_course_uf_teacherImage.png"/>
                  </div>
                  <div className="smy_course_finished_list_item_imgRight">
                    <div className="smy_course_finished_list_item_courseTitle"><span
                      className="smy_course_finished_list_item_courseTitleRel">Get Ready 2 Get Ready </span></div>
                    {/*<!-- 关注状态 -->*/}
                    <div className="smy_course_finished_list_item_imgRightBot">
                      <div className="smy_course_finished_list_item_teacherName">ruisun</div>
                      <div className="smy_course_finished_list_item_follow"><img
                        src="../images/smy_course_uf_follow1.png"/></div>
                    </div>
                  </div>
                </div>
                <div className="smy_course_finished_list_item_bottom">
                  <div className="smy_course_finished_list_item_bottom_text">外交点评</div>
                  <div className="smy_course_finished_list_item_xing">
                    <img src="../images/smy_course_dp_xing1.png" alt=""
                         className="smy_course_finished_list_item_xing_img"/>
                    <img src="../images/smy_course_dp_xing1.png" alt=""
                         className="smy_course_finished_list_item_xing_img"/>
                    <img src="../images/smy_course_dp_xing1.png" alt=""
                         className="smy_course_finished_list_item_xing_img"/>
                    <img src="../images/smy_course_dp_xing2.png" alt=""
                         className="smy_course_finished_list_item_xing_img"/>
                    <img src="../images/smy_course_dp_xing2.png" alt=""
                         className="smy_course_finished_list_item_xing_img"/>
                  </div>
                  <div className="smy_course_finished_list_item_trophy"><img src="../images/smy_course_fini_bei.png"
                                                                             alt=""
                                                                             className="smy_course_finished_list_item_trophyImg"/><span
                    className="smy_course_finished_list_item_trophyText">×23</span></div>
                  <button className="smy_course_finished_list_item_btu_hong">待评价</button>
                </div>
              </div>

            </div>
        }

      </div>
    )
  }
}

export default FinishList;
