const { connectDB, getPool } = require('./db/config');

async function checkTables() {
    try {
        const pool = await connectDB();
        const result = await pool.request().query("SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE'");
        console.log('Tables in DB:', result.recordset.map(r => r.TABLE_NAME));
        process.exit(0);
    } catch (err) {
        console.error('Error checking tables:', err.message);
        process.exit(1);
    }
}

checkTables();
