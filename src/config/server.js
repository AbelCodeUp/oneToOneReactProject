import axios from 'axios';
axios.defaults.baseURL = 'http://testapi.gogo-talk.com/api/';

const serverUrl = location.host;

export default {
    // ajax 备注‘’
    GetSystemTime: 'Student/GetSystemTime',
    GetTch_Lesson : 'Demands/GetTch_Lesson', //获取时间内有无约课
    GetLessonRecords : '/Student/GetLessonRecords',
    GetTeachers : 'Student/GetTeachers', //获取对应时间段的排课老师集合
    AttentionTeacher: 'Student/AttentionTeacher', //关注 和 取消关注
}
