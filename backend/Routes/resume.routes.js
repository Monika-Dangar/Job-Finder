const express = require("express");
const multer = require("multer");
const Register = require("../Models/register.model");

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/addResume", upload.single("resume"), async (req, res) => {
  const userID = req.body.userID; // Make sure `userID` is correctly passed
  const file = req.file;
  const resumeFileName = req.body.resumeFileName;

  if (!file) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }

  try {
    const user = await Register.findById(userID);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    user.userboard.resume.push({
      resumeFileName: file.originalname,
      resumeUpload: file.buffer,
    });
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Resume uploaded successfully" });
  } catch (error) {
    console.error("Error uploading resume:", error); // Added for better debugging
    res
      .status(500)
      .json({ success: false, message: "Error uploading resume", error });
  }
});

router.delete("/removeResume/:userID", async (req, res) => {
  try {
    const { userID } = req.params;

    if (!userID) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required." });
    }

    const user = await Register.findById(userID);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }
    user.userboard.resume = []; // Remove resume
    await user.save();
    res.json({ success: true, message: "Resume deleted successfully!" });
  } catch (error) {
    console.error("Error deleting resume:", error); // Better debugging
    res.status(500).json({ success: false, message: "Error deleting resume." });
  }
});

// GET /resumeRoutes/getResume
router.get("/getResume", async (req, res) => {
  const { userID } = req.query;

  if (!userID) {
    return res
      .status(400)
      .json({ success: false, message: "User ID is required." });
  }

  try {
    const user = await Register.findById(userID);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    const resume = user.userboard.resume[0]; // Assuming there's only one resume per user
    res.json({ success: true, resume } || []);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching resume.", error });
  }
});

module.exports = router;
