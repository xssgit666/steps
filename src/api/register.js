import request from '@/utils/request'

// 用户登录
export const register = (data) => {
  return request({
    method: 'POST',
    url: '/center/corpRegister',
    data
  })
}
