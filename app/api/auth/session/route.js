import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'

export const runtime = 'nodejs'

// Database-based session management for serverless deployment
export async function POST(request) {
  try {
    await connectDB()
    const { action, sessionId, userData } = await request.json()
    
    if (action === 'create') {
      // Create new session - store in user document
      const sessionId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
      const expiresAt = new Date(Date.now() + (24 * 60 * 60 * 1000)) // 24 hours
      
      // Update user with session data
      await User.findByIdAndUpdate(userData.id, {
        sessionId,
        sessionExpiresAt: expiresAt,
        lastLoginAt: new Date()
      })
      
      return NextResponse.json({ sessionId, expiresAt: expiresAt.getTime() })
    }
    
    if (action === 'get') {
      // Get session data from database
      const user = await User.findOne({ sessionId })
      
      if (!user) {
        return NextResponse.json({ error: 'Session not found' }, { status: 404 })
      }
      
      if (new Date() > user.sessionExpiresAt) {
        // Clean up expired session
        await User.findByIdAndUpdate(user._id, {
          $unset: { sessionId: 1, sessionExpiresAt: 1 }
        })
        return NextResponse.json({ error: 'Session expired' }, { status: 401 })
      }
      
      const userData = {
        id: user._id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        userType: user.userType,
        isVerified: user.isVerified
      }
      
      return NextResponse.json({ userData })
    }
    
    if (action === 'delete') {
      // Delete session from database
      await User.findOneAndUpdate(
        { sessionId },
        { $unset: { sessionId: 1, sessionExpiresAt: 1 } }
      )
      return NextResponse.json({ message: 'Session deleted' })
    }
    
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    
  } catch (error) {
    console.error('Session error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

