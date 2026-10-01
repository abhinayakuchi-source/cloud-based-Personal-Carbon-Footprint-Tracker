// ==========================================
// CarbonTrack - Dynamic Dashboard
// ==========================================

// Store chart instances
let categoryChart = null;
let monthlyChart = null;


// ==========================================
// LOAD DASHBOARD
// ==========================================

async function loadDashboard() {

    const token =
        localStorage.getItem("carbonTrackToken");

    // Check login
    if (!token) {

        window.location.href =
            "login.html";

        return;
    }


    try {

        const response =
            await fetch(
                "https://carbontrack-api-p2lz.onrender.com/api/dashboard",
                {
                    method: "GET",

                    headers: {
                        "Authorization":
                            "Bearer " + token
                    }
                }
            );


        const result =
            await response.json();


        // ==========================================
        // HANDLE AUTHENTICATION ERROR
        // ==========================================

        if (response.status === 401) {

            localStorage.removeItem(
                "carbonTrackToken"
            );

            localStorage.removeItem(
                "carbonTrackUser"
            );

            window.location.href =
                "login.html";

            return;
        }


        // ==========================================
        // HANDLE API ERROR
        // ==========================================

        if (!response.ok) {

            console.error(
                "Dashboard API error:",
                result
            );

            alert(
                result.message ||
                "Unable to load dashboard."
            );

            return;
        }


        if (!result.success) {

            alert(
                result.message ||
                "Unable to load dashboard."
            );

            return;
        }


        // ==========================================
        // DEBUG DATA
        // ==========================================

        console.log(
            "CarbonTrack Dashboard Data:",
            result
        );


        // ==========================================
        // UPDATE DASHBOARD
        // ==========================================

        updateUserInformation(
            result
        );


        updateOverview(
            result
        );


        updateCategoryBreakdown(
            result
        );


        updateGoal(
            result
        );


        updateComparison(
            result
        );


        updateHighestSource(
            result
        );


        updateInsight(
            result
        );


        createCategoryChart(
            result
        );


        createMonthlyChart(
            result
        );


    }

    catch (error) {

        console.error(
            "Dashboard connection error:",
            error
        );

        alert(
            "Unable to connect to CarbonTrack server. Please make sure the backend is running."
        );

    }

}


// ==========================================
// UPDATE USER INFORMATION
// ==========================================

function updateUserInformation(data) {

    // User name

    const userName =
        document.getElementById(
            "userName"
        );

    if (userName) {

        userName.textContent =
            data.user.fullName;

    }


    // Welcome name

    const welcomeName =
        document.getElementById(
            "welcomeName"
        );

    if (welcomeName) {

        welcomeName.textContent =
            data.user.fullName;

    }


    // Current date

    const currentDate =
        document.getElementById(
            "currentDate"
        );

    if (currentDate) {

        currentDate.textContent =
            new Date().toLocaleDateString(
                "en-IN",
                {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                }
            );

    }

}


// ==========================================
// UPDATE OVERVIEW
// ==========================================

function updateOverview(data) {

    const overview =
        data.overview;


    // Total emission

    setText(
        "totalEmission",
        formatNumber(
            overview.totalEmission
        )
    );


    // Monthly emission

    setText(
        "monthlyEmission",
        formatNumber(
            overview.monthlyEmission
        )
    );


    // Weekly emission

    setText(
        "weeklyEmission",
        formatNumber(
            overview.weeklyEmission
        )
    );


    // Average emission

    setText(
        "averageEmission",
        formatNumber(
            overview.averageEmission
        )
    );


    // Today's emission

    setText(
        "todayEmission",
        formatNumber(
            overview.todayEmission
        )
    );


    // Total records

    setText(
        "totalRecords",
        overview.totalRecords
    );

}


// ==========================================
// UPDATE CATEGORY BREAKDOWN
// ==========================================

function updateCategoryBreakdown(data) {

    const categories =
        data.categoryBreakdown;


    setText(
        "transportValue",
        formatNumber(
            categories.transportation
        )
    );


    setText(
        "electricityValue",
        formatNumber(
            categories.electricity
        )
    );


    setText(
        "foodValue",
        formatNumber(
            categories.food
        )
    );


    setText(
        "lifestyleValue",
        formatNumber(
            categories.lifestyle
        )
    );

}


// ==========================================
// UPDATE GOAL
// ==========================================

function updateGoal(data) {

    const goal =
        data.goal;


    // Current emission

    setText(
        "goalCurrent",
        formatNumber(
            goal.current
        )
    );


    // Target

    setText(
        "goalTarget",
        formatNumber(
            goal.target
        )
    );


    // Percentage

    setText(
        "goalPercentage",
        goal.progress + "%"
    );


    // Progress bar

    const progressBar =
        document.getElementById(
            "goalProgress"
        );


    if (progressBar) {

        progressBar.style.width =
            goal.progress + "%";

    }

}


// ==========================================
// UPDATE MONTHLY COMPARISON
// ==========================================

function updateComparison(data) {

    const comparison =
        data.comparison;


    const percentage =
        comparison.percentageChange;


    const element =
        document.getElementById(
            "comparisonPercent"
        );


    if (!element) {

        return;

    }


    // Increase

    if (percentage > 0) {

        element.textContent =
            "+" +
            percentage +
            "%";

        element.classList.remove(
            "positive"
        );

        element.classList.add(
            "negative"
        );

    }


    // Decrease

    else if (percentage < 0) {

        element.textContent =
            percentage +
            "%";

        element.classList.remove(
            "negative"
        );

        element.classList.add(
            "positive"
        );

    }


    // No change

    else {

        element.textContent =
            "0%";

        element.classList.remove(
            "positive",
            "negative"
        );

    }

}


// ==========================================
// UPDATE HIGHEST SOURCE
// ==========================================

function updateHighestSource(data) {

    const highest =
        data.highestSource;


    setText(
        "highestSource",
        highest.category
    );


    setText(
        "highestSourceValue",
        formatNumber(
            highest.emission
        )
    );

}


// ==========================================
// UPDATE SMART INSIGHT
// ==========================================

function updateInsight(data) {

    const highest =
        data.highestSource;


    const element =
        document.getElementById(
            "smartInsight"
        );


    if (!element) {

        return;

    }


    // No data

    if (
        highest.category ===
        "None"
    ) {

        element.textContent =
            "Start your first carbon calculation to receive personalized sustainability insights.";

        return;

    }


    const messages = {

        Transportation:
            "Transportation is currently your largest emission source. Consider public transport, carpooling, cycling, or reducing unnecessary trips.",

        Electricity:
            "Electricity is currently your largest emission source. Consider energy-efficient appliances and increasing renewable energy usage.",

        Food:
            "Food is currently your largest emission source. Reducing high-impact foods and increasing plant-based meals can help.",

        Lifestyle:
            "Lifestyle activities are currently your largest emission source. Small changes in daily habits can help reduce your footprint."

    };


    element.textContent =
        messages[
            highest.category
        ] ||
        "Keep tracking your footprint and look for opportunities to reduce emissions.";

}


// ==========================================
// CREATE CATEGORY DOUGHNUT CHART
// ==========================================

function createCategoryChart(data) {

    const canvas =
        document.getElementById(
            "categoryChart"
        );


    // Canvas doesn't exist

    if (!canvas) {

        return;

    }


    // Chart.js doesn't exist

    if (
        typeof Chart ===
        "undefined"
    ) {

        console.error(
            "Chart.js is not loaded."
        );

        return;

    }


    const categories =
        data.categoryBreakdown;


    // ==========================================
    // IMPORTANT:
    // Destroy existing Chart.js instance
    // ==========================================

    const existingChart =
        Chart.getChart(canvas);


    if (existingChart) {

        existingChart.destroy();

    }


    // Also destroy our stored instance

    if (categoryChart) {

        try {

            categoryChart.destroy();

        }

        catch (error) {

            console.warn(
                "Unable to destroy previous category chart.",
                error
            );

        }

        categoryChart = null;

    }


    // ==========================================
    // CREATE NEW CHART
    // ==========================================

    categoryChart =
        new Chart(
            canvas,
            {
                type: "doughnut",

                data: {

                    labels: [
                        "Transportation",
                        "Electricity",
                        "Food",
                        "Lifestyle"
                    ],

                    datasets: [
                        {
                            data: [
                                categories.transportation,
                                categories.electricity,
                                categories.food,
                                categories.lifestyle
                            ],

                            borderWidth: 0
                        }
                    ]

                },


                options: {

                    responsive: true,

                    maintainAspectRatio:
                        false,


                    plugins: {

                        legend: {

                            position:
                                "bottom"

                        }

                    }

                }

            }
        );

}


// ==========================================
// CREATE MONTHLY TREND CHART
// ==========================================

function createMonthlyChart(data) {

    const canvas =
        document.getElementById(
            "monthlyChart"
        );


    // Canvas doesn't exist

    if (!canvas) {

        return;

    }


    // Chart.js doesn't exist

    if (
        typeof Chart ===
        "undefined"
    ) {

        console.error(
            "Chart.js is not loaded."
        );

        return;

    }


    const trend =
        data.monthlyTrend;


    // ==========================================
    // Destroy existing Chart.js instance
    // ==========================================

    const existingChart =
        Chart.getChart(canvas);


    if (existingChart) {

        existingChart.destroy();

    }


    // Also destroy stored instance

    if (monthlyChart) {

        try {

            monthlyChart.destroy();

        }

        catch (error) {

            console.warn(
                "Unable to destroy previous monthly chart.",
                error
            );

        }

        monthlyChart = null;

    }


    // ==========================================
    // CREATE NEW CHART
    // ==========================================

    monthlyChart =
        new Chart(
            canvas,
            {
                type: "line",

                data: {

                    labels:
                        trend.map(
                            item =>
                                item.month
                        ),

                    datasets: [
                        {

                            label:
                                "CO₂e Emissions",

                            data:
                                trend.map(
                                    item =>
                                        item.emission
                                ),

                            tension:
                                0.4,

                            fill:
                                true,

                            borderWidth:
                                3,

                            pointRadius:
                                5

                        }
                    ]

                },


                options: {

                    responsive:
                        true,

                    maintainAspectRatio:
                        false,


                    scales: {

                        y: {

                            beginAtZero:
                                true,


                            title: {

                                display:
                                    true,

                                text:
                                    "CO₂e (kg)"

                            }

                        }

                    },


                    plugins: {

                        legend: {

                            display:
                                true

                        }

                    }

                }

            }
        );

}


// ==========================================
// SET TEXT HELPER
// ==========================================

function setText(
    elementId,
    value
) {

    const element =
        document.getElementById(
            elementId
        );


    if (element) {

        element.textContent =
            value;

    }

}


// ==========================================
// NUMBER FORMATTER
// ==========================================

function formatNumber(value) {

    return Number(
        value || 0
    ).toFixed(1);

}


// ==========================================
// LOGOUT
// ==========================================

function logoutUser() {

    localStorage.removeItem(
        "carbonTrackToken"
    );

    localStorage.removeItem(
        "carbonTrackUser"
    );


    window.location.href =
        "login.html";

}


// ==========================================
// LOAD DASHBOARD
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadDashboard();

    }
);