/**
 * @author Yujie Li
 * @email im_yujie@foxmail.com
 */

import express from 'express'
import bodyParser from 'body-parser'
import session from 'express-session'
import cors from 'cors'
import onHeaders from 'on-headers'

import { router } from './router'
import { cleanup as initDB } from './utils/cleanup'
import CONFIG from './config'


export const app = express()

// initialize databse
// define schema, drop legacy tables
initDB()

const PORT = CONFIG.url.split(':')[2]

app.use(cors({origin: 'http://localhost:8080', credentials: true}))

app.use(function(req, res, next) {
  onHeaders(res, function() {
    let cookie = res.getHeader('set-cookie')
    if (cookie)
    res.setHeader('token', cookie)
  })
  next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
  name: 'sid',
  secret: '**im a secret**',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: false,
    secure: false
  }
}))

// load router
app.use('/', router)

app.listen(PORT, () => {
  console.log(`server listening at port ${PORT}...`)
})
