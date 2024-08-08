import axios from "axios";

const DATABASE_API = import.meta.env.VITE_DATABASE_API;

const EducationManager = {
  addEduService: async (userID, degree, course, courseType) => {
    try {
      const response = await axios.post(`${DATABASE_API}/eduRoutes/addEdu`, {
        userID,
        degree,
        course,
        courseType,
      });

      if (response) {
        // console.log("Edu added successfully: ", response);
        return response.data;
      }
    } catch (error) {
      console.log("Error in EducationManager of addEduService: ", error);
    }
  },

  getEduService: async (userID) => {
    try {
      const response = await axios.get(
        `${DATABASE_API}/eduRoutes/getEdu/${userID}`
      );

      if (response) {
        return response.data;
      }
    } catch (error) {
      console.log("Error in EducationManager  of getEduService: ", error);
    }
  },

  updateEmployService: async (userID, data) => {
    try {
      const response = await axios.put(
        `${DATABASE_API}/eduRoutes/updateEdu`,
        data,
        {
          params: { _id: userID },
        }
      );

      if (response) {
        // console.log(response.data);
        return response.data;
      }
    } catch (error) {
      console.log("Error in EducationManager of updateUserService: ", error);
    }
  },
};

export default EducationManager;
