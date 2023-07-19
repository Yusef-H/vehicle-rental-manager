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
      category: 'Car', // Update with the correct category name
      description: 'Comfortable and reliable car',
      pricePerDay: 50,
    },
    {
      type: 'Volvo',
      category: 'Car', // Update with the correct category name
      description: 'Safe and luxurious car',
      pricePerDay: 70,
    },
    {
      type: 'BMX Bike',
      category: 'Bicycle', // Update with the correct category name
      description: 'Durable and agile bicycle',
      pricePerDay: 20,
    },
    // Add more vehicles as needed
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
    const vehicleInstances = await VehicleInstance.create([
      { vehicle: vehicles[0]._id, status: 'Available' },
      { vehicle: vehicles[1]._id, status: 'Rented' },
      // Add more vehicle instances as needed
    ]);
    console.log('Vehicle instances created:', vehicleInstances);

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
