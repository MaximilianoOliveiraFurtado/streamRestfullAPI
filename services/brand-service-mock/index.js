'use strict'
const got = require('got')

const {
  BRAND_SERVICE_PORT = 5000
} = process.env

const brandSrv = `http://localhost:${BRAND_SERVICE_PORT}`

module.exports = {
  brand: brandService()
}

function brandService () {
  
  return {
    get
  }

  async function get (id, cb) {
    const brand = await got(`${brandSrv}/${id}`).json()
    setImmediate(() => cb(null, brand))
  }

}