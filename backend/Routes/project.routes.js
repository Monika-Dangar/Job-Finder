const router = require("express").Router();
const Register = require("../Models/register.model");

router.post("/addProject", async (req, res) => {
  const {
    userID,
    projectName,
    projectDuration,
    projectDescription,
    skillUsedProject,
    projectURL,
  } = req.body;
  console.log("Received data:", {
    projectName,
    projectDuration,
    projectDescription,
    skillUsedProject,
    projectURL,
  });

  try {
    const user = await Register.findById(userID);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.userboard.projects.push({
      projectName,
      projectDuration,
      projectDescription,
      skillUsedProject,
      projectURL,
    });
    await user.save(); // Ensure to use `()` for calling save method

    res.status(201).json({
      message: "Project added successfully",
      response: user.userboard.projects,
    });
  } catch (err) {
    console.error("Error adding project:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/getProject/:userID", async (req, res) => {
  const { userID } = req.params;

  try {
    const user = await Register.findById(userID);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user.userboard.projects || []);
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/updateProject", async (req, res) => {
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
      { $set: { "userboard.projects": updateData } },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser.userboard.projects);
  } catch (err) {
    console.error("Error updating user data:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
