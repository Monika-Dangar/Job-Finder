import axios from "axios";

const DATABASE_API = import.meta.env.VITE_DATABASE_API;

const EmploymentManager = {
  addEmployService: async (
    userID,
    employed,
    employmentType,
    companyName,
    jobTitle,
    salary,
    skillUsed
  ) => {
    try {
      const response = await axios.post(
        `${DATABASE_API}/employRoutes/addEmploy`,
        {
          userID,
          employed,
          employmentType,
          companyName,
          jobTitle,
          salary,
          skillUsed,
        }
      );

      if (response) {
        return response.data;
        // console.log('Employ added successfully: ',response);
      }
    } catch (error) {
      console.log("Error in EmoloyManager of addEmployService: ", error);
    }
  },

  getEmployService: async (userID) => {
    try {
      const response = await axios.get(
        `${DATABASE_API}/employRoutes/getEmploy/${userID}`
      );

      if (response) {
        return response.data;
      }
    } catch (error) {
      console.log("Error in EmoloyManager  of getEmployService: ", error);
    }
  },

  updateEmployService: async (userID, data) => {
    try {
      const response = await axios.put(
        `${DATABASE_API}/employRoutes/updateEmploy`,
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
      console.log("Error in EmoloyManager  of updateUserService: ", error);
    }
  },
};

export default EmploymentManager;
