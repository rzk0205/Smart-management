import request from '@/utils/request'

const getUserList = (data) => {
  return request({
    url: `/user/list?current=${data.current}&size=${data.size}&username=${data.username}`,
    method: 'get'
  })
}
const addUser = (data) => {
  return request({ url: '/user/add', method: 'POST', data })
}
const EditUser = (id) => {
  return request({ url: `/user/userInfo/${id}`, method: 'get' })
}

const editUpdate = (data) => {
  return request({ url: '/user/update', method: 'put', data })
}
export default { getUserList, addUser, EditUser, editUpdate }
