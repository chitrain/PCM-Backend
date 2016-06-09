/**
 * @author Yujie Li
 * @email im_yujie@foxmail.com
 */

import { agent } from 'supertest'
import should from 'should'
import CONFIG from '../config'

let server = agent(CONFIG.url)

export const ApplyRoomTest = () => {
  it('login should success', (done) => {
    server
      .post('/login')
      .type('form')
      .send({
        email: 'im_yujie@foxmail.com',
        password: '654321'
      })
      .expect(200, {
        error: 0,
        msg: '登录成功'
      }, done)
  })
  
  it('apply room should success', (done) => {
    server
      .post('/record')
      .field('date', '2016-05-08')
      .field('startTime', '12:00')
      .field('endTime', '15:00')
      .field('roomNo', 'A101')
      .field('unit', '呵呵哒')
      .field('scale', '40')
      .attach('file', '../testData/neipei.docx')
      .expect(200, {
        error: 0,
        msg: '申请成功'
      }, done)
  })
  
  // 起点时间大于末尾时间
  it('apply room should fail', (done) => {
    server
      .post('/record')
      .field('date', '2016-05-08')
      .field('startTime', '13:00')
      .field('roomNo', 'A101')
      .field('unit', '呵呵哒')
      .field('scale', '40')
      .attach('file', '../testData/neipei.docx')
      .expect(200, {
        error: 1,
        msg: '参数错误：出现空参数'
      }, done)
  })
  
  // 起点时间大于末尾时间
  it('apply room should fail', (done) => {
    server
      .post('/record')
      .field('date', '2016-05-08')
      .field('startTime', '19:00')
      .field('endTime', '16:00')
      .field('roomNo', 'A101')
      .field('unit', '呵呵哒')
      .field('scale', '40')
      .attach('file', '../testData/neipei.docx')
      .expect(200, {
        error: 1,
        msg: '参数错误：不合法时间'
      }, done)
  })
  
  // 与已有记录冲突
  it('apply room should fail', (done) => {
    server
      .post('/record')
      .field('date', '2016-05-08')
      .field('startTime', '13:00')
      .field('endTime', '16:00')
      .field('roomNo', 'A101')
      .field('unit', '我有冲突啊')
      .field('scale', '40')
      .attach('file', '../testData/neipei.docx')
      .expect(200, {
        error: 1,
        msg: '出现时间冲突'
      }, done)
  })
  
  it('apply room should success', (done) => {
    server
      .post('/record')
      .field('date', '2016-06-09')
      .field('startTime', '8:00')
      .field('endTime', '10:00')
      .field('roomNo', 'B101')
      .field('unit', '我正常')
      .field('scale', '40')
      .attach('file', '../testData/neipei.docx')
      .expect(200, {
        error: 0,
        msg: '申请成功'
      }, done)
  })
  
  // 我也有冲突
  it('apply room should fail', (done) => {
    server
      .post('/record')
      .field('date', '2016-06-09')
      .field('startTime', '9:00')
      .field('endTime', '10:00')
      .field('roomNo', 'B101')
      .field('unit', '我有冲突啊 2')
      .field('scale', '40')
      .attach('file', '../testData/neipei.docx')
      .expect(200, {
        error: 1,
        msg: '出现时间冲突'
      }, done)
  })
  
  it('get record should success', (done) => {
    server
      .get('/record')
      .query({roomNo: 'A101'})
      .expect(200, {
        error: 0,
        msg: '成功'
      }, done)
  })
  
  it('get record should success', (done) => {
    server
      .get('/record')
      .query({date: '2016-05-08'})
      .expect(200, {
        error: 0,
        msg: '成功'
      }, done)
  })
}
