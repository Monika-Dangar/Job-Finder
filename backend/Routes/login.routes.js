const router = require("express").Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const Register = require("../Models/register.model");
router.post("/", async (req, res) => {
  const { usernameOrEmail, password } = req.body;
  console.log("Received login attempt with:", usernameOrEmail);

  if (!req.body || !usernameOrEmail || !password) {
    return res.status(400).json({
      message:
        "Invalid request body. Please provide username/Email and password",
    });
  }

  try {
    // Find user in register table
    let user = await Register.findOne({
      $or: [
        { username: usernameOrEmail.toLowerCase() },
        { emailID: usernameOrEmail.toLowerCase() },
      ],
    });

    if (!user) {
      console.log(`User not found for ${usernameOrEmail}`);
      return res.status(404).json({ status: 404, message: "User not found" });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log(`Invalid password for ${usernameOrEmail}`);
      return res
        .status(401)
        .json({ status: 401, message: "Incorrect password" });
    }

    // Login successful
    console.log(`Login successful for ${usernameOrEmail}`);
    res
      .status(200)
      .json({ status: 200, success: true, message: "Login successful", user });
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/getUser", async (req, res) => {
  const { userID } = req.query;

  if (!userID) {
    return res.status(400).json({ message: "Missing userID parameter" });
  }
  console.log(userID);

  try {
    const cleanedUserID = userID.trim();

    if (!mongoose.Types.ObjectId.isValid(cleanedUserID)) {
      return res.status(400).json({ message: "Invalid userID format" });
    }

    // Fetch user data based on ObjectId
    const user = await Register.findById(cleanedUserID);
    // Fetch user data based on EmailID

    // const user = await Register.findOne({ _id });
    console.log(user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return user data
    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user data:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/updateUser", async (req, res) => {
  const { _id } = req.query; // Read userID from query parameters
  const updateData = req.body; // Read updateData from request body

  if (!_id || !Object.keys(updateData).length) {
    return res.status(400).json({ message: "Missing userID or update data" });
  }

  try {
    const updatedUser = await Register.findByIdAndUpdate(_id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Error updating user data:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
