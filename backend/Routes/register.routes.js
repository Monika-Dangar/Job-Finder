const router = require("express").Router();
const Register = require("../Models/register.model");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { username, emailID, password, mobilenumber } = req.body;

  try {
    // check if username or email alredy exists
    const existingUser = await Register.findOne({
      $or: [{ username }, { emailID }],
    });

    if (existingUser) {
      // Return 400 (Bad Request) if username or email already exists
      console.log("Username or email already exists");
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    // Hash the password securely
    let salt; // Declare salt variable outside the callback
    try {
      salt = await bcrypt.genSalt(10); // Use await to get the generated salt
    } catch (err) {
      console.error("Error generating salt:", err);
      return res.status(500).json({ message: "Server error" });
    }

    let hash; // Declare hash variable outside the callback
    try {
      hash = await bcrypt.hash(password, salt); // Use await to get the hash
    } catch (err) {
      console.error("Error hashing password :", err);
      return res.status(500).json({ message: "Server error" });
    }

    // Create a new user with the provided details
    const newUser = new Register({
      username,
      emailID,
      password: hash,
      mobilenumber,
    });

    // Save the user to the database
    await newUser.save();

    // Registration successful
    console.log(`Registration successful for ${username}`);
    res.status(201).json({ message: "Registration succesful", user: newUser });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
