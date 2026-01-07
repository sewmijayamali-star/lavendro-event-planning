import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Close, Logout } from '@mui/icons-material';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
    setIsOpen(false);
  };

  const navItems = [
    { name: 'Home', link: '/' },
    { name: 'About', link: '/about' },
    { name: 'Services', link: '/services' },
    { name: 'Menus', link: '/menu' },
    { name: 'Venues', link: '/venues' },
    { name: 'Blogs', link: '/blogs' },
    { name: 'Contact', link: '/contact' },
    { name: 'Support', link: '/support' }
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="/logo.png" alt="Lavendro" className="logo-image" />
          <span className="logo-text">Lavendro</span>
        </Link>

        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <Close /> : <Menu />}
        </div>

        <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
          {navItems.map((item, index) => (
            <li className="nav-item" key={index}>
              <Link to={item.link} className="nav-link" onClick={() => setIsOpen(false)}>
                {item.name}
              </Link>
            </li>
          ))}

          {user ? (
            <>
              {/* UPDATED: Circular Profile Icon */}
              <li className="nav-item" style={{ marginLeft: '10px' }}>
                <Link 
                  to="/dashboard" 
                  onClick={() => setIsOpen(false)}
                  title="My Dashboard"
                  style={{
                    width: '40px',
                    height: '40px',
                    background: '#fff', 
                    color: '#F08787', // Pink text
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                    textDecoration: 'none',
                    border: '2px solid #fff',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                    transition: 'transform 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  {user.name?.charAt(0).toUpperCase()}
                </Link>
              </li>

              <li className="nav-item">
                <button 
                  onClick={handleLogout}
                  className="nav-link logout-btn"
                  style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#ffcccc', 
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      fontSize: '1rem',
                      paddingLeft: '15px' 
                  }}
                >
                  <Logout fontSize="small" />
                </button>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link to="/login" className="nav-link login-btn" onClick={() => setIsOpen(false)}>
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
