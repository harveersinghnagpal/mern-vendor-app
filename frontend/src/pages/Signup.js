import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        alert('Signup successful! Please log in.');
        navigate('/login');
      } else {
        throw new Error('Failed to sign up');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to sign up');
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

      {/* Signup Form */}
      <div className="signup-container">
        <div className="signup-form">
          <h1 className="title">Sign Up</h1>
          <form onSubmit={handleSignup}>
            <div className="input-group">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="input-field"
              />
            </div>
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
              Sign Up
            </button>
          </form>
          <p className="login-link">
            Already have an account?{' '}
            <a href="/login" className="link">
              Log In
            </a>
          </p>
        </div>
      </div>

      <style jsx>{`
        /* Navbar Styling */
        body{
        margin: 0;
        padding: 0;
        }
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
        .signup-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 700px;
          background-color: #f4f7fc;
        }

        /* Styling for the form */
        .signup-form {
          background-color: white;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
          transition: all 0.3s ease;
          text-align: center;
        }

        .signup-form:hover {
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
          margin-bottom: 20px;
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

        /* Styling for the login link */
        .login-link {
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

export default Signup;