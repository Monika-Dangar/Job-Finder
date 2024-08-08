import axios from "axios";

const DATABASE_API = import.meta.env.VITE_DATABASE_API;

const SkillManager = {
  addSkillService: async (userID, skillname) => {
    try {
      const response = await axios.post(
        `${DATABASE_API}/skillRoutes/addSkill`,
        {
          userID,
          skillname,
        }
      );

      if (response.status === 201) {
        return response;
      }
    } catch (error) {
      console.log("Error in SkillManager of addSkillService: ", error);
      if (error.response) {
        return {
          status: error.response.status,
          message: error.response.data.message || "An error occurred",
        };
      } else {
        // Something happened in setting up the request that triggered an Error
        return {
          status: 500,
          message: error.message,
        };
      }
    }
  },

  getSkillSerivce: async (userID) => {
    try {
      const response = await axios.get(
        `${DATABASE_API}/skillRoutes/getSkills/${userID}`
      );

      if (response) {
        return response.data;
      }
    } catch (error) {
      console.log("Error in DatabaseServices of getskillService: ", error);
    }
  },

  deleteSkillService: async (userID, skillname) => {
    try {
      const response = await axios.delete(
        `${DATABASE_API}/skillRoutes/deleteSkill/${userID}/${skillname}`
      );

      if (response) {
        // console.log("deleted: ", response);
        return response.data;
      }
    } catch (error) {
      console.log("Error in DatabaseServices of deleteSkillService: ", error);
    }
  },
};

export default SkillManager;
