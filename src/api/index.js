/*
包含n个接口请求函数的模块
函数的返回值: promise对象
 */
import ajax from './ajax'

// const BASE_URL = 'http://localhost:5000'
const BASE_URL = '/manage'

// 1、根据经纬度获取位置详情
export const reqLogin = (username, password) => ajax('/login', { username, password }, 'POST')
// 2、获取食品分类列表
export const reqFoodCategorys = () => ajax(`${BASE_URL}/index_category`)
