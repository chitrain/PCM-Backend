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
  console.log(record)
  record.status = status
  
  try {
    let applier = await record.getApplier()
    let email = applier.email
    console.log(email)
  } catch(e) {
    console.log(e)
  }
  
  await record.save()
  console.log(`审批${extractStatus(status)}`)
  // notify users `email`
  res.json({error: 0, msg: '审批完成'})
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
    }
    console.log('##LOG##: Finish download')
  })
}
