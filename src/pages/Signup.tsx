import { Link } from 'react-router-dom';



export default function Signup() {

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

          textAlign: 'center'

        }}>

          <h1 style={{ 

            fontSize: '32px', 

            fontWeight: '700', 

            color: 'var(--text)',

            margin: '0 0 16px 0'

          }}>

            TENJIN

          </h1>

          

          <p style={{ 

            fontSize: '16px', 

            color: 'var(--muted)',

            margin: '0 0 24px 0',

            lineHeight: '1.6'

          }}>

            New account registration is currently disabled.

            <br />

            Please contact an administrator for access.

          </p>



          <Link 

            to="/login" 

            style={{

              display: 'inline-block',

              background: 'var(--ai)',

              color: 'white',

              padding: '12px 32px',

              borderRadius: '8px',

              textDecoration: 'none',

              fontSize: '15px',

              fontWeight: '600',

              transition: 'all 0.2s'

            }}

          >

            Back to Login

          </Link>

        </div>

      </div>

    </div>

  );

}
