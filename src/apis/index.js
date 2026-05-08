import server from '@/utils/request'

export function getGoodsList() {
  return server({
    url: 'home/category/head'
  })
}