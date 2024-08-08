import axios from "axios";

const DATABASE_API = import.meta.env.VITE_DATABASE_API;

const ProjectManager = {
  addProjectService: async (
    userID,
    projectName,
    projectDuration,
    projectDescription,
    skillUsedProject,
    projectURL
  ) => {
    try {
      const response = await axios.post(
        `${DATABASE_API}/projectRoutes/addProject`,
        {
          userID,
          projectName,
          projectDuration,
          projectDescription,
          skillUsedProject,
          projectURL,
        }
      );

      if (response) {
        // console.log("Project added successfully: ", response);
        return response;
      }
    } catch (error) {
      console.log("Error in ProjectMAnager of addProjectService: ", error);
    }
  },

  getProjectService: async (userID) => {
    try {
      const response = await axios.get(
        `${DATABASE_API}/projectRoutes/getProject/${userID}`
      );

      if (response) {
        return response.data;
      }
    } catch (error) {
      console.log("Error in ProjectMAnager  of getProjectService: ", error);
    }
  },

  updateProjectService: async (userID, data) => {
    try {
      const response = await axios.put(
        `${DATABASE_API}/projectRoutes/updateProject`,
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
      console.log("Error in ProjectMAnager of updateProjectService: ", error);
    }
  },
};

export default ProjectManager;
