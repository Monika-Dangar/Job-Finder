const router = require("express").Router();
const Register = require("../Models/register.model");

// Create a new skill
router.post("/addSkill", async (req, res) => {
  const { userID, skillname } = req.body;

  try {
    const user = await Register.findById(userID);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingSkill = user.userboard.skills.find(
      (skill) => skill.skill === skillname
    );

    if (existingSkill) {
      return res.status(400).json({ message: "Skill already exists" });
    }

    user.userboard.skills.push({ skill: skillname });
    await user.save();

    res.status(201).json(user.userboard.skills);
  } catch (err) {
    console.error("Error adding skill:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all skills for a user
router.get("/getSkills/:userID", async (req, res) => {
  const { userID } = req.params;

  try {
    const user = await Register.findById(userID);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the skills (or an empty array if none exist)
    res.status(200).json(user.userboard.skills || []);
  } catch (err) {
    console.error("Error fetching skills:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a skill
router.delete("/deleteSkill/:userID/:skillname", async (req, res) => {
  const { userID, skillname } = req.params;

  try {
    const user = await Register.findById(userID);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove the skill if it exists
    const updatedSkills = user.userboard.skills.filter(
      (skill) => skill.skill !== skillname
    );

    if (updatedSkills.length === user.userboard.skills.length) {
      return res.status(404).json({ message: "Skill not found" });
    }

    user.userboard.skills = updatedSkills;
    await user.save();

    res.status(200).json(user.userboard.skills);
  } catch (err) {
    console.error("Error deleting skill:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
