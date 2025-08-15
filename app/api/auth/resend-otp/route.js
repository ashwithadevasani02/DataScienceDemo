import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import { sendOtpEmail } from '@/lib/mailer'
export const runtime = 'nodejs'
export async function POST(request) {
  try {
    await connectDB()
    const { userId } = await request.json()
    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 })
    }
    const user = await User.findById(userId)
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    if (user.isVerified) {
      return NextResponse.json({ error: 'User is already verified' }, { status: 400 })
    }
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString()
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000)
    user.otp = { code: otpCode, expiresAt: otpExpiresAt }
    await user.save()
    await sendOtpEmail(user.email, otpCode)
    return NextResponse.json({ message: 'OTP resent successfully' })
  } catch (error) {
    console.error('Resend OTP error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}


