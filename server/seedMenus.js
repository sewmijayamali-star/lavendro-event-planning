const mongoose = require('mongoose');
const Menu = require('./models/Menu');
require('dotenv').config();

const menus = [
  {
    name: 'Royal Feast Package',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800',
    description: 'Premium gourmet selection for luxury events',
    categories: {
      appetizers: ['Bruschetta with Tomato Basil', 'Stuffed Mushrooms', 'Shrimp Cocktail', 'Cheese Platter'],
      mainCourse: ['Grilled Salmon', 'Roast Beef', 'Chicken Alfredo', 'Vegetable Lasagna'],
      salads: ['Caesar Salad', 'Greek Salad', 'Garden Fresh Salad'],
      desserts: ['Chocolate Fondant', 'Tiramisu', 'Fruit Tart', 'Ice Cream Selection'],
      drinks: ['Premium Wine Selection', 'Champagne', 'Fresh Juices', 'Coffee & Tea']
    }
  },
  {
    name: 'Golden Delight Package',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
    description: 'Classic favorites with a modern twist',
    categories: {
      appetizers: ['Spring Rolls', 'Chicken Wings', 'Garlic Bread', 'Mini Quiches'],
      mainCourse: ['Chicken Curry', 'Fried Rice', 'Pasta Primavera', 'Grilled Vegetables'],
      salads: ['Coleslaw', 'Potato Salad', 'Mixed Green Salad'],
      desserts: ['Brownies', 'Cheesecake', 'Pudding', 'Cookies'],
      drinks: ['House Wine', 'Soft Drinks', 'Iced Tea', 'Coffee']
    }
  },
  {
    name: 'Essential Party Package',
    image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800',
    description: 'Perfect starters for any celebration',
    categories: {
      appetizers: ['Samosas', 'Sandwiches', 'Vegetable Sticks with Dip', 'Chips & Salsa'],
      mainCourse: ['Pizza Varieties', 'Burgers', 'Fried Chicken', 'Vegetable Wraps'],
      salads: ['Simple Garden Salad', 'Fruit Salad'],
      desserts: ['Cupcakes', 'Donuts', 'Fruit Platter'],
      drinks: ['Soft Drinks', 'Fruit Punch', 'Water']
    }
  }
];

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('MongoDB connected');
    await Menu.deleteMany({});
    await Menu.insertMany(menus);
    console.log('✅ Menus added to database!');
    process.exit();
  })
  .catch(err => console.error(err));
