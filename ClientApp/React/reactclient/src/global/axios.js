import axios from 'axios'

let http = axios.create({
    baseURL: 'https://localhost:5000/'
  });

  http.defaults.headers.common['Content-Type'] = 'application/json';
  http.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

export default http;