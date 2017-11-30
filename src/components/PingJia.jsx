import React from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import ServerUrl from '../config/server';

class PingJia extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      num: 1,
      xingXing: [1, 2, 3],
      xingXingIndex: -1,
      xingXingIndex2: -1,
      RecordID: ''
    }
  }

  handleClick(index) {
    let index2=String(index+1);
    this.setState({
      xingXingIndex: index2
    })
  }

  handleClick2(index) {
    this.setState({
      xingXingIndex2: index
    })
  }

  submit() {
    let state = this.state, {xingXingIndex, xingXingIndex2, value,RecordID} = state;
    this.setState({num: 2});
    axios.get(ServerUrl.SetComment, {
      params: {
        points: xingXingIndex,
        content: value,
        lessonId: RecordID,
        type: 1
      }
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  componentDidMount() {
    let ret = {};//定义数组
    location.href.substring(location.href.lastIndexOf("?") + 1).replace(/([\w\-\u4E00-\u9FA5\%]+)=([\w\-\u4E00-\u9FA5\%]+)/ig, function (a, b, c) {
      ret[b] = unescape(c);
    });
    this.setState({RecordID: Number(ret.RecordID)})
  }

  render() {
    return (
      <div>
        {this.state.num == 1 ? <div className="smy_course_box">
            <div className="smy_course_dp_title">
              <span className="smy_course_dp_title_text">教师满意度</span>
            </div>
            <div className="smy_course_dp_item">
              <div className="smy_course_dp_item_text">和老师互动非常开心</div>
              <div className="smy_course_dp_item_xing">
                {
                  this.state.xingXing.map((data, index) => (
                    <img key={index} onTouchStart={this.handleClick.bind(this, index)}
                         src={index+1 <= this.state.xingXingIndex ? "../images/smy_course_dp_xing1.png" : "../images/smy_course_dp_xing2.png"}
                         alt="" className="smy_course_dp_item_xing_img"/>))
                }
              </div>
            </div>
            <div className="smy_course_dp_title">
              <span className="smy_course_dp_title_text">本节课学习效果</span>
            </div>
            <div className="smy_course_dp_item">
              <div className="smy_course_dp_item_text">对本节学习内容印象深刻</div>
              <div className="smy_course_dp_item_xing">
                {
                  this.state.xingXing.map((data, index) => (
                    <img key={index} onTouchStart={this.handleClick2.bind(this, index)}
                         src={index <= this.state.xingXingIndex2 ? "../images/smy_course_dp_xing1.png" : "../images/smy_course_dp_xing2.png"}
                         alt="" className="smy_course_dp_item_xing_img"/>))
                }
              </div>
            </div>
            <div className="smy_course_dp_title">
              <span className="smy_course_dp_title_text">学员评语</span>
            </div>
            <div className="smy_course_dp_item2">
            <textarea className="smy_course_dp_textarea"
                      maxLength='200' onInput={(e) => {
              this.setState({value: e.target.value})
            }}
                      defaultValue={this.state.value}
                      placeholder="请输入您对本节课程和外教老师的评价（200字以内）"></textarea>
            </div>
            {this.state.xingXingIndex >= 0 && this.state.xingXingIndex2 >= 0 && this.state.value!==''?
              <button
                onTouchStart={this.submit.bind(this)}
                className="smy_course_dp_btu">
                确定
              </button>
              :
              <button className="smy_course_dp_btu smy_course_dp_btu2">
                确定
              </button>}
          </div> :
          <div className="smy_course_box">
            <div className="smy_course_dp_title">
              <span className="smy_course_dp_title_text">教师满意度</span>
            </div>
            <div className="smy_course_dp_item">
              <div className="smy_course_dp_item_text">和老师互动非常开心</div>
              <div className="smy_course_dp_item_xing">
                {
                  this.state.xingXing.map((data, index) => (
                    <img key={index}
                         src={index <= this.state.xingXingIndex ? "../images/smy_course_dp_xing1.png" : "../images/smy_course_dp_xing2.png"}
                         alt="" className="smy_course_dp_item_xing_img"/>))
                }
              </div>
            </div>
            <div className="smy_course_dp_title">
              <span className="smy_course_dp_title_text">本节课学习效果</span>
            </div>
            <div className="smy_course_dp_item">
              <div className="smy_course_dp_item_text">对本节学习内容印象深刻</div>
              <div className="smy_course_dp_item_xing">
                {
                  this.state.xingXing.map((data, index) => (
                    <img key={index}
                         src={index <= this.state.xingXingIndex2 ? "../images/smy_course_dp_xing1.png" : "../images/smy_course_dp_xing2.png"}
                         alt="" className="smy_course_dp_item_xing_img"/>))
                }
              </div>
            </div>
            <div className="smy_course_dp_title">
              <span className="smy_course_dp_title_text">学员评语</span>
            </div>
            <div className="smy_course_dp_item2">
              <div className="smy_course_dp_textarea_show">{this.state.value}
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}


export default PingJia;
