import request from '@/utils/request'

const getCaptcha = () => {
  return request({ url: '/captcha', method: 'GET' })
}

const login = (data) => {
  return request({
    url: `/login?username=${data.username}&password=${data.password}&code=${data.code}&token=${data.token}`,
    method: 'post'
  })
}
const getUserInfo = () => {
  return request({ url: '/user/info', method: 'get' })
}
const logout = () => {
  return request({ url: '/logout', method: 'POST' })
}
const getMenuNav = () => {
  return request({ url: '/menu/nav', method: 'GET' })
}
export default {
  getCaptcha,
  login,
  getUserInfo,
  logout,
  getMenuNav
}
