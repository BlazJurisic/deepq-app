import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import Logo from '../components/Logo';
import ForgotPasswordModal from '../components/auth/ForgotPasswordModal';
import { Loader2, Moon, Sun } from 'lucide-react';

export default function LoginView() {
  const { login, isLoading } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      console.log("email: ", email)
      console.log("pass: ", password)
      await login(
        {
          "username": email, 
          "password": password
        });
    } catch (err) {
      setError('Invalid email or password');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      
      // Add vibration if supported
      if ('vibrate' in navigator) {
        navigator.vibrate(200);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background-primary flex items-center justify-center p-4">
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 p-2 rounded-full bg-background-card text-content-secondary hover:text-content-primary transition-colors"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <div className="w-full max-w-md">
        <div 
          className={`bg-background-card rounded-lg shadow-lg p-8 border transition-all ${
            isShaking ? 'animate-shake' : ''
          }`}
        >
          <div className="flex justify-center mb-8">
            <Logo />
          </div>

          <h1 className="text-2xl font-bold text-content-primary text-center mb-8">
            Welcome to DeepQ
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg text-sm flex items-center space-x-2 animate-fade-in">
                <div className="w-1 h-full bg-red-500 rounded-full" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-content-secondary mb-2">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-3 py-2 bg-background-primary border rounded-lg text-content-primary transition-colors ${
                  error ? 'border-red-500/50 focus:ring-red-500/30' : 'focus:ring-purple-500/30'
                } focus:outline-none focus:ring-2`}
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-content-secondary mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-3 py-2 bg-background-primary border rounded-lg text-content-primary transition-colors ${
                  error ? 'border-red-500/50 focus:ring-red-500/30' : 'focus:ring-purple-500/30'
                } focus:outline-none focus:ring-2`}
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-content-secondary">
                  Remember me
                </label>
              </div>

              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-purple-600 hover:text-purple-500 transition-colors"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                'Sign in'
              )}
            </button>
          </form>
        </div>
      </div>

      <ForgotPasswordModal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
      />
    </div>
  );
}
