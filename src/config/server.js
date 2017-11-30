import axios from 'axios';
axios.defaults.baseURL = 'http://testapi.gogo-talk.com/api/';

const serverUrl = location.host;

export default {
  // ajax 备注‘’
  GetSystemTime: 'Student/GetSystemTime',
  GetTch_Lesson: 'Demands/GetTch_Lesson', //获取时间内有无约课
  GetLessonRecords: '/Student/GetLessonRecords',
  GetTeachers: 'Student/GetTeachers', //获取对应时间段的排课老师集合
  AttentionTeacher: 'Student/AttentionTeacher', //关注 和 取消关注
  GetAttentionTeachers: 'Student/GetAttentionTeachers', //获取我的关注列表
  JoinAttendLesson: 'Demands/JoinAttendLesson', // 预约老师

  GetStudentInfo: 'Student/GetStudentInfo', //获取学生信息
  GetOrders: 'Order/getOrders', //获取我的订单
  PostStudentInfo: 'Student/updateInfo', //修改学生信息
  GetClassHourPage: 'Student/GetClassHourPage', //获取课时记录
  GetLessonStock: 'Student/GetLessonStock', //获取课时信息
  LearningSituation: 'Student/LearningSituation', //获取学习情况
  GetProvinceList: 'Student/GetProvinceList', //获取省
  GetCityList: 'Student/GetCityList', //获取市
  GetTeacherInfo: 'Teacher/GetTeacherInfo' //获取老师详情

  ,GetLessonRecords: 'Student/GetLessonRecords',
  CancelAttendLesson: "Demands/CancelAttendLesson",
  SetComment: "Student/SetComment",
  CancelLessonCount: "Demands/CancelLessonCount",
  IsOfficial: "Student/IsOfficial"
}
