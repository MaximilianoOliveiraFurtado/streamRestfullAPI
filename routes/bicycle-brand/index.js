'use strict'
const got = require('got')
const { promisify } = require('util')
const { bicycle } = require('../../services/bicycle-service-mock')
const { brand } = require('../../services/brand-service-mock')

const bicycleGet = promisify(bicycle.get)
const brandGet = promisify(brand.get)


module.exports = async function (fastify, opts) {
  const { httpErrors } = fastify
  fastify.get('/:id', async function (request, reply) {
    const { id } = request.params
    try {
      const [ bicycle, brand ] = await Promise.all([
        bicycleGet(id),
        brandGet(id)
      ])
      return {
        id: bicycle.id,
        color: bicycle.color,
        brand: brand.name,
      }
    } catch (err) {
      if (!err.response) throw err
      if (err.response.statusCode === 404) {
        throw httpErrors.notFound()
      }
      if (err.response.statusCode === 400) {
        throw httpErrors.badRequest()
      }
      throw err
    }
  })
}