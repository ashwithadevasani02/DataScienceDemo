'use client'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
export default function SignupForm({onSignup, onBackToLogin}) {
  const [signupData, setSignupData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [otp, setOtp] = useState('')
  const [showOtpInput, setShowOtpInput] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [userId, setUserId] = useState(null)
  const [message, setMessage] = useState('')
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setSignupData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  const handleSignupSubmit = async (e) => {
    e.preventDefault()
    if (signupData.password !== signupData.confirmPassword) {
      alert('Passwords do not match!')
      return
    }
    setIsLoading(true)
    setMessage('')
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: signupData.fullName,
          email: signupData.email,
          password: signupData.password, 
        phoneNumber: signupData.phoneNumber
        }),
      })
      const data = await response.json()
      if (response.ok) {
        setUserId(data.userId)
        setShowOtpInput(true)
        setMessage('An OTP has been sent to your email. Please enter it below.')
      } else {
        alert(data.error || 'Signup failed')
      }
    } catch (error) {
      console.error('Signup error:', error)
      setMessage(`Signup failed: ${error.message}`)
      alert(`Signup failed: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleOtpSubmit = async (e) => {
    e.preventDefault()

    if (!userId) {
      alert('User ID not found. Please try signing up again.')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, otp }),
      })

      const data = await response.json()

      if (response.ok) {
        // Create session
        const sessionResponse = await fetch('/api/auth/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'create',
            userData: {
              id: data.user.id,
              username: data.user.username,
              type: data.user.userType,
              fullName: data.user.fullName,
              email: data.user.email,
              phoneNumber: signupData.phoneNumber
            }
          })
        })
        
        if (sessionResponse.ok) {
          const sessionData = await sessionResponse.json()
          onSignup({
            id: data.user.id,
            username: data.user.username,
            type: data.user.userType,
            fullName: data.user.fullName,
            email: data.user.email,
            phoneNumber: signupData.phoneNumber,
            sessionId: sessionData.sessionId
          })
        } else {
          alert('Failed to create session')
        }
      } else {
        alert(data.error || 'OTP verification failed')
      }
    } catch (error) {
      console.error('OTP verification error:', error)
      alert('OTP verification failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOtp = async () => {
    if (!userId) {
      alert('User ID not found. Please try signing up again.')
      return
    }

    try {
      const response = await fetch('/api/auth/resend-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      })

      const data = await response.json()

      if (response.ok) {
        setOtp('')
        setMessage('OTP resent to your email.')
      } else {
        alert(data.error || 'Failed to resend OTP')
      }
    } catch (error) {
      console.error('Resend OTP error:', error)
      alert('Failed to resend OTP. Please try again.')
    }
  }

  // OTP input screen
  if (showOtpInput) {
    return (
      <div className="bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-green-600 text-2xl">📱</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Verify OTP</h2>
          <p className="text-gray-600">{message}</p>
        </div>

        <form onSubmit={handleOtpSubmit} className="space-y-6">
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
              Enter OTP <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              maxLength="6"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center text-lg tracking-widest focus:ring-2 focus:ring-green-500"
              placeholder="123456"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 px-6 rounded-lg font-semibold"
          >
            {isLoading ? 'Verifying...' : 'Verify & Create Account'}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={handleResendOtp}
              className="text-green-600 hover:text-green-700 text-sm font-medium"
            >
              Resend OTP
            </button>
          </div>
        </form>
      </div>
    )
  }

  // Signup form screen
  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Account</h2>
        <p className="text-gray-600">Join Data Science Club and start your journey</p>
      </div>

      <form onSubmit={handleSignupSubmit} className="space-y-4">
        <input type="text" name="fullName" placeholder="Full Name" value={signupData.fullName} onChange={handleInputChange} required className="w-full px-4 py-3 border rounded-lg" />
        <input type="email" name="email" placeholder="Email" value={signupData.email} onChange={handleInputChange} required className="w-full px-4 py-3 border rounded-lg" />
        <input type="tel" name="phoneNumber" placeholder="Phone Number" value={signupData.phoneNumber} onChange={handleInputChange} required className="w-full px-4 py-3 border rounded-lg" />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={signupData.password}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border rounded-lg pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-3 text-gray-500 hover:text-blue-600 focus:outline-none"
            tabIndex={-1}
          >
            {showPassword ? (
              <FontAwesomeIcon icon={faEyeSlash} className="h-5 w-5" />
            ) : (
              <FontAwesomeIcon icon={faEye} className="h-5 w-5" />
            )}
          </button>
        </div>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={signupData.confirmPassword}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border rounded-lg pr-12"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-3 top-3 text-gray-500 hover:text-blue-600 focus:outline-none"
            tabIndex={-1}
          >
            {showConfirmPassword ? (
              <FontAwesomeIcon icon={faEyeSlash} className="h-5 w-5" />
            ) : (
              <FontAwesomeIcon icon={faEye} className="h-5 w-5" />
            )}
          </button>
        </div>
        <button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg">
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>
        {message && (
          <div className={`text-center p-3 rounded-lg ${
            message.includes('failed') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
          }`}>
            {message}
          </div>
        )}
        <div className="text-center">
          <button type="button" onClick={onBackToLogin} className="text-gray-600 hover:text-gray-700 text-sm">
            Already have an account? Login
          </button>
        </div>
      </form>
    </div>
  )
}
