const jwt = require("jsonwebtoken");

// ==========================================
// AUTHENTICATION MIDDLEWARE
// ==========================================

const protect = (req, res, next) => {
    try {

        // Get Authorization header
        const authHeader =
            req.headers.authorization;

        // Check whether token exists
        if (
            !authHeader ||
            !authHeader.startsWith("Bearer ")
        ) {
            return res.status(401).json({
                success: false,
                message:
                    "Authentication required. Please login first."
            });
        }

        // Extract token
        const token =
            authHeader.split(" ")[1];

        // Verify token
        const decoded =
            jwt.verify(
                token,
                process.env.JWT_SECRET
            );

        // Store decoded user information
        req.user = decoded;

        // Continue to requested route
        next();

    } catch (error) {

        console.error(
            "Authentication error:",
            error.message
        );

        return res.status(401).json({
            success: false,
            message:
                "Invalid or expired authentication token."
        });
    }
};


// ==========================================
// EXPORT
// ==========================================

module.exports = protect;