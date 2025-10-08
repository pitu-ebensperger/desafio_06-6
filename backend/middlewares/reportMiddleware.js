const reportMiddleware = (req, _res, next) => {
  const timestamp = new Date().toISOString()
  console.info(`[${timestamp}] ${req.method} ${req.originalUrl}`)
  next()
}

export default reportMiddleware
