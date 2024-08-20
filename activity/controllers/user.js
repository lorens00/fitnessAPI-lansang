const User = require('../models/User');
const auth = require('../auth');
const bcrypt = require('bcryptjs');
const { errorHandler } = auth;

module.exports.registerUser = (req, res) => {
    // Check if the email is in the right format
    if (!req.body.email.includes("@")) {
        return res.status(400).send({ message: 'Invalid email format' });
    }

    // Check if required fields are provided
    if (!req.body.firstName || !req.body.lastName || !req.body.mobileNo) {
        return res.status(400).send({ message: 'First name, last name, and mobile number are required' });
    }

    // Check if the password is provided and has at least 8 characters
    if (!req.body.password || req.body.password.length < 8) {
        return res.status(400).send({ message: 'Password must be at least 8 characters long' });
    }

    // Check if user already exists
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                return res.status(400).send({ message: 'User already exists' });
            } else {
                // Create a new user
                const newUser = new User({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 10), // Hash the password
                    mobileNo: req.body.mobileNo
                });
                // Save the new user to the database
                return newUser.save()
                    .then(() => res.status(201).send({ message: "Registered Successfully" }))
                    .catch(err => res.status(500).send({ message: err.message }));
            }
        })
        .catch(err => res.status(500).send({ message: err.message }));
};



module.exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({ message: 'Email and password are required' });
        }

        if (!email.includes("@")) {
            return res.status(400).send({ message: 'Invalid email' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).send({ error: 'No email found' });
        }

        const isPasswordCorrect = bcrypt.compareSync(password, user.password);

        if (isPasswordCorrect) {
            return res.status(200).send({ 
                access: auth.createAccessToken(user)
            });
        } else {
            return res.status(401).send({ error: 'Email and password do not match' });
        }
    } catch (err) {
        return errorHandler(err, req, res);
    }
};
