const express = require("express");
const multer = require("multer");
const Register = require("../Models/register.model");

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/uploadImage", upload.single("profileImage"), async (req, res) => {
  const userID = req.body.userID; // Extract userID from body
  const file = req.file;

  if (!file) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }

  if (!userID) {
    return res
      .status(400)
      .json({ success: false, message: "User ID is required" });
  }

  try {
    const user = await Register.findById(userID); // Ensure userID is correctly formatted

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    user.profileImage = {
      imageFileName: file.originalname,
      imageUpload: file.buffer,
    };

    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Profile image uploaded successfully" });
  } catch (error) {
    console.error("Error uploading profile image:", error);
    res.status(500).json({
      success: false,
      message: "Error uploading profile image",
      error,
    });
  }
});

router.get("/getImage/:userID", async (req, res) => {
  const userID = req.params.userID; // Extract userID from params

  if (!userID) {
    return res
      .status(400)
      .json({ success: false, message: "User ID is required" });
  }

  try {
    const user = await Register.findById(userID); // Ensure userID is correctly formatted

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (!user.profileImage || !user.profileImage.imageUpload) {
      return res
        .status(404)
        .json({ success: false, message: "Profile image not found" });
    }

    // Set the appropriate content type (you might need to adjust based on your image type)
    res.set("Content-Type", "image/jpeg"); // Adjust content type as necessary

    // Send the image buffer as the response
    res.send(user.profileImage.imageUpload);
  } catch (error) {
    console.error("Error fetching profile image:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching profile image",
      error,
    });
  }
});

module.exports = router;
