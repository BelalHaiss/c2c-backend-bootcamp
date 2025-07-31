import { EventEmitter } from 'events';

// Example: Custom class extending EventEmitter
class DatabaseConnection extends EventEmitter<{
  connected: never[];
  disconnected: never[];
}> {
  connect() {
    setTimeout(() => {
      this.emit('connected');
    }, 1000);
  }

  disconnect() {
    this.emit('disconnected');
  }
}

const db = new DatabaseConnection();

db.on('connected', () => {
  console.log(`🔗 Connected to  database`);
});

db.on('disconnected', () => {
  console.log('❌ Database disconnected');
});

// Demonstrate the event-driven nature
console.log('\n--- Database Connection Demo ---');
db.connect();
