import connectDB from '../lib/mongodb.js'
import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()
dotenv.config({ path: '.env.local' })
async function seedAdmin() {
  try {
    await connectDB()
    const existingAdmin = await User.findOne({ userType: 'admin' })
    if (existingAdmin) {
      console.log('Admin user already exists')
      process.exit(0)
    } else {
      console.log('Creating new admin user...')
      const saltRounds = 10
      const adminPassword = process.env.ADMIN_PASSWORD || 'demo123'
      console.log(`Using password from: ${process.env.ADMIN_PASSWORD ? '.env.local' : 'default fallback'}`)
      const hashedPassword = await bcrypt.hash(adminPassword, saltRounds)
      const adminUser = new User({
        username: 'admin-demo',
        fullName: 'Admin User',
        email: 'admin@dsclub.com',
        password: hashedPassword,
        phoneNumber: '0000000000',
        userType: 'admin',
        isVerified: true
      })     
      await adminUser.save()
      console.log('Admin user created successfully')
      process.exit(0)
    }
    
  } catch (error) {
    console.error('Error seeding admin user:', error)
    process.exit(1)
  }
}

seedAdmin()