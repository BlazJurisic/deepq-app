import React, { useState } from 'react';
import { X, Send, ArrowLeft, Loader2, CheckCircle } from 'lucide-react';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ForgotPasswordModal({ isOpen, onClose }: ForgotPasswordModalProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSuccess(true);
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setError('');
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-background-card rounded-lg w-full max-w-md shadow-xl">
        <div className="flex items-center justify-between p-4 border-b">
          <button
            onClick={handleClose}
            className="text-content-secondary hover:text-content-primary transition-colors"
          >
            {isSuccess ? <X size={20} /> : <ArrowLeft size={20} />}
          </button>
          <h3 className="text-lg font-semibold text-content-primary">Reset Password</h3>
          <div className="w-5" /> {/* Spacer for alignment */}
        </div>

        <div className="p-6">
          {isSuccess ? (
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-content-primary mb-2">
                Check your email
              </h4>
              <p className="text-content-secondary mb-4">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
              <button
                onClick={handleClose}
                className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Return to login
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <p className="text-content-secondary mb-4">
                  Enter your email address and we'll send you instructions to reset your password.
                </p>
                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg text-sm mb-4 animate-fade-in">
                    {error}
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-content-secondary mb-2">
                    Email address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-background-primary border rounded-lg text-content-primary focus:ring-2 focus:ring-purple-500/30 focus:outline-none"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || !email}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Send size={18} />
                    <span>Send Reset Link</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}