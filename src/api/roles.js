import request from '@/utils/request'

const getRoleList = (data) => {
  return request({
    url: '/role/list',
    method: 'GET',
    data
  })
}
const updateRole = (id, data) => {
  return request({
    url: `/user/assign/${id}`,
    method: 'POST',
    data
  })
}

const addRolesList = (data) => {
  return request({ url: '/role/add', method: 'POST', data })
}
const UpdateRolerList = (data) => {
  return request({ url: '/role/update', method: 'PUT', data })
}
const EditRolesr = (id) => {
  return request({ url: `role/info/${id}`, method: 'get' })
}
const setRolesInfo = (id) => {
  return request({ url: `/role/info/${id}`, method: 'get' })
}
const updataRolePerm = (id, data) => {
  return request({ url: `/role/perm/${id}`, method: 'post', data })
}
export default {
  getRoleList,
  updateRole,
  addRolesList,
  UpdateRolerList,
  EditRolesr,
  setRolesInfo,
  updataRolePerm
}
