import React, { useEffect } from "react";
import SkillOperations from "./modal/skillmodal/SkillOperations";
import EmployOperations from "./modal/employmentmodal/EmployOperations";
import EducationalOperations from "./modal/educationmodal/EducationOperations";
import ProjectOperations from "./modal/projectmodal/ProjectOperations";
import ResumeUpload from "./modal/resumemodal/ResumeUpload";

const DetailCard = ({ card, onClick }) => {
  //   console.log("current skills: ", skills);
  return (
    <>
      <div className="bg-white p-5 mb-5 border border-gray-200 rounded-lg shadow">
        <div className="card-body">
          <div className="flex justify-between">
            <p className="m-2">{card.title}</p>
            <button
              className="btn text-indigo-700 shadow-none btn-outline-light"
              onClick={onClick}
            >
              {card.link}
            </button>
          </div>
          <label className="text-gray-500 ms-2">{card.desc}</label>;
          {/* <CardDescription card={card} /> */}
          <SkillOperations card={card} />
          <EmployOperations card={card} />
          <EducationalOperations card={card} />
          <ProjectOperations card={card} />
          <ResumeUpload card={card} />
        </div>
      </div>
    </>
  );
};

export default DetailCard;
