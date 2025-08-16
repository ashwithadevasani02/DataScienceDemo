"use client";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function LoginForm({ userType, onLogin, onSignup }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const requestBody =
        userType === "admin"
          ? { username: formData.email, password: formData.password }
          : { email: formData.email, password: formData.password };
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Login failed");
        setFormData({ email: "", password: "" });
        setIsLoading(false);
        return;
      }
      if (onLogin) {
        onLogin(data.user);
      }
    } catch (error) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            {userType === "admin" ? "Username" : "Email"} <span className="text-red-500">*</span>
          </label>
          <input
            type={userType === "admin" ? "text" : "email"}
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder={userType === "admin" ? "Enter username" : "Enter email address"}
          />
        </div>
        <div className="relative">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pr-12"
            placeholder="Enter password"
          />
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute right-3 top-9 translate-y-1/3 mt-0.5 text-gray-500 hover:text-blue-600 focus:outline-none"
            tabIndex={-1}
          >
            {showPassword ? (
              <FontAwesomeIcon icon={faEyeSlash} className="h-5 w-5" />
            ) : (
              <FontAwesomeIcon icon={faEye} className="h-5 w-5" />
            )}
          </button>
        </div>
        {error && <div className="text-red-500 text-sm text-center mb-2">{error}</div>}
        {userType !== "admin" && (
          <div className="text-center">
            <button type="button" onClick={onSignup} className="text-gray-600 hover:text-gray-700 text-sm">
              Don't have an account? Sign Up
            </button>
          </div>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}