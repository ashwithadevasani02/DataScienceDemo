'use client'
import Image from "next/image";
export default function FormComponent({ formData, onInputChange, onSubmit }) {
  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8">
      <div className="text-center mb-8">
        <div className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-4">
          STUDENT REGISTRATION
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Join Data Science Club
        </h2>
        <p className="text-gray-600">
          Fill out the form below to become a member of our community
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={onInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label htmlFor="rollNumber" className="block text-sm font-medium text-gray-700 mb-2">
              Roll Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="rollNumber"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={onInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter your roll number"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={onInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter your email address"
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={onInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter your phone number"
            />
          </div>
          <div>
            <label htmlFor="collegeName" className="block text-sm font-medium text-gray-700 mb-2">
              College Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="collegeName"
              name="collegeName"
              value={formData.collegeName}
              onChange={onInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter your college name"
            />
          </div>
          <div>
            <label htmlFor="branch" className="block text-sm font-medium text-gray-700 mb-2">
              Branch <span className="text-red-500">*</span>
            </label>
            <select
              id="branch"
              name="branch"
              value={formData.branch}
              onChange={onInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">Select branch</option>
              <option value="CSE (Computer Science and Engineering)">CSE (Computer Science and Engineering)</option>
              <option value="CSM">CSM (Computer Science and Machine Learning)</option>
              <option value="CSC">CSC (Computer Science and Cyber Security)</option>
              <option value="ECE">ECE (Electronics and Communication Engineering)</option>
              <option value="EEE">EEE (Electrical and Electronics Engineering)</option>
              <option value="CIVIL">Civil Engineering</option>
              <option value="CHEMICAL">Chemical Engineering</option>
              <option value="MECHANICAL">Mechanical Engineering</option>
              <option value="METALLURGY">Metallurgical and Materials Engineering</option>
              <option value="BioTech">BioTech</option>
              <option value="GeoInformatics">GeoInformatics</option>
            </select>
          </div>
          <div>
            <label htmlFor="yearOfStudy" className="block text-sm font-medium text-gray-700 mb-2">
              Year of Study <span className="text-red-500">*</span>
            </label>
            <select
              id="yearOfStudy"
              name="yearOfStudy"
              value={formData.yearOfStudy}
              onChange={onInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">Select year</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>
          </div>
          <div>
            <label htmlFor="program" className="block text-sm font-medium text-gray-700 mb-2">
              Program <span className="text-red-500">*</span>
            </label>
            <select
              id="program"
              name="program"
              value={formData.program}
              onChange={onInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">Select program</option>
              <option value="Regular">Regular</option>
              <option value="IDP">IDP (Integrated Dual Degree Program)</option>
              <option value="IDDMP">IDDMP (Integrated Double Degree Master Program)</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="topics" className="block text-sm font-medium text-gray-700 mb-2">
            Topics of Interest <span className="text-red-500">*</span>
          </label>
          <textarea
            id="topics"
            name="topics"
            value={formData.topics}
            onChange={onInputChange}
            required
            rows="3"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="What topics in Data Science interest you? (e.g., Machine Learning, AI, Big Data, etc.)"
          />
        </div>
        <div>
          <label htmlFor="specificQuestions" className="block text-sm font-medium text-gray-700 mb-2">
            Specific Questions or Concerns
          </label>
          <textarea
            id="specificQuestions"
            name="specificQuestions"
            value={formData.specificQuestions}
            onChange={onInputChange}
            rows="3"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Any specific questions about the club, events, or activities?"
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-8 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Submit Registration
          </button>
        </div>
      </form>
        <div className="flex justify-center mt-8">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-2 rounded-xl shadow-lg inline-block">
            <Image
              src="/image.png"
              alt="QR Code"
              width={128}
              height={128}
              className="rounded-lg border-4 border-white shadow-xl transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
      </div>
  );
} 