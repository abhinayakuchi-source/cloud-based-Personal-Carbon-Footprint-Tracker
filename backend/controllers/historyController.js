const CarbonRecord = require("../models/CarbonRecord");

const getHistory = async (req, res) => {
    try {

        const userId = req.user.userId;
        const period = req.query.period || "all";

        let filter = {
            userId: userId
        };

        const now = new Date();

        // ==============================
        // TODAY
        // ==============================

        if (period === "today") {

            const startOfDay = new Date();

            startOfDay.setHours(
                0,
                0,
                0,
                0
            );

            filter.calculationDate = {
                $gte: startOfDay
            };
        }

        // ==============================
        // THIS MONTH
        // ==============================

        else if (period === "month") {

            const startOfMonth = new Date(
                now.getFullYear(),
                now.getMonth(),
                1
            );

            filter.calculationDate = {
                $gte: startOfMonth
            };
        }

        // ==============================
        // THIS YEAR
        // ==============================

        else if (period === "year") {

            const startOfYear = new Date(
                now.getFullYear(),
                0,
                1
            );

            filter.calculationDate = {
                $gte: startOfYear
            };
        }

        // ==============================
        // GET RECORDS
        // ==============================

        const records = await CarbonRecord
            .find(filter)
            .sort({
                calculationDate: -1
            });

        // ==============================
        // CALCULATE SUMMARY
        // ==============================

        let totalEmission = 0;

        let transportation = 0;

        let electricity = 0;

        let food = 0;

        let lifestyle = 0;

        records.forEach(record => {

            totalEmission +=
                Number(
                    record.totalEmission
                ) || 0;

            transportation +=
                Number(
                    record.transportEmission
                ) || 0;

            electricity +=
                Number(
                    record.electricityEmission
                ) || 0;

            food +=
                Number(
                    record.foodEmission
                ) || 0;

            lifestyle +=
                Number(
                    record.lifestyleEmission
                ) || 0;
        });

        const averageEmission =
            records.length > 0
                ? totalEmission / records.length
                : 0;

        // ==============================
        // RESPONSE
        // ==============================

        res.status(200).json({

            success: true,

            period: period,

            summary: {

                totalRecords:
                    records.length,

                totalEmission:
                    Number(
                        totalEmission.toFixed(2)
                    ),

                averageEmission:
                    Number(
                        averageEmission.toFixed(2)
                    ),

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
            },

            records: records
        });

    }

    catch (error) {

        console.error(
            "History error:",
            error.message
        );

        res.status(500).json({

            success: false,

            message:
                "Unable to load carbon history",

            error:
                error.message
        });
    }
};

module.exports = {
    getHistory
};