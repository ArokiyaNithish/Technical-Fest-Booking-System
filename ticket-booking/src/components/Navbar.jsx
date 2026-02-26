import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, isAdmin, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">DATA HEIST</Link>
            </div>
            <div className="navbar-links">
                <Link to="/">Home</Link>
                <Link to="/events">Missions</Link>
                <Link to="/about">The Plan</Link>
                {isAdmin && <Link to="/admin" style={{ color: '#ffd700' }}>Dashboard</Link>}

                {user ? (
                    <span style={{ marginLeft: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ color: '#00e676', fontSize: '0.9rem', border: '1px solid #00e676', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
                            {user.name}
                        </span>
                        <button
                            onClick={handleLogout}
                            style={{
                                background: 'transparent',
                                border: '1px solid #d32f2f',
                                color: '#d32f2f',
                                padding: '0.3rem 0.8rem',
                                fontSize: '0.9rem',
                                width: 'auto',
                                cursor: 'pointer'
                            }}
                        >
                            Logout
                        </button>
                    </span>
                ) : (
                    <Link to="/login" style={{ color: '#ffd700', border: '1px solid #ffd700', padding: '0.3rem 0.8rem', borderRadius: '4px' }}>
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
