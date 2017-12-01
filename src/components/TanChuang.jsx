import React, {Component} from 'react';
import '../styles/tanChuang.css'

//约课确认
class YueKeSure extends Component {
  constructor(props) {
    super(props)
  }


  handleClick() {
    this.props.YueKeSure1()
  }

  handleClick2() {
    this.props.YueKeSure2()
  }

  handleClick3() {
    this.props.YueKeSure3()
  }

  render() {
    return (<div className="zjb_tanChuangBox">
      <div className="zjb_tanchuang">
        <div className="top">约课确认</div>
        <div className="index">
          <div className="indexImg"><img/></div>
          <div className="indexName">Ruisun</div>
          <div className="indexDate">11月18日（周二）10:00</div>
          <div className="indexSearch" onTouchStart={this.handleClick3.bind(this)}>选择重上课程>></div>
        </div>
        <div className="bottom">
          <div className="no" onTouchStart={this.handleClick2.bind(this)}>取消</div>
          <div className="yes" onTouchStart={this.handleClick.bind(this)}>确定</div>
        </div>
      </div>
    </div>)
  }
}

//约课确认之后
//1
class YueKeSureNextOne extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (<div className="zjb_tanChuangBox">
      <div className="zjb_tanchuang">
        <div className="index">
          <div className="success">恭喜您，约课成功，记得准时上课哦！</div>
        </div>
      </div>
    </div>)
  }
}

//2
class YueKeSureNextTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  handleKnow() {
    this.props.YueKeSureNextTwo();
  }

  render() {
    return (<div className="zjb_tanChuangBox">
        <div className="zjb_tanchuang">
          <div className="index">
            <div className="content">您的课时不足<br/>请购买后再约课</div>
          </div>
          <div className="bottom">
            <div className="know" onTouchStart={this.handleKnow.bind(this)}>知道了</div>
          </div>
        </div>
      </div>
    )
  }
}

//选择重上课程
class YueKeAgain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listArr: this.props.listArr,
      listArrNow: [],
      num: 1
    }
  }

  handleClick() {
    this.props.YueKeAgain1();
  }

  handleClick2() {
    this.setState({
      num: 1
    })
  }

  listClick(data) {
    this.setState({
      num: 2,
      listArrNow: data
    })
  }

  render() {
    let state = this.state, {num, listArr, data} = state;
    return (<div className="zjb_tanChuangBox">
      {
        num === 1 ?
          <div className="zjb_tanchuang">
            <div className="top">&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;
              选择重上课程&#x3000;&#x3000;&#x3000;&#x3000;<span
                onTouchStart={this.handleClick.bind(this)}>&times;</span>
            </div>
            <div className="index">
              {
                listArr.length === 0 ?
                  <div className="content">您在当前使用的教材中还没<br/>有可重上的课程</div> :
                  listArr.map((data, index) => <div className="list" key={index}
                                                    onTouchStart={this.listClick.bind(this, data)}>{data}</div>)
              }
            </div>
          </div>
          :
          <div className="zjb_tanchuang">
            <div className="top">确认重上</div>
            <div className="index">
              <div className="indexImg"><img/></div>
              <div className="indexName">Ruisun</div>
              <div className="indexDate">11月18日（周二）10:00</div>
              <div className="indexSearch">A0-L23-SC</div>
            </div>
            <div className="bottom">
              <div className="no" onTouchStart={this.handleClick2.bind(this)}>返回</div>
              <div className="yes" onTouchStart={this.handleClick.bind(this)}>确定</div>
            </div>
          </div>
      }
    </div>)
  }
}

//取消关注
class QuXiaoGuanZhu extends Component {
  constructor(props) {
    super(props);
  }

  handleClick() {
    this.props.QuXiaoGuanZhu1()
  }

  handleClick2() {
    this.props.QuXiaoGuanZhu2()
  }

  render() {
    return <div className="zjb_tanChuangBox">
      <div className="zjb_tanchuang">
        <div className="index">
          <div className="content">确认要取消关注吗？</div>
        </div>
        <div className="bottom">
          <div className="no" onTouchStart={this.handleClick2.bind(this)}>取消</div>
          <div className="yes" onTouchStart={this.handleClick.bind(this)}>确定</div>
        </div>
      </div>
    </div>
  }
}

//完善信息
class WanShanContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      phoneNum: 0,
      phoneTime: 1,
      name: '',
      nameNum: 0,
      nameTime: 1
    }
  }

  getPhone() {
    let state = this.state;
    let phone = state.phone;
    let name = state.name;
    if ((/^1[3|4|5|8][0-9]\d{4,8}$/).test(phone) && phone.length === 11 && name !== '') {
      console.log('成功')
    }
    this.props.WanShanContent2()
  }

  handleClick() {
    this.props.WanShanContent1()
  }


  render() {
    let state = this.state, {phone, phoneNum, phoneTime, name, nameNum, nameTime} = state;
    return (<div className="zjb_tanChuangBox">
      <div className="zjb_tanchuang">
        <div className="top">&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;
          完善信息&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;<span onTouchStart={this.handleClick.bind(this)}>&times;</span>
        </div>
        <div className="index">
          <div className="indexInput">
            <div className={phoneNum === 2 ? "indexInputImg2" : "indexInputImg"}>
              <div className={phoneNum === 2 ? 'phoneRed' : 'phoneGrey'}/>
            </div>
            <input type="text" defaultValue={phone} placeholder="输入您的手机号"
                   className={phoneNum === 2 ? 'input2' : 'input1'}
                   onBlur={() => {
                     if (!phone) {
                       this.setState({phoneNum: 2, phoneTime: 2});
                     } else if (phone.length < 11 || !(/^1[3|4|5|8][0-9]\d{4,8}$/.test(phone))) {
                       this.setState({phoneNum: 2, phoneTime: 2});
                     } else {
                       this.setState({phoneNum: 1, phoneTime: 2});
                     }
                   }}
                   onInput={(e) => {
                     if (phoneTime === 1) {
                       this.setState({phone: e.target.value});
                     } else {
                       if (!e.target.value) {
                         this.setState({phone: e.target.value, phoneNum: 2});
                       } else if (e.target.value.length < 11 || !(/^1[3|4|5|8][0-9]\d{4,8}$/.test(e.target.value))) {
                         this.setState({phone: e.target.value, phoneNum: 2});
                       } else {
                         this.setState({phone: e.target.value, phoneNum: 1});
                       }
                     }
                   }}/>
          </div>
          <div className="indexInput">
            <div className={nameNum === 2 ? "indexInputImg2" : "indexInputImg"}>
              <div className={nameNum === 2 ? 'nameRed' : 'nameGrey'}/>
            </div>
            <input type="text" placeholder="输入您的真实姓名" defaultValue={name}
                   className={nameNum === 2 ? 'input2' : 'input1'}
                   onBlur={() => {
                     if (!name) {
                       this.setState({nameNum: 2, nameTime: 2});
                     } else {
                       this.setState({nameTime: 2});
                     }
                   }}
                   onInput={(e) => {
                     if (nameTime === 1) {
                       this.setState({name: e.target.value});
                     } else {
                       if (!e.target.value) {
                         this.setState({name: e.target.value, nameNum: 2});
                       } else {
                         this.setState({name: e.target.value, nameNum: 1});
                       }
                     }
                   }}/>
          </div>
          <div
            className={(/^1[3|4|5|8][0-9]\d{4,8}$/).test(phone) && phone.length === 11 && name !== '' ? "indexInputBtn2" : "indexInputBtn"}
            onTouchStart={this.getPhone.bind(this)}>提交
          </div>
          <div className="indexInputWenzi">分期付款需要进行信息审核，请务必填<br/>您的真实信息！</div>
        </div>

      </div>
    </div>)
  }
}

//取消预约
class YueKeNoNext extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  handleClick() {
    this.props.YueKeNoNext1()
  }

  handleClick2() {
    this.props.YueKeNoNext2()
  }

  componentDidMount() {

  }


  render() {
    return (<div className="zjb_tanChuangBox">
      <div className="zjb_tanchuang">
        <div className="index">
          <div className="success">确认取消本次课程预约？</div>
        </div>
        <div className="bottom">
          <div className="no" onTouchStart={this.handleClick2.bind(this)}>我再想想</div>
          <div className="yes" onTouchStart={this.handleClick.bind(this)}>确定取消</div>
        </div>
      </div>
    </div>)
  }
}

//取消预约2
class YueKeNoNext2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      LessonRecords3: this.props.LessonRecords3
    }
  }

  handleClick3() {
    this.props.YueKeNoNext3()
  }

  handleClick4() {
    this.props.YueKeNoNext4()
  }

  componentDidMount() {
    console.log(this.state.LessonRecords3)
  }

  render() {
    return (
      <div className="zjb_tanChuangBox">
        <div className="zjb_tanchuang">
          <div className="top">温馨提示</div>
          {
            this.state.LessonRecords3[0].data > 4 ?
              <div className="index">
                <div className="content content2">本月您已消耗完3次机会，<br/>本次取消将扣除您1课时。</div>
              </div>
              :
              <div className="index">
                <div className="content content2">您本月有3次不扣课时的取<br/>消机会（课前24小时内）本<br/>次取消不会扣除课时。</div>
              </div>
          }
          <div className="bottom">
            <div className="no" onTouchStart={this.handleClick3.bind(this)}>我再想想</div>
            <div className="yes" onTouchStart={this.handleClick4.bind(this)}>确定取消</div>
          </div>
        </div>
      </div>
    )

  }
}

// 保存成功
class SaveSuccess extends Component {
    constructor(props) {
      super(props);
      this.state = {}
    }

    render() {
      return (<div className="zjb_tanChuangBox">
        <div className="zjb_tanchuang">
          <div className="index">
            <div className="success" style={{color:'#DC2828'}}>保存成功</div>
          </div>
        </div>
      </div>)
    }
  }


export {
  YueKeSure,
  YueKeSureNextOne,
  YueKeSureNextTwo,
  YueKeAgain,
  QuXiaoGuanZhu,
  WanShanContent,
  YueKeNoNext,
  YueKeNoNext2,
  SaveSuccess
}
