-- Create the Database (if it doesn't exist)
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'TicketBookingDB')
BEGIN
    CREATE DATABASE TicketBookingDB;
END
GO

USE TicketBookingDB;
GO

-- Create the Bookings Table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Bookings' AND type = 'U')
BEGIN
    CREATE TABLE Bookings (
        Id INT PRIMARY KEY IDENTITY(1,1),
        UserName NVARCHAR(100) NOT NULL,
        Email NVARCHAR(100) NOT NULL,
        Phone NVARCHAR(20) NOT NULL,
        College NVARCHAR(200) NOT NULL,
        Dept NVARCHAR(100) NOT NULL,
        Year NVARCHAR(10) NOT NULL,
        EventName NVARCHAR(200) NOT NULL,
        NumTickets INT NOT NULL,
        TotalAmount INT NOT NULL,
        BookingDate DATETIME DEFAULT GETDATE()
    );
END
GO

-- Create the Events Table
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
GO

-- Seed data for Events (if table is empty)
IF NOT EXISTS (SELECT * FROM Events)
BEGIN
    INSERT INTO Events (Name, Department, DateTimeDisplay, Venue, Price, AvailableTickets, Description, Details, Coordinator, Phone)
    VALUES 
    ('Code-A-Thon', 'Computer Science', 'March 15, 2026 | 10:00 AM', 'Main Computer Lab', 150, 50, 'A 24-hour coding marathon to solve real-world problems.', 'Participants will work in teams to build innovative solutions. Criteria include efficiency, UI/UX, and scalability. Participants are required to bring their own laptops with necessary software installed.', 'Dr. Smith', '9876543210'),
    ('Robo-Wars', 'Mechanical Engineering', 'March 16, 2026 | 11:00 AM', 'Central Courtyard', 200, 30, 'Battle of the bots. Last robot standing wins!', 'Build and control your own combat robots. Weight categories (Lightweight: 15kg, Middleweight: 30kg) and safety rules apply. Arena features pits and hammers.', 'Prof. Johnson', '9876543211'),
    ('Paper Presentation', 'Electronics & Communication', 'March 17, 2026 | 09:30 AM', 'Seminar Hall A', 100, 60, 'Present your research and technical papers.', 'Topics include AI, IoT, and embedded systems. Open to all engineering students. Presenters have 10 minutes followed by a 5-minute Q&A session.', 'Dr. Williams', '9876543212'),
    ('Circuit Design', 'Electrical Engineering', 'March 15, 2026 | 02:00 PM', 'Electronics Lab 2', 120, 45, 'Design and simulate complex electrical circuits.', 'Focus on efficiency and minimal component usage. Software: Proteus/Tinkercad. Components will be provided for the hardware implementation round.', 'Prof. Brown', '9876543213'),
    ('Tech-Quiz', 'Information Technology', 'March 16, 2026 | 02:00 PM', 'Auditorium', 50, 100, 'Test your technical knowledge across various domains.', 'Rounds include Rapid Fire, Visual Round, and Technical Puzzles. Covering Hardware, Software, and Latest Tech Trends.', 'Ms. Garcia', '9876543214');
END
GO

-- Verify Table Creation
SELECT * FROM Bookings;
SELECT * FROM Events;
