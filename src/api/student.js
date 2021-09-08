import request from "@/utils/request";

export function getCategory() {
  return request({
    url: '/Result/category',
    method:'get'
  })
}
