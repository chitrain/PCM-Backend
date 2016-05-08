/**
 * @author Yujie Li
 * @email im_yujie@foxmail.com
 */

import Record from '../models/record'

/**
 * handler of approve a record
 * method: POST
 */
export const approveHandler = async function(req, res) {
  let { recordID, status } = req.body
  
  await record = Record.get(recordID)
  record.status = +status
  
  await record.save()
  console.log('审批' + extractStatus(status))
  // notify users
  res.json({error: 0, msg: '审批完成'})
}
