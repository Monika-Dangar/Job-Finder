import React, { useState, useEffect } from "react";
import SkillManager from "../../../../databaseService/SkillManager";

const SkillOperations = ({ card }) => {
  const [skills, setSkills] = useState([]);
  const userID = localStorage.getItem("userID");

  useEffect(() => {
    const fetchSkill = async () => {
      if (!userID) {
        console.log("UserID is not aviable");
      }
      try {
        const response = await SkillManager.getSkillSerivce(userID);

        if (response) {
          // console.log("Skills from API: ", response);
          setSkills(response || []);
        }
      } catch (error) {
        console.log("Error in fecthing details: ", error);
      }
    };

    fetchSkill();
  }, [userID, skills]);

  const handleDelete = async (skillname) => {
    try {
      const response = await SkillManager.deleteSkillService(userID, skillname);

      if (response) {
        // console.log("deleted: ", response);
        setSkills(response);
      }
    } catch (error) {
      console.log("Error deleting: ", error);
    }
  };
  return (
    <>
      {card.title === "Key skills" && (
        <ul className="mt-5 ml-2">
          {skills.map((skill) => (
            <li
              key={skill._id}
              className="text-gray-800 inline border-2 border-indigo-300 rounded-full p-2"
            >
              {skill.skill}
              <button
                className="ml-2"
                onClick={() => handleDelete(skill.skill)}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
export default SkillOperations;
