/*
包含n个接口请求函数的模块
函数的返回值: promise对象
 */
import { Message } from 'element-ui'
import jsonp from 'jsonp'
import ajax from './ajax'

// const BASE_URL = 'http://localhost:5000'
const BASE_URL = ''

// 1、用户登录
export const reqLogin = (username, password) => ajax(`${BASE_URL}/login`, { username, password }, 'POST')

// 2、获取一级或二级分类
export const reqCategorys = parentId => ajax(`${BASE_URL}/manage/category/list`, { parentId })

// 3、添加分类
export const reqAddCategory = (parentId, categoryName) => ajax(`${BASE_URL}/manage/category/add`, {
  parentId,
  categoryName,
}, 'POST')

// 4、更新分类名称
export const reqUpdateCategory = ({ categoryId, categoryName }) => ajax(`${BASE_URL}/manage/category/update`, {
  categoryId,
  categoryName,
}, 'POST')

// 获取天气数据(jsonp请求)
// eslint-disable-next-line arrow-body-style
export const reqWeather = (city) => {
  return new Promise((resolve, reject) => {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    // 发送jsonp请求
    jsonp(url, {}, (err, data) => {
      if (!err && data.status === 'success') {
        const { dayPictureUrl, weather } = data.results[0].weather_data[0]
        resolve({ dayPictureUrl, weather })
      } else {
        Message.error('获取天气信息失败！')
      }
    })
  })
}
/*
jsonp解决ajax跨域的原理
  1). jsonp只能解决GET类型的ajax请求跨域问题
  2). jsonp请求不是ajax请求, 而是一般的get请求
  3). 基本原理
   浏览器端:
      动态生成<script>来请求后台接口(src就是接口的url)
      定义好用于接收响应数据的函数(fn), 并将函数名通过请求参数提交给后台(如: callback=fn)
   服务器端:
      接收到请求处理产生结果数据后, 返回一个函数调用的js代码, 并将结果数据作为实参传入函数调用
   浏览器端:
      收到响应自动执行函数调用的js代码, 也就执行了提前定义好的回调函数, 并得到了需要的结果数据
 */
