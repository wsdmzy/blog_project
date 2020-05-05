import axios from 'axios'

const service = axios.create({
  baseURL: 'http://127.0.0.1:7001/admin/',
  timeout: 1000 * 5,
  // headers: { Authorization: `Bearer ${storageService.get(storageService.USER_TOKEN)}`}
})

service.interceptors.request.use((config) => {
  // console.log('+++')
  Object.assign(config.headers, { Authorization: `Bearer ${localStorage.getItem('token')}`})
  // console.log(config.headers)
  return config
}, (error) => {
  return Promise.reject(error)
})



export default service;
