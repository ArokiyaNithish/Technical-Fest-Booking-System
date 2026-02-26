const sql = require('mssql/msnodesqlv8');
const dotenv = require('dotenv');

dotenv.config();

const server = process.env.DB_SERVER || 'localhost\\SQLEXPRESS';
const database = process.env.DB_DATABASE || 'TicketBookingDB';

const drivers = [
    '{ODBC Driver 17 for SQL Server}',
    '{ODBC Driver 18 for SQL Server}',
    '{SQL Server}'
];

const servers = [
    server,
    'localhost\\SQLEXPRESS',
    '.\\SQLEXPRESS',
    'localhost'
];

async function runTest() {
    console.log('--- SQL Server Connection Deep Diagnostic ---');
    console.log(`Current .env Server: ${server}`);
    console.log(`Current .env DB: ${database}`);

    for (const srv of [...new Set(servers)]) {
        console.log(`\nTesting Server: ${srv}`);
        for (const driver of drivers) {
            console.log(`  Trying driver: ${driver}...`);
            const connectionString = `Driver=${driver};Server=${srv};Database=${database};Trusted_Connection=yes;TrustServerCertificate=yes;`;

            try {
                const pool = await new sql.ConnectionPool({
                    connectionString,
                    options: { connectTimeout: 5000 }
                }).connect();
                console.log(`  ✅ SUCCESS using ${driver} on ${srv}`);
                await pool.close();
                process.exit(0);
            } catch (err) {
                console.log(`  ❌ Failed: ${err.message.substring(0, 100)}...`);
            }
        }
    }
    console.log('\n--- DIAGNOSTIC SUMMARY ---');
    console.log('All connection combinations failed.');
    console.log('Please check:');
    console.log('1. Is "SQL Server (SQLEXPRESS)" service RUNNING?');
    console.log('2. Is "SQL Server Browser" service RUNNING?');
    console.log('3. Is TCP/IP enabled in SQL Server Configuration Manager?');
}

runTest();
