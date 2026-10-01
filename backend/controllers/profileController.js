const User = require("../models/User");
const bcrypt = require("bcryptjs");


// ==========================================
// GET PROFILE
// ==========================================

const getProfile = async (req, res) => {

    try {

        const userId =
            req.user.userId;

        const user =
            await User.findById(userId)
                .select("-password");


        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }


        res.status(200).json({

            success: true,

            user: user

        });

    }

    catch (error) {

        console.error(
            "Get profile error:",
            error.message
        );

        res.status(500).json({

            success: false,

            message:
                "Unable to load profile"

        });

    }

};


// ==========================================
// UPDATE PROFILE
// ==========================================

const updateProfile = async (req, res) => {

    try {

        const userId =
            req.user.userId;

        const {
            fullName,
            age,
            gender,
            householdSize,
            location,
            occupation,
            transportPreference,
            monthlyGoal
        } = req.body;


        const user =
            await User.findById(
                userId
            );


        if (!user) {

            return res.status(404).json({

                success: false,

                message:
                    "User not found"

            });

        }


        // Update only supplied values

        if (
            fullName !== undefined
        ) {
            user.fullName =
                fullName;
        }


        if (
            age !== undefined
        ) {
            user.age =
                Number(age);
        }


        if (
            gender !== undefined
        ) {
            user.gender =
                gender;
        }


        if (
            householdSize !== undefined
        ) {
            user.householdSize =
                Number(
                    householdSize
                );
        }


        if (
            location !== undefined
        ) {
            user.location =
                location;
        }


        if (
            occupation !== undefined
        ) {
            user.occupation =
                occupation;
        }


        if (
            transportPreference !== undefined
        ) {
            user.transportPreference =
                transportPreference;
        }


        if (
            monthlyGoal !== undefined
        ) {
            user.monthlyGoal =
                Number(
                    monthlyGoal
                );
        }


        await user.save();


        res.status(200).json({

            success: true,

            message:
                "Profile updated successfully",

            user: {

                id:
                    user._id,

                fullName:
                    user.fullName,

                email:
                    user.email,

                age:
                    user.age,

                gender:
                    user.gender,

                householdSize:
                    user.householdSize,

                location:
                    user.location,

                occupation:
                    user.occupation,

                transportPreference:
                    user.transportPreference,

                monthlyGoal:
                    user.monthlyGoal

            }

        });

    }

    catch (error) {

        console.error(
            "Update profile error:",
            error.message
        );

        res.status(500).json({

            success: false,

            message:
                "Unable to update profile"

        });

    }

};


// ==========================================
// CHANGE PASSWORD
// ==========================================

const changePassword = async (
    req,
    res
) => {

    try {

        const userId =
            req.user.userId;

        const {
            currentPassword,
            newPassword
        } = req.body;


        if (
            !currentPassword ||
            !newPassword
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Current password and new password are required"

            });

        }


        if (
            newPassword.length < 6
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "New password must contain at least 6 characters"

            });

        }


        const user =
            await User.findById(
                userId
            );


        if (!user) {

            return res.status(404).json({

                success: false,

                message:
                    "User not found"

            });

        }


        const passwordMatch =
            await bcrypt.compare(
                currentPassword,
                user.password
            );


        if (!passwordMatch) {

            return res.status(401).json({

                success: false,

                message:
                    "Current password is incorrect"

            });

        }


        const hashedPassword =
            await bcrypt.hash(
                newPassword,
                10
            );


        user.password =
            hashedPassword;


        await user.save();


        res.status(200).json({

            success: true,

            message:
                "Password changed successfully"

        });

    }

    catch (error) {

        console.error(
            "Change password error:",
            error.message
        );

        res.status(500).json({

            success: false,

            message:
                "Unable to change password"

        });

    }

};


module.exports = {

    getProfile,

    updateProfile,

    changePassword

};