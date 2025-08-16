import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Registration from '@/models/Registration'

export const runtime = 'nodejs'

export async function POST(request) {
  try {
    await connectDB()
    
    const registrationData = await request.json()
    
    // Create new registration
    const registration = new Registration(registrationData)
    await registration.save()
    
    return NextResponse.json({
      message: 'Registration successful',
      registration: registration
    })
    
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const branch = searchParams.get('branch')
    const program = searchParams.get('program')
    
    // Build filter object
    const filter = {}
    if (branch && branch !== 'all') filter.branch = branch
    if (program && program !== 'all') filter.program = program
    
    // Get registrations with filters
    const registrations = await Registration.find(filter)
      .sort({ registrationDate: -1 })
      .populate('userId', 'fullName email')
    
    return NextResponse.json({
      registrations: registrations
    })
    
  } catch (error) {
    console.error('Get registrations error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 