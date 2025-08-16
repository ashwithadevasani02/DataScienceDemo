'use client'
import { useState, useEffect } from 'react'
import FormComponent from './components/FormComponent'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import ConnectWithUs from './components/ConnectWithUs'
import Image from "next/image";
export default function Home() {
  const [user, setUser]=useState(null)
  const [isClient, setIsClient] = useState(false)
  const [showSignup, setShowSignup]=useState(false)
  useEffect(() => {
    setIsClient(true)
    const storedUser = localStorage.getItem('dsclub_user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])
  const [registrationSuccess, setRegistrationSuccess]=useState(false)
  const [formData, setFormData]=useState({
    fullName: '',
    rollNumber: '',
    email: '',
    phoneNumber: '',
    collegeName: '',
    branch: '',
    yearOfStudy: '',
    program: '',
    topics: '',
    specificQuestions: ''
  })
  const handleLogin = (userData) => {
    console.log('LOGIN DEBUG - userData received:', userData)
    setUser(userData)
    if (isClient) {
      localStorage.setItem('dsclub_user', JSON.stringify(userData))
    }
  }
  const handleSignup = (userData) => {
    setUser(userData)
    if (isClient) {
      localStorage.setItem('dsclub_user', JSON.stringify(userData))
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
    if (isClient) {
      localStorage.removeItem('dsclub_user')
    }
  }
  const handleFormSubmit = async (e) => {
    e.preventDefault()  
    try {
      const response = await fetch('/api/registrations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userId: user.id
        }),
      })
      const data = await response.json()
      if (response.ok) {
        console.log('Registration successful:', data)
        setRegistrationSuccess(true)
      } else {
        alert(data.error || 'Registration failed')
      }
    } catch (error) {
      console.error('Registration error:', error)
      alert('Registration failed. Please try again.')
    }
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-block mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Image
                           src="/data.jpg"
                           alt="Instagram"
                           width={80}
                           height={80}
                           className="rounded-lg shadow-xl transition-transform duration-300 hover:scale-105"
                         />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Data Science Club
            </h1>
            <p className="text-xl text-blue-200">
              Where innovation meets knowledge
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-2xl p-6 mb-6">
            <div className="flex space-x-2 mb-6">
              <button
                onClick={() => setShowSignup(false)}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                  !showSignup
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setShowSignup(true)}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                  showSignup
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Sign Up
              </button>
            </div>

            {!showSignup ? (
              <LoginForm 
                userType="student"
                onLogin={handleLogin}
                onSignup={() => setShowSignup(true)}
              />
            ) : (
              <SignupForm
                onSignup={handleSignup}
                onBackToLogin={() => setShowSignup(false)}
              />
            )}
          </div>
          <div className="text-center mt-8">
            <p className="text-blue-200 text-sm">
              &copy; 2025 Data Science Club. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    )
  }
  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex justify-between items-center mb-6">
            <div></div>
            <div className="flex items-center space-x-4">
              <span className="text-blue-200">
                Welcome, {user?.fullName || user?.username || user?.email || 'User'}!
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Data Science Club
          </h1>
          <p className="text-xl text-blue-200">
            Where innovation meets knowledge
          </p>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 items-start">
          <div className="flex h-full items-center justify-center py-8 lg:py-0 w-full">
            <div className="flex justify-center w-full h-full items-center">
                <Image src="/poster.png" alt="Data Science Club Poster" width={500} height={700} className="mx-auto rounded-lg shadow-xl transition-transform duration-300 hover:scale-105 object-contain max-h-[900px] w-auto" />
            </div>
          </div>
          <div className="flex items-center justify-center py-8 lg:py-0 w-full">
            <div className="w-full max-w-2xl flex flex-col justify-center min-h-[400px]">
              {!registrationSuccess ? (
                <FormComponent 
                  formData={formData}
                  onInputChange={handleInputChange}
                  onSubmit={handleFormSubmit}
                />
              ) : (
                <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col justify-center min-h-[400px]">
                  <div className="text-center">
                    <div className="text-6xl mb-6 text-green-500">✅</div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                      Registration Successful!
                    </h2>
                    <p className="text-lg text-gray-600 mb-6">
                      Thank you for registering with Data Science Club. We&apos;ve received your application and will contact you soon with further details.
                    </p>
                    <div className="bg-green-50 rounded-lg p-4">
                      <p className="text-sm text-green-700">
                        <strong>Registration ID:</strong> {Date.now()}<br/>
                        <strong>Date:</strong> {new Date().toLocaleDateString('en-IN')}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mb-16">
          <ConnectWithUs />
        </div>
        <footer className="text-center mt-16 text-blue-200">
          <p>&copy; 2025 Data Science Club. All rights reserved.</p>
        </footer>
      </div>
    </main>
  )
} 