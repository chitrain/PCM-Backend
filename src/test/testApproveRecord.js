/**
 * @author Yujie Li
 * @email im_yujie@foxmail.com
 */

import { agent } from 'supertest'
import should from 'should'
import CONFIG from '../config'

let server = agent(CONFIG.url)

export const ApproveRecordTest = () => {
  it('admin login should success', (done) => {
    server
      .post('/admin/login')
      .type('form')
      .send({
        email: 'im_yujie@foxmail.com',
        password: '123456'
      })
      .expect(200, {
        error: 0,
        msg: '登录成功'
      }, done)
  })
  
  it('approve record for wrong status', (done) => {
    server
      .post('/admin/record/1')
      .type('form')
      .send({status: '6'})
      .expect(200, {
        error: 1,
        msg: '参数错误'
      }, done)
  })
  
  it('approve non-existed record should fail', (done) => {
    server
      .post('/admin/record/4')
      .type('form')
      .send({status: '1'})
      .expect(200, {
        error: 1,
        msg: '没有该条记录'
      }, done)
  })
  
  it('approve record should success', (done) => {
    server
      .post('/admin/record/1')
      .type('form')
      .send({status: '1'})
      .expect(200, {
        error: 0,
        msg: '审批完成'
      }, done)
  })
}
