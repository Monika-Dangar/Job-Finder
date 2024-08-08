const router = require("express").Router();
const Register = require("../Models/register.model");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const mongoose = require("mongoose");

// Initialize Gemini API with API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Route to generate resume
router.get("/generateResume", async (req, res) => {
  const { userID } = req.query;

  if (!userID) {
    return res.status(400).json({ message: "Missing userID parameter" });
  }

  console.log("Received userID:", userID);

  try {
    // Clean up userID and check if it's a valid ObjectId
    const cleanedUserID = userID.trim();

    if (!mongoose.Types.ObjectId.isValid(cleanedUserID)) {
      return res.status(400).json({ message: "Invalid userID format" });
    }

    // Fetch user data based on ObjectId
    const user = await Register.findById(cleanedUserID);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Exclude the resume field from user data
    let { resume, ...userData } = user.toObject();

    // Destructure and format the data into prompts
    const {
      username,
      emailID,
      mobilenumber,
      userboard: { skills, employment, education, projects },
    } = userData;

    const skillsList = skills.map((s) => s.skill).join(", ");
    const employmentHistory = employment
      .map(
        (emp) =>
          `${emp.companyName} as a ${emp.jobTitle} (${emp.employmentType})`
      )
      .join(". ");
    const educationDetails = education
      .map((ed) => `${ed.degree} in ${ed.course} (${ed.courseType})`)
      .join(". ");
    const projectsList = projects
      .map(
        (proj) =>
          `${proj.projectName}: ${proj.projectDescription} (${proj.projectURL})`
      )
      .join(". ");

    // Define prompts for the AI including email and mobile number
    const prompt1 = `Write a 100-word resume summary for ${username} with skills: ${skillsList}. Contact: ${emailID}, ${mobilenumber}.`;
    const prompt2 = `Generate 10 key points highlighting the skills and achievements of ${username}. Contact: ${emailID}, ${mobilenumber}.`;
    const prompt3 = `Provide a 50-word description for each job role from the following work history: ${employmentHistory}. Contact: ${emailID}, ${mobilenumber}.`;
    const prompt4 = `Provide a summary of educational qualifications: ${educationDetails}. Contact: ${emailID}, ${mobilenumber}.`;
    const prompt5 = `Summarize the projects: ${projectsList}. Contact: ${emailID}, ${mobilenumber}.`;

    // Generate responses using Gemini API
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const generateContent = async (prompt) => {
      try {
        const result = await model.generateContent(prompt);
        return result.response.text(); // Adapt based on Gemini’s response structure
      } catch (error) {
        console.error("Error generating content for prompt:", prompt, error);
        return "Error generating content"; // Return a default value in case of error
      }
    };

    // Generate resume content
    const summary = await generateContent(prompt1);
    const keypoints = await generateContent(prompt2);
    const jobResponsibilities = await generateContent(prompt3);
    const educationSummary = await generateContent(prompt4);
    const projectsSummary = await generateContent(prompt5);

    // Combine user data with AI-generated content
    const resumeContent = {
      summary,
      keypoints,
      jobResponsibilities,
      educationSummary,
      projectsSummary,
    };

    // Send response with generated resume content
    res.status(200).json({
      message: "Resume generated successfully!",
      resumeContent,
    });
  } catch (err) {
    console.error("Error generating resume:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
