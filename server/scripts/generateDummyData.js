import { User, Event, Booking } from '../models/index.js';
import bcrypt from 'bcrypt';


// Helper functions
const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomDate = (start, end) => {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date;
};

// Sample data
const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'Chris', 'Amanda', 'Robert', 'Lisa', 'James', 'Maria', 'William', 'Jennifer', 'Thomas'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson'];

const eventTitles = [
  'Tech Conference 2024', 'Music Festival', 'Art Exhibition', 'Food & Wine Tasting',
  'Startup Pitch Competition', 'Charity Gala', 'Sports Tournament', 'Workshop Series',
  'Book Launch', 'Film Screening', 'Comedy Night', 'Dance Performance',
  'Science Fair', 'Business Networking', 'Cooking Class'
];

const locations = [
  'Convention Center', 'Central Park', 'Grand Hotel', 'City Hall',
  'Tech Campus', 'Art Museum', 'Sports Arena', 'Community Center',
  'Beach Resort', 'Mountain Lodge', 'Downtown Plaza', 'University Hall'
];

const descriptions = [
  'Join us for an unforgettable experience with industry experts and networking opportunities.',
  'A spectacular event featuring amazing performances and interactive activities.',
  'Learn from the best in the field and connect with like-minded individuals.',
  'Enjoy an evening of entertainment, food, and great company.',
  'Discover new trends and innovations in this exciting field.',
  'Perfect for professionals and enthusiasts alike looking to expand their knowledge.'
];

// Generate users
const generateUsers = async (count) => {
  const users = [];
  
  for (let i = 0; i < count; i++) {
    const firstName = getRandomElement(firstNames);
    const lastName = getRandomElement(lastNames);
    const name = `${firstName} ${lastName}`;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@example.com`;
    const password = await bcrypt.hash('password123', 10);
    const role = i === 0 ? 'admin' : 'user';
    
    users.push({
      name,
      email,
      password,
      role
    });
  }
  
  return users;
};

// Generate events
const generateEvents = (userIds) => {
  const events = [];
  const times = ['10:00 AM', '2:00 PM', '6:00 PM', '7:30 PM', '8:00 PM', '9:00 AM'];
  const cities = ['New York', 'London', 'Tokyo', 'Paris', 'Sydney'];
  
  for (let i = 0; i < 15; i++) {
    const title = `${getRandomElement(eventTitles)} ${getRandomInt(2024, 2025)}`;
    const description = getRandomElement(descriptions);
    const location = `${getRandomElement(locations)} - ${getRandomElement(cities)}`;
    const date = getRandomDate(new Date(2024, 0, 1), new Date(2025, 11, 31));
    const time = getRandomElement(times);
    const price = parseFloat((getRandomInt(0, 100) + getRandomInt(0, 99) / 100).toFixed(2));
    const image = `https://picsum.photos/600/400?random=${i}`;
    const available_seats = getRandomInt(50, 500);
    const created_by = getRandomElement(userIds);
    
    events.push({
      title,
      description,
      location,
      date,
      time,
      price,
      image,
      available_seats,
      created_by
    });
  }
  
  return events;
};

// Generate bookings
const generateBookings = (userIds, events) => {
  const bookings = [];
  
  for (let i = 0; i < 50; i++) {
    const user_id = getRandomElement(userIds);
    const event = getRandomElement(events);
    const quantity = getRandomInt(1, 5);
    const total_price = parseFloat((event.price * quantity).toFixed(2));
    
    // Ensure we don't book more than available seats
    if (quantity <= event.available_seats) {
      bookings.push({
        user_id,
        event_id: event.id,
        quantity,
        total_price,
        booking_date: new Date()
      });
    }
  }
  
  return bookings;
};

// Main function
const generateDummyData = async () => {
  try {
    console.log('Starting dummy data generation...');

    // Generate and insert users
    console.log('Generating users...');
    const userData = await generateUsers(20);
    const users = await User.bulkCreate(userData, { validate: true });
    console.log(`Created ${users.length} users`);

    // Get user IDs
    const userIds = users.map(user => user.id);

    // Generate and insert events
    console.log('Generating events...');
    const eventData = generateEvents(userIds);
    const events = await Event.bulkCreate(eventData, { validate: true });
    console.log(`Created ${events.length} events`);

    // Generate and insert bookings
    console.log('Generating bookings...');
    const bookingData = generateBookings(userIds, events);
    const bookings = await Booking.bulkCreate(bookingData, { validate: true });
    console.log(`Created ${bookings.length} bookings`);

    // Display summary
    const userCount = await User.count();
    const eventCount = await Event.count();
    const bookingCount = await Booking.count();

    console.log('\n=== DUMMY DATA GENERATION COMPLETE ===');
    console.log(`Total Users: ${userCount}`);
    console.log(`Total Events: ${eventCount}`);
    console.log(`Total Bookings: ${bookingCount}`);
    console.log('\nDefault password for all users: password123');
    console.log('Admin user: john.smith0@example.com');

  } catch (error) {
    console.error('Error generating dummy data:', error);
    throw error;
  }
};

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateDummyData()
    .then(() => {
      console.log('Dummy data generation finished!');
      process.exit(0);
    })
    .catch(error => {
      console.error('Failed to generate dummy data:', error);
      process.exit(1);
    });
}

export default generateDummyData;