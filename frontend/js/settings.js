// ==========================================
// CarbonTrack - Settings
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        checkLogin();

        setupSettings();

    }
);


// ==========================================
// CHECK LOGIN
// ==========================================

function checkLogin() {

    const token =
        localStorage.getItem(
            "carbonTrackToken"
        );

    if (!token) {

        window.location.href =
            "login.html";

    }

}


// ==========================================
// SETUP SETTINGS
// ==========================================

function setupSettings() {

    const logoutButton =
        document.getElementById(
            "logoutButton"
        );

    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            logoutUser
        );

    }


    const clearButton =
        document.getElementById(
            "clearSessionButton"
        );

    if (clearButton) {

        clearButton.addEventListener(
            "click",
            clearSession
        );

    }

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
// CLEAR LOCAL SESSION
// ==========================================

function clearSession() {

    const confirmClear =
        confirm(
            "Are you sure you want to clear your local CarbonTrack session?"
        );

    if (!confirmClear) {

        return;

    }


    localStorage.removeItem(
        "carbonTrackUser"
    );


    alert(
        "Local session information cleared."
    );

}