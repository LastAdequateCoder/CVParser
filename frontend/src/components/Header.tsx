const Header = () => (
  <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
    <h1 style={{
      fontSize: '2.7rem',
      fontWeight: 800,
      margin: 0,
      color: '#3730a3',
      letterSpacing: '-1px',
      textShadow: '0 2px 8px #e0e7ff'
    }}>
      CV Parser
    </h1>
    <p style={{
      fontSize: '1.15rem',
      color: '#6366f1',
      margin: '0.7rem 0 0 0',
      fontWeight: 500
    }}>
      Upload a CV and extract candidate information instantly.
    </p>
  </header>
);
export default Header; 