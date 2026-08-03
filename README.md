# Online Auction Platform

A full-stack online auction application built with the MERN stack and Socket.io. Users can register, create products, launch auctions, place bids, upload product images, and track their activities through a dashboard and profile pages.

## Overview

This project provides a complete auction marketplace experience with:

- User authentication and protected routes
- Product management for sellers
- Auction creation with scheduling and bidding rules
- Real-time bid updates using Socket.io
- Image uploads for products
- User dashboards for products, auctions, and bids
- Responsive UI built with React and Bootstrap

## Key Features

### User Authentication

- Register and log in with JWT-based authentication
- Secure access to private routes such as dashboard, profile, and creation pages
- Profile management with editable personal details and password change support

### Product Management

- Create products with name, description, category, condition, and starting price
- Upload multiple product images
- View product details and browse products by category or condition
- Sellers can update or remove their own products

### Auction Management

- Create auctions tied to existing products
- Set start time, end time, starting bid, and minimum bid increment
- Auction states include pending, active, completed, and cancelled
- Automatic status updates based on scheduled time
- Sellers can manage or cancel auctions when allowed

### Bidding Experience

- Place bids with validation for minimum increments and current highest bid
- Prevent self-bidding on your own auction
- View bid history per auction
- Track active bids and auctions won by the current user
- Real-time updates for new bids and auction changes

### Real-Time Communication

- Socket.io-powered auction rooms
- Immediate broadcast of new bids and auction updates to connected clients
- Live auction experience without page refresh

### User Experience

- Responsive Bootstrap-based UI
- Dedicated home, auctions, products, dashboard, profile, and not-found pages
- Alert system for feedback and form validation messages

## Tech Stack

### Frontend

- React
- React Router
- Bootstrap
- Axios
- Socket.io Client
- React Datepicker

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT)
- Socket.io
- Multer for image uploads
- Bcrypt.js for password hashing

## Project Structure

```text
client/                 # React frontend
  src/
    components/          # Pages, layout, auth, auctions, products, dashboard, profile
    context/             # Auth and Socket context providers
    App.js               # Main app routes

server/                 # Express backend
  models/                # User, Product, Auction, Bid schemas
  routes/                # Auth, products, auctions, bids, uploads endpoints
  middleware/            # Auth middleware
  uploads/               # Uploaded product images
  server.js              # Express + Socket.io server entry point
```

## Prerequisites

Make sure the following are installed:

- Node.js (recommended: v18 or later)
- npm
- MongoDB running locally or accessible through a MongoDB Atlas connection

## Environment Variables

Create a .env file inside the server directory with values similar to the following:

```env
MONGODB_URI=mongodb://localhost:27017/auction-platform
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
```

## Installation

1. Clone the repository

```bash
git clone <repository-url>
cd Online-Auction-Platform
```

2. Install backend dependencies

```bash
cd server
npm install
```

3. Install frontend dependencies

```bash
cd ../client
npm install
```

## Running the Application

### Option 1: Start both frontend and backend together

From the server directory:

```bash
npm run dev
```

This starts:

- Backend server on http://localhost:5000
- Frontend development server on http://localhost:3000

### Option 2: Start with the provided Windows batch file

From the project root:

```bash
start.bat
```

### Production build

Build the client:

```bash
cd client
npm run build
```

Start the server:

```bash
cd ../server
npm start
```

## Main Application Routes

### Public Routes

- /
- /login
- /register
- /auctions
- /auctions/:id
- /products
- /products/:id

### Protected Routes

- /dashboard
- /profile
- /create-product
- /create-auction
- /create-auction/:productId

## API Overview

### Authentication

- POST /api/users/register
- POST /api/users/login

### Users

- GET /api/users/profile
- PUT /api/users/profile
- PUT /api/users/password

### Products

- POST /api/products
- GET /api/products
- GET /api/products/:id
- PUT /api/products/:id
- DELETE /api/products/:id
- GET /api/products/user/me

### Auctions

- POST /api/auctions
- GET /api/auctions
- GET /api/auctions/active
- GET /api/auctions/:id
- PUT /api/auctions/:id
- DELETE /api/auctions/:id
- GET /api/auctions/user/me

### Bids

- POST /api/bids
- GET /api/bids/auction/:auctionId
- GET /api/bids/user/me
- GET /api/bids/active
- GET /api/bids/won

### Uploads

- POST /api/uploads
- GET /api/uploads/:filename
- DELETE /api/uploads/:filename

## Real-Time Socket Events

The server listens for and broadcasts:

- joinAuction
- leaveAuction
- newBid
- bidPlaced
- auctionUpdated
- auctionStatusChanged
- newAuction

## Notes

- Uploaded images are stored in the server uploads folder and served via /uploads
- The backend automatically updates auction status based on current time
- The project currently uses a local development setup and does not include a dedicated license file

## License

This project currently does not include a license file. Add one if you plan to distribute or publish it publicly.
