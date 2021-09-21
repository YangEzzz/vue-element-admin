import request from '@/utils/request'

export function getCategory() {
  return request({
    url: '/student/category',
    method: 'get'
  })
}

export function listStudent(params) {
  return request({
    url: '/student/list',
    method: 'get',
    params
  })
}
