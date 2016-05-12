/**
 * @author Yujie Li
 * @email im_yujie@foxmail.com
 */

import Admin from '../models/admin'
import { encrypt, validate } from '../utils/crypt'

/**
 * handler of login
 * method: POST
 * body: email=xxx&password=xxx
 */
export const adminLoginHandler = async function (req, res) {
  let { email, password } = req.body
  
  let admin = await Admin.get(email)
  if (!admin) {
    res.json({error: 1, msg: '用户不存在'})
    return
  }
  
  let userPwd = admin.password
  
  let isRight = await validate(password, userPwd)
  if (!isRight) {
    res.json({error: 1, msg: '密码错误'})
    return
  }
  
  req.session.admin = {email, name: admin.name}
  res.json({error: 0, msg: '登录成功'})
}

/**
 * handler of logout
 * method: GET
 */
export const adminLogoutHandler = (req, res) => {
  req.session.admin = null
  res.json({error: 0, msg: '退出成功'})
}