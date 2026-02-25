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

-- Verify Table Creation
SELECT * FROM Bookings;