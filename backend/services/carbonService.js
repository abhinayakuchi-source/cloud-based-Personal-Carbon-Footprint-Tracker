// ==========================================
// CarbonTrack - Carbon Calculation Service
// ==========================================


// ==========================================
// TRANSPORTATION FACTORS
// kg CO2e per km
// ==========================================

const transportFactors = {

    petrolCar: 0.21,

    dieselCar: 0.25,

    electricCar: 0.05,

    motorcycle: 0.10,

    bus: 0.08,

    train: 0.04,

    publicTransport: 0.05
};


// ==========================================
// FLIGHT FACTOR
// kg CO2e per flight
// ==========================================

const flightFactor = 90;


// ==========================================
// ELECTRICITY FACTORS
// kg CO2e per kWh
// ==========================================

const electricityFactors = {

    none: 0.82,

    partial: 0.55,

    full: 0.10
};


// ==========================================
// FOOD FACTORS
// kg CO2e
// ==========================================

const foodFactors = {

    vegetarian: 35,

    mixed: 60,

    nonvegetarian: 90
};


// ==========================================
// DAIRY FACTORS
// ==========================================

const dairyFactors = {

    low: 0,

    medium: 15,

    high: 30
};


// ==========================================
// LIFESTYLE FACTORS
// ==========================================

const lifestyleFactors = {

    low: 15,

    medium: 30,

    high: 50
};


// ==========================================
// TRANSPORTATION CALCULATION
// ==========================================

const calculateTransportation = ({
    transportType,
    distance = 0,
    frequency = 1,
    publicTransport = 0,
    flights = 0
}) => {

    const factor =
        transportFactors[transportType] || 0;


    const vehicleEmission =
        Number(distance) *
        Number(frequency) *
        factor;


    const publicTransportEmission =
        Number(publicTransport) *
        transportFactors.publicTransport;


    const flightEmission =
        Number(flights) *
        flightFactor;


    const total =
        vehicleEmission +
        publicTransportEmission +
        flightEmission;


    return Number(
        total.toFixed(2)
    );
};


// ==========================================
// ELECTRICITY CALCULATION
// ==========================================

const calculateElectricity = ({
    electricityUsage = 0,
    renewableEnergy = "none"
}) => {

    const factor =
        electricityFactors[renewableEnergy] ||
        electricityFactors.none;


    const emission =
        Number(electricityUsage) *
        factor;


    return Number(
        emission.toFixed(2)
    );
};


// ==========================================
// FOOD CALCULATION
// ==========================================

const calculateFood = ({
    foodType = "mixed",
    dairyConsumption = "medium"
}) => {

    const foodEmission =
        foodFactors[foodType] ||
        foodFactors.mixed;


    const dairyEmission =
        dairyFactors[dairyConsumption] ||
        0;


    const total =
        foodEmission +
        dairyEmission;


    return Number(
        total.toFixed(2)
    );
};


// ==========================================
// LIFESTYLE CALCULATION
// ==========================================

const calculateLifestyle = ({
    lifestyleLevel = "medium"
}) => {

    const emission =
        lifestyleFactors[lifestyleLevel] ||
        lifestyleFactors.medium;


    return Number(
        emission.toFixed(2)
    );
};


// ==========================================
// TOTAL CARBON CALCULATION
// ==========================================

const calculateTotalCarbon = ({

    transportation = {},

    electricity = {},

    food = {},

    lifestyle = {}

}) => {


    const transportEmission =
        calculateTransportation(
            transportation
        );


    const electricityEmission =
        calculateElectricity(
            electricity
        );


    const foodEmission =
        calculateFood(
            food
        );


    const lifestyleEmission =
        calculateLifestyle(
            lifestyle
        );


    const totalEmission =
        transportEmission +
        electricityEmission +
        foodEmission +
        lifestyleEmission;


    return {

        transportation:
            transportEmission,

        electricity:
            electricityEmission,

        food:
            foodEmission,

        lifestyle:
            lifestyleEmission,

        total:
            Number(
                totalEmission.toFixed(2)
            )
    };
};


module.exports = {

    calculateTransportation,

    calculateElectricity,

    calculateFood,

    calculateLifestyle,

    calculateTotalCarbon

};