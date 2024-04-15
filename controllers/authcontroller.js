const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



exports.signup = async (req, res) => {
            const { username, email, password } = req.body;

            try {
                        let user = await User.findOne({ email });
                        if (user) {
                                    return res.status(400).json({ success: true, message: "Email is already exist please login" })
                        }
                        const hashPassword = await bcrypt.hash(password, 10)

                        const userDets = new User({
                                    email,
                                    username,
                                    password: hashPassword
                        })
                        await userDets.save();
                        return res.status(201).json({ success: true, message: "Signup successful!", data: userDets });

            } catch (error) {
                        return res.status(500).json({ success: false, error: error.message })
            }
}

exports.login = async (req, res) => {
            console.log("hey")
            const { email, password } = req.body;
            const isEmail = await User.findOne({ email })
            if (!isEmail) return res.status(500).json({ success: false, message: "Email is not registered" })

            const isPasswordMatch = await bcrypt.compare(password, isEmail.password)
            if (!isPasswordMatch) {
                        return res.status(500).json({ success: false, message: "Invalid password 😒" })
            }

            const token = jwt.sign({ id: isEmail._id }, process.env.JWT_SECRET, {
                        expiresIn: "1h"
            });
            res.cookie("token", token, {
                        httpOnly: true,
                        expiresIn: new Date(Date.now() + 1000 * 60 * 60)
            })


            return res.status(200).json({ success: true, message: `Successfully  logged in`, token })


}


exports.logout = async (req, res) => {
            try {
                        res.cookie("token", "", {
                                    expires: new Date(Date.now())
                        });
                        return res.status(200).json({ success: true, message: "Logout successful" })

            } catch (error) {
                        return res.status(400).json({ success: false, message: error })
            }
}


exports.checkuser = async (req, res) => {
            const id = req.id;
            try {
                        const user = await User.findById(id).select("-password")

                        if (!user) {
                                    return res.status(400).json({ success: false, message: "Please signup", user });
                        }
                        return res.status(200).json({ success: true, user })
            } catch (error) {
                        return res.status(500).json({ success: false, message: error.message })

            }
}
