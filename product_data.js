// Example product data
db.products.insertMany([
    {
      name: "iPhone 13 Pro",
      description: "Like new iPhone 13 Pro with 256GB storage",
      price: 85000,
      location: {
        county: "Nairobi",
        city: "Westlands"
      },
      category: "Electronics",
      brand: "Apple",
      model: "iPhone 13 Pro",
      listingType: "sale",
      views: 120,
      createdAt: new Date()
    },
    {
      name: "Toyota Corolla 2019",
      description: "Well maintained Toyota Corolla with low mileage",
      price: 1800000,
      location: {
        county: "Mombasa",
        city: "Nyali"
      },
      category: "Vehicles",
      brand: "Toyota",
      model: "Corolla",
      listingType: "sale",
      views: 85,
      createdAt: new Date()
    },
    // Add more sample products as needed
  ]);