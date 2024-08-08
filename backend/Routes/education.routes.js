const router = require("express").Router();
const Register = require("../Models/register.model");

router.post("/addEdu", async (req, res) => {
  const { userID, degree, course, courseType } = req.body;
  console.log("Received data:", { degree, course, courseType });

  try {
    const user = await Register.findById(userID);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.userboard.education.push({
      degree,
      course,
      courseType,
    });
    await user.save(); // Ensure to use `()` for calling save method

    res.status(201).json({
      message: "Education added successfully",
      response: user.userboard.education,
    });
  } catch (err) {
    console.error("Error adding Edu:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/getEdu/:userID", async (req, res) => {
  const { userID } = req.params;

  try {
    const user = await Register.findById(userID);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user.userboard.education || []);
  } catch (err) {
    console.error("Error fetching education:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/updateEdu", async (req, res) => {
  const { _id } = req.query;
  const updateData = req.body;

  if (!_id || !Object.keys(updateData).length) {
    return res.status(400).json({ message: "Missing userID or update data" });
  }

  try {
    // Find the user
    const user = await Register.findById(_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user
    const updatedUser = await Register.findByIdAndUpdate(
      _id,
      { $set: { "userboard.education": updateData } },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser.userboard.education);
  } catch (err) {
    console.error("Error updating user data:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
