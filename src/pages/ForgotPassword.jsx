import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password reset logic here
    console.log('Password reset attempt for:', email);
    setIsSubmitted(true);
  };

  return (
    <div className="h-screen bg-gray-50 flex">
      {/* Left Panel - 60% width */}
      <div className="hidden lg:flex lg:w-2/5 bg-white">
        <img 
          src="/auth/forgot-password.png" 
          alt="MEINHAUS Reset Password Illustration" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Panel - 40% width */}
      <div className="lg:w-2/5 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                <div className="w-6 h-5 bg-blue-600 rounded-sm relative">
                  <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-white rounded-sm"></div>
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-blue-600">MEINHAUS</h1>
                <p className="text-xs text-blue-400">Online General Contractor</p>
              </div>
            </div>
          </div>

          {/* Reset Password Form */}
          <div className="bg-white p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Reset Password
              </h2>
              <p className="text-gray-600">
                Please enter your email, and we'll send you a password reset link.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Mail ID"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out"
              >
                Send Password Reset Link
              </button>
            </form>

            {/* Success Message */}
            {isSubmitted && (
              <div className="mt-6 p-4 border border-orange-300 rounded-lg bg-orange-50">
                <p className="text-sm text-gray-700">
                  Please check your email. We've sent you a reset link - follow it to reset your password.
                </p>
                <div className="mt-4 text-center">
                  <button 
                    type="button"
                    className="text-sm font-medium text-blue-600 hover:text-blue-500"
                    onClick={() => navigate('/set-new-password')}
                  >
                    Continue to Set New Password
                  </button>
                </div>
              </div>
            )}

            {/* Back to Login */}
            <div className="mt-6 text-center">
                           <button 
               type="button" 
               className="text-sm font-medium text-blue-600 hover:text-blue-500"
               onClick={() => navigate('/login')}
             >
               ← Back to Login
             </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
