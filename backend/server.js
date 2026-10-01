const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB =
    require("./config/database");

const authRoutes =
    require("./routes/auth");

const carbonRoutes =
    require("./routes/carbon");

const historyRoutes =
    require("./routes/history");

const dashboardRoutes =
    require("./routes/dashboard");   
    
const profileRoutes =
    require("./routes/profile");    

const reportsRoutes =
    require("./routes/reports");    

dotenv.config();

connectDB();

const app = express();

const PORT =
    process.env.PORT || 5000;


// ==========================================
// Middleware
// ==========================================

app.use(cors());

app.use(
    express.json()
);

app.use(
    express.urlencoded({
        extended: true
    })
);


// ==========================================
// API Routes
// ==========================================

app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/carbon",
    carbonRoutes
);

app.use(
    "/api/history",
    historyRoutes
);
app.use(
    "/api/dashboard",
    dashboardRoutes
);
app.use(
    "/api/profile",
    profileRoutes
);

app.use(
    "/api/reports",
    reportsRoutes
);
// ==========================================
// Home Route
// ==========================================

app.get(
    "/",
    (req, res) => {

        res.json({

            success: true,

            message:
                "CarbonTrack Backend API is running!",

            project:
                "Personal Carbon Footprint Tracking and Analytics Platform"
        });
    }
);


// ==========================================
// Health Check
// ==========================================

app.get(
    "/api/health",
    (req, res) => {

        res.json({

            success: true,

            status:
                "Healthy",

            server:
                "Running",

            timestamp:
                new Date()
        });
    }
);


// ==========================================
// Start Server
// ==========================================

app.listen(
    PORT,
    () => {

        console.log(
            "---------------------------------------"
        );

        console.log(
            "CarbonTrack Backend Server"
        );

        console.log(
            "---------------------------------------"
        );

        console.log(
            `Server running on port ${PORT}`
        );

        console.log(
            `http://localhost:${PORT}`
        );

        console.log(
            "---------------------------------------"
        );
    }
);