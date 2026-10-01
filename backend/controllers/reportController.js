const CarbonRecord = require("../models/CarbonRecord");

const getReport = async (req, res) => {

    try {

        const userId = req.user.userId;
        const period = req.query.period || "month";

        const now = new Date();

        let startDate;

        if (period === "today") {

            startDate = new Date();
            startDate.setHours(0, 0, 0, 0);

        }

        else if (period === "week") {

            startDate = new Date(now);

            const day = startDate.getDay();

            const difference =
                day === 0 ? 6 : day - 1;

            startDate.setDate(
                startDate.getDate() - difference
            );

            startDate.setHours(0, 0, 0, 0);

        }

        else if (period === "year") {

            startDate = new Date(
                now.getFullYear(),
                0,
                1
            );

        }

        else {

            startDate = new Date(
                now.getFullYear(),
                now.getMonth(),
                1
            );

        }


        const records =
            await CarbonRecord.find({

                userId: userId,

                calculationDate: {
                    $gte: startDate,
                    $lte: now
                }

            }).sort({
                calculationDate: -1
            });


        let total = 0;
        let transportation = 0;
        let electricity = 0;
        let food = 0;
        let lifestyle = 0;


        records.forEach(record => {

            total +=
                Number(record.totalEmission) || 0;

            transportation +=
                Number(record.transportEmission) || 0;

            electricity +=
                Number(record.electricityEmission) || 0;

            food +=
                Number(record.foodEmission) || 0;

            lifestyle +=
                Number(record.lifestyleEmission) || 0;

        });


        const categories = {

            transportation:
                Number(
                    transportation.toFixed(2)
                ),

            electricity:
                Number(
                    electricity.toFixed(2)
                ),

            food:
                Number(
                    food.toFixed(2)
                ),

            lifestyle:
                Number(
                    lifestyle.toFixed(2)
                )

        };


        let highestCategory =
            "None";

        let highestValue = 0;


        Object.entries(categories)
            .forEach(([category, value]) => {

                if (value > highestValue) {

                    highestValue = value;

                    highestCategory =
                        category;

                }

            });


        const recommendations = [];


        if (
            highestCategory ===
            "transportation"
        ) {

            recommendations.push(
                "Consider public transport, cycling, walking, or carpooling for shorter journeys."
            );

        }

        else if (
            highestCategory ===
            "electricity"
        ) {

            recommendations.push(
                "Use energy-efficient appliances and reduce unnecessary electricity consumption."
            );

        }

        else if (
            highestCategory ===
            "food"
        ) {

            recommendations.push(
                "Consider increasing plant-based meals and reducing high-impact food consumption."
            );

        }

        else if (
            highestCategory ===
            "lifestyle"
        ) {

            recommendations.push(
                "Adopt sustainable daily habits and reduce unnecessary consumption."
            );

        }

        else {

            recommendations.push(
                "Start tracking your carbon footprint to receive personalized recommendations."
            );

        }


        res.status(200).json({

            success: true,

            period: period,

            generatedAt: new Date(),

            summary: {

                totalRecords:
                    records.length,

                totalEmission:
                    Number(
                        total.toFixed(2)
                    ),

                averageEmission:
                    records.length > 0
                        ? Number(
                            (
                                total /
                                records.length
                            ).toFixed(2)
                        )
                        : 0

            },

            categories: categories,

            highestSource: {

                category:
                    highestCategory,

                emission:
                    Number(
                        highestValue.toFixed(2)
                    )

            },

            recommendations:
                recommendations,

            records: records

        });

    }

    catch (error) {

        console.error(
            "Report error:",
            error.message
        );

        res.status(500).json({

            success: false,

            message:
                "Unable to generate report",

            error:
                error.message

        });

    }

};


module.exports = {
    getReport
};