const mongoose = require('mongoose')

// MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dsclub'

// User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true
  },
  userType: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student'
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  otp: {
    code: String,
    expiresAt: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// Registration Schema
const registrationSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  rollNumber: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true
  },
  collegeName: {
    type: String,
    required: true,
    trim: true
  },
  branch: {
    type: String,
    required: true,
    enum: [
      'CSE (Computer Science and Engineering)',
      'CSM',
      'CSC',
      'ECE',
      'EEE',
      'CIVIL',
      'CHEMICAL',
      'MECHANICAL',
      'METALLURGY',
      'BioTech',
      'GeoInformatics'
    ]
  },
  yearOfStudy: {
    type: String,
    required: true,
    enum: ['1st Year', '2nd Year', '3rd Year', '4th Year']
  },
  program: {
    type: String,
    required: true,
    enum: ['Regular', 'IDP', 'IDDMP']
  },
  topics: {
    type: String,
    required: true,
    trim: true
  },
  specificQuestions: {
    type: String,
    required: true,
    trim: true
  },
  registrationDate: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

const User = mongoose.model('User', userSchema)
const Registration = mongoose.model('Registration', registrationSchema)

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI)

    try {
      await mongoose.connection.db.dropCollection('users');
    } catch (err) {
      if (err.code !== 26) {
        throw err;
      }
    }
    await Registration.deleteMany({})

    // Create admin user
    require('dotenv').config();
    require('dotenv').config({ path: '.env.local' });
    const bcrypt = require('bcryptjs');
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const hashedAdminPassword = await bcrypt.hash(adminPassword, 10);
    const adminUser = new User({
      username: 'admin',
      fullName: 'Admin User',
      email: 'admin@dsclub.com',
      password: hashedAdminPassword,
      phoneNumber: '1234567890',
      userType: 'admin',
      isVerified: true
    })
    await adminUser.save()

    // Create demo student user
    const hashedStudentPassword = await bcrypt.hash('student123', 10);
    const studentUser = new User({
      username: 'student',
      fullName: 'Demo Student',
      email: 'student@demo.com',
      password: hashedStudentPassword,
      phoneNumber: '9876543210',
      userType: 'student',
      isVerified: true
    })
    await studentUser.save()

    console.log('Database seeded successfully!')
    console.log('Admin: admin@dsclub.com / admin123')
    console.log('Student: student@demo.com / student123')

  } catch (error) {
    console.error('Error seeding database:', error)
  } finally {
    await mongoose.disconnect()
  }
}

seedDatabase()