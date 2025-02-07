import dotenv from 'dotenv'

dotenv.config()

export const PORT = process.env.PORT || 3000
export const NODE_ENV = process.env.NODE_ENV || 'development'
export const DEVELOPMENT_DB_URL = process.env.DEVELOPMENT_DB_URL
export const PRODUCTION_DB_URL = process.env.PRODUCTION_DB_URL
