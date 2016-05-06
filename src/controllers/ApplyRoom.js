/**
 * @author Yujie Li
 * @email im_yujie@foxmail.com
 */

import Record from '../models/record'

export const applyHandler = async function(req, res) {
  let { startTime, endTime, roomNo, unit, scale } = req.body
  // save file
  let email = req.signedCookies.email
  
  await Record.create(roomNo, applier, startTime, endTime, unit, scale, attachment)
  res.json({error: 0, msg: '申请成功'})
}

export const getRecordHandler = async function(req, res) {
  let { roomNo, startTime, endTime } = req.body
  let email = req.signedCookies.emal
  
  if (roomNo) {
    let result = await Record.getByRoomNo(roomNo)
    res.json({error: 0, message: result})
    return
  }
}
