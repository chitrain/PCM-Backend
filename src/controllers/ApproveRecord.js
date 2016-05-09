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
  let { recordID, status } = req.body
  
  status = +status
  
  if (status !== 0 && status !== 1 && status !== 2) {
    res.json({error: 1, msg: '参数错误'})
  }
  
  let record = await Record.get(recordID)
  record.status = status
  
  await record.save()
  console.log('审批' + extractStatus(status))
  // notify users
  res.json({error: 0, msg: '审批完成'})
}
