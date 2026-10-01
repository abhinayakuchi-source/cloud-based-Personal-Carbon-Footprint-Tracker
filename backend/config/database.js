const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI);

        console.log("---------------------------------------");
        console.log("MongoDB Atlas Connected");
        console.log(`Database Host: ${connection.connection.host}`);
        console.log("---------------------------------------");
    } catch (error) {
        console.error("MongoDB connection failed:");
        console.error(error.message);
        process.exit(1);
    }
};

module.exports = connectDB;