import mongoose from 'mongoose'

export async function initDatabase() {
  const DATABASE_URL = process.env.DATABASE_URL

  mongoose.connection.on('open', () => {
    console.info('Successfully connected to database:', DATABASE_URL)
  })

  try {
    return await mongoose.connect(DATABASE_URL)
  } catch (error) {
    console.error('MongoDB connection failed:', error.message)
    throw error
  }
}
