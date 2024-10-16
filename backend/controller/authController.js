const User = require('../model/userModel')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

exports.signup = async (req, res) => {
    try {
        const {firstName, lastName, email, password} = req.body;
        if(!firstName || !lastName || !email || !password) {
            return res.status(404).json({
                success: false,
                message: "Mandatory fields missing"
            })
        }
 
        const userExists = await User.findOne({email});
        if(userExists) {
            return res.status(503).json({ 
                success: false,
                message: "User already exists"
            }) 
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userDetails = User.create({
            firstName, lastName, email, password: hashedPassword,
        });

        return res.status(200).json({
            success: true,
            message: "Account created",
            userDetails
        });
    }
    catch(err) {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }
}

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password) {
            return res.status(404).json({
                success: false,
                message: "Mandatory fiels missing"
            });
        }

        const user = await User.findOne({email});
        if(await bcrypt.compare(password, user.password)) {
            const payload = {email: user.email}
            const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "7d"});

            // Creating a cookie
            const options = { expiresIn: "28d" };
            res.cookie("token", token, options).status(200).json({
                success: true, 
                message: "Logged-in succesfully",
                token,
            });
        }
        else { 
            return res.status(400).json({
                success: false,
                message: "Incorrect password"
            });
        }
    }
    catch(err) {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }
}