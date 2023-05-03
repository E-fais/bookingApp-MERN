# MERN - Booking App (air bnb clone)

This project is a MERN stack web application which includes a Node.js backend using Express.js and MongoDB for data storage. The frontend is built with React.js.

## Requirements

- Node.js
- MongoDB

## Getting started

1. Clone the repository: `git clone https://github.com/your-username/mern-project.git`
2. Install dependencies: `npm install`
3. Create a `.env` file in the root directory and add the following environment variables:
   ```
   MONGO_URL=<your-mongodb-connection-string>
   ```
4. Start the development server: `npm run dev`

## Dependencies

### Backend

- express: web application framework for Node.js
- mongoose: MongoDB object modeling tool
- dotenv: loads environment variables from a `.env` file
- cors: middleware to enable Cross-Origin Resource Sharing
- jsonwebtoken: JSON Web Token implementation for authentication
- bcryptjs: library for password hashing
- cookie-parser: middleware to parse cookies
- image-downloader: package to download images from URLs
- multer: middleware to handle file uploads
- path: Node.js module to handle file paths
- fs: Node.js module to work with the file system

### Frontend

- react: JavaScript library for building user interfaces.
- react-router-dom: DOM bindings for React Router
- axios: promise-based HTTP client for the browser and Node.js
- tailwind css: front-end framework for responsive web design

## Backend API Routes

### Authentication

- POST /register: Register a new user.
- POST /login: Login a user.
- GET /profile: Get the profile of the authenticated user.
- POST /logout: Logout the authenticated user.

### Places

- POST /places: Create a new place.
- GET /user-places: Get all places created by the authenticated user.
- GET /places/:id: Get a place by ID.
- PUT /places: Update a place.
