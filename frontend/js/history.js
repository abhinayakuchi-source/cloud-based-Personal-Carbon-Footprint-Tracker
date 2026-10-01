// ==========================================
// CarbonTrack - History
// ==========================================

let carbonChart = null;


// ==========================================
// Page Load
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadHistory("all");

    }
);


// ==========================================
// Load History From Backend
// ==========================================

async function loadHistory(period) {

    const token =
        localStorage.getItem(
            "carbonTrackToken"
        );

    // ------------------------------
    // Check Login
    // ------------------------------

    if (!token) {

        alert(
            "Please login to view your carbon history."
        );

        window.location.href =
            "login.html";

        return;
    }


    try {

        const response =
            await fetch(
                `http://localhost:5000/api/history?period=${period}`,
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


        // ------------------------------
        // Backend Error
        // ------------------------------

        if (!response.ok) {

            console.error(
                "History API Error:",
                result
            );

            alert(
                result.message ||
                "Unable to load carbon history."
            );

            return;
        }


        // ------------------------------
        // Success
        // ------------------------------

        if (result.success) {

            updateSummary(
                result.summary
            );

            displayRecords(
                result.records
            );

            updateChart(
                result.summary
            );

            updateFilter(
                period
            );
        }

    }

    catch (error) {

        console.error(
            "History Connection Error:",
            error
        );

        alert(
            "Unable to connect to CarbonTrack server. Please make sure the backend is running."
        );
    }
}


// ==========================================
// Update Summary Cards
// ==========================================

function updateSummary(summary) {

    document.getElementById(
        "totalRecords"
    ).textContent =
        summary.totalRecords;


    document.getElementById(
        "totalEmission"
    ).textContent =
        Number(
            summary.totalEmission
        ).toFixed(1);


    document.getElementById(
        "averageEmission"
    ).textContent =
        Number(
            summary.averageEmission
        ).toFixed(1);


    document.getElementById(
        "transportEmission"
    ).textContent =
        Number(
            summary.transportation
        ).toFixed(1) + " kg";


    document.getElementById(
        "electricityEmission"
    ).textContent =
        Number(
            summary.electricity
        ).toFixed(1) + " kg";


    document.getElementById(
        "foodEmission"
    ).textContent =
        Number(
            summary.food
        ).toFixed(1) + " kg";


    document.getElementById(
        "lifestyleEmission"
    ).textContent =
        Number(
            summary.lifestyle
        ).toFixed(1) + " kg";
}


// ==========================================
// Display History Records
// ==========================================

function displayRecords(records) {

    const container =
        document.getElementById(
            "historyContainer"
        );


    // ------------------------------
    // No Records
    // ------------------------------

    if (
        !records ||
        records.length === 0
    ) {

        container.innerHTML = `

            <div class="empty-history">

                <div class="empty-icon">
                    🌱
                </div>

                <h3>
                    No Carbon Records Yet
                </h3>

                <p>
                    Start using the Carbon Calculator
                    to create your first footprint record.
                </p>

                <a
                    href="calculator.html"
                    class="history-btn"
                >
                    Calculate My Footprint
                </a>

            </div>

        `;

        return;
    }


    // ------------------------------
    // Records
    // ------------------------------

    container.innerHTML =
        records
            .map(
                function (record, index) {

                    const date =
                        new Date(
                            record.calculationDate
                        );


                    const formattedDate =
                        date.toLocaleDateString(
                            "en-IN",
                            {
                                day: "2-digit",
                                month: "short",
                                year: "numeric"
                            }
                        );


                    const formattedTime =
                        date.toLocaleTimeString(
                            "en-IN",
                            {
                                hour: "2-digit",
                                minute: "2-digit"
                            }
                        );


                    const transportation =
                        Number(
                            record.transportEmission
                        ) || 0;


                    const electricity =
                        Number(
                            record.electricityEmission
                        ) || 0;


                    const food =
                        Number(
                            record.foodEmission
                        ) || 0;


                    const lifestyle =
                        Number(
                            record.lifestyleEmission
                        ) || 0;


                    const total =
                        Number(
                            record.totalEmission
                        ) || 0;


                    return `

                        <div class="history-item">

                            <div class="history-number">
                                ${index + 1}
                            </div>


                            <div class="history-main">

                                <div class="history-title-row">

                                    <h3>
                                        ${record.category || "Combined"}
                                    </h3>

                                    <span class="history-date">
                                        ${formattedDate}
                                    </span>

                                </div>


                                <p class="history-time">
                                    ${formattedTime}
                                </p>


                                <div class="history-breakdown">

                                    <span>
                                        🚗
                                        ${transportation.toFixed(1)}
                                        kg
                                    </span>

                                    <span>
                                        ⚡
                                        ${electricity.toFixed(1)}
                                        kg
                                    </span>

                                    <span>
                                        🍃
                                        ${food.toFixed(1)}
                                        kg
                                    </span>

                                    <span>
                                        🏠
                                        ${lifestyle.toFixed(1)}
                                        kg
                                    </span>

                                </div>

                            </div>


                            <div class="history-total">

                                <strong>
                                    ${total.toFixed(1)}
                                </strong>

                                <small>
                                    kg CO₂e
                                </small>

                            </div>

                        </div>

                    `;

                }
            )
            .join("");
}


// ==========================================
// Chart
// ==========================================

function updateChart(summary) {

    const canvas =
        document.getElementById(
            "carbonChart"
        );


    if (!canvas) {
        return;
    }


    const ctx =
        canvas.getContext("2d");


    if (carbonChart) {

        carbonChart.destroy();

    }


    carbonChart =
        new Chart(
            ctx,
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

                                summary.transportation,

                                summary.electricity,

                                summary.food,

                                summary.lifestyle

                            ],

                            borderWidth: 0

                        }

                    ]

                },


                options: {

                    responsive: true,

                    maintainAspectRatio: false,


                    plugins: {

                        legend: {

                            position:
                                "bottom",

                            labels: {

                                padding: 18,

                                usePointStyle:
                                    true,

                                font: {
                                    size: 13
                                }

                            }

                        }

                    },


                    cutout: "68%"
                }

            }
        );
}


// ==========================================
// Active Filter
// ==========================================

function updateFilter(period) {

    const buttons =
        document.querySelectorAll(
            ".filter-btn"
        );


    buttons.forEach(
        function (button) {

            button.classList.remove(
                "active"
            );


            if (
                button.dataset.period ===
                period
            ) {

                button.classList.add(
                    "active"
                );
            }

        }
    );
}


// ==========================================
// Logout
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