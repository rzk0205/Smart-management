import request from '@/utils/request'

const getRoleList = (data) => {
  return request({
    url: `/role/list?current=${data.current}&size=${data.size}`,
    method: 'get'
  })
}

export default { getRoleList }
