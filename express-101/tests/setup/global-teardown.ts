import mongoose from 'mongoose';

export default async function globalTeardown() {
  // Close MongoDB connection
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
  }

  // Close any other persistent connections
  console.log('Global teardown completed');
}
