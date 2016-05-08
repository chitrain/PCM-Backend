/**
 * @author Yujie Li
 * @email im_yujie@foxmail.com
 */

import { agent } from 'supertest'
import should from 'should'
import CONFIG from '../config'

let server = agent(CONFIG.url)

export const UserManageTest = () => {
  it('register should success', (done) => {
    server
      .post('/register')
      .type('form')
      .send({
        email: 'im_yujie@foxmail.com',
        name: 'liyujie',
        password: '123456'
      })
      .expect(200, {
        error: 0,
        msg: '注册成功'
      }, done)
  })
  
  it('login should fail', (done) => {
    server
      .post('/login')
      .type('form')
      .send({
        email: 'im_yujie@foxmail.com',
        password: '123457' // wrong
      })
      .expect(200, {
        error: 1,
        msg: '密码错误'
      }, done)
  })
  
  it('login should success', (done) => {
    server
      .post('/login')
      .type('form')
      .send({
        email: 'im_yujie@foxmail.com',
        password: '123456'
      })
      .expect('set-cookie', /im_yujie/g)
      .expect(200, {
        error: 0,
        msg: '登录成功'
      }, done)
  })
  
  it('change passoword should fail', (done) => {
    server
      .post('/password')
      .type('form')
      .send({
        oldPassword: '123476', // wrong
        newPassword: '654321'
      })
      .expect(200, {
        error: 1,
        msg: '密码错误'
      }, done)
  })
  
  it('change passoword should success', (done) => {
    server
      .post('/password')
      .type('form')
      .send({
        oldPassword: '123456',
        newPassword: '654321'
      })
      .expect(200, {
        error: 0,
        msg: '修改成功'
      }, done)
  })
  
  it('logout should success', (done) => {
    server
      .get('/logout')
      .expect('set-cookie', /email=;/g)
      .expect(200, {msg: '退出成功'}, done)
  })
}
