import mongoose from 'mongoose'

import { DEVELOPMENT_DB_URL } from './serverConfig'
import { NODE_ENV } from './serverConfig'
import { PRODUCTION_DB_URL } from './serverConfig'

export class DBConfig {
  private static instance: DBConfig
  private isConnected = false

  private constructor() {}

  public static getInstance(): DBConfig {
    if (!DBConfig.instance) {
      DBConfig.instance = new DBConfig()
    }
    return DBConfig.instance
  }

  public async connect(): Promise<void> {
    if (this.isConnected) {
      console.log('already connected to db')
      return
    }
    try {
      const dbUrl =
        NODE_ENV === 'development' ? DEVELOPMENT_DB_URL : PRODUCTION_DB_URL
      await mongoose.connect(dbUrl!)
      this.isConnected = true
      console.log('Connected to DB')
    } catch (error) {
      console.error('Failed to connect to DB', error)
      process.exit(1)
    }
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnected) {
      console.log('not connected to db')
      return
    }
    try {
      await mongoose.disconnect()
      this.isConnected = false
      console.log('Disconnected from DB')
    } catch (error) {
      console.error('Failed to disconnect from DB', error)
    }
  }
}

export const dbConfig = DBConfig.getInstance()
