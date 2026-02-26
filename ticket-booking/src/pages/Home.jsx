
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="page-container home-page" style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url('/assets/DAD.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'top center',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            textAlign: 'center',
            paddingBottom: '5rem'
        }}>
            <div className="hero">
                <p style={{ fontSize: '1.4rem', marginBottom: '2rem', maxWidth: '800px', margin: '0 auto 2rem', textShadow: '2px 2px 4px black' }}>The biggest tech infiltration of the year. Secure your spot, hack the system, and claim the prize.</p>
                <Link to="/events">
                    <button className="btn-primary" style={{ maxWidth: '300px', fontSize: '1.5rem', padding: '1.5rem 3rem' }}>Join the Team</button>
                </Link>
            </div>
        </div>
    );
};

export default Home;
