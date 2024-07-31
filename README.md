# Perfume E-Commerce Website
Welcome to the Perfume E-Commerce Website! This project is a full-stack application developed using React, Node.js, Redux Toolkit, and MongoDB. It provides a seamless experience for browsing and purchasing perfumes.

## Features
- **Browse Categories**: Explore various categories of perfumes.
- **Sort and Filter**: Sort perfumes by categories, price, and best sellers.
- **Product Details**: View detailed information about each perfume.
- **Shopping Cart**: Add perfumes to the cart and manage your selections.
- **Order Placement**: Place orders for your selected perfumes.
- **Payment Integration**: Secure payment gateway integration for hassle-free transactions.

## Tech Stack
- **Frontend**: React, Redux Toolkit
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Payment Integration**: RazorPay Integration

## Glimpse
![homepage](/assests/Home.png)

![page](/assests/about.png)

## Getting Started
To get a local copy up and running, follow these steps:

## Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB

## Installation
1. **Clone the repository**
  ```bash
  git clone https://github.com/Nipunkhattri/perflo_Perfume.git
  cd perflo_Perfume
  Install dependencies:

# For the frontend
cd frontend
npm install

# For the backend
cd Backend
npm install

# Configure environment variables:
Create a .env file in the server directory with the following variables:
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret_key
  PAYMENT_GATEWAY_KEY=your_payment_gateway_key

# Run the application:
  # Start the backend server
  cd Backend
  nodemon server.js

  # Start the frontend development server
  cd frontend
  npm start

The application will be available at http://localhost:3000.

# Usage
Home Page: Browse through different categories of perfumes.
Product Page: Click on any perfume to view details and add it to your cart.
Cart: Manage your cart and proceed to checkout.
Checkout: Enter shipping information and make a payment.
