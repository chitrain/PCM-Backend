/**
 * @author Yujie Li
 * @email im_yujie@foxmail.com
 */

import fs from 'fs'
import path from 'path'

import Record from '../models/record'
import Room from '../models/room'
import CONFIG from '../config'


/**
 * method: POST
 */
export const applyHandler = async function(req, res) {
  let { startTime, endTime, roomNo, unit, scale } = req.body
  let applier = req.session.user.email
  let attachment = req.file.path
  console.log(`startTime: ${startTime} | endTime: ${endTime} | roomNo: ${roomNo} | unit: ${unit} | scale: ${scale}`)
  
  let room = await Room.get(roomNo)
  
  // check room exists or not
  if (!room) {
    res.json({error: 1, msg: '没有房间'})
    return
  }
  
  // check room capacity is enough
  if (room.capacity < (+scale)) {
    res.json({error: 1, msg: '课室容量不足'})
    return
  }

  await Record.create(roomNo, applier, startTime, endTime, unit, scale, attachment)
  res.json({error: 0, msg: '申请成功'})
}

/**
 * method: GET
 */
export const getRecordHandler = async function(req, res) {
  let { roomNo, startTime, endTime } = req.query
  let email = req.session.user.email
  
  if (roomNo) {
    let result = await Record.getByRoomNo(roomNo)
    res.json({error: 0, message: result})
    return
  }
  
  if (startTime) {
    let result = await Record.getByStartTime()
  }
}
