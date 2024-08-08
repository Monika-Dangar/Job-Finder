import axios from "axios";

const DATABASE_API = import.meta.env.VITE_DATABASE_API;

const UserImageManager = {
  addUserImageService: async (formData) => {
    // No need to pass userID separately here
    try {
      const response = await axios.post(
        `${DATABASE_API}/userImageRoutes/uploadImage`,
        formData, // Send formData directly
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response) {
        return response.data;
      }
    } catch (error) {
      console.log("Error in UserImageManager of addUserImageService: ", error);
    }
  },

  getUserImageService: async (userID) => {
    try {
      const response = await axios.get(
        `${DATABASE_API}/userImageRoutes/getImage/${userID}`,
        {
          responseType: "blob", // Expect binary data (image)
        }
      );

      const imageUrl = URL.createObjectURL(new Blob([response.data]));
      return imageUrl;
    } catch (error) {
      console.log("Error in UserImageManager of getUserImageService: ", error);
      return "/default-image-url";
    }
  },
};

export default UserImageManager;
