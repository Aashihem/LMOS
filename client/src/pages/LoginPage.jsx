import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage({ onLogin }) {
  const [loginType, setLoginType] = useState('student'); // 'student' or 'faculty'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  // Animation effect on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowForm(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Specific handler for student login (insecure check)
  const handleStudentLogin = async () => {
    try {
      // NOTE: This endpoint now expects a different request body
      const response = await fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Student login successful:', data);

        localStorage.setItem('username', data.user.username);
        if (data.user.uid_no) {
            localStorage.setItem('uid_no', data.user.uid_no);
        }
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userType', 'student');

        onLogin();
        navigate('/dashboard');
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Invalid username or password');
      }
    } catch (err) {
      console.error('Login failed:', err);
      setError('Server error. Please try again later.');
    }
  };

  // Hardcoded handler for faculty login
  const handleFacultyLogin = () => {
    // This is the insecure, hardcoded login check
    if (username === 'prof.smith' && password === 'password') {
      console.log('Faculty login successful');
      localStorage.setItem('username', 'prof.smith');
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userType', 'faculty');
      
      onLogin();
      navigate('/dashboard');
    } else {
      setError('Invalid faculty credentials.');
    }
  };

  // This function decides which of the two handlers to call
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (loginType === 'student') {
      await handleStudentLogin();
    } else {
      // Simulate a small delay for faculty for better UX
      setTimeout(() => {
        handleFacultyLogin();
        setIsLoading(false);
      }, 500);
      return; // Prevent setIsLoading from being called twice
    }
    
    setIsLoading(false);
  };

  const activeTabStyles = {
    background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
    color: 'white',
    boxShadow: '0 4px 14px 0 rgba(0, 118, 255, 0.39)',
  };

  const inactiveTabStyles = {
    background: 'rgba(30, 41, 59, 0.8)',
    color: '#e2e8f0',
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Background decorative elements */}
      <div
        style={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.05) 70%)',
          top: '-100px',
          right: '-100px',
          filter: 'blur(40px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(59, 130, 246, 0.05) 70%)',
          bottom: '-150px',
          left: '-150px',
          filter: 'blur(50px)',
        }}
      />

      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          backdropFilter: 'blur(16px)',
          backgroundColor: 'rgba(30, 41, 59, 0.75)',
          padding: '2.5rem',
          borderRadius: '1.25rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          transform: showForm ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.98)',
          opacity: showForm ? 1 : 0,
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
            borderTopLeftRadius: '1.25rem',
            borderTopRightRadius: '1.25rem',
          }}
        />
        
        <h1
          style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            marginBottom: '1rem',
            textAlign: 'center',
            background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            textShadow: '0 0 30px rgba(59, 130, 246, 0.3)',
            letterSpacing: '-0.025em',
          }}
        >
          L.M.O.S.
        </h1>
        
        {/* Login Type Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem', background: 'rgba(15, 23, 42, 0.5)', borderRadius: '0.75rem', padding: '0.25rem' }}>
          <button
            onClick={() => setLoginType('student')}
            style={{
                flex: 1,
                padding: '0.6rem 1rem',
                border: 'none',
                borderRadius: '0.6rem',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                ...(loginType === 'student' ? activeTabStyles : inactiveTabStyles)
            }}
          >
            Student
          </button>
          <button
            onClick={() => setLoginType('faculty')}
            style={{
                flex: 1,
                padding: '0.6rem 1rem',
                border: 'none',
                borderRadius: '0.6rem',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                ...(loginType === 'faculty' ? activeTabStyles : inactiveTabStyles)
            }}
          >
            Faculty
          </button>
        </div>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1.75rem' }}>
            <label 
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '600',
                letterSpacing: '0.025em',
                color: '#e2e8f0',
              }}
            >
              Username
            </label>
            <div
              style={{
                position: 'relative',
                transition: 'all 0.2s ease',
              }}
            >
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={`Enter ${loginType} username`}
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  paddingLeft: '2.75rem',
                  borderRadius: '0.75rem',
                  backgroundColor: 'rgba(30, 41, 59, 0.8)',
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.2s ease',
                  fontSize: '0.95rem',
                  outline: 'none',
                }}
                onFocus={(e) => {
                  e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.3)';
                  e.target.style.borderColor = '#3b82f6';
                }}
                onBlur={(e) => {
                  e.target.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
                required
              />
              <div
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#64748b',
                }}
              >
                {/* User icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
            </div>
          </div>
          
          <div style={{ marginBottom: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <label 
                style={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  letterSpacing: '0.025em',
                  color: '#e2e8f0',
                }}
              >
                Password
              </label>
              <a 
                href="#" 
                style={{
                  fontSize: '0.75rem',
                  color: '#60a5fa',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseOver={(e) => e.target.style.color = '#93c5fd'}
                onMouseOut={(e) => e.target.style.color = '#60a5fa'}
              >
                Forgot password?
              </a>
            </div>
            <div
              style={{
                position: 'relative',
              }}
            >
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  paddingLeft: '2.75rem',
                  borderRadius: '0.75rem',
                  backgroundColor: 'rgba(30, 41, 59, 0.8)',
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.2s ease',
                  fontSize: '0.95rem',
                  outline: 'none',
                }}
                onFocus={(e) => {
                  e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.3)';
                  e.target.style.borderColor = '#3b82f6';
                }}
                onBlur={(e) => {
                  e.target.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
                required
              />
              <div
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#64748b',
                }}
              >
                {/* Lock icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
            </div>
          </div>
          
          {error && (
            <div 
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                borderLeft: '3px solid #ef4444',
                color: '#fca5a5',
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              {error}
            </div>
          )}
          
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              padding: '0.875rem',
              borderRadius: '0.75rem',
              fontWeight: '600',
              fontSize: '1rem',
              color: 'white',
              border: 'none',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.3)',
              position: 'relative',
              overflow: 'hidden',
              transform: isLoading ? 'translateY(0)' : '',
              opacity: isLoading ? 0.8 : 1,
            }}
            onMouseOver={(e) => {
              if (!isLoading) {
                e.target.style.boxShadow = '0 15px 20px -3px rgba(59, 130, 246, 0.4)';
                e.target.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseOut={(e) => {
              if (!isLoading) {
                e.target.style.boxShadow = '0 10px 15px -3px rgba(59, 130, 246, 0.3)';
                e.target.style.transform = 'translateY(0)';
              }
            }}
          >
            {isLoading ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <style>{`
                  @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                  }
                `}</style>
                <svg 
                  style={{
                    animation: 'spin 1s linear infinite',
                    marginRight: '0.5rem',
                  }}
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
                </svg>
                Processing...
              </div>
            ) : 'Login'}
          </button>
        </form>
        
        <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.875rem', color: '#94a3b8' }}>
          Don't have an account?{' '}
          <a 
            href="#" 
            style={{
              color: '#60a5fa',
              textDecoration: 'none',
              fontWeight: '500',
              transition: 'color 0.2s ease',
            }}
            onMouseOver={(e) => e.target.style.color = '#93c5fd'}
            onMouseOut={(e) => e.target.style.color = '#60a5fa'}
          >
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}

