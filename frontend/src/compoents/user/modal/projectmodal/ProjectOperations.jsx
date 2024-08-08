import React, { useState, useEffect } from "react";
import ProjectManager from "../../../../databaseService/ProjectManager";

const ProjectOperations = ({ card }) => {
  const [project, setProject] = useState([]);

  const userID = localStorage.getItem("userID");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await ProjectManager.getProjectService(userID);

        if (response) {
          //   console.log("Project from API: ", response);
          setProject(response);
        }
      } catch (error) {
        console.log("Error in fecthing project: ", error);
      }
    };

    fetchProject();
  }, [userID]);

  //   console.log("project: ", project);

  return (
    <>
      {card.title === "Projects" && (
        <div>
          {project.map((item, index) => (
            <div key={index} className="employment-item px-2 mt-2">
              <p>Project name: {item.projectName}</p>
              <p>Project description: {item.projectDescription}</p>
              <div className="flex justify-between">
                <p>Start date: {item.projectDuration.startDate}</p>
                <p>End date: {item.projectDuration.endDate}</p>
              </div>
              <p>Skill used: {item.skillUsedProject}</p>
              <p>URL: {item.projectURL}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ProjectOperations;
