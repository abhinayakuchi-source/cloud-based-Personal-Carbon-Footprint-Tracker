const mongoose = require("mongoose");

const carbonRecordSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        calculationDate: {
            type: Date,
            default: Date.now
        },

        category: {
            type: String,
            required: true,
            enum: [
                "Transportation",
                "Electricity",
                "Food",
                "Lifestyle",
                "Combined"
            ]
        },

        transportType: {
            type: String,
            default: ""
        },

        fuelType: {
            type: String,
            default: ""
        },

        distance: {
            type: Number,
            default: 0
        },

        frequency: {
            type: Number,
            default: 0
        },

        publicTransport: {
            type: Number,
            default: 0
        },

        flights: {
            type: Number,
            default: 0
        },

        transportEmission: {
            type: Number,
            default: 0
        },

        electricityUsage: {
            type: Number,
            default: 0
        },

        renewableEnergy: {
            type: String,
            default: "none"
        },

        electricityEmission: {
            type: Number,
            default: 0
        },

        foodType: {
            type: String,
            default: ""
        },

        dairyConsumption: {
            type: String,
            default: ""
        },

        foodEmission: {
            type: Number,
            default: 0
        },

        lifestyleLevel: {
            type: String,
            default: ""
        },

        lifestyleEmission: {
            type: Number,
            default: 0
        },

        totalEmission: {
            type: Number,
            required: true,
            min: 0
        },

        notes: {
            type: String,
            default: ""
        }
    },

    {
        timestamps: true
    }
);

module.exports =
    mongoose.model(
        "CarbonRecord",
        carbonRecordSchema
    );