import axios from 'axios';
axios.defaults.baseURL = 'http://testapi.gogo-talk.com/api/';

const serverUrl = location.host;

export default {
    // ajax 备注‘’
    GetTch_Lesson: 'Demands/GetTch_Lesson', //获取时间内有无约课
    GetLessonRecords :'/Student/GetLessonRecords'
}
