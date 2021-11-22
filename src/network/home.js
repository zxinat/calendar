import axios from './axios'

export const POST = 'post'
export const GET = 'get'

/**
 * 登录
 * @param {*} nickname 
 * @param {*} password 
 * @returns 
 */
export function login(nickname, password) {
  return axios({
    url: `/users/login`,
    method: POST,
    data: {
      nickname: nickname,
      password: password
    }
  })
}

/**
 * 获取展示数据
 */
export function getShowData() {
  return axios({
    url: `/itinerarys/mon`,
    method: GET,
  })
}

/**
 * 获取所有类型
 */
export function getAllTypes() {
  return axios({
    url: '/types/',
    method: GET,
  })
}

/**
 * 获取用户信息
 */
export function getUserInfo() {
  return axios({
    url: '/users/',
    method: GET,
  })
}

/**
 * 增加行程
 * @param {String} des 
 * @param {int} type_id 
 * @param {date} start 
 * @param {date} end 
 * @returns 
 */
export function addItinerary(des, type_id, start, end) {
  return axios({
    url: '/itinerarys/',
    method: POST,
    data: {
      des: des,
      type_id: type_id,
      start: start,
      end: end
    }
  })
}
/**
 * 获取一周列表数据
 */
export function getWeekList(timeFrom, timeEnd) {
  return axios({
    url: '/itinerarys/raw/' + timeFrom + '/' + timeEnd,
    method: GET
  })
}

/**
 * 获取待完成事项
 */
export function getTodoListByStatus(status) {
  return axios({
    url: '/todos/status/' + status,
    method: GET
  })
}

/**
 * 修改事项状态
 */
export function updateTodoStatus(id, status) {
  return axios({
    url: '/todos/status',
    method: POST,
    data: {
      todo_id: id,
      status: status
    }
  })
}

/**
 * 获取事项/按分类排序
 */
 export function getTodoBySort() {
  return axios({
    url: '/todos/sort',
    method: GET
  })
}