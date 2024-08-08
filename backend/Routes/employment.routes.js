const router = require("express").Router();
const Register = require("../Models/register.model");

router.post("/addEmploy", async (req, res) => {
  const {
    userID,
    employed,
    employmentType,
    companyName,
    jobTitle,
    salary,
    skillUsed,
  } = req.body;

  try {
    const user = await Register.findById(userID);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.userboard.employment.push({
      employed,
      employmentType,
      companyName,
      jobTitle,
      salary,
      skillUsed,
    });
    await user.save();

    res.status(201).json({
      message: "Employment added successfully",
      response: user.userboard.employment,
    });
  } catch (err) {
    console.error("Error adding Employ:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/getEmploy/:userID", async (req, res) => {
  const { userID } = req.params;

  try {
    const user = await Register.findById(userID);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user.userboard.employment || []);
  } catch (err) {
    console.error("Error fetching employment:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/updateEmploy", async (req, res) => {
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
      { $set: { "userboard.employment": updateData } },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser.userboard.employment);
  } catch (err) {
    console.error("Error updating user data:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
