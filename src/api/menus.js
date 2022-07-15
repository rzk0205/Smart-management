import request from '@/utils/request'
const getMenuList = (data) => {
  return request({
    url: `/menu/list?current=${data.current}&size=${data.size}&username=${data.username}`,
    method: 'get'
  })
}
const updateMenu = (id, data) => {
  return request({
    url: `/menu/assign/${id}`,
    method: 'POST',
    data
  })
}

const addMenusList = (data) => {
  return request({ url: '/menu/add', method: 'POST', data })
}
const UpdateMenuList = (data) => {
  return request({ url: '/menu/update', method: 'PUT', data })
}
const EditMenus = (id) => {
  return request({ url: `menu/info/${id}`, method: 'get' })
}

export default {
  getMenuList,
  updateMenu,
  addMenusList,
  UpdateMenuList,
  EditMenus
}
