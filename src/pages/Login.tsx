import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { login } from '../services/api';



export default function Login() {

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();



  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    setError('');

    setLoading(true);



    try {

      await login(email, password);

      navigate('/chat');

    } catch (err) {

      setError(err instanceof Error ? err.message : 'Login failed');

    } finally {

      setLoading(false);

    }

  };



  return (

    <div style={{

      minHeight: '100vh',

      display: 'flex',

      alignItems: 'center',

      justifyContent: 'center',

      background: '#1F1F1F'

    }}>

      <div style={{

        width: '100%',

        maxWidth: '420px',

        margin: '0 20px'

      }}>

        <div style={{

          background: '#1F1F1F',

          borderRadius: '16px',

          border: '2px solid rgb(178, 241, 66)',

          padding: '40px',

        }}>

          {/* Header */}

          <div style={{ textAlign: 'center', marginBottom: '32px' }}>

            <h1 style={{ 

              fontSize: '32px', 

              fontWeight: '700', 

              color: '#ffffff',

              margin: '0 0 8px 0',

              fontFamily: "'Fira Code', monospace"

            }}>

              TEST

            </h1>

            <p style={{ 

              fontSize: '14px', 

              color: 'rgba(255, 255, 255, 0.7)',

              margin: 0,

              fontFamily: "'Fira Code', monospace"

            }}>

              Climate Intelligence Platform

            </p>

          </div>



          {/* Error Message */}

          {error && (

            <div style={{

              background: 'rgba(239, 68, 68, 0.2)',

              border: '1px solid rgb(239, 68, 68)',

              color: '#ff6b6b',

              padding: '12px 16px',

              borderRadius: '8px',

              fontSize: '14px',

              marginBottom: '20px',

              fontFamily: "'Fira Code', monospace"

            }}>

              {error}

            </div>

          )}



          {/* Login Form */}

          <form onSubmit={handleSubmit}>

            <div style={{ marginBottom: '20px' }}>

              <label style={{

                display: 'block',

                fontSize: '14px',

                fontWeight: '500',

                color: '#ffffff',

                marginBottom: '8px',

                fontFamily: "'Fira Code', monospace"

              }}>

                Email Address

              </label>

              <input

                type="email"

                required

                value={email}

                onChange={(e) => setEmail(e.target.value)}

                placeholder="you@example.com"

                autoComplete="email"

                style={{

                  width: '100%',

                  padding: '12px 16px',

                  border: '1px solid rgb(178, 241, 66)',

                  borderRadius: '8px',

                  fontSize: '15px',

                  outline: 'none',

                  background: '#1F1F1F',

                  color: '#ffffff',

                  transition: 'border-color 0.2s',

                  fontFamily: "'Fira Code', monospace"

                }}

                onFocus={(e) => e.target.style.borderColor = 'rgb(178, 241, 66)'}

                onBlur={(e) => e.target.style.borderColor = 'rgb(178, 241, 66)'}

              />

            </div>



            <div style={{ marginBottom: '24px' }}>

              <label style={{

                display: 'block',

                fontSize: '14px',

                fontWeight: '500',

                color: '#ffffff',

                marginBottom: '8px',

                fontFamily: "'Fira Code', monospace"

              }}>

                Password

              </label>

              <input

                type="password"

                required

                value={password}

                onChange={(e) => setPassword(e.target.value)}

                placeholder="••••••••"

                autoComplete="current-password"

                style={{

                  width: '100%',

                  padding: '12px 16px',

                  border: '1px solid rgb(178, 241, 66)',

                  borderRadius: '8px',

                  fontSize: '15px',

                  outline: 'none',

                  background: '#1F1F1F',

                  color: '#ffffff',

                  transition: 'border-color 0.2s',

                  fontFamily: "'Fira Code', monospace"

                }}

                onFocus={(e) => e.target.style.borderColor = 'rgb(178, 241, 66)'}

                onBlur={(e) => e.target.style.borderColor = 'rgb(178, 241, 66)'}

              />

            </div>



            <button

              type="submit"

              disabled={loading}

              style={{

                width: '100%',

                background: loading ? 'rgba(178, 241, 66, 0.5)' : 'rgb(178, 241, 66)',

                color: '#000000',

                padding: '12px 24px',

                borderRadius: '8px',

                border: 'none',

                fontSize: '15px',

                fontWeight: '600',

                cursor: loading ? 'not-allowed' : 'pointer',

                transition: 'all 0.2s',

                opacity: loading ? 0.6 : 1,

                fontFamily: "'Fira Code', monospace"

              }}

              onMouseEnter={(e) => {

                if (!loading) {

                  e.currentTarget.style.transform = 'translateY(-1px)';

                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(178, 241, 66, 0.4)';

                }

              }}

              onMouseLeave={(e) => {

                e.currentTarget.style.transform = 'translateY(0)';

                e.currentTarget.style.boxShadow = 'none';

              }}

            >

              {loading ? 'Signing in...' : 'Sign In'}

            </button>

          </form>

        </div>

      </div>

    </div>

  );

}
