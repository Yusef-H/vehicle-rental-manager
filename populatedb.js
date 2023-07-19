const mongoose = require('mongoose');
const Vehicle = require('./models/vehicle');
const VehicleInstance = require('./models/vehicleInstance');
const Category = require('./models/category');
require('dotenv').config();

// Define sample data for categories
const sampleCategories = [
  { name: 'Car' },
  { name: 'Bicycle' },
  { name: 'Motorbike' },
  { name: 'Scooter' },
];

// Define sample data for vehicles
const sampleVehicles = [
  {
    type: 'Mazda',
    category: 'Car',
    description: 'Comfortable and reliable car',
    pricePerDay: 50,
  },
  {
    type: 'Volvo',
    category: 'Car',
    description: 'Safe and luxurious car',
    pricePerDay: 70,
  },
  {
    type: 'BMX Bike',
    category: 'Bicycle',
    description: 'Durable and agile bicycle',
    pricePerDay: 20,
  },
  {
    type: 'Toyota',
    category: 'Car',
    description: 'Fuel-efficient and reliable car',
    pricePerDay: 60,
  },
  {
    type: 'Mountain Bike',
    category: 'Bicycle',
    description: 'Rugged and versatile bicycle',
    pricePerDay: 25,
  },
  {
    type: 'Honda',
    category: 'Car',
    description: 'Sporty and stylish car',
    pricePerDay: 65,
  },
  {
    type: 'Suzuki',
    category: 'Motorbike',
    description: 'Powerful and agile motorbike',
    pricePerDay: 80,
  },
  {
    type: 'Electric Scooter',
    category: 'Scooter',
    description: 'Eco-friendly and convenient scooter',
    pricePerDay: 30,
  },
  {
    type: 'Ford',
    category: 'Car',
    description: 'Spacious and comfortable car',
    pricePerDay: 55,
  },
  {
    type: 'City Bike',
    category: 'Bicycle',
    description: 'Lightweight and urban bicycle',
    pricePerDay: 15,
  },
  {
    type: 'Kawasaki',
    category: 'Motorbike',
    description: 'High-performance and adrenaline-inducing motorbike',
    pricePerDay: 90,
  },
  {
    type: 'Vespa',
    category: 'Scooter',
    description: 'Classic and stylish scooter',
    pricePerDay: 35,
  },
  {
    type: 'Hyundai',
    category: 'Car',
    description: 'Modern and feature-packed car',
    pricePerDay: 75,
  },
];

async function populateDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Clear existing data
    await clearData();

    // Create categories
    const categories = await Category.create(sampleCategories);
    console.log('Categories created:', categories);

    // Populate category references in vehicles
    const categoryMap = {};
    categories.forEach((category) => {
      categoryMap[category.name] = category._id;
    });
    sampleVehicles.forEach((vehicle) => {
      vehicle.category = categoryMap[vehicle.category];
    });

    // Create vehicles
    const vehicles = await Vehicle.create(sampleVehicles);
    console.log('Vehicles created:', vehicles);

    // Create vehicle instances
    const vehicleInstances = [];
    let numVehicleInstances = 25;
    for (let i = 0; i < numVehicleInstances; i++) {
      const randomVehicle = vehicles[Math.floor(Math.random() * vehicles.length)];
      const status = i < 5 ? 'Rented' : 'Available';

      const vehicleInstance = {
        vehicle: randomVehicle._id,
        status: status,
      };

      vehicleInstances.push(vehicleInstance);
    }

    const createdVehicleInstances = await VehicleInstance.create(vehicleInstances);
    console.log('Vehicle instances created:', createdVehicleInstances);

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error populating database:', error);
  }
}

async function clearData() {
  await Promise.all([
    Vehicle.deleteMany(),
    VehicleInstance.deleteMany(),
    Category.deleteMany(),
  ]);
  console.log('Database cleared');
}

populateDatabase();
