const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const Grid = require("gridfs-stream");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(process.env.ATLAS_URI || config.connectionString);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database conncection established succesfully");
});

const loginRouter = require("./Routes/login.routes");
app.use("/loginRoutes", loginRouter);

const registerRouter = require("./Routes/register.routes");
app.use("/registerRoutes", registerRouter);

const skillRouter = require("./Routes/skill.routes");
app.use("/skillRoutes", skillRouter);

const employRouter = require("./Routes/employment.routes");
app.use("/employRoutes/", employRouter);

const eduRouter = require("./Routes/education.routes");
app.use("/eduRoutes", eduRouter);

const projectRouter = require("./Routes/project.routes");
app.use("/projectRoutes", projectRouter);

const resumeRouter = require("./Routes/resume.routes");
app.use("/resumeRoutes", resumeRouter);

const userImageRouter = require("./Routes/userimage.routes");
app.use("/userImageRoutes", userImageRouter);

const resumeMakerRouter = require("./Routes/resume-generation.routes");
app.use("/resumeMakerRoutes", resumeMakerRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
