/**
 * @author Yujie Li
 * @email im_yujie@foxmail.com
 */

import Record from '../models/record'
import { extractStatus } from '../utils/basic'

/**
 * handler of approve a record
 * method: POST
 */
export const approveHandler = async function(req, res) {
  let { recordID } = req.params
  let { status } = req.body
  
  status = +status // string to number
  
  if (status !== 0 && status !== 1 && status !== 2) {
    res.json({error: 1, msg: '参数错误'})
    return
  }
  
  let record = await Record.get(recordID)
  if (!record) {
    res.json({error: 1, msg: '没有该条记录'})
    return
  }
  // console.log(record)
  record.status = status
  
  try {
    let applier = await record.getApplier()
    let email = applier.email
    console.log(email)
  } catch(e) {
    console.log(e)
    return
  }
  
  await record.save()
  console.log(`审批${extractStatus(status)}`)
  // notify users `email`
  res.json({error: 0, msg: '审批完成'})
}


export const getAllRecordHandler = async function(req, res) {
  console.log('ADMIN GET ALL RECORDS')
  let result = await Record.getAllRecords()
  
  let reco = []
  try {
    for (let rec in result) {
      let r = result[rec]
      let applier = await r.getApplier()
      let room = await r.getRoom()
      reco.push({
        date: r.date,
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
/**
 * handler of download attachment
 * method: GET
 */
export const downloadHandler = (req, res) => {
  let { path } = req.query
  res.download(path, 'application.pdf', (err) => {
    if (err) {
      console.log(err)
      res.json({error: 1, msg: '意外错误'})
      return
    }
    res.json({error: 0, msg: '下载成功'})
    console.log('##LOG##: Finish download')
  })
}
