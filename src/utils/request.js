// 对axios进行一个封装
import axios from 'axios'
// 引入路由 和 elementui
import router from '../router'
import { Message } from 'element-ui'
import JSONBig from 'json-bigint'
// 请求拦截器

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
axios.interceptors.request.use(function (config) {
  let token = window.localStorage.getItem('user-token')
  config.headers.Authorization = `Bearer ${token}`
  return config
}, function () {
  // 执行请求失败
})
axios.defaults.transformResponse = [function (data) {
  return JSONBig.parse(data) // JSONbig.parse 替换 JSON.parse  保证数字的正确
}]
axios.interceptors.response.use(function (response) {
  return response.data ? response.data : {}
}, function (error) {
  let status = error.response.status
  let message = ''
  switch (status) {
    case 400:
      message = '请求参数错误'
      break
    case 403:
      router.push('/login')
      break
    case 401:
      router.push('/login')
      break
    case 507:
      message = '服务器数据异常'
      break
    case 404:
      message = '手机号不正确'
      break
    default:
      break
  }
  Message({ type: 'warning', message })
  return Promise.reject(error)
})
export default axios
