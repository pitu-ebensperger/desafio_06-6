const allowedOrderFields = new Set(['id', 'email', 'rol', 'lenguage'])
const allowedDirections = new Set(['ASC', 'DESC'])

const validateQuery = (req, res, next) => {
  const query = req.query

  if (query.limit !== undefined) {
    const limit = Number(query.limit)
    if (!Number.isInteger(limit) || limit <= 0) {
      return res.status(400).json({ message: 'El parámetro "limit" debe ser un entero positivo.' })
    }
    query.limit = limit
  }

  if (query.page !== undefined) {
    const page = Number(query.page)
    if (!Number.isInteger(page) || page <= 0) {
      return res.status(400).json({ message: 'El parámetro "page" debe ser un entero positivo.' })
    }
    query.page = page
  }

  if (query.order_by !== undefined) {
    const normalizedField = String(query.order_by).toLowerCase()
    if (!allowedOrderFields.has(normalizedField)) {
      return res.status(400).json({ message: `El parámetro "order_by" debe ser uno de: ${[...allowedOrderFields].join(', ')}.` })
    }
    query.order_by = normalizedField
  }

  if (query.direction !== undefined) {
    const normalizedDirection = String(query.direction).toUpperCase()
    if (!allowedDirections.has(normalizedDirection)) {
      return res.status(400).json({ message: 'El parámetro "direction" debe ser ASC o DESC.' })
    }
    query.direction = normalizedDirection
  }

  if (query.filter !== undefined) {
    query.filter = String(query.filter).trim()
  }

  next()
}

export default validateQuery
