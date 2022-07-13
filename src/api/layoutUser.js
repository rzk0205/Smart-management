import request from '@/utils/request'

const getUserList = (data) => {
  return request({
    url: `/user/list?current=${data.current}&size=${data.size}&username=${data.username}`,
    method: 'get'
  })
}

export default { getUserList }
