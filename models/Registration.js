import mongoose from 'mongoose'
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
      'CSM (Computer Science and Machine Learning)',
      'CSC (Computer Science and Cyber Security)',
      'ECE (Electronics and Communication Engineering)',
      'EEE (Electrical and Electronics Engineering)',
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
    required: false,
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

registrationSchema.index({ registrationDate: -1 })
registrationSchema.index({ branch: 1 })
registrationSchema.index({ program: 1 })
registrationSchema.index({ userId: 1 })

const Registration = mongoose.models.Registration||mongoose.model('Registration', registrationSchema)
export default Registration 