const CarbonRecord = require("../models/CarbonRecord");
const User = require("../models/User");

const getDashboardData = async (req, res) => {
    try {

        const userId = req.user.userId;

        // ==========================================
        // GET USER
        // ==========================================

        const user = await User.findById(userId).select(
            "fullName monthlyGoal"
        );

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }


        // ==========================================
        // DATE RANGES
        // ==========================================

        const now = new Date();


        // Start of today

        const startOfToday = new Date();

        startOfToday.setHours(
            0,
            0,
            0,
            0
        );


        // Start of this week
        // Monday

        const startOfWeek = new Date(now);

        const day =
            startOfWeek.getDay();

        const difference =
            day === 0 ? 6 : day - 1;

        startOfWeek.setDate(
            startOfWeek.getDate() - difference
        );

        startOfWeek.setHours(
            0,
            0,
            0,
            0
        );


        // Start of this month

        const startOfMonth = new Date(
            now.getFullYear(),
            now.getMonth(),
            1
        );


        // Start of previous month

        const startOfPreviousMonth =
            new Date(
                now.getFullYear(),
                now.getMonth() - 1,
                1
            );


        // End of previous month

        const endOfPreviousMonth =
            new Date(
                now.getFullYear(),
                now.getMonth(),
                0,
                23,
                59,
                59,
                999
            );


        // ==========================================
        // ALL USER RECORDS
        // ==========================================

        const allRecords =
            await CarbonRecord.find({
                userId: userId
            });


        // ==========================================
        // THIS MONTH
        // ==========================================

        const monthlyRecords =
            await CarbonRecord.find({

                userId: userId,

                calculationDate: {
                    $gte: startOfMonth
                }

            });


        // ==========================================
        // THIS WEEK
        // ==========================================

        const weeklyRecords =
            await CarbonRecord.find({

                userId: userId,

                calculationDate: {
                    $gte: startOfWeek
                }

            });


        // ==========================================
        // TODAY
        // ==========================================

        const todayRecords =
            await CarbonRecord.find({

                userId: userId,

                calculationDate: {
                    $gte: startOfToday
                }

            });


        // ==========================================
        // PREVIOUS MONTH
        // ==========================================

        const previousMonthRecords =
            await CarbonRecord.find({

                userId: userId,

                calculationDate: {
                    $gte: startOfPreviousMonth,
                    $lte: endOfPreviousMonth
                }

            });


        // ==========================================
        // CALCULATE TOTALS
        // ==========================================

        const calculateTotals =
            (records) => {

                let total = 0;

                let transportation = 0;

                let electricity = 0;

                let food = 0;

                let lifestyle = 0;


                records.forEach(
                    (record) => {

                        total +=
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

                    }
                );


                return {

                    total:
                        Number(
                            total.toFixed(2)
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
                };
            };


        const allTotals =
            calculateTotals(
                allRecords
            );


        const monthlyTotals =
            calculateTotals(
                monthlyRecords
            );


        const weeklyTotals =
            calculateTotals(
                weeklyRecords
            );


        const todayTotals =
            calculateTotals(
                todayRecords
            );


        const previousMonthTotals =
            calculateTotals(
                previousMonthRecords
            );


        // ==========================================
        // HIGHEST SOURCE
        // ==========================================

        const sources = {

            Transportation:
                monthlyTotals.transportation,

            Electricity:
                monthlyTotals.electricity,

            Food:
                monthlyTotals.food,

            Lifestyle:
                monthlyTotals.lifestyle
        };


        let highestSource =
            "None";

        let highestValue = 0;


        Object.keys(sources).forEach(
            (source) => {

                if (
                    sources[source] >
                    highestValue
                ) {

                    highestValue =
                        sources[source];

                    highestSource =
                        source;
                }

            }
        );


        // ==========================================
        // MONTHLY GOAL
        // ==========================================

        const monthlyGoal =
            Number(
                user.monthlyGoal
            ) || 0;


        let goalProgress = 0;


        if (monthlyGoal > 0) {

            goalProgress =
                (
                    monthlyTotals.total /
                    monthlyGoal
                ) * 100;

        }


        // Keep percentage between 0 and 100

        goalProgress =
            Math.max(
                0,
                Math.min(
                    100,
                    goalProgress
                )
            );


        // ==========================================
        // PREVIOUS MONTH COMPARISON
        // ==========================================

        let monthlyChange = 0;


        if (
            previousMonthTotals.total > 0
        ) {

            monthlyChange =
                (
                    (
                        monthlyTotals.total -
                        previousMonthTotals.total
                    ) /
                    previousMonthTotals.total
                ) * 100;

        }


        // ==========================================
        // MONTHLY TREND
        // ==========================================

        const monthlyTrend = [];

        const currentYear =
            now.getFullYear();

        const currentMonth =
            now.getMonth();


        for (
            let i = 5;
            i >= 0;
            i--
        ) {

            const monthStart =
                new Date(
                    currentYear,
                    currentMonth - i,
                    1
                );


            const nextMonthStart =
                new Date(
                    currentYear,
                    currentMonth - i + 1,
                    1
                );


            const monthRecords =
                await CarbonRecord.find({

                    userId: userId,

                    calculationDate: {
                        $gte: monthStart,
                        $lt: nextMonthStart
                    }

                });


            const monthTotal =
                calculateTotals(
                    monthRecords
                );


            monthlyTrend.push({

                month:
                    monthStart.toLocaleString(
                        "en-US",
                        {
                            month: "short"
                        }
                    ),

                year:
                    monthStart.getFullYear(),

                emission:
                    monthTotal.total

            });

        }


        // ==========================================
        // RESPONSE
        // ==========================================

        res.status(200).json({

            success: true,

            user: {

                fullName:
                    user.fullName,

                monthlyGoal:
                    monthlyGoal

            },


            overview: {

                totalRecords:
                    allRecords.length,

                totalEmission:
                    allTotals.total,

                todayEmission:
                    todayTotals.total,

                weeklyEmission:
                    weeklyTotals.total,

                monthlyEmission:
                    monthlyTotals.total,

                averageEmission:
                    allRecords.length > 0
                        ? Number(
                            (
                                allTotals.total /
                                allRecords.length
                            ).toFixed(2)
                        )
                        : 0

            },


            categoryBreakdown: {

                transportation:
                    monthlyTotals.transportation,

                electricity:
                    monthlyTotals.electricity,

                food:
                    monthlyTotals.food,

                lifestyle:
                    monthlyTotals.lifestyle

            },


            highestSource: {

                category:
                    highestSource,

                emission:
                    Number(
                        highestValue.toFixed(2)
                    )

            },


            goal: {

                target:
                    monthlyGoal,

                current:
                    monthlyTotals.total,

                progress:
                    Number(
                        goalProgress.toFixed(1)
                    )

            },


            comparison: {

                currentMonth:
                    monthlyTotals.total,

                previousMonth:
                    previousMonthTotals.total,

                percentageChange:
                    Number(
                        monthlyChange.toFixed(1)
                    )

            },


            monthlyTrend:
                monthlyTrend

        });

    }

    catch (error) {

        console.error(
            "Dashboard error:",
            error.message
        );

        res.status(500).json({

            success: false,

            message:
                "Unable to load dashboard data",

            error:
                error.message

        });

    }
};


module.exports = {
    getDashboardData
};