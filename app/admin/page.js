'use client'
import Image from "next/image";
import {useState} from 'react'
import AdminDashboard from '../components/AdminDashboard'
import LoginForm from '../components/LoginForm'
export default function AdminPage() {
  const [user, setUser] = useState(null)
  const handleLogin = (userData) => {
    console.log('ADMIN LOGIN DEBUG - userData received:', userData)
    if (userData && userData.userType === 'admin') {
      setUser(userData)
    } else {
      alert('This route is only for admin users.')
    }
  }
  const handleLogout = async () => {
    if (user?.sessionId) {
      try {
        await fetch('/api/auth/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'delete',
            sessionId: user.sessionId
          })
        })
      } catch (error) {
        console.error('Failed to delete session:', error)
      }
    }
    setUser(null)
  }
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-pink-900 to-purple-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-block mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Image
            src="/data.jpg"
            alt="DataScience"
            width={80}
            height={80}
            className="rounded-lg shadow-xl transition-transform duration-300 hover:scale-105"
          />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Admin Portal
            </h1>
            <p className="text-xl text-pink-200">
              Data Science Club Administration
            </p>
          </div>
          <LoginForm 
            userType="admin"
            onLogin={handleLogin}
          />
          <div className="text-center mt-8">
            <p className="text-pink-200 text-sm">
              &copy; 2025 Data Science Club. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    )
  }
  return <AdminDashboard onLogout={handleLogout} />
} 