const bcrypt = require('bcrypt');
const saltRounds = 10;
const UserModel = require('../Models/UserModel');

exports.signup = async (req, res) => {
    try {
        let newUser = req.body;

        // Check if the user already exists
        const DoesUserExists = await UserModel.findOne({ email: newUser.email });
        if (DoesUserExists) {
            return res.status(409).json({
                message: 'ERROR_USER_ALREADY_EXISTS',
            });
        }

        // Hash the password
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(newUser.password, salt);
        newUser.password = hashedPassword;

        // Create new user in the database
        let addUser = new UserModel(newUser);
        const saveResult = await addUser.save();

        if (!saveResult) {
            return res.status(500).json({
                message: 'ERROR_CREATING_USER',
            });
        }

        // Return success message
        return res.status(201).json({
            message: 'USER_CREATED',

        });

    } catch (err) {
        console.error(`Error In RegisterUser ${err.message}`);
        return res.status(500).json({
            message: 'SERVER_ERROR',
            error: err.message,
        });
    }
};

exports.signin = async(req, res) => {
    try {
        let userCredentials = req.body
        let DoesUserExists = await UserModel.findOne({})
    } catch (err) {
        console.error(`Error in Signin API ${err.message}`)
        return res.status(500).json({
            message: 'SERVER_ERROR',
            error: err.message,
        });
    }
}