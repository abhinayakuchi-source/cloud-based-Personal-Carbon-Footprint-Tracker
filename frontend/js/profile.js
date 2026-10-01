// ==========================================
// CarbonTrack - Profile
// ==========================================


// ==========================================
// LOAD PROFILE
// ==========================================

async function loadProfile() {

    const token =
        localStorage.getItem(
            "carbonTrackToken"
        );


    // Check login

    if (!token) {

        window.location.href =
            "login.html";

        return;

    }


    try {

        const response =
            await fetch(
                "https://carbontrack-api-p2lz.onrender.com/api/profile",
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
        // AUTHENTICATION ERROR
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
        // API ERROR
        // ==========================================

        if (!response.ok) {

            console.error(
                "Profile API error:",
                result
            );

            alert(
                result.message ||
                "Unable to load profile."
            );

            return;

        }


        if (!result.success) {

            alert(
                result.message ||
                "Unable to load profile."
            );

            return;

        }


        console.log(
            "CarbonTrack Profile:",
            result
        );


        // ==========================================
        // DISPLAY PROFILE
        // ==========================================

        fillProfileForm(
            result.user
        );

    }


    catch (error) {

        console.error(
            "Profile connection error:",
            error
        );

        alert(
            "Unable to connect to CarbonTrack server."
        );

    }

}


// ==========================================
// FILL PROFILE FORM
// ==========================================

function fillProfileForm(user) {


    setValue(
        "fullName",
        user.fullName
    );


    setValue(
        "profileName",
        user.fullName
    );


    setValue(
        "email",
        user.email
    );


    setValue(
        "profileEmail",
        user.email
    );


    setValue(
        "age",
        user.age
    );


    setValue(
        "gender",
        user.gender
    );


    setValue(
        "householdSize",
        user.householdSize
    );


    setValue(
        "location",
        user.location
    );


    setValue(
        "occupation",
        user.occupation
    );


    setValue(
        "transportPreference",
        user.transportPreference
    );


    setValue(
        "monthlyGoal",
        user.monthlyGoal
    );


    // Display-only elements

    setText(
        "displayName",
        user.fullName
    );


    setText(
        "displayEmail",
        user.email
    );


    setText(
        "displayLocation",
        user.location
    );


    setText(
        "displayOccupation",
        user.occupation
    );


    setText(
        "displayGoal",
        formatNumber(
            user.monthlyGoal
        )
    );

}


// ==========================================
// UPDATE PROFILE
// ==========================================

async function updateProfile(event) {

    if (event) {

        event.preventDefault();

    }


    const token =
        localStorage.getItem(
            "carbonTrackToken"
        );


    if (!token) {

        window.location.href =
            "login.html";

        return;

    }


    // ==========================================
    // GET VALUES
    // ==========================================

    const fullName =
        getValue("fullName");


    const age =
        getValue("age");


    const gender =
        getValue("gender");


    const householdSize =
        getValue("householdSize");


    const location =
        getValue("location");


    const occupation =
        getValue("occupation");


    const transportPreference =
        getValue(
            "transportPreference"
        );


    const monthlyGoal =
        getValue("monthlyGoal");


    // ==========================================
    // VALIDATION
    // ==========================================

    if (!fullName) {

        alert(
            "Please enter your full name."
        );

        return;

    }


    if (
        !age ||
        Number(age) < 1
    ) {

        alert(
            "Please enter a valid age."
        );

        return;

    }


    if (
        !householdSize ||
        Number(householdSize) < 1
    ) {

        alert(
            "Please enter a valid household size."
        );

        return;

    }


    if (!location) {

        alert(
            "Please enter your location."
        );

        return;

    }


    if (!occupation) {

        alert(
            "Please enter your occupation."
        );

        return;

    }


    if (
        monthlyGoal === "" ||
        Number(monthlyGoal) < 0
    ) {

        alert(
            "Please enter a valid monthly goal."
        );

        return;

    }


    // ==========================================
    // UPDATE PROFILE
    // ==========================================

    try {

        const response =
            await fetch(
                "https://carbontrack-api-p2lz.onrender.com/api/profile",
                {
                    method: "PUT",

                    headers: {

                        "Content-Type":
                            "application/json",

                        "Authorization":
                            "Bearer " + token

                    },

                    body:
                        JSON.stringify({

                            fullName:
                                fullName,

                            age:
                                Number(age),

                            gender:
                                gender,

                            householdSize:
                                Number(
                                    householdSize
                                ),

                            location:
                                location,

                            occupation:
                                occupation,

                            transportPreference:
                                transportPreference,

                            monthlyGoal:
                                Number(
                                    monthlyGoal
                                )

                        })

                }
            );


        const result =
            await response.json();


        // ==========================================
        // AUTH ERROR
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
        // UPDATE ERROR
        // ==========================================

        if (!response.ok) {

            alert(
                result.message ||
                "Unable to update profile."
            );

            return;

        }


        if (result.success) {

            // Update local storage

            localStorage.setItem(
                "carbonTrackUser",
                JSON.stringify(
                    result.user
                )
            );


            // Refresh displayed values

            fillProfileForm(
                result.user
            );


            alert(
                "✅ Profile updated successfully!"
            );

        }

        else {

            alert(
                result.message ||
                "Profile update failed."
            );

        }

    }


    catch (error) {

        console.error(
            "Profile update error:",
            error
        );

        alert(
            "Unable to connect to CarbonTrack server."
        );

    }

}


// ==========================================
// CHANGE PASSWORD
// ==========================================

async function changePassword(event) {

    if (event) {

        event.preventDefault();

    }


    const token =
        localStorage.getItem(
            "carbonTrackToken"
        );


    if (!token) {

        window.location.href =
            "login.html";

        return;

    }


    const currentPassword =
        getValue(
            "currentPassword"
        );


    const newPassword =
        getValue(
            "newPassword"
        );


    const confirmPassword =
        getValue(
            "confirmPassword"
        );


    // ==========================================
    // VALIDATION
    // ==========================================

    if (!currentPassword) {

        alert(
            "Please enter your current password."
        );

        return;

    }


    if (!newPassword) {

        alert(
            "Please enter your new password."
        );

        return;

    }


    if (
        newPassword.length < 6
    ) {

        alert(
            "New password must contain at least 6 characters."
        );

        return;

    }


    if (
        newPassword !==
        confirmPassword
    ) {

        alert(
            "New passwords do not match."
        );

        return;

    }


    // ==========================================
    // CHANGE PASSWORD
    // ==========================================

    try {

        const response =
            await fetch(
                "https://carbontrack-api-p2lz.onrender.com/api/profile/password",
                {
                    method: "PUT",

                    headers: {

                        "Content-Type":
                            "application/json",

                        "Authorization":
                            "Bearer " + token

                    },

                    body:
                        JSON.stringify({

                            currentPassword:
                                currentPassword,

                            newPassword:
                                newPassword

                        })

                }
            );


        const result =
            await response.json();


        // ==========================================
        // AUTH ERROR
        // ==========================================

        if (response.status === 401) {

            // Important:
            // A 401 here can also mean
            // incorrect current password.
            // Don't logout automatically.

            alert(
                result.message ||
                "Current password is incorrect."
            );

            return;

        }


        if (!response.ok) {

            alert(
                result.message ||
                "Unable to change password."
            );

            return;

        }


        if (result.success) {

            alert(
                "🔐 Password changed successfully!"
            );


            // Clear password fields

            setValue(
                "currentPassword",
                ""
            );

            setValue(
                "newPassword",
                ""
            );

            setValue(
                "confirmPassword",
                ""
            );

        }

        else {

            alert(
                result.message ||
                "Password change failed."
            );

        }

    }


    catch (error) {

        console.error(
            "Password change error:",
            error
        );

        alert(
            "Unable to connect to CarbonTrack server."
        );

    }

}


// ==========================================
// GET INPUT VALUE
// ==========================================

function getValue(elementId) {

    const element =
        document.getElementById(
            elementId
        );


    if (!element) {

        return "";

    }


    return element.value.trim();

}


// ==========================================
// SET INPUT VALUE
// ==========================================

function setValue(
    elementId,
    value
) {

    const element =
        document.getElementById(
            elementId
        );


    if (element) {

        element.value =
            value ?? "";

    }

}


// ==========================================
// SET TEXT
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
            value ?? "";

    }

}


// ==========================================
// FORMAT NUMBER
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
// PAGE LOAD
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadProfile();


        // Profile form

        const profileForm =
            document.getElementById(
                "profileForm"
            );


        if (profileForm) {

            profileForm.addEventListener(
                "submit",
                updateProfile
            );

        }


        // Password form

        const passwordForm =
            document.getElementById(
                "passwordForm"
            );


        if (passwordForm) {

            passwordForm.addEventListener(
                "submit",
                changePassword
            );

        }

    }
);