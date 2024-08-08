const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Project Duration Sub-schema
const projectDurationSchema = new Schema({
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

// Custom validation for project duration
projectDurationSchema.path("endDate").validate(function (value) {
  return this.startDate <= value;
}, "End date must be after or equal to the start date.");

// Define the Project Sub-schema
const projectSchema = new Schema({
  projectName: { type: String, required: true },
  projectDuration: { type: projectDurationSchema, required: true },
  projectDescription: { type: String },
  skillUsedProject: { type: String },
  projectURL: { type: String },
});

const userRegisterSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  emailID: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  mobilenumber: {
    type: String, // Changed to String to accommodate phone numbers with leading zeros or special characters
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{10}$/.test(v);
      },
      message: (props) =>
        `${props.value} is not a valid mobile number. Must be 10 digits.`,
    },
  },
  profileImage: {
    imageFileName: { type: String },
    imageUpload: { type: Buffer }, // Set default value to null or any default value you prefer
  },
  userboard: {
    skills: [
      {
        skill: {
          type: String,
          required: true,
        },
      },
    ],
    employment: [
      {
        employed: {
          type: String,
          required: true,
        },
        employmentType: {
          type: String,
          required: true,
        },
        companyName: {
          type: String,
        },
        jobTitle: {
          type: String,
          required: true,
        },
        salary: {
          type: Number,
        },
        skillUsed: {
          type: String,
          required: true,
        },
      },
    ],
    education: [
      {
        degree: {
          type: String,
        },
        course: {
          type: String,
        },
        courseType: {
          type: String,
        },
      },
    ],
    projects: [projectSchema],
    resume: [
      {
        resumeFileName: {
          type: String,
        },
        resumeUpload: {
          type: Buffer,
        },
      },
    ],
  },
});

const RegisterSchema = mongoose.model("UserRegistered", userRegisterSchema);
module.exports = RegisterSchema;
