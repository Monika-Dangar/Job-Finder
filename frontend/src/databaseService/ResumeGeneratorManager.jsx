import axios from "axios";

const DATABASE_API = import.meta.env.VITE_DATABASE_API;

const ResumeGeneratorManager = {
  getAllUserData: async (userID) => {
    try {
      const response = await axios.get(
        `${DATABASE_API}/resumeMakerRoutes/generateResume`,
        {
          params: { userID },
        }
      );

      if (response) {
        return response;
      }
    } catch (error) {
      console.log("Error in ResumeGeneratorManager: ", error);
    }
  },
};

export default ResumeGeneratorManager;
