import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();
  setError('');

  try {
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
      console.log('Login successful:', data);
      localStorage.setItem('isLoggedIn', 'true'); // Store login state
      navigate('/dashboard'); // Redirect to the dashboard
    } else {
      const errorData = await response.json();
      setError(errorData.detail || 'Invalid username or password');
    }
  } catch (err) {
    console.error('Login failed:', err);
    setError('Server error. Please try again later.');
  }
};

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #0f172a, #1e293b)',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(30, 41, 59, 0.8)',
          padding: '2rem',
          borderRadius: '1rem',
          boxShadow: '0 0 40px rgba(0, 0, 0, 0.6)',
          border: '1px solid #334155',
        }}
      >
        <h1
          style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            marginBottom: '2rem',
            textAlign: 'center',
            background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            textShadow: '0 0 10px rgba(0,0,0,0.5)',
          }}
        >
          Welcome Back
        </h1>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label className="block mb-2 text-sm font-semibold tracking-wide">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
              required
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label className="block mb-2 text-sm font-semibold tracking-wide">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-lg font-bold hover:scale-[1.03] hover:shadow-xl transition-all duration-200 focus:ring-4 focus:ring-blue-500/50"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function LoginPage() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//       const response = await fetch('http://localhost:8000/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         body: new URLSearchParams({
//           username: username,
//           password: password,
//         }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         localStorage.setItem('accessToken', data.access_token);  // Store token
//         console.log('Login successful');
//         navigate('/dashboard');
//       } else {
//         const errorData = await response.json();
//         setError(errorData.detail || 'Invalid username or password');
//       }
//     } catch (err) {
//       console.error('Login failed:', err);
//       setError('Server error. Please try again later.');
//     }
//   };

//   return (
//     <div
//       style={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         minHeight: '100vh',
//         background: 'linear-gradient(to bottom right, #0f172a, #1e293b)',
//       }}
//     >
//       <div
//         style={{
//           width: '100%',
//           maxWidth: '400px',
//           backdropFilter: 'blur(10px)',
//           backgroundColor: 'rgba(30, 41, 59, 0.8)',
//           padding: '2rem',
//           borderRadius: '1rem',
//           boxShadow: '0 0 40px rgba(0, 0, 0, 0.6)',
//           border: '1px solid #334155',
//         }}
//       >
//         <h1
//           style={{
//             fontSize: '2.5rem',
//             fontWeight: '800',
//             marginBottom: '2rem',
//             textAlign: 'center',
//             background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
//             WebkitBackgroundClip: 'text',
//             color: 'transparent',
//             textShadow: '0 0 10px rgba(0,0,0,0.5)',
//           }}
//         >
//           Welcome Back
//         </h1>
//         <form onSubmit={handleLogin}>
//           <div style={{ marginBottom: '1.5rem' }}>
//             <label className="block mb-2 text-sm font-semibold tracking-wide">Username</label>
//             <input
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               placeholder="Enter username"
//               className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
//               required
//             />
//           </div>
//           <div style={{ marginBottom: '1.5rem' }}>
//             <label className="block mb-2 text-sm font-semibold tracking-wide">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Enter password"
//               className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
//               required
//             />
//           </div>
//           {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
//           <button
//             type="submit"
//             className="w-full bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-lg font-bold hover:scale-[1.03] hover:shadow-xl transition-all duration-200 focus:ring-4 focus:ring-blue-500/50"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
