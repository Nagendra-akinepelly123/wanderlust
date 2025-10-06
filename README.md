🌍 Wanderlust - Travel Booking Platform
🚀 About the Project

Wanderlust is a full-stack web application inspired by Airbnb, built with the MERN stack.
It allows users to explore, filter, and book stays with features like authentication, search, filters, and user reviews.

✨ Features
🔑 User Authentication (Sign up, Login, Sessions)
🏡 CRUD for Listings (Add, Edit, Delete, View stays)
🔍 Filters & Search (by price, location, type, amenities)
⭐ Ratings & Reviews
📸 Image Upload with Cloudinary (or Multer if you used that)
📱 Responsive Design (mobile-friendly)

🛠️ Tech Stack
Frontend: EJS / React (whichever you’re using)
Backend: Node.js, Express.js
Database: MongoDB (Mongoose ODM)
Authentication: Passport.js / JWT (your choice)
Deployment: Render / Vercel / Netlify + MongoDB Atlas

📂 Folder Structure (optional but looks great)
Wanderlust/
├── models/ # Mongoose Schemas
├── routes/ # Express routes
├── views/ # EJS templates
├── public/ # Static files (CSS, JS, Images)
├── app.js # Main server file
└── README.md

⚡ Installation & Setup

# Clone repo

git clone https://github.com/your-username/wanderlust.git

# Move into folder

cd wanderlust

# Install dependencies

npm install

# Setup environment variables

# Example: DB_URL, CLOUDINARY_KEY, SESSION_SECRET

# Start server

npm start

🌐 Deployment

Live Demo 👉 https://wanderlust-project-u7du.onrender.com/listings
📌 Future Enhancements
🗺️ Map integration with Leaflet/Google Maps
📱 Progressive Web App (PWA) support
💳 Payment Gateway Integration
🎒 Wishlist & Booking History

🙌 Acknowledgements
Inspired by Airbnb
