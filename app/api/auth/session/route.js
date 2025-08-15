import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'

// In-memory session store (in production, use Redis or database)
const sessions = new Map()

export async function POST(request) {
  try {
    const { action, sessionId, userData } = await request.json()
    
    if (action === 'create') {
      // Create new session
      const sessionId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
      const expiresAt = Date.now() + (24 * 60 * 60 * 1000) // 24 hours
      
      sessions.set(sessionId, {
        userData,
        expiresAt
      })
      
      return NextResponse.json({ sessionId, expiresAt })
    }
    
    if (action === 'get') {
      // Get session data
      const session = sessions.get(sessionId)
      
      if (!session) {
        return NextResponse.json({ error: 'Session not found' }, { status: 404 })
      }
      
      if (Date.now() > session.expiresAt) {
        sessions.delete(sessionId)
        return NextResponse.json({ error: 'Session expired' }, { status: 401 })
      }
      
      return NextResponse.json({ userData: session.userData })
    }
    
    if (action === 'delete') {
      // Delete session
      sessions.delete(sessionId)
      return NextResponse.json({ message: 'Session deleted' })
    }
    
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    
  } catch (error) {
    console.error('Session error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Clean up expired sessions every hour
setInterval(() => {
  const now = Date.now()
  for (const [sessionId, session] of sessions.entries()) {
    if (now > session.expiresAt) {
      sessions.delete(sessionId)
    }
  }
}, 60 * 60 * 1000)

