# 🌱 CarbonTrack
## Cloud-Based Personal Carbon Footprint Tracking and Analytics Platform

> Track • Analyze • Compare • Reduce

CarbonTrack is a cloud-based personal carbon footprint tracking and analytics platform that helps users calculate, monitor, analyze, and reduce their estimated carbon emissions from transportation, electricity, food, and lifestyle activities.

---

## 🚀 Live Demo

## Live Demo:
https://carbontrack-platform.netlify.app/

## Backend API:
https://carbontrack-api-p2lz.onrender.com/

📦 **GitHub Repository:** https://github.com/abhinayakuchi-source/Personal-Carbon-Footprint-Tracker


---

## 📌 Project Overview

CarbonTrack is designed to help individuals understand the estimated environmental impact of their everyday activities.

The platform allows users to:

- Create a personal account
- Securely log in
- Enter personal information
- Calculate carbon emissions
- Track transportation emissions
- Track electricity-related emissions
- Track food-related emissions
- Track lifestyle-related emissions
- View interactive analytics
- Monitor historical calculations
- Compare emission periods
- Set personal carbon goals
- Receive sustainability recommendations
- Generate carbon footprint reports

The application uses a full-stack architecture with a JavaScript frontend, Node.js and Express.js backend, MongoDB Atlas cloud database, JWT authentication, bcrypt password hashing, and Chart.js visualizations.

---

## 🎯 Project Objectives

- Calculate estimated personal carbon emissions.
- Track carbon footprint records over time.
- Analyze emissions by category.
- Identify the highest emission source.
- Compare current and previous emission periods.
- Set personal carbon reduction goals.
- Monitor progress toward carbon goals.
- Provide sustainability recommendations.
- Generate carbon footprint reports.
- Store application data using a cloud database.
- Demonstrate practical cloud computing concepts.
- Deploy the application as a publicly accessible web application.

---

## ✨ Features

### 👤 User Management

- User registration
- Secure login
- JWT-based authentication
- Password hashing using bcryptjs
- Protected application pages
- Personal profile management
- Password change functionality
- User-specific data access
- Monthly carbon goal configuration

### 🚗 Transportation Tracking

CarbonTrack supports:

- Petrol cars
- Diesel cars
- Electric cars
- Motorcycles
- Buses
- Trains
- Public transportation
- Flights
- Travel distance

The system calculates estimated transportation-related CO₂e emissions.

### ⚡ Electricity Tracking

Users can provide:

- Electricity consumption
- Renewable energy usage
- Household information

The system estimates electricity-related emissions.

### 🍃 Food Tracking

CarbonTrack considers:

- Vegetarian food habits
- Mixed food habits
- Non-vegetarian food habits
- Dairy consumption

### 🌿 Lifestyle Tracking

Users can select their lifestyle activity level.

The system estimates lifestyle-related emissions and includes them in the overall footprint.

### 📊 Interactive Dashboard

The dashboard provides:

- Total carbon emissions
- Today's emissions
- Weekly emissions
- Monthly emissions
- Average emissions
- Total calculation records
- Category-wise emission breakdown
- Highest emission source
- Monthly emission trend
- Personal goal progress
- Current vs previous month comparison
- Smart sustainability insights

### 📈 Data Visualization

Chart.js is used to visualize:

- Transportation emissions
- Electricity emissions
- Food emissions
- Lifestyle emissions
- Category breakdown
- Monthly emission trends

### 🕒 Carbon History

Users can view previous calculations using:

- All History
- Today
- This Month
- This Year

Each record contains emission information and its calculation date.

### 🎯 Personal Carbon Goals

Users can define a monthly carbon target.

The system displays:

- Current emissions
- Target emissions
- Goal progress
- Progress percentage

### 💡 Smart Recommendations

CarbonTrack provides recommendations based on emission categories.

Examples include:

- Using public transportation
- Reducing unnecessary travel
- Cycling or walking for suitable journeys
- Improving electricity efficiency
- Increasing renewable energy usage
- Choosing lower-impact meals
- Developing sustainable daily habits

### 📄 Reports

Reports provide:

- Reporting period
- Total emissions
- Average emissions
- Category-wise emissions
- Highest emission source
- Recommendations
- Carbon calculation records

Supported periods:

- Today
- Week
- Month
- Year

### 🔐 Security

CarbonTrack includes:

- JWT authentication
- bcryptjs password hashing
- Protected API routes
- Authentication middleware
- User-specific database records
- Input validation
- Environment variables
- Secure configuration
- `.env` excluded from GitHub

---

## 🏗️ System Architecture

    🌱 CARBONTRACK
            │
            ▼
    ┌─────────────────────────┐
    │       FRONTEND          │
    │                         │
    │ HTML5                   │
    │ CSS3                    │
    │ Bootstrap               │
    │ JavaScript              │
    │ Chart.js                │
    └────────────┬────────────┘
                 │
                 │ REST API
                 ▼
    ┌─────────────────────────┐
    │        BACKEND          │
    │                         │
    │ Node.js                 │
    │ Express.js              │
    │ JWT Authentication      │
    │ bcryptjs                │
    └────────────┬────────────┘
                 │
                 │ Mongoose
                 ▼
    ┌─────────────────────────┐
    │      MONGODB ATLAS      │
    │                         │
    │      ☁️ Cloud DB        │
    └─────────────────────────┘

---

## 🔄 Application Workflow

    USER
      │
      ▼
    Register / Login
      │
      ▼
    JWT Authentication
      │
      ▼
    Carbon Calculator
      │
      ├── Transportation
      ├── Electricity
      ├── Food
      └── Lifestyle
      │
      ▼
    Carbon Calculation
      │
      ▼
    REST API Backend
      │
      ▼
    MongoDB Atlas
      │
      ▼
    Dashboard & Analytics
      │
      ├── History
      ├── Reports
      ├── Goals
      └── Recommendations

---

## ☁️ Cloud Computing Architecture

    INTERNET
        │
        ▼
    ┌───────────────────┐
    │      NETLIFY      │
    │                   │
    │    Frontend       │
    └─────────┬─────────┘
              │
              │ HTTPS / REST API
              ▼
    ┌───────────────────┐
    │      RENDER       │
    │                   │
    │ Node.js Backend   │
    │ Express.js API    │
    └─────────┬─────────┘
              │
              │ Mongoose
              ▼
    ┌───────────────────┐
    │   MONGODB ATLAS   │
    │                   │
    │  Cloud Database   │
    └───────────────────┘

---

## 🛠️ Technology Stack

### Frontend

- HTML5
- CSS3
- Bootstrap 5
- JavaScript
- Chart.js

### Backend

- Node.js
- Express.js
- REST API
- Mongoose

### Database

- MongoDB Atlas

### Authentication & Security

- JSON Web Token (JWT)
- bcryptjs
- Authentication Middleware
- Environment Variables

### Development Tools

- Git
- GitHub
- npm
- Node.js

### Deployment

- Netlify
- Render
- MongoDB Atlas

---

## 📁 Project Structure

    Personal-Carbon-Footprint-Tracker/
    │
    ├── frontend/
    │   ├── index.html
    │   ├── login.html
    │   ├── register.html
    │   ├── dashboard.html
    │   ├── calculator.html
    │   ├── history.html
    │   ├── profile.html
    │   ├── reports.html
    │   ├── settings.html
    │   │
    │   ├── css/
    │   │   ├── style.css
    │   │   ├── calculator.css
    │   │   └── history.css
    │   │
    │   ├── js/
    │   │   ├── script.js
    │   │   ├── auth.js
    │   │   ├── calculator.js
    │   │   ├── dashboard.js
    │   │   ├── history.js
    │   │   ├── profile.js
    │   │   ├── reports.js
    │   │   └── settings.js
    │   │
    │   └── assets/
    │       ├── images/
    │       └── icons/
    │
    ├── backend/
    │   ├── server.js
    │   ├── package.json
    │   ├── package-lock.json
    │   │
    │   ├── config/
    │   │   └── database.js
    │   │
    │   ├── controllers/
    │   │   ├── authController.js
    │   │   ├── carbonController.js
    │   │   ├── dashboardController.js
    │   │   ├── historyController.js
    │   │   ├── profileController.js
    │   │   └── reportController.js
    │   │
    │   ├── middleware/
    │   │   ├── authMiddleware.js
    │   │   └── errorMiddleware.js
    │   │
    │   ├── models/
    │   │   ├── User.js
    │   │   ├── CarbonRecord.js
    │   │   ├── Goal.js
    │   │   └── Recommendation.js
    │   │
    │   ├── routes/
    │   │   ├── auth.js
    │   │   ├── carbon.js
    │   │   ├── dashboard.js
    │   │   ├── history.js
    │   │   ├── profile.js
    │   │   └── reports.js
    │   │
    │   ├── services/
    │   │   ├── carbonService.js
    │   │   ├── recommendationService.js
    │   │   └── reportService.js
    │   │
    │   └── utils/
    │       ├── carbonFactor.js
    │       └── validators.js
    │
    ├── .gitignore
    └── README.md

---

## 📊 Carbon Calculation

### Transportation

Factors considered:

- Vehicle type
- Fuel type
- Travel distance
- Public transportation
- Flights

### Electricity

Factors considered:

- Electricity consumption
- Renewable energy usage

### Food

Factors considered:

- Food type
- Dairy consumption

### Lifestyle

Factors considered:

- Lifestyle activity level

The selected inputs are combined to produce an estimated total carbon footprint.

> CarbonTrack provides estimated values for tracking and educational purposes. Actual emissions can vary depending on individual circumstances, energy sources, travel conditions, and other real-world factors.

---

## ☁️ Cloud Computing Implementation

CarbonTrack demonstrates:

- Cloud-hosted database using MongoDB Atlas
- Cloud-hosted backend
- Cloud-hosted frontend
- REST API communication
- Remote data storage
- Authentication and authorization
- Cloud deployment
- Client-server architecture
- Environment-based configuration

---

## 🔐 Environment Variables

Sensitive configuration is stored locally in:

    backend/.env

Example:

    MONGODB_URI=your_mongodb_atlas_connection_string
    JWT_SECRET=your_secret_key
    PORT=5000

The `.env` file is excluded from Git using `.gitignore`.

Never upload:

- Database passwords
- JWT secrets
- API keys
- Private credentials
- Sensitive configuration

---

## ⚙️ Local Installation

### 1. Clone the Repository

    git clone https://github.com/abhinayakuchi-source/Personal-Carbon-Footprint-Tracker.git

### 2. Enter the Project

    cd Personal-Carbon-Footprint-Tracker

### 3. Install Backend Dependencies

    cd backend
    npm install

### 4. Create Environment Variables

Create:

    backend/.env

Add:

    MONGODB_URI=your_mongodb_atlas_connection_string
    JWT_SECRET=your_secret_key
    PORT=5000

### 5. Start the Backend

    npm start

For development:

    npm run dev

Backend:

    http://localhost:5000

### 6. Open the Frontend

Open:

    frontend/index.html

in a web browser.

---

## 🔗 API Endpoints

### Authentication

    POST /api/auth/register
    POST /api/auth/login

### Carbon Calculator

    POST /api/carbon

### Dashboard

    GET /api/dashboard

### History

    GET /api/history

### Profile

    GET /api/profile
    PUT /api/profile
    PUT /api/profile/password

### Reports

    GET /api/reports

### Health Check

    GET /api/health

---

## 🧪 Testing

The application can be tested for:

- User registration
- User login
- JWT authentication
- Password hashing
- Carbon calculations
- Carbon record creation
- MongoDB storage
- Dashboard analytics
- Category breakdown
- Monthly trends
- History filtering
- Profile updates
- Password changes
- Reports
- Smart recommendations
- API health
- Cloud database connectivity
- Live deployment

---

## 🚀 Deployment

CarbonTrack is designed for cloud deployment.

### Frontend

Netlify

Used to host the public CarbonTrack website.

### Backend

Render

Used to host the Node.js and Express.js backend API.

### Database

MongoDB Atlas

Used as the cloud database.

### Deployment Flow

    GitHub
       │
       ├──────────────► Netlify
       │                  │
       │                  ▼
       │              Frontend
       │
       └──────────────► Render
                          │
                          ▼
                      Backend API
                          │
                          ▼
                     MongoDB Atlas
                          │
                          ▼
                     Cloud Database

---

## 🌍 Live Application

After deployment, the actual URLs will be added here.

    🌐 Live Application:
    YOUR_NETLIFY_URL

    ⚙️ Backend API:
    YOUR_RENDER_URL

    ☁️ Database:
    MongoDB Atlas

The final Live Demo will allow users to access CarbonTrack through a normal web browser without running the project locally.

---

## 📸 Screenshots

The final repository can include screenshots of:

- Home Page
- Registration Page
- Login Page
- Dashboard
- Carbon Calculator
- History
- Profile
- Reports
- Settings
- Live Application

---

## 🔮 Future Enhancements

- Machine learning-based carbon footprint prediction
- Next-month emission forecasting
- Advanced personalized recommendations
- PDF report generation
- CSV report export
- Admin analytics dashboard
- Additional emission categories
- Advanced data visualization
- Sustainability challenges
- Achievement and reward system
- Environmental awareness content
- Production monitoring
- Improved mobile experience

---

## 🎓 Academic Value

This project demonstrates practical knowledge of:

- Cloud Computing
- Full-Stack Web Development
- REST API Development
- Database Management
- MongoDB Atlas
- Authentication
- Data Analytics
- Data Visualization
- Software Architecture
- Cloud Deployment
- Git and GitHub
- Secure Web Application Development

---

## 💼 Resume Description

**CarbonTrack — Cloud-Based Personal Carbon Footprint Tracking and Analytics Platform**

Developed a full-stack cloud-based platform that enables users to calculate, track, analyze, and monitor personal carbon emissions across transportation, electricity, food, and lifestyle categories. Implemented JWT authentication, bcrypt password hashing, MongoDB Atlas cloud storage, interactive Chart.js dashboards, historical analytics, personal goals, reports, and sustainability recommendations. Designed the application for cloud deployment using Netlify, Render, and MongoDB Atlas.

---

## 👨‍💻 Developer

**Abhinaya Kuchi**

B.Tech – Artificial Intelligence & Data Science

GitHub:

https://github.com/abhinayakuchi-source

---

## 📜 License

This project is developed for educational, academic, portfolio, and demonstration purposes.

---

## ⭐ Support

If you find CarbonTrack useful or interesting, consider giving the repository a ⭐ on GitHub.

---

<p align="center">
  🌱 <strong>CarbonTrack</strong>
  <br>
  Track your footprint • Understand your impact • Build a sustainable future
</p>
