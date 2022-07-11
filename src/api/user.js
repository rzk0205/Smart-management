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

export default {
  getCaptcha,
  login
}
