const sql = require('msnodesqlv8');
const dotenv = require('dotenv');

dotenv.config();

const server = process.env.DB_SERVER || 'localhost\\SQLEXPRESS';
const database = process.env.DB_DATABASE || 'TicketBookingDB';
const port = process.env.DB_PORT;

const connectionString = port && port !== '1433'
    ? `Driver={ODBC Driver 17 for SQL Server};Server=${server},${port};Database=${database};Trusted_Connection=yes;`
    : `Driver={ODBC Driver 17 for SQL Server};Server=${server};Database=${database};Trusted_Connection=yes;`;

console.log(`Testing connection to: ${server}`);
console.log(`Using Connection String: ${connectionString}`);

sql.open(connectionString, (err, conn) => {
    if (err) {
        console.error('❌ Connection FAILED:', err.message);
        console.error('Full Error:', err);
        return;
    }
    console.log('✅ Connection SUCCESS!');
    conn.query('SELECT 1 as val', (err, rows) => {
        if (err) console.error('Query Failed:', err.message);
        else console.log('Query Result:', rows);
        conn.close();
    });
});
