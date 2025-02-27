import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://mern-vendor-app.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        // Store the token in localStorage
        localStorage.setItem('token', data.token);

        alert('Login successful!');
        navigate('/dashboard');
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (err) {
      console.error('Login failed:', err);
      alert('Invalid email or password');
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-content">
          <h1 className="navbar-brand">Vendo</h1>
        </div>
      </nav>

      {/* Login Form */}
      <div className="login-container">
        <div className="login-form">
          <h1 className="title">Login</h1>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-field"
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input-field"
              />
            </div>
            <button type="submit" className="submit-btn">
              Login
            </button>
          </form>
          <p className="signup-link">
            Don't have an account?{' '}
            <a href="/signup" className="link">
              Sign Up
            </a>
          </p>
        </div>
      </div>

      <style jsx>{`
        /* Navbar Styling */
        .navbar {
          background-color: #3182ce;
          padding: 10px 20px;
          height: 100px;
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        // .navbar-content {
        //   display: flex;
        //   justify-content: center;
        //   align-items: center;
        // }

        .navbar-brand {
          font-size: 34px;
          font-weight: bold;
          margin: 0;
          color: white;
        }

        /* Container styling to center the form */
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 700px;
          background-color: #f4f7fc;
        }

        /* Styling for the form */
        .login-form {
          background-color: white;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
          transition: all 0.3s ease;
          text-align: center;
        }

        .login-form:hover {
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }

        /* Title styling */
        .title {
          font-size: 28px;
          font-weight: bold;
          text-align: center;
          margin-bottom: 30px;
          color: #333;
        }

        /* Group for input fields */
        .input-group {
          margin-bottom: 30px;
          margin-right: 30px;
        }

        /* Input field styling */
        .input-field {
          width: 100%;
          padding: 14px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 16px;
          outline: none;
          transition: border-color 0.3s ease;
        }

        .input-field:focus {
          border-color: #3182ce;
          box-shadow: 0 0 8px rgba(48, 130, 206, 0.3);
        }

        /* Submit button styling */
        .submit-btn {
          width: 100%;
          padding: 14px;
          background-color: #3182ce;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 18px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .submit-btn:hover {
          background-color: #2c5282;
        }

        /* Styling for the signup link */
        .signup-link {
          text-align: center;
          margin-top: 20px;
          font-size: 14px;
          color: #666;
        }

        .link {
          color: #3182ce;
          text-decoration: none;
        }

        .link:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default Login;
