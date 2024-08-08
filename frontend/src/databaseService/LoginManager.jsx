import axios from "axios";

const DATABASE_API = import.meta.env.VITE_DATABASE_API;

const LoginManager = {
  loginUserService: async (usernameOrEmail, password) => {
    try {
      const response = await axios.post(`${DATABASE_API}/loginRoutes`, {
        usernameOrEmail,
        password,
      });

      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      console.log("Error in LoginManager of loginUserService: ", error);
      if (error.response) {
        return {
          status: error.response.status,
          message: error.response.data.message || "An error occurred",
        };
      } else if (error.request) {
        // The request was made but no response was received
        return {
          status: 500,
          message: "No response received from the server",
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

  getUserSerivce: async (userID) => {
    try {
      const response = await axios.get(`${DATABASE_API}/loginRoutes/getUser`, {
        params: { userID: userID }, // Ensure params is used correctly
      });

      if (response) {
        // console.log(response.data);
        return response.data;
      }
    } catch (error) {
      console.log("Error in LoginManager of getUserService: ", error);
    }
  },

  updateUserService: async (userID, data) => {
    try {
      const response = await axios.put(
        `${DATABASE_API}/loginRoutes/updateUser`,
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
      console.log("Error in LoginManager of updateUserService: ", error);
    }
  },
};

export default LoginManager;
