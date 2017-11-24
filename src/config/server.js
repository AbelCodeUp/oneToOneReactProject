import axios from 'axios';
axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Authorization'] = 'Authorization';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default {
    // ajax 备注
}
