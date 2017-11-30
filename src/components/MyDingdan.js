import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import axios from 'axios';
import ServerUrl from '../config/server';
import '../styles/xjr_fqwc.css';



export default class MyDingdan extends React.Component {
    constructor() {
        super()
        this.state = {
            data:[],
            num:0
            
        }
    }
    
    componentDidMount() {
        var that=this;
        let orderBox=[] 
        axios.get(ServerUrl.GetOrders,{
            params: {
                pageIndex: '1'
            }
        })
        .then(function (res) {
            var info=res.data.data
            that.setState({
                num:info.TotalRecord,
                data:info.Orders
            })
          })
          .catch(function (error) {
            console.log(error);
          });
       
        
    }

    render() {
        // console.log(this.state.data)
        let orderBox=[]
        let DATA=this.state.data
        let that=this
        DATA.forEach(function(item,index){
            if(item.BillStatus==0&&item.PaymentType==1){//全款未付款
                orderBox.push(
                    <div className="xjr_box">
                        <div className="xjr_mine_main">
                            <div className="xjr_main_box">
                                <div className="xjr_main_left">
                                    <div className="xjr_mine_ddbh"> <div className="xjr_mine_gang"></div>订单编号：{item.Billno}</div>
                                    <p className="xjr_mine_spmc">商品名称：{item.ProductName}</p>
                                </div>
                                <p className="xjr_main_right xjr_mine_fenqi xjr_mine_daifk">待付款</p>
                            </div>
                            <div className="xjr_main_box xjr_main_box1">
                                <p className="xjr_main_left xjr_mine_keshi">
                                    课时：{item.LessonHour}课时
                                </p>
                                <p className="xjr_main_right  xjr_mine_yxq">
                                    有效期：360天
                                </p>
                            </div>
                            <p className="xjr_main_box2 xjr_main_box21">订单金额：¥ {item.ParPrice}</p>
                            <a href="#" className="xjr_main_qfq xjr_main_ljfk">
                                立即付款
                            </a>   
                        </div>
                    </div>
                )
            }
            if(item.BillStatus==1&&item.PaymentType==1){//全款已付款
                orderBox.push(
                    <div className="xjr_box">
                        <div className="xjr_mine_main">
                            <div className="xjr_main_box">
                                <div className="xjr_main_left">
                                    <div className="xjr_mine_ddbh"> <div className="xjr_mine_gang"></div>订单编号：{item.Billno}</div>
                                    <p className="xjr_mine_spmc">商品名称：{item.ProductName}</p>
                                </div>
                                <p className="xjr_main_right xjr_mine_fenqi">已付款</p>
                            </div>
                            <div className="xjr_main_box xjr_main_box1">
                                <p className="xjr_main_left xjr_mine_keshi">
                                    课时：{item.LessonHour}课时
                                </p>
                                <p className="xjr_main_right  xjr_mine_yxq">
                                    有效期：360天
                                </p>
                            </div>
                            <div className="xjr_main_box xjr_main_box5 xjr_main_box51">
                                <p className="xjr_main_box2 xjr_main_box21">订单金额：¥ {item.ParPrice}</p>
                                <p className="xjr_main_fksj">付款时间：{item.ExpiredTime.split(' ')[0]}</p>
                            </div>  
                        </div>
                    </div>
                )
            }
            if(item.BillStatus==0&&item.PaymentType==2){//分期未付款
                orderBox.push(
                    <div className="xjr_box">
                        <div className="xjr_mine_main">
                            <div className="xjr_main_box">
                                <div className="xjr_main_left">
                                    <div className="xjr_mine_ddbh"> <div className="xjr_mine_gang"></div>订单编号：{item.Billno}</div>
                                    <p className="xjr_mine_spmc">商品名称：{item.ProductName}</p>
                                </div>
                                <p className="xjr_main_right xjr_mine_fenqi xjr_mine_dzf">分期付款<br/>待支付</p>
                            </div>
                            <div className="xjr_main_box xjr_main_box1">
                                <p className="xjr_main_left xjr_mine_keshi">
                                    课时：{item.LessonHour}课时
                                </p>
                                <p className="xjr_main_right  xjr_mine_yxq">
                                    有效期：360天
                                </p>
                            </div>
                            <p className="xjr_main_box2">订单金额：¥ {item.ParPrice}</p>
                            <div className="xjr_main_box xjr_main_box3">
                                <p className="xjr_mine_sf">
                                    首付金额：￥{item.HirePurchase.FirstPrice}
                                </p>
                                <p className="xjr_mine_sfsj">
                                    首付款时间：待支付
                                </p>
                            </div>
                            <div className="xjr_main_box xjr_main_box5">
                                <p className="xjr_mine_fqzy xjr_mine_fqzy1">
                                    注：分期付款，需要先支付订单金额10%的首付款
                                </p>
                                <a href="#" className="xjr_main_qfsf">
                                    去付首付
                                </a>
                            </div>  
                        </div>  
                    </div>
                )
            }
            if(item.BillStatus==1&&item.PaymentType==2){//分期付款完成
                orderBox.push(
                    <div className="xjr_box">
                        <div className="xjr_mine_main">
                            <div className="xjr_main_box">
                                <div className="xjr_main_left">
                                    <div className="xjr_mine_ddbh"> <div className="xjr_mine_gang"></div>订单编号：{item.Billno}</div>
                                    <p className="xjr_mine_spmc">商品名称：{item.ProductName}</p>
                                </div>
                                <p className="xjr_main_right xjr_mine_fenqi">分期付款<br/>已完成</p>
                            </div>
                            <div className="xjr_main_box xjr_main_box1">
                                <p className="xjr_main_left xjr_mine_keshi">
                                    课时：{item.LessonHour}课时
                                </p>
                                <p className="xjr_main_right  xjr_mine_yxq">
                                    有效期：360天
                                </p>
                            </div>
                            <p className="xjr_main_box2">订单金额：¥ {item.ParPrice}</p>
                            <div className="xjr_main_box xjr_main_box3">
                                <p className="xjr_mine_sf">
                                    首付金额：￥{item.HirePurchase.FirstPrice}
                                </p>
                                <p className="xjr_mine_sfsj">
                                    首付款时间：{item.HirePurchase.FirstCreateTime.split(' ')[0]}
                                </p>
                            </div>
                            <div className="xjr_main_box xjr_main_box3">
                                <p className="xjr_mine_sf">
                                    分期付款金额：￥{item.HirePurchase.HirePrice}
                                </p>
                                <p className="xjr_mine_sfsj">
                                    分期付款时间：{item.HirePurchase.HireCreateTime.split(' ')[0]}
                                </p>
                            </div>
                            <p className="xjr_main_box4 xjr_main_box42">首付支付方式：{item.HirePurchase.FirstPayType}</p>
                            <p className="xjr_main_box4 xjr_main_box41">分期付款支付方式：{item.HirePurchase.HirePayType}</p> 
                        </div>
                    </div>
                )
            }
        })

        
        return (
            <div>
                 {orderBox}
                {/* <!-- 待付款 --> */}
                {/* <div className="xjr_box">
                    <div className="xjr_mine_main">
                        <div className="xjr_main_box">
                            <div className="xjr_main_left">
                                <div className="xjr_mine_ddbh"> <div className="xjr_mine_gang"></div>订单编号：17061312357</div>
                                <p className="xjr_mine_spmc">商品名称：外教口语课4课时</p>
                            </div>
                            <p className="xjr_main_right xjr_mine_fenqi xjr_mine_daifk">待付款</p>
                        </div>
                        <div className="xjr_main_box xjr_main_box1">
                            <p className="xjr_main_left xjr_mine_keshi">
                                课时：300课时
                            </p>
                            <p className="xjr_main_right  xjr_mine_yxq">
                                有效期：360天
                            </p>
                        </div>
                        <p className="xjr_main_box2 xjr_main_box21">订单金额：¥ 900</p>
                        <a href="#" className="xjr_main_qfq xjr_main_ljfk">
                            立即付款
                        </a>   
                    </div>
                </div> */}
               
                {/* <!-- 已付款 --> */}
                {/* <div className="xjr_box">
                    <div className="xjr_mine_main">
                        <div className="xjr_main_box">
                            <div className="xjr_main_left">
                                <div className="xjr_mine_ddbh"> <div className="xjr_mine_gang"></div>订单编号：17061312357</div>
                                <p className="xjr_mine_spmc">商品名称：外教口语课4课时</p>
                            </div>
                            <p className="xjr_main_right xjr_mine_fenqi">已付款</p>
                        </div>
                        <div className="xjr_main_box xjr_main_box1">
                            <p className="xjr_main_left xjr_mine_keshi">
                                课时：300课时
                            </p>
                            <p className="xjr_main_right  xjr_mine_yxq">
                                有效期：360天
                            </p>
                        </div>
                        <div className="xjr_main_box xjr_main_box5 xjr_main_box51">
                            <p className="xjr_main_box2 xjr_main_box21">订单金额：¥ 900</p>
                            <p className="xjr_main_fksj">付款时间：2017-09-12 12:30</p>
                        </div>  
                    </div>
                </div> */}
            {/* <!-- 分期付款完成 --> */}
                {/* <div className="xjr_box">
                    <div className="xjr_mine_main">
                        <div className="xjr_main_box">
                            <div className="xjr_main_left">
                                <div className="xjr_mine_ddbh"> <div className="xjr_mine_gang"></div>订单编号：17061312357</div>
                                <p className="xjr_mine_spmc">商品名称：外教口语课4课时</p>
                            </div>
                            <p className="xjr_main_right xjr_mine_fenqi">分期付款<br/>已完成</p>
                        </div>
                        <div className="xjr_main_box xjr_main_box1">
                            <p className="xjr_main_left xjr_mine_keshi">
                                课时：300课时
                            </p>
                            <p className="xjr_main_right  xjr_mine_yxq">
                                有效期：360天
                            </p>
                        </div>
                        <p className="xjr_main_box2">订单金额：¥ 900</p>
                        <div className="xjr_main_box xjr_main_box3">
                            <p className="xjr_mine_sf">
                                首付金额：￥300
                            </p>
                            <p className="xjr_mine_sfsj">
                                首付款时间：2017-09-12 
                            </p>
                        </div>
                        <div className="xjr_main_box xjr_main_box3">
                            <p className="xjr_mine_sf">
                                分期付款金额：￥600
                            </p>
                            <p className="xjr_mine_sfsj">
                                分期付款时间：2017-11-12 
                            </p>
                        </div>
                        <p className="xjr_main_box4 xjr_main_box42">首付支付方式：支付宝</p>
                        <p className="xjr_main_box4 xjr_main_box41">分期付款支付方式：百度钱包</p> 
                    </div>
                </div> */}
                {/* <div className="xjr_box">//分期付款未完成
                    <div className="xjr_mine_main">
                        <div className="xjr_main_box">
                            <div className="xjr_main_left">
                                <div className="xjr_mine_ddbh"> <div className="xjr_mine_gang"></div>订单编号：17061312357</div>
                                <p className="xjr_mine_spmc">商品名称：外教口语课4课时</p>
                            </div>
                            <p className="xjr_main_right xjr_mine_fenqi xjr_mine_dzf">分期付款<br/>待支付</p>
                        </div>
                        <div className="xjr_main_box xjr_main_box1">
                            <p className="xjr_main_left xjr_mine_keshi">
                                课时：300课时
                            </p>
                            <p className="xjr_main_right  xjr_mine_yxq">
                                有效期：360天
                            </p>
                        </div>
                        <p className="xjr_main_box2">订单金额：¥ 900</p>
                        <div className="xjr_main_box xjr_main_box3">
                            <p className="xjr_mine_sf">
                                首付金额：￥300
                            </p>
                            <p className="xjr_mine_sfsj">
                                首付款时间：待支付
                            </p>
                        </div>
                        <div className="xjr_main_box xjr_main_box5">
                            <p className="xjr_mine_fqzy xjr_mine_fqzy1">
                                注：分期付款，需要先支付订单金额10%的首付款
                            </p>
                            <a href="#" className="xjr_main_qfsf">
                                去付首付
                            </a>
                        </div>  
                    </div>  
                </div> */}
                
                <a href="#" className="xjr_main_xieyi">《GoGoTalk青少英语课程协议》</a>
            </div>
        )
    }
}
