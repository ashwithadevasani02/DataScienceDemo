import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import bcrypt from 'bcryptjs'
import { sendOtpEmail } from '@/lib/mailer'
export const runtime = 'nodejs'
export async function POST(request) {
  try {
    await connectDB()
    const { fullName, email, password, phoneNumber } = await request.json()
    
    // Check if email already exists
    const existingUserByEmail = await User.findOne({ email })
    if (existingUserByEmail) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      )
    }
    
    // Generate unique username from email
    const baseUsername = email.split('@')[0]
    let username = baseUsername
    let counter = 1
    
    // Ensure username is unique
    while (await User.findOne({ username })) {
      username = `${baseUsername}${counter}`
      counter++
    }
    
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString()
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000) 
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    const user = new User({
      username,
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
      userType: 'student',
      otp: {
        code: otpCode,
        expiresAt: otpExpiresAt
      }
    })
    await user.save()
    try {
      await sendOtpEmail(email, otpCode)
      return NextResponse.json({
        message: 'User created successfully. Please verify your email with OTP.',
        userId: user._id
      })
    } catch (emailError) {
      console.error('Failed to send OTP email:', emailError)
      await User.findByIdAndDelete(user._id)
      return NextResponse.json(
        { error: 'Account created but failed to send verification email. Please try again or contact support.' },
        { status: 500 }
      )
    }
    
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 