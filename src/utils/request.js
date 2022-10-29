/**
 * 基于 axios 封装的请求模块
 */
import axios from 'axios'

// 创建一个 axios 实例
const request = axios.create({
  baseURL: 'http://192.168.2.36:438'
})

// 导出请求方法
export default request
