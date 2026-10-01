const CarbonRecord = require("../models/CarbonRecord");

const {
    calculateTotalCarbon
} = require("../services/carbonService");


// ==========================================
// CREATE CARBON RECORD
// ==========================================

const createCarbonRecord = async (req, res) => {

    try {

        const userId =
            req.user.userId;


        // ==========================================
        // GET DATA FROM FRONTEND
        // ==========================================

        const {

            category,

            transportType,

            fuelType,

            distance,

            frequency,

            publicTransport,

            flights,

            electricityUsage,

            renewableEnergy,

            foodType,

            dairyConsumption,

            lifestyleLevel,

            notes

        } = req.body;


        // ==========================================
        // CALCULATE EMISSIONS
        // ==========================================

        const calculation =
            calculateTotalCarbon({

                transportation: {

                    transportType,

                    distance,

                    frequency,

                    publicTransport,

                    flights

                },

                electricity: {

                    electricityUsage,

                    renewableEnergy

                },

                food: {

                    foodType,

                    dairyConsumption

                },

                lifestyle: {

                    lifestyleLevel

                }

            });


        // ==========================================
        // SAVE TO MONGODB
        // ==========================================

        const carbonRecord =
            await CarbonRecord.create({

                userId,

                category:
                    category || "Combined",


                transportType:
                    transportType || "",


                fuelType:
                    fuelType || "",


                distance:
                    Number(distance) || 0,


                frequency:
                    Number(frequency) || 1,


                publicTransport:
                    Number(publicTransport) || 0,


                flights:
                    Number(flights) || 0,


                transportEmission:
                    calculation.transportation,


                electricityUsage:
                    Number(electricityUsage) || 0,


                renewableEnergy:
                    renewableEnergy || "none",


                electricityEmission:
                    calculation.electricity,


                foodType:
                    foodType || "",


                dairyConsumption:
                    dairyConsumption || "",


                foodEmission:
                    calculation.food,


                lifestyleLevel:
                    lifestyleLevel || "",


                lifestyleEmission:
                    calculation.lifestyle,


                totalEmission:
                    calculation.total,


                notes:
                    notes || ""

            });


        // ==========================================
        // RESPONSE
        // ==========================================

        res.status(201).json({

            success: true,

            message:
                "Carbon record created successfully",

            data: {

                recordId:
                    carbonRecord._id,

                emissions: {

                    transportation:
                        calculation.transportation,

                    electricity:
                        calculation.electricity,

                    food:
                        calculation.food,

                    lifestyle:
                        calculation.lifestyle,

                    total:
                        calculation.total

                },

                calculationDate:
                    carbonRecord.calculationDate

            }

        });


    } catch (error) {

        console.error(
            "Carbon record error:",
            error.message
        );


        res.status(500).json({

            success: false,

            message:
                "Unable to create carbon record",

            error:
                error.message

        });

    }
};


module.exports = {

    createCarbonRecord

};