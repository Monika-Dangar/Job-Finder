import axios from "axios";

const DATABASE_API = import.meta.env.VITE_DATABASE_API;

const SignupManager = {
  signupService: async (
    username,
    emailID,
    password,
    mobilenumber,
    skills,
    employment,
    education,
    projects,
    resume
  ) => {
    try {
      const response = await axios.post(`${DATABASE_API}/registerRoutes`, {
        username,
        emailID,
        password,
        mobilenumber,
        skills,
        employment,
        education,
        projects,
        resume,
      });
      return response;
    } catch (error) {
      console.log("Error in registeraing in: ", error);
    }
  },
};

export default SignupManager;
