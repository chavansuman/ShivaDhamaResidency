
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, User, AlertCircle, Loader2, Eye, EyeOff, ShieldCheck } from 'lucide-react';

const AdminLogin = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Hardcoded credentials as requested (in a real app, these should be environment variables or DB backed)
  // Hiding actual strings from plain sight slightly using basic obfuscation/constants if desired, 
  // but for this request, direct comparison is most reliable.
  const ADMIN_USER = "admin";
  const ADMIN_PASS = "shiva@123";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate network delay for better UX
    setTimeout(() => {
      try {
        if (username.trim() === ADMIN_USER && password === ADMIN_PASS) {
          // Success
          // Store a simple "session" marker in localStorage
          localStorage.setItem('admin_authenticated', 'true');
          localStorage.setItem('admin_login_time', Date.now().toString());
          onLoginSuccess();
        } else {
          throw new Error('Invalid username or password.');
        }
      } catch (err) {
        console.error('Login failed:', err);
        setError('Incorrect username or password.');
      } finally {
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 border border-gray-100 animate-in fade-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-maroon/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-maroon" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Portal</h1>
          <p className="text-gray-500 mt-2 text-sm">Authorized Access Only</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 p-3 rounded-lg text-sm flex items-start animate-in fade-in slide-in-from-top-1">
              <AlertCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input 
                id="username"
                type="text" 
                placeholder="Enter username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10"
                autoComplete="username"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input 
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-maroon hover:bg-maroon-dark text-white h-11 font-medium transition-all"
            disabled={isLoading}
          >
            {isLoading ? (
               <>
                 <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Authenticating...
               </>
            ) : 'Login'}
          </Button>

          <div className="text-center pt-2">
             <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
               <ShieldCheck className="w-3 h-3" /> Secure System
             </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
