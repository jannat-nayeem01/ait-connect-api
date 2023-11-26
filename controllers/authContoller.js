const jwt = require('jsonwebtoken');
const User = require('../models/User');


exports.signup = (req, res) => {
    const { username, email, password, role } = req.body;
    console.log('New Received signup request', username, email, password, role); // Check if 'role' is present

    const newUser = new User({ username, email, password, role }); 
    console.log('NewUser',newUser);
    // Ensure 'role' is passed here

    newUser.save()
        .then(user => {
            res.status(201).json({ success: true, message: 'Signup successful', user });
        })
        .catch(err => {
            res.status(400).json({ success: false, message: 'Error in signup', err });
        });
};



exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).exec();

        if (!user) {
            return res.status(401).json({ success: false, message: 'Authentication failed. User not found.' });
        }

        const isMatch = await user.comparePassword(password);

        if (isMatch) {
            const token = jwt.sign({ id: user._id, role: user.role }, 'keyJ', { expiresIn: '1d' });
            //console.log('Token',token)
            return res.status(200).json({ success: true, message: 'Login successful', token, role: user.role,id: user._id });
        } else {
            return res.status(401).json({ success: false, message: 'Authentication failed. Wrong password.' });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error in login', error: error.message });
    }
};
