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

export function listRankStudent(params) {
  return request({
    url: '/student/listRank',
    method: 'get',
    params
  })
}

export function chartListStudent(params) {
  return request({
    url: '/student/chartList',
    method: 'get',
    params
  })
}

export function createStudent(student) {
  return request({
    url: '/student/create',
    method: 'post',
    data: student
  })
}

export function updateStudent(student) {
  return request(({
    url: '/student/update',
    method: 'post',
    data: student
  }))
}
