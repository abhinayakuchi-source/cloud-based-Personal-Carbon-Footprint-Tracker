const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        age: {
            type: Number,
            required: true,
            min: 1
        },

        gender: {
            type: String,
            required: true
        },

        householdSize: {
            type: Number,
            required: true,
            min: 1
        },

        location: {
            type: String,
            required: true,
            trim: true
        },

        occupation: {
            type: String,
            required: true,
            trim: true
        },

        transportPreference: {
            type: String,
            required: true
        },

        monthlyGoal: {
            type: Number,
            required: true,
            min: 0
        },

        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);