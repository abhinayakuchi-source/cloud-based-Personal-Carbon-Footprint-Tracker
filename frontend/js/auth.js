document.addEventListener("DOMContentLoaded", () => {

    // =====================================================
    // REGISTER
    // =====================================================

    const registerForm = document.getElementById("registerForm");

    if (registerForm) {

        registerForm.addEventListener("submit", async (event) => {

            event.preventDefault();

            const fullName =
                document.getElementById("fullName").value.trim();

            const email =
                document.getElementById("email").value.trim();

            const age =
                document.getElementById("age").value;

            const gender =
                document.getElementById("gender").value;

            const householdSize =
                document.getElementById("householdSize").value;

            const location =
                document.getElementById("location").value.trim();

            const occupation =
                document.getElementById("occupation").value.trim();

            const transportPreference =
                document.getElementById("transportPreference").value;

            const monthlyGoal =
                document.getElementById("monthlyGoal").value;

            const password =
                document.getElementById("password").value;

            const confirmPassword =
                document.getElementById("confirmPassword").value;


            // Check password
            if (password !== confirmPassword) {

                alert("Passwords do not match.");

                return;
            }


            const userData = {

                fullName: fullName,

                email: email,

                age: Number(age),

                gender: gender,

                householdSize: Number(householdSize),

                location: location,

                occupation: occupation,

                transportPreference: transportPreference,

                monthlyGoal: Number(monthlyGoal),

                password: password
            };


            try {

                const response = await fetch(
                    "http://localhost:5000/api/auth/register",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify(userData)
                    }
                );


                const data = await response.json();


                if (data.success) {

                    alert(
                        "Registration successful! You can now login."
                    );

                    window.location.href = "login.html";

                } else {

                    alert(
                        data.message || "Registration failed."
                    );
                }

            } catch (error) {

                console.error(
                    "Registration error:",
                    error
                );

                alert(
                    "Unable to connect to the server. Please make sure the backend is running."
                );
            }

        });

    }


    // =====================================================
    // LOGIN
    // =====================================================

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {

        loginForm.addEventListener("submit", async (event) => {

            event.preventDefault();


            const email =
                document.getElementById("loginEmail").value.trim();

            const password =
                document.getElementById("loginPassword").value;


            try {

                const response = await fetch(
                    "http://localhost:5000/api/auth/login",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify({
                            email: email,
                            password: password
                        })
                    }
                );


                const data = await response.json();


                if (data.success) {

                    // Store JWT token
                    localStorage.setItem(
                        "carbonTrackToken",
                        data.token
                    );


                    // Store user information
                    localStorage.setItem(
                        "carbonTrackUser",
                        JSON.stringify(data.user)
                    );


                    alert(
                        "Login successful! Welcome to CarbonTrack."
                    );


                    // Open dashboard
                    window.location.href = "dashboard.html";

                } else {

                    alert(
                        data.message || "Login failed."
                    );
                }

            } catch (error) {

                console.error(
                    "Login error:",
                    error
                );

                alert(
                    "Unable to connect to the server. Please make sure the backend is running."
                );
            }

        });

    }


    // =====================================================
    // SHOW / HIDE PASSWORD
    // =====================================================

    const togglePassword =
        document.getElementById("togglePassword");

    const loginPassword =
        document.getElementById("loginPassword");


    if (togglePassword && loginPassword) {

        togglePassword.addEventListener("click", () => {

            if (loginPassword.type === "password") {

                loginPassword.type = "text";

                togglePassword.innerHTML =
                    '<i class="bi bi-eye-slash"></i>';

            } else {

                loginPassword.type = "password";

                togglePassword.innerHTML =
                    '<i class="bi bi-eye"></i>';
            }

        });

    }

});