// ==========================================
// CarbonTrack - Recommendation Service
// ==========================================

const generateRecommendations = (
    categories
) => {

    const recommendations = [];


    // ==========================================
    // TRANSPORTATION
    // ==========================================

    if (
        categories.transportation > 0
    ) {

        recommendations.push({

            category:
                "Transportation",

            title:
                "Reduce travel emissions",

            message:
                "Consider public transport, carpooling, cycling, or walking for suitable journeys.",

            priority:
                categories.transportation

        });

    }


    // ==========================================
    // ELECTRICITY
    // ==========================================

    if (
        categories.electricity > 0
    ) {

        recommendations.push({

            category:
                "Electricity",

            title:
                "Improve energy efficiency",

            message:
                "Switch off unused appliances and consider energy-efficient devices or renewable energy.",

            priority:
                categories.electricity

        });

    }


    // ==========================================
    // FOOD
    // ==========================================

    if (
        categories.food > 0
    ) {

        recommendations.push({

            category:
                "Food",

            title:
                "Choose lower-impact meals",

            message:
                "Consider increasing plant-based meals and reducing high-impact food consumption.",

            priority:
                categories.food

        });

    }


    // ==========================================
    // LIFESTYLE
    // ==========================================

    if (
        categories.lifestyle > 0
    ) {

        recommendations.push({

            category:
                "Lifestyle",

            title:
                "Build sustainable habits",

            message:
                "Reduce unnecessary consumption and choose reusable and sustainable alternatives where possible.",

            priority:
                categories.lifestyle

        });

    }


    // Highest impact first

    recommendations.sort(
        (a, b) =>
            b.priority -
            a.priority
    );


    return recommendations;

};


module.exports = {
    generateRecommendations
};