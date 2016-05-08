/**
 * @author Yujie Li
 * @email im_yujie@foxmail.com
 */

import Record from '../models/record'
import Room from '../models/room'

(async function() {
  await Room.create('A101', 50)
  await Room.create('A102', 50)
  await Room.create('A103', 40)
  await Room.create('A104', 50)
  await Room.create('A105', 60)
  await Room.create('A106', 50)
  await Room.create('A107', 90)
  console.log('created room!!!')
}())

export const applyHandler = async function(req, res) {
  let { startTime, endTime, roomNo, unit, scale } = req.body
  // save file
  let applier = req.signedCookies.email
  console.log(req)
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
