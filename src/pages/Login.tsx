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

    } catch (err: any) {

      setError(err.message || 'Login failed');

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

      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'

    }}>

      <div style={{

        width: '100%',

        maxWidth: '420px',

        margin: '0 20px'

      }}>

        <div style={{

          background: 'var(--panel)',

          borderRadius: '16px',

          boxShadow: 'var(--shadow)',

          padding: '40px',

        }}>

          {/* Header */}

          <div style={{ textAlign: 'center', marginBottom: '32px' }}>

            <h1 style={{ 

              fontSize: '32px', 

              fontWeight: '700', 

              color: 'var(--text)',

              margin: '0 0 8px 0'

            }}>

              TEST

            </h1>

            <p style={{ 

              fontSize: '14px', 

              color: 'var(--muted)',

              margin: 0

            }}>

              Climate Intelligence Platform

            </p>

          </div>



          {/* Error Message */}

          {error && (

            <div style={{

              background: '#fee',

              border: '1px solid #fcc',

              color: '#c33',

              padding: '12px 16px',

              borderRadius: '8px',

              fontSize: '14px',

              marginBottom: '20px'

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

                color: 'var(--text)',

                marginBottom: '8px'

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

                  border: '1px solid var(--border)',

                  borderRadius: '8px',

                  fontSize: '15px',

                  outline: 'none',

                  transition: 'border-color 0.2s'

                }}

                onFocus={(e) => e.target.style.borderColor = 'var(--ai)'}

                onBlur={(e) => e.target.style.borderColor = 'var(--border)'}

              />

            </div>



            <div style={{ marginBottom: '24px' }}>

              <label style={{

                display: 'block',

                fontSize: '14px',

                fontWeight: '500',

                color: 'var(--text)',

                marginBottom: '8px'

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

                  border: '1px solid var(--border)',

                  borderRadius: '8px',

                  fontSize: '15px',

                  outline: 'none',

                  transition: 'border-color 0.2s'

                }}

                onFocus={(e) => e.target.style.borderColor = 'var(--ai)'}

                onBlur={(e) => e.target.style.borderColor = 'var(--border)'}

              />

            </div>



            <button

              type="submit"

              disabled={loading}

              style={{

                width: '100%',

                background: loading ? '#9ca3af' : 'var(--ai)',

                color: 'white',

                padding: '12px 24px',

                borderRadius: '8px',

                border: 'none',

                fontSize: '15px',

                fontWeight: '600',

                cursor: loading ? 'not-allowed' : 'pointer',

                transition: 'all 0.2s',

                opacity: loading ? 0.6 : 1

              }}

              onMouseEnter={(e) => {

                if (!loading) e.currentTarget.style.transform = 'translateY(-1px)';

              }}

              onMouseLeave={(e) => {

                e.currentTarget.style.transform = 'translateY(0)';

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
