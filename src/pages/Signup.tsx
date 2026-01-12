import { Link } from 'react-router-dom';



export default function Signup() {

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

          textAlign: 'center'

        }}>

          <h1 style={{ 

            fontSize: '32px', 

            fontWeight: '700', 

            color: '#ffffff',

            margin: '0 0 16px 0',

            fontFamily: "'Fira Code', monospace"

          }}>

            TENJIN

          </h1>

          

          <p style={{ 

            fontSize: '16px', 

            color: 'rgba(255, 255, 255, 0.7)',

            margin: '0 0 24px 0',

            lineHeight: '1.6',

            fontFamily: "'Fira Code', monospace"

          }}>

            New account registration is currently disabled.

            <br />

            Please contact an administrator for access.

          </p>



          <Link 

            to="/login" 

            style={{

              display: 'inline-block',

              background: 'rgb(178, 241, 66)',

              color: '#000000',

              padding: '12px 32px',

              borderRadius: '8px',

              textDecoration: 'none',

              fontSize: '15px',

              fontWeight: '600',

              transition: 'all 0.2s',

              fontFamily: "'Fira Code', monospace"

            }}

            onMouseEnter={(e) => {

              e.currentTarget.style.transform = 'translateY(-1px)';

              e.currentTarget.style.boxShadow = '0 4px 12px rgba(178, 241, 66, 0.4)';

            }}

            onMouseLeave={(e) => {

              e.currentTarget.style.transform = 'translateY(0)';

              e.currentTarget.style.boxShadow = 'none';

            }}

          >

            Back to Login

          </Link>

        </div>

      </div>

    </div>

  );

}
