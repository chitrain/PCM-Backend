/**
 * @author Yujie Li
 * @email im_yujie@foxmail.com
 */

import User from '../models/user'
import { encrypt, validate } from '../utils/crypt'

/**
 * handler of register
 * method: POST
 * body: email=xxx&name=xxx&password=xxx
 */
export const registerHandler = async function(req, res) {
  let { email, name, password } = req.body

  let user = await User.get(email)   
  if (user) {
    res.json({error: 1, msg: '邮箱已被注册'})
    return
  }
  
  let hashPwd = await encrypt(password)
  let newUser = await User.create(email, name, hashPwd)
  // console.log(newUser)
  res.json({error: 0, msg: '注册成功'})
}

/**
 * handler of login
 * method: POST
 * body: email=xxx&password=xxx
 */
export const loginHandler = async function(req, res) {
  let { email, password } = req.body
  
  let user = await User.get(email)
  let userPwd = user.password
  
  let isRight = await validate(password, userPwd)
  if (!isRight) {
    res.json({error: 1, msg: '密码错误'})
    return
  }
  
  res.cookie('email', email, {signed: true})
  res.json({error: 0, msg: '登录成功'})
}

/**
 * handler of login
 * method: GET
 */
export const logoutHandler = (req, res) => {
  // console.log(req.signedCookies.email)
  res.clearCookie('email')
  res.json({msg: '退出成功'})
}

/**
 * handler of changing password
 * method: POST
 */
export const changePasswordHandler = async function(req, res) {
  let { oldPassword, newPassword } = req.body
  let email = req.signedCookies.email
  console.log('changed: ', email)
  
  let user = await User.get(email)
  console.log('changed: ', user)
  let isRight = await validate(oldPassword, user.password)
  console.log('changed: ', isRight)
  if (!isRight) {
    res.json({error: 1, msg: '密码错误'})
    return
  }
  
  user.password = await encrypt(newPassword)
  await user.save()
  console.log('changed: ', 'finish')
  res.json({error: 0, msg: '修改成功'})
}
