import request from '@/utils/request'

const getRoleList = (data) => {
  return request({
    url: `/role/list?current=${data.current}&size=${data.size}`,
    method: 'get'
  })
}
const updateRole = (id, data) => {
  return request({
    url: `/user/assign/${id}`,
    method: 'POST',
    data
  })
}
export default { getRoleList, updateRole }
