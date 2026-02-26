const API_BASE = 'http://localhost:5001/api';

async function verifyReduction() {
    try {
        console.log('--- Starting Verification ---');

        // 1. Get current events
        console.log('1. Fetching current events...');
        const eventsRes = await fetch(`${API_BASE}/events`);
        if (!eventsRes.ok) throw new Error(`Fetch events failed: ${eventsRes.statusText}`);
        const events = await eventsRes.json();
        const event = events.find(e => e.name === 'Code-A-Thon');
        if (!event) throw new Error('Event Code-A-Thon not found in database');

        const initialAvailable = event.available;
        console.log(`Initial availability for Code-A-Thon: ${initialAvailable}`);

        // 2. Make a booking
        const numTickets = 2;
        console.log(`2. Booking ${numTickets} tickets...`);
        const bookingData = {
            name: 'Test User',
            email: 'test@example.com',
            phone: '1234567890',
            college: 'Test College',
            dept: 'Test Dept',
            year: '1',
            eventName: 'Code-A-Thon',
            numTickets: numTickets,
            totalAmount: numTickets * 150
        };

        const bookingRes = await fetch(`${API_BASE}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookingData)
        });

        if (!bookingRes.ok) {
            const error = await bookingRes.json();
            throw new Error(`Booking failed: ${error.error}`);
        }

        const bookingJson = await bookingRes.json();
        console.log('Booking Response:', bookingJson.message);

        // 3. Verify reduction
        console.log('3. Verifying reduction...');
        const updatedEventsRes = await fetch(`${API_BASE}/events`);
        const updatedEvents = await updatedEventsRes.json();
        const updatedEvent = updatedEvents.find(e => e.name === 'Code-A-Thon');
        const finalAvailable = updatedEvent.available;
        console.log(`Final availability for Code-A-Thon: ${finalAvailable}`);

        if (finalAvailable === initialAvailable - numTickets) {
            console.log('✅ SUCCESS: Ticket count reduced correctly!');
        } else {
            console.error('❌ FAILURE: Ticket count did NOT reduce correctly.');
            process.exit(1);
        }

    } catch (err) {
        console.error('❌ Verification failed with error:', err.message);
        console.log('\nNOTE: Make sure the server is running on port 5001 before running this script.');
        process.exit(1);
    }
}

verifyReduction();
