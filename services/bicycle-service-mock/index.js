'use strict'
const got = require('got')

const {
  BICYCLE_SERVICE_PORT = 4000
} = process.env

const bicycleSrv = `http://localhost:${BICYCLE_SERVICE_PORT}`

module.exports = {
  bicycle: bicycleService()
}

function bicycleService () {
  
  return {
    get
  }

  async function get (id, cb) {
    try {
      const bicycleGet = await got(`${bicycleSrv}/${id}`).json()
      setImmediate(() => cb(null, bicycleGet))
    } catch (err) {
      setImmediate(() => cb(err))
    }
  }

}