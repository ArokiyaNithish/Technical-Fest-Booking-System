const sql = require('mssql/msnodesqlv8');
const dotenv = require('dotenv');

dotenv.config();

const server = process.env.DB_SERVER || 'localhost\\SQLEXPRESS';
const database = process.env.DB_DATABASE || 'TicketBookingDB';

// Array of potential drivers to try
const drivers = [
    '{ODBC Driver 17 for SQL Server}',
    '{ODBC Driver 18 for SQL Server}',
    '{ODBC Driver 13 for SQL Server}',
    '{SQL Server}'
];

const servers = [
    server,
    `localhost,49832`, // Direct port fallback for SQLEXPRESS
    'localhost\\SQLEXPRESS',
    '.\\SQLEXPRESS',
    'localhost'
];

let pool = null;

const connectDB = async () => {
    console.log(`🚀 Starting Database Connection Sequence...`);
    console.log(`Target DB: ${database}`);

    for (const srv of servers) {
        for (const driver of drivers) {
            try {
                console.log(`🔄 Attempting: ${driver} on ${srv}...`);
                const connectionString = `Driver=${driver};Server=${srv};Database=${database};Trusted_Connection=yes;TrustServerCertificate=yes;`;

                pool = await sql.connect({ connectionString });
                console.log(`✅ SUCCESS! Connected to ${srv} using ${driver}`);
                return pool;
            } catch (err) {
                // Silently try next driver/server combo
            }
        }
    }

    console.error('🛑 ALL CONNECTION ATTEMPTS FAILED.');
    console.log('Please ensure "SQL Server (SQLEXPRESS)" service is running in Windows Services.');
};

const getPool = () => {
    if (!pool) {
        throw new Error('Database not connected. Call connectDB() first.');
    }
    return pool;
};

module.exports = {
    connectDB,
    getPool,
    sql
};
