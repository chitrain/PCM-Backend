/**
 * @author Yujie Li
 * @email im_yujie@foxmail.com
 */

import fs from 'fs'
import path from 'path'

import Record from '../models/record'
import Room from '../models/room'
import CONFIG from '../config'

export const applyHandler = async function(req, res) {
  let { startTime, endTime, roomNo, unit, scale } = req.body
  let applier = req.signedCookies.email
  let attachment = req.file.path
  console.log(`startTime: ${startTime} | endTime: ${endTime} | roomNo: ${roomNo} | unit: ${unit} | scale: ${scale}`)
  
  await Record.create(roomNo, applier, startTime, endTime, unit, scale, attachment)
  res.json({error: 0, msg: '申请成功'})
}

export const getRecordHandler = async function(req, res) {
  let { roomNo, startTime, endTime } = req.query
  let email = req.signedCookies.emal
  
  if (roomNo) {
    let result = await Record.getByRoomNo(roomNo)
    res.json({error: 0, message: result})
    return
  }
}
