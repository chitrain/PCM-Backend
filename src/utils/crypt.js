/**
 * @author Yujie Li
 * @email im_yujie@foxmail.com
 */

import { hash, compare } from 'bcrypt-nodejs'

// wrap origin callback-style function in a Promise

/**
 * @param raw {String} raw string
 * @return encrypted string
 */
export const encrypt = async function(raw) {
  return new Promise((resolve, reject) => {
    hash(raw, null, null, function(err, hash) {
      if (err) return reject(err)
      resolve(hash)
    })
  })
}

/**
 * @param raw {String} raw string
 * @param pwdHash {String} an encrypted string
 * @return true | false
 */
export const validate = async function(raw, pwdHash) {
  return new Promise((resolve, reject) => {
    compare(raw, pwdHash, function(err, res) {
      if (err) return reject(err)
      resolve(res)
    })
  })
}
