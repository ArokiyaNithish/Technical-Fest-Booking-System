const { connectDB, getPool, sql } = require('./db/config');

async function setupEvents() {
    try {
        const pool = await connectDB();

        console.log('--- Creating Events Table ---');
        await pool.request().query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Events' AND type = 'U')
            BEGIN
                CREATE TABLE Events (
                    Id INT PRIMARY KEY IDENTITY(1,1),
                    Name NVARCHAR(100) NOT NULL UNIQUE,
                    Department NVARCHAR(100),
                    DateTimeDisplay NVARCHAR(100),
                    Venue NVARCHAR(200),
                    Price INT NOT NULL,
                    AvailableTickets INT NOT NULL,
                    Description NVARCHAR(MAX),
                    Details NVARCHAR(MAX),
                    Coordinator NVARCHAR(100),
                    Phone NVARCHAR(20)
                );
            END
        `);
        console.log('✅ Events table ready.');

        console.log('--- Seeding Events Data ---');
        const countRes = await pool.request().query('SELECT count(*) as count FROM Events');
        if (countRes.recordset[0].count === 0) {
            await pool.request().query(`
                INSERT INTO Events (Name, Department, DateTimeDisplay, Venue, Price, AvailableTickets, Description, Details, Coordinator, Phone)
                VALUES 
                ('Code-A-Thon', 'Computer Science', 'March 15, 2026 | 10:00 AM', 'Main Computer Lab', 150, 50, 'A 24-hour coding marathon to solve real-world problems.', 'Participants will work in teams to build innovative solutions. Criteria include efficiency, UI/UX, and scalability. Participants are required to bring their own laptops with necessary software installed.', 'Dr. Smith', '9876543210'),
                ('Robo-Wars', 'Mechanical Engineering', 'March 16, 2026 | 11:00 AM', 'Central Courtyard', 200, 30, 'Battle of the bots. Last robot standing wins!', 'Build and control your own combat robots. Weight categories (Lightweight: 15kg, Middleweight: 30kg) and safety rules apply. Arena features pits and hammers.', 'Prof. Johnson', '9876543211'),
                ('Paper Presentation', 'Electronics & Communication', 'March 17, 2026 | 09:30 AM', 'Seminar Hall A', 100, 60, 'Present your research and technical papers.', 'Topics include AI, IoT, and embedded systems. Open to all engineering students. Presenters have 10 minutes followed by a 5-minute Q&A session.', 'Dr. Williams', '9876543212'),
                ('Circuit Design', 'Electrical Engineering', 'March 15, 2026 | 02:00 PM', 'Electronics Lab 2', 120, 45, 'Design and simulate complex electrical circuits.', 'Focus on efficiency and minimal component usage. Software: Proteus/Tinkercad. Components will be provided for the hardware implementation round.', 'Prof. Brown', '9876543213'),
                ('Tech-Quiz', 'Information Technology', 'March 16, 2026 | 02:00 PM', 'Auditorium', 50, 100, 'Test your technical knowledge across various domains.', 'Rounds include Rapid Fire, Visual Round, and Technical Puzzles. Covering Hardware, Software, and Latest Tech Trends.', 'Ms. Garcia', '9876543214');
            `);
            console.log('✅ Events seeded successfully.');
        } else {
            console.log('ℹ️ Events already seeded.');
        }

        process.exit(0);
    } catch (err) {
        console.error('❌ Error setting up events:', err.message);
        process.exit(1);
    }
}

setupEvents();
