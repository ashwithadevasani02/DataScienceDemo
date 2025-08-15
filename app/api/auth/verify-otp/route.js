import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
export async function POST(request) {
  try {
    await connectDB()
    const { userId, otp } = await request.json()
    const user = await User.findById(userId)
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }
    
    if (new Date() > user.otp.expiresAt) {
      return NextResponse.json(
        { error: 'OTP has expired. Please request a new one.' },
        { status: 400 }
      )
    }
    if (user.otp.code !== otp) {
      return NextResponse.json(
        { error: 'Invalid OTP' },
        { status: 400 }
      )
    }
    
    user.isVerified = true
    user.otp = undefined
    await user.save()
    return NextResponse.json({
      message: 'Email verified successfully!',
      user: {
        id: user._id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        userType: user.userType,
        isVerified: user.isVerified
      }
    })
    
  } catch (error) {
    console.error('OTP verification error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 