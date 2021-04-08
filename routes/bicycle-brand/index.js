'use strict'
const got = require('got')
const { promisify } = require('util')
const { bicycle } = require('../../services/bicycle-service-mock')
const { brand } = require('../../services/brand-service-mock')

const bicycleGet = promisify(bicycle.get)
const brandGet = promisify(brand.get)


module.exports = async function (fastify, opts) {
  fastify.get('/:id', async function (request, reply) {
    const { id } = request.params
    const tst = await Promise.all([
      bicycleGet(id),
      brandGet(id)
    ])
    console.log(tst)
    const [ bicycle, brand ] = await Promise.all([
      bicycleGet(id),
      brandGet(id)
    ])
    return {
      id: bicycle.id,
      color: bicycle.color,
      brand: brand.name,
    }
  })
}