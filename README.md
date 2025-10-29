# Kachnar E-commerce Website

A modern, responsive e-commerce platform for plant sales built with React.

## Features

- 🛒 Product browsing and search
- 🛍️ Shopping cart functionality
- 👤 User authentication (Login/Register)
- 👨‍💼 Admin dashboard for product management
- 💳 Razorpay payment integration
- 📱 Fully responsive design
- 🔍 Plant search with plant identification API

## Tech Stack

- **Frontend:** React, Bootstrap 5
- **State Management:** Redux Toolkit
- **Database:** Firebase Firestore
- **Authentication:** Firebase Auth
- **Payment:** Razorpay
- **Styling:** Bootstrap, CSS

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase project setup
- Razorpay account (for payments)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd Kachnaar-E-commerce-website
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env` file in the root directory:
```
REACT_APP_RAZORPAY_KEY=your_razorpay_key
REACT_APP_SERVICE=your_emailjs_service_id
REACT_APP_TEMPLATE=your_emailjs_template_id
REACT_APP_PUBLIC=your_emailjs_public_key
```

4. Configure Firebase
Update `src/Firebase.js` with your Firebase configuration.

### Running the App

Start the development server:
```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── Pages/          # All page components
├── redux/          # Redux store and slices
├── Firebase.js     # Firebase configuration
└── index.js        # App entry point
```

## Admin Access

- Admin email: `admin@gmail.com`
- Login as Admin in the login page to access the dashboard

## Features Overview

- **Home:** Browse all products with search and sort functionality
- **Product Details:** View detailed product information with image zoom
- **Cart:** Add to cart, manage quantities, and proceed to checkout
- **Profile:** Update user profile information
- **Admin Dashboard:** Add, edit, and manage products
- **Search:** Search for plants using plant identification API
- **Contact:** Send messages via EmailJS

## License

This project is private.
