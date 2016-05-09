/**
 * @author Yujie Li
 * @email im_yujie@foxmail.com
 */

import express from 'express'
import bodyParser from 'body-parser'
import session from 'express-session'

import { router } from './router'
import { cleanup as initDB } from './utils/cleanup'
import CONFIG from './config'

export const app = express()

// initialize databse
// define schema, drop legacy tables
initDB()

const PORT = CONFIG.url.split(':')[2]

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
  secret: '**im a secret**',
  resave: false,
  saveUninitialized: true
}))

// load router
app.use('/', router)

app.listen(PORT, () => {
  console.log(`server listening at port ${PORT}...`)
})
