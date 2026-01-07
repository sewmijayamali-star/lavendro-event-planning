const mongoose = require('mongoose');
const Package = require('./models/Package');
require('dotenv').config();

const packages = [
  {
    name: 'Simple Package',
    price: 'LKR 250,000',
    features: [
      'Venue decoration',
      'Photography (4 hours)',
      'Basic catering for 50 guests',
      'DJ service',
      'Wedding cake',
      'Coordination support',
      'more...'
    ],
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600',
    popular: false,
    category: 'Wedding'
  },
  {
    name: 'Birthday Package',
    price: 'LKR 350,000',
    features: [
      "Themed venue setup",
      "Photography (5 hrs)",
      "Catering — 75 guests",
      "DJ or live music",
      "Custom cake",
      "Games & activities",
      "more..."
    ],
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600',
    popular: false,
    category: 'Birthday'
  },
  {
    name: 'Silver Package',
    price: 'LKR 500,000',
    features: [
      'Premium venue decoration',
      'Photography & Videography',
      'Catering for 100 guests',
      'Live band or DJ',
      'Designer wedding cake',
      'Bridal makeup & dressing',
      "more..."
    ],
    image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600',
    popular: true,
    category: 'Wedding'
  },
  {
    name: 'Corporate Event Package',
    price: 'LKR 600,000',
    features: [
      "Pro venue setup & branding",
      "AV + stage setup",
      "Photo & video (full day)",
      "Catering — 120 guests",
      "Registration desk",
      "more..."
    ],
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600',
    popular: false,
    category: 'Corporate'
  },
  {
    name: 'Gold Package',
    price: 'LKR 850,000',
    features: [
      "Luxury décor",
      "Premium photo & video",
      "Catering — 150 guests",
      "Live entertainment",
      "Custom wedding cake",
      "Bride & groom styling",
      "more..."
    ],
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600',
    popular: true,
    category: 'Wedding'
  },
  {
    name: 'Royal Package',
    price: 'LKR 1,500,000+',
    features: [
      "Royal décor",
      "Cinematic photo & video",
      "Catering — 200+ guests",
      "Celebrity entertainment",
      "Designer cake",
      "Styling team",
      "more..."
    ],
    image: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600',
    popular: true,
    category: 'Wedding'
  }
];

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('MongoDB connected');
    await Package.deleteMany({});
    await Package.insertMany(packages);
    console.log('✅ Packages added to database!');
    process.exit();
  })
  .catch(err => console.error(err));
