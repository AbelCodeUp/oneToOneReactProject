import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import axios from 'axios';
import ServerUrl from '../config/server';
import '../styles/xjr_personInfo.css';
import DatePicker from 'react-mobile-datepicker';
import {SaveSuccess} from './TanChuang'

const xjr_xuanzhong = require("../images/xjr_xuanzhong.png");
const xjr_weixuanzhong = require('../images/xjr_weixuanzhong.png');

export default class PersonInfo extends React.Component {
  constructor() {
    super()
    this.state = {
      phone: '',
      Ename: 'Wyhua',
      Cname: '',
      birth: '',
      cdate: '2017-11-07',
      sex: '',
      time: new Date(),
      isOpen: false,
      provinceItems: [],
      cityItems: [],
      provinceId: '',
      cityId: '',
      //保存成功
      saveSuc: false
    }
  }
  setCity() {
    let that = this;
    let cityIdIndex = this.refs.city.selectedIndex;
    let cityId = this.refs.city.options[cityIdIndex].value;
    this.setState({cityId: cityId});
    console.log(this.state.provinceId + "-----" + this.state.cityId)
  }
  selectCity() {

    //获取市
    let that = this;
    let ProvinceIdIndex = this.refs.province.selectedIndex;
    let ProvinceId = this.refs.province.options[ProvinceIdIndex].value;
    this.setState({provinceId: ProvinceId})
    axios.get(ServerUrl.GetCityList, {
      params: {
        provinceID: ProvinceId
      }
    }).then(function(res) {
      let items = [];
      that.setState({cityItems: []})
      res.data.data.forEach(function(item, index) {
        items.push(<option value={item.CityID}>{item.CityName}</option>)
      })
      console.log(items)
      that.setState({cityItems: items})
    }).catch(function(error) {
      console.log(error);
    });
    this.refs.city.options[0].selected = true;
  }
  componentDidMount() {
    let that = this;
    axios.get(ServerUrl.GetStudentInfo).then(function(res) {
      let info = res.data.data
      that.setState({
        phone: info.Phone,
        Ename: info.EnglistName,
        Cname: info.RealName,
        sex: info.Sex,
        birth: info.Birthday,
        address: info.Address,
        provinceId: info.ProvinceID,
        cityId: info.CityID

      })
      // console.log(that.state.cityId)
      // console.log(that.state.provinceId)
    }).catch(function(error) {
      console.log(error);
    });

    setTimeout(function() { //为了异步获取省市ID
      //获取省
      axios.get(ServerUrl.GetProvinceList).then(function(res) {

        let items = [<option value='10000'>请选择</option>
          ];
        console.log(res.data.data)
        res.data.data.forEach(function(item, index) {
          if (that.state.provinceId == item.ProvinceID) {
            //   alert(1)
            items.push(<option value={item.ProvinceID} selected="selected">{item.ProvinceName}</option>)
          } else {
            items.push(<option value={item.ProvinceID}>{item.ProvinceName}</option>)
          }

        })
        console.log(items)
        that.setState({provinceItems: items})
      }).then(function() {
        //   获取初始市(异步)
        // var beginCity=this.state.provinceId
        axios.get(ServerUrl.GetCityList, {
          params: {
            provinceID: that.state.provinceId
          }
        }).then(function(res) {
          console.log(res.data.data)
          let items = [];
          that.setState({cityItems: []})
          res.data.data.forEach(function(item, index) {
            if (that.state.cityId == item.CityID) {
              items.push(<option value={item.CityID} selected='selected'>{item.CityName}</option>)
            } else {
              items.push(<option value={item.CityID}>{item.CityName}</option>)
            }

          })

          that.setState({cityItems: items})
        }).catch(function(error) {
          console.log(error);
        });
      }).catch(function(error) {
        console.log(error);
      });

    }, 0)

  }
  EnameChange(event) {
    this.setState({Ename: event.target.value})
  }
  CnameChange(event) {
    this.setState({Cname: event.target.value})
  }
  becomeGirl() {
    this.setState({sex: 0})
  }
  becomeBoy() {
    this.setState({sex: 1})

  }
  handleClick = () => {
    this.setState({isOpen: true});
  }
  handleCancel = () => {
    this.setState({isOpen: false});
  }
  handleSelect = (time) => {
    let date = time.toLocaleString().split(' ')[0].split('/')
    let xjr_y = date[0]
    let xjr_m = date[1].length == 2
      ? date[1]
      : "0" + date[1]
    let xjr_d = date[2].length == 2
      ? date[2]
      : "0" + date[2]
    let cdate = xjr_y + "-" + xjr_m + "-" + xjr_d
    this.setState({time, isOpen: false, birth: cdate});
  }
  SaveInfo() {
    // alert(this)
    var that = this;
    if (this.state.Ename == '') {
      document.getElementById('Ename').placeholder = "英文名不能为空"
      return
    }
    if (this.state.Cname == '') {
      document.getElementById('Cname').placeholder = "中文名不能为空"
      return
    }
    axios.post(ServerUrl.PostStudentInfo, {
      "EnglistName": that.state.Ename,
      "RealName": that.state.Cname,
      "Sex": that.state.sex,
      "Birthday": that.state.birth,
      "ProvinceID": that.state.provinceId,
      "CityID": that.state.cityId
    }).then(function(res) {
      that.setState({saveSuc: true})
      setTimeout(function() {
        that.setState({saveSuc: false})
      }, 1000)
    }).catch(function(error) {
      console.log(error);
    });
  }
  render() {
    return (<div>
      <div className="xjr_personInfo">
        <div className="xjr_info_box1 xjr_info_tel xjr_info_tel1">
          <p className="xjr_tel_name">手机号</p>
          <p className="xjr_tel_val">{this.state.phone}</p>
        </div>
        <div className="xjr_info_detail">
          <div className="xjr_info_box xjr_info_Ename">
            <p className="xjr_tel_name">英文名</p>
            <p className="xjr_tel_val"><input type="text" value={this.state.Ename} onChange={this.EnameChange.bind(this)} id="Ename"/></p>
          </div>
          <div className="xjr_info_box xjr_info_Cname">
            <p className="xjr_tel_name">中文名</p>
            <p className="xjr_tel_val"><input type="text" value={this.state.Cname} onChange={this.CnameChange.bind(this)} id="Cname"/></p>
          </div>
          <div className="xjr_info_box xjr_info_birth">
            <p className="xjr_tel_name">生日</p>
            <div className="xjr_tel_val">
              <div className="App">
                <a className="select-btn " onClick={this.handleClick}>
                  {this.state.birth}
                </a>

                <DatePicker value={this.state.time} isOpen={this.state.isOpen} onSelect={this.handleSelect} onCancel={this.handleCancel}/>
              </div>
            </div>
          </div>
          <div className="xjr_info_box xjr_info_sex">
            <p className="xjr_tel_name">性别</p>
            {
              this.state.sex == 1
                ? <div className="xjr_sex_box">
                    <div className="xjr_radios" onClick={this.becomeBoy.bind(this)}>
                      <img className="xjr_radios_img" src={xjr_xuanzhong} alt=""/>男孩
                    </div>
                    <div className="xjr_radios" onClick={this.becomeGirl.bind(this)}>
                      <img className="xjr_radios_img" src={xjr_weixuanzhong} alt=""/>女孩
                    </div>
                  </div>
                : <div className="xjr_sex_box">
                    <div className="xjr_radios" onClick={this.becomeBoy.bind(this)}>
                      <img className="xjr_radios_img" src={xjr_weixuanzhong} alt=""/>男孩
                    </div>
                    <div className="xjr_radios" onClick={this.becomeGirl.bind(this)}>
                      <img className="xjr_radios_img" src={xjr_xuanzhong} alt=""/>女孩
                    </div>
                  </div>
            }

          </div>
          <div className="xjr_info_box xjr_info_add">
            <p className="xjr_tel_name">所在地</p>
            <p className="xjr_tel_val">
              <select ref="province" onChange={this.selectCity.bind(this)}>
                {this.state.provinceItems}
              </select>
              <span>&nbsp;&nbsp;</span>
              <select ref="city" onChange={this.setCity.bind(this)}>
                <option>请选择</option>
                {this.state.cityItems}
              </select>
            </p>
          </div>
        </div>
        <div className="xjr_save" onClick={this.SaveInfo.bind(this)}>保存</div>
      </div>
      {this.state.saveSuc?<SaveSuccess/>:'' }
    </div>)
  }
}
