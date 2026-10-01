// ==========================================
// CarbonTrack - Carbon Calculator
// ==========================================


// ==========================================
// MAIN CALCULATOR FUNCTION
// ==========================================

async function calculateCarbon() {

    // ------------------------------------------
    // Check Login
    // ------------------------------------------

    const token =
        localStorage.getItem("carbonTrackToken");

    if (!token) {

        alert(
            "Please login before using the Carbon Calculator."
        );

        window.location.href = "login.html";

        return;
    }


    // ==========================================
    // GET TRANSPORTATION VALUES
    // ==========================================

    const vehicle =
        document.getElementById("vehicleType").value;

    const fuel =
        document.getElementById("fuelType").value;

    const distance =
        parseFloat(
            document.getElementById("distance").value
        ) || 0;

    const publicTransport =
        parseFloat(
            document.getElementById("publicTransport").value
        ) || 0;

    const flights =
        parseFloat(
            document.getElementById("flights").value
        ) || 0;


    // ==========================================
    // CONVERT VEHICLE TYPE
    // ==========================================

    let transportType = "publicTransport";


    if (vehicle === "car") {

        if (fuel === "petrol") {

            transportType = "petrolCar";

        }

        else if (fuel === "diesel") {

            transportType = "dieselCar";

        }

        else if (fuel === "electric") {

            transportType = "electricCar";

        }

    }

    else if (vehicle === "bike") {

        transportType = "motorcycle";

    }

    else if (vehicle === "bus") {

        transportType = "bus";

    }

    else if (vehicle === "train") {

        transportType = "train";

    }

    else if (vehicle === "none") {

        transportType = "publicTransport";

    }


    // ==========================================
    // GET ELECTRICITY VALUES
    // ==========================================

    const electricityUsage =
        parseFloat(
            document.getElementById("electricity").value
        ) || 0;

    const renewableEnergy =
        document.getElementById("renewable").value;


    // ==========================================
    // GET FOOD VALUES
    // ==========================================

    const foodType =
        document.getElementById("foodType").value;

    const dairyConsumption =
        document.getElementById("dairy").value;


    // ==========================================
    // GET LIFESTYLE VALUE
    // ==========================================

    const lifestyleLevel =
        document.getElementById("lifestyle").value;


    // ==========================================
    // VALIDATION
    // ==========================================

    if (distance < 0) {

        alert(
            "Distance cannot be negative."
        );

        return;
    }


    if (publicTransport < 0) {

        alert(
            "Public transport distance cannot be negative."
        );

        return;
    }


    if (flights < 0) {

        alert(
            "Number of flights cannot be negative."
        );

        return;
    }


    if (electricityUsage < 0) {

        alert(
            "Electricity usage cannot be negative."
        );

        return;
    }


    // ==========================================
    // TRANSPORTATION FACTORS
    // ==========================================

    let vehicleFactor = 0;


    if (vehicle === "car") {

        if (fuel === "petrol") {

            vehicleFactor = 0.21;

        }

        else if (fuel === "diesel") {

            vehicleFactor = 0.25;

        }

        else if (fuel === "electric") {

            vehicleFactor = 0.05;

        }

    }

    else if (vehicle === "bike") {

        vehicleFactor = 0.10;

    }

    else if (vehicle === "bus") {

        vehicleFactor = 0.08;

    }

    else if (vehicle === "train") {

        vehicleFactor = 0.04;

    }


    // ==========================================
    // VEHICLE EMISSION
    // ==========================================

    const vehicleEmission =
        distance * vehicleFactor;


    // ==========================================
    // PUBLIC TRANSPORT EMISSION
    // ==========================================

    const publicEmission =
        publicTransport * 0.05;


    // ==========================================
    // FLIGHT EMISSION
    // ==========================================

    const flightEmission =
        flights * 90;


    // ==========================================
    // TOTAL TRANSPORTATION EMISSION
    // ==========================================

    const transportationEmission =
        vehicleEmission +
        publicEmission +
        flightEmission;


    // ==========================================
    // ELECTRICITY CALCULATION
    // ==========================================

    let electricityFactor = 0.82;


    if (renewableEnergy === "partial") {

        electricityFactor = 0.55;

    }

    else if (renewableEnergy === "full") {

        electricityFactor = 0.10;

    }


    const electricityEmission =
        electricityUsage *
        electricityFactor;


    // ==========================================
    // FOOD CALCULATION
    // ==========================================

    let foodEmission = 60;


    if (foodType === "vegetarian") {

        foodEmission = 35;

    }

    else if (foodType === "mixed") {

        foodEmission = 60;

    }

    else if (foodType === "nonvegetarian") {

        foodEmission = 90;

    }


    // ==========================================
    // DAIRY CALCULATION
    // ==========================================

    if (dairyConsumption === "low") {

        foodEmission += 0;

    }

    else if (dairyConsumption === "medium") {

        foodEmission += 15;

    }

    else if (dairyConsumption === "high") {

        foodEmission += 30;

    }


    // ==========================================
    // LIFESTYLE CALCULATION
    // ==========================================

    let lifestyleEmission = 15;


    if (lifestyleLevel === "low") {

        lifestyleEmission = 15;

    }

    else if (lifestyleLevel === "medium") {

        lifestyleEmission = 30;

    }

    else if (lifestyleLevel === "high") {

        lifestyleEmission = 50;

    }


    // ==========================================
    // TOTAL EMISSION
    // ==========================================

    const totalEmission =
        transportationEmission +
        electricityEmission +
        foodEmission +
        lifestyleEmission;


    // ==========================================
    // DISPLAY TRANSPORTATION
    // ==========================================

    document.getElementById(
        "transportEmission"
    ).textContent =
        transportationEmission.toFixed(1);


    // ==========================================
    // DISPLAY ELECTRICITY
    // ==========================================

    document.getElementById(
        "electricityEmission"
    ).textContent =
        electricityEmission.toFixed(1);


    // ==========================================
    // DISPLAY FOOD
    // ==========================================

    document.getElementById(
        "foodEmission"
    ).textContent =
        foodEmission.toFixed(1);


    // ==========================================
    // DISPLAY LIFESTYLE
    // ==========================================

    document.getElementById(
        "lifestyleEmission"
    ).textContent =
        lifestyleEmission.toFixed(1);


    // ==========================================
    // DISPLAY TOTAL
    // ==========================================

    document.getElementById(
        "totalEmission"
    ).textContent =
        totalEmission.toFixed(1);


    // ==========================================
    // SAVE DATA TO BACKEND
    // ==========================================

    await saveCarbonCalculation({

        token:

            token,

        transportType:

            transportType,

        fuelType:

            fuel,

        distance:

            distance,

        publicTransport:

            publicTransport,

        flights:

            flights,

        electricityUsage:

            electricityUsage,

        renewableEnergy:

            renewableEnergy,

        foodType:

            foodType,

        dairyConsumption:

            dairyConsumption,

        lifestyleLevel:

            lifestyleLevel

    });

}



// ==========================================
// SAVE CARBON CALCULATION
// ==========================================

async function saveCarbonCalculation(data) {

    try {

        // --------------------------------------
        // Send data to backend
        // --------------------------------------

        const response =
            await fetch(
                "http://localhost:5000/api/carbon",
                {

                    method:
                        "POST",

                    headers: {

                        "Content-Type":
                            "application/json",

                        "Authorization":
                            "Bearer " + data.token

                    },

                    body:
                        JSON.stringify({

                            // This calculator
                            // contains all categories
                            category:
                                "Combined",


                            // Transportation
                            transportType:
                                data.transportType,

                            fuelType:
                                data.fuelType,

                            distance:
                                Number(
                                    data.distance
                                ),

                            frequency:
                                1,

                            publicTransport:
                                Number(
                                    data.publicTransport
                                ),

                            flights:
                                Number(
                                    data.flights
                                ),


                            // Electricity
                            electricityUsage:
                                Number(
                                    data.electricityUsage
                                ),

                            renewableEnergy:
                                data.renewableEnergy,


                            // Food
                            foodType:
                                data.foodType,

                            dairyConsumption:
                                data.dairyConsumption,


                            // Lifestyle
                            lifestyleLevel:
                                data.lifestyleLevel,


                            // Notes
                            notes:
                                "Carbon calculation from CarbonTrack calculator"

                        })

                }
            );


        // ======================================
        // CONVERT RESPONSE TO JSON
        // ======================================

        const result =
            await response.json();


        // ======================================
        // BACKEND ERROR
        // ======================================

        if (!response.ok) {

            console.error(
                "CarbonTrack backend error:",
                result
            );


            alert(
                result.message ||
                "Unable to save carbon calculation."
            );


            return;
        }


        // ======================================
        // SUCCESS
        // ======================================

        if (result.success) {

            alert(
                "🌱 Carbon calculation saved successfully!"
            );


            console.log(
                "Saved Carbon Record:",
                result
            );


        }

        else {

            alert(
                result.message ||
                "Calculation could not be saved."
            );

        }


    }


    // ==========================================
    // CONNECTION ERROR
    // ==========================================

    catch (error) {

        console.error(
            "CarbonTrack API Error:",
            error
        );


        alert(
            "Unable to connect to CarbonTrack server. Please make sure the backend is running."
        );

    }

}