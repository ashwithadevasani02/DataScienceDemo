import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'

export const runtime = 'nodejs'

export async function GET() {
  try {
    await connectDB()
    const users = await User.find({})
    return NextResponse.json({
      users: users.map(u => ({
        id: u._id,
        username: u.username,
        fullName: u.fullName,
        email: u.email,
        userType: u.userType,
        isVerified: u.isVerified
      }))
    })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
