import React from 'react';

const About = () => {
    return (
        <div className="page-container">
            <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h2>The Plan</h2>
                <p><strong>Data Heist</strong> is not just a tech fest; it's a test of skill, strategy, and survival.</p>
                <p>Organized by the Department of Computer Science & Engineering, this event brings together the brightest minds to crack codes, design systems, and innovate under pressure.</p>
                <br />
                <p><strong>Venue:</strong> The Royal Mint (Auditorium)</p>
                <p><strong>Date:</strong> March 15, 2026</p>
                <br />
                <p className="highlight">"In this world, everything is governed by balance. There's what you stand to gain, and what you stand to lose."</p>
            </div>
        </div>
    );
};

export default About;
