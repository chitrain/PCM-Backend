/**
 * @author Yujie Li
 * @email im_yujie@foxmail.com
 */

import Sequelize from 'sequelize'
import { sequelize } from './sql'

const Admin = sequelize.define('admin', {
  email: {
    type: Sequelize.STRING
  },
  name: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
})

/**
 * wrapper of admin class
 */
export default class {
  static model = Admin
  
  constructor() {}
  
  /**
   * create a new admin and insert into db
   * @param email, name, password {String} 
   * @return {Promise}
   */
  static create(email, name, password) {
    return Admin.create({ email, name, password })
  }
  
  /**
   * get a admin from db
   * @param email {String}
   * @return {Promise}
   */
  static get(email) {
    let query = {
      where: { email }
    }
    return Admin.findOne(query)
  }
}