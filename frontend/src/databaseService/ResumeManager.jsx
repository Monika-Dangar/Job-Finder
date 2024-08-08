import axios from "axios";

const DATABASE_API = import.meta.env.VITE_DATABASE_API;

const ResumeManager = {
  addResumeService: async (formData) => {
    try {
      const response = await axios.post(
        `${DATABASE_API}/resumeRoutes/addResume`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response) {
        // console.log("Resume added successfully: ", response);
        return response.data;
      }
    } catch (error) {
      console.log("Error in ResumeManager of addResumeService: ", error); // Updated for debugging
    }
  },

  removeResumeService: async (userID) => {
    try {
      const response = await axios.delete(
        `${DATABASE_API}/resumeRoutes/removeResume/${userID}`
      );

      if (response) {
        // console.log("Resume removed successfully: ", response);
        return response.data;
      }
    } catch (error) {
      console.log("Error in ResumeManager of removeResumeService: ", error); // Updated for debugging
    }
  },

  getResumeService: async (userID) => {
    try {
      const response = await axios.get(
        `${DATABASE_API}/resumeRoutes/getResume`,
        {
          params: { userID: userID }, // Ensure params is used correctly
        }
      );
      if (response) {
        // console.log(response.data);
        return response.data;
      }
    } catch (error) {
      console.log("Error in  of getResumeService: ", error);
    }
  },
};

export default ResumeManager;
