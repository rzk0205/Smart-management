import request from '@/utils/request'

const getUserList = (data) => {
  return request({
    url: `/user/list?current=${data.current}&size=${data.size}`,
    method: 'get'
  })
}

export default { getUserList }
