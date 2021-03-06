/**
 * @author Yujie Li
 * @email im_yujie@foxmail.com
 */

import fs from 'fs'
import path from 'path'
import moment from 'moment'

import Record from '../models/record'
import Room from '../models/room'
import CONFIG from '../config'


/**
 * handler of apply room
 * method: POST
 */
export const applyHandler = async function(req, res) {
  let { date, startTime, endTime, roomNo, unit, scale } = req.body
  
  console.log(`${date} | ${startTime} | ${endTime} | ${roomNo}`)
  // check non empty
  if (!date || !startTime || !endTime || !unit || !scale) {
    res.json({error: 1, msg: '参数错误：出现空参数'})
    return
  }
  
  // check upload file
  if (!req.file) {
    res.json({error: 1, msg: '文件上传错误：未找到文件'})
    return
  }
  
  let startDate = moment(`${date} ${startTime} +0800`, 'YYYY-MM-DD HH:mm Z')
  let endDate = moment(`${date} ${endTime} +0800`, 'YYYY-MM-DD HH:mm Z')
  
  // validate date
  if (!startDate.isValid() || !endDate.isValid() || startDate.isAfter(endDate)) {
    res.json({error: 1, msg: '参数错误：不合法时间'})
    return
  }
  
  let applier = req.session.user.email
  let attachment = req.file.path
  
  console.log(`date: ${date} startTime: ${startTime} | endTime: ${endTime} | roomNo: ${roomNo} | unit: ${unit} | scale: ${scale}`)
  
  let room = await Room.get(roomNo)
  // check room exists or not
  if (!room) {
    res.json({error: 1, msg: '没有该房间'})
    return
  }
  
  // check room capacity is enough
  if (room.capacity < (+scale)) {
    res.json({error: 1, msg: '课室容量不满足'})
    return
  }
  
  // check conflicts
  let records = await Record.getByRoomNo(roomNo)
  
  records = records.filter((record) => {
    
    let rsDate = moment(record.startDate, 'YYYY-MM-DD HH:mm Z')
    let reDate = moment(record.endDate, 'YYYY-MM-DD HH:mm Z')
    console.log(startDate.format(), rsDate.format(), reDate.format())
    console.log(startDate.isBetween(rsDate, reDate))
    return startDate.isBetween(rsDate, reDate)
        || endDate.isBetween(rsDate, reDate)
        
  })
  
  if (records.length > 0) {
    res.json({error: 1, msg: '出现时间冲突', addition: records})
    return
  }

  await Record.create(roomNo, applier, date, startTime, endTime, unit, scale, attachment)
  res.json({error: 0, msg: '申请成功'})
}

/**
 * handler of get record
 * method: GET
 */
export const getRecordHandler = async function(req, res) {
  let { date, roomNo, startTime, endTime } = req.query
  let email = req.session.user.email
  
  console.log('## LOG ##', `date: ${date}, roomNo: ${roomNo}, startTime: ${startTime}, endTime: ${endTime}`)
  console.log('## LOG ##', `email: ${email}`)
  
  let result = await Record.getAllRecords()
  // console.log('## LOG ##', result)
  
  // get records according to time
  if (date) {
    result = result.filter((record) => {
      console.log(date, record.date)
      return moment(date).isSame(record.date)
    })
    if (startTime || endTime) {
      let currentDate = moment()
      let startDate = currentDate
      let endDate = currentDate.add(14, 'days') // after two weeks as default endDate
      
      if (startTime) {
        // startTime can't before now
        startDate = moment(`${date} ${startTime} +0800`, 'YYYY-MM-DD HH:mm Z')
        if (startDate.isBefore(currentDate)) {
          res.json({error: 1, msg: '起点时间不能早于当前时间'})
          return
        }
        
        if (startDate.isAfter(currentDate.add(14, 'days'))) {
          res.json({error: 1, msg: '只能查询两周以内的课室'})
          return
        }
      }
      
      if (endTime) {
        // startTime can't before now
        endDate = moment(`${date} ${endTime}`)
        if (endDate.isBefore(currentDate)) {
          res.json({error: 1, msg: '末尾时间不能早于当前时间'})
          return
        }
        
        if (endDate.isAfter(currentDate.add(14, 'days'))) {
          res.json({error: 1, msg: '只能查询两周以内的课室'})
          return
        }
      }
      
      if (startDate.isBefore(endDate)) {
        result = result.filter((record) => {
          let sDate = moment(record.startDate)
          let eDate = moment(record.endDate)
          return sDate.isBetween(startDate, endDate)
              || eDate.isBetween(startDate, endDate)
        })
      }
    }
  }
  
  
  if (roomNo) {
    let room = await Room.get(roomNo)
    if (!room) {
      res.json({error: 1, msg: '没有该房间'})
      return
    }
    
    result = result.filter(async function(record) {
      let room = await record.getRoom()
      let rRoomNo = room.roomNo
      console.log(rRoomNo, roomNo)
      return rRoomNo == roomNo
    })
  }
  
  // when no time or roomNo, return user's records
  if (!date && !startTime && !endTime && !roomNo) {
    result = result.filter(async function(record) {
      let applier = await record.getApplier()
      return applier.email == email
    })
  }
  
  let reco = []
  try {
    for (let rec in result) {
      let r = result[rec]
      let applier = await r.getApplier()
      let room = await r.getRoom()
      reco.push({
        date: moment(r.date).zone("+08:00").format('YYYY-MM-DD'),
        id: r.id,
        unit: r.unit,
        startTime: r.startTime,
        endTime: r.endTime,
        scale: r.scale,
        applier: applier,
        status: r.status,
        room: room,
        attachment: r.attachment
      })
    }
  } catch(e) {
    console.log(e)
    return
  }
  
  res.json({error: 0, msg: reco})
}
