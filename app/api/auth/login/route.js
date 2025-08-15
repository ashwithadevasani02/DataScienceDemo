import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import bcrypt from 'bcryptjs'
export const runtime = 'nodejs'
export async function POST(request) {
  try {
    await connectDB()
    const { email, password, username } = await request.json()
    // For admin login, use username; for student login, use email
    let user
    if (username) {
      // Admin login by username
      user = await User.findOne({ username })
    } else if (email) {
      // Student login by email (original logic)
      user = await User.findOne({ email })
    }
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }
  // TEMPORARY: Allow student login even if not verified
  // if (user.userType === 'student' && !user.isVerified) {
  //   return NextResponse.json(
  //     { error: 'Please verify your email with OTP first' },
  //     { status: 401 }
  //   )
  // }
    return NextResponse.json({
      message: 'Login successful',
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
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
