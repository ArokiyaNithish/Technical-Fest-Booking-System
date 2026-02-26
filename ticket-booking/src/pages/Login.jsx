import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [isadminLogin, setIsAdminLogin] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { loginUser, loginAdmin } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (isadminLogin) {
            if (username === 'admin' && password === 'admin123') {
                loginAdmin();
                navigate('/admin');
            } else {
                setError('Invalid Admin Credentials');
            }
        } else {
            if (username.trim()) {
                loginUser({ name: username, role: 'user' });
                navigate('/events');
            } else {
                setError('Please enter a username');
            }
        }
    };

    return (
        <div className="page-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <div className="card" style={{ maxWidth: '400px', width: '100%' }}>
                <h2 style={{ fontFamily: 'Anton', textAlign: 'center', marginBottom: '2rem', textTransform: 'uppercase' }}>
                    {isadminLogin ? 'Admin Access' : 'Agent Login'}
                </h2>

                {error && <p className="error-message">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username / ID</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder={isadminLogin ? "Enter Admin ID" : "Enter Agent Name"}
                        />
                    </div>

                    {isadminLogin && (
                        <div className="form-group">
                            <label>Passcode</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter Passcode"
                            />
                        </div>
                    )}

                    <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>
                        {isadminLogin ? 'Access Dashboard' : 'Join Mission'}
                    </button>
                </form>

                <div style={{ marginTop: '1.5rem', textAlign: 'center', borderTop: '1px solid #333', paddingTop: '1rem' }}>
                    <p style={{ marginBottom: '0.5rem', color: '#ccc' }}>
                        {isadminLogin ? 'Not an Admin?' : 'Are you an Admin?'}
                    </p>
                    <button
                        className="btn-secondary"
                        style={{ marginTop: 0, padding: '0.5rem 1rem', fontSize: '1rem' }}
                        onClick={() => {
                            setIsAdminLogin(!isadminLogin);
                            setError('');
                            setUsername('');
                            setPassword('');
                        }}
                    >
                        {isadminLogin ? 'Switch to Agent Login' : 'Switch to Admin Access'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
