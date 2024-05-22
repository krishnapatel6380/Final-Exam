const User = require("../models/userModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { email, password, firstName, lastName, phoneNumber, role } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phoneNumber,
      role
    });

    const user = await User.signup(email, password, firstName, lastName, phoneNumber, role);

    // create a token
    const token = createToken(user._id);

    // Send the token as a cookie or in the response body
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    await newUser.save();

    res.status(201).json({
      email: newUser.email,
      token: token
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Other controller methods...

module.exports = {
  registerUser,
};