import React, { useState } from "react";
import DetailCard from "./DetailCard";
import KeySkillModal from "./modal/skillmodal/KeySkillModal";
import EmploymentModal from "./modal/employmentmodal/EmploymentModal";
import EducationModal from "./modal/educationmodal/EducationModal";
import ProjectModal from "./modal/projectmodal/ProjectModal";

const DetailsOverviewCards = () => {
  const [modalTitle, setModalTitle] = useState(null);

  const handleButtonClick = (title) => {
    // console.log("Button clicked, setting modalTitle to:", title); // Add this log
    setModalTitle(title);
  };
  const closeModal = () => {
    setModalTitle(null); // Close the modal by clearing the title
  };

  const renderContent = (title) => {
    switch (title) {
      case "Key skills":
        return (
          <KeySkillModal
            isOpen={modalTitle === "Key skills"}
            onClose={closeModal}
          />
        );
      case "Employment":
        return (
          <EmploymentModal
            isOpen={modalTitle === "Employment"}
            onClose={closeModal}
          />
        );

      case "Education":
        return (
          <EducationModal
            isOpen={modalTitle === "Education"}
            onClose={closeModal}
          />
        );
      case "Projects":
        return (
          <ProjectModal
            isOpen={modalTitle === "Projects"}
            onClose={closeModal}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="mt-10">
        <div className="max-w-sm md:max-w-lg lg:max-w-xl">
          {uploaddetails.map((card, index) => (
            <DetailCard
              key={index}
              card={card}
              onClick={() => handleButtonClick(card.title)}
            />
          ))}
        </div>
      </div>

      {renderContent(modalTitle)}
    </>
  );
};

const uploaddetails = [
  {
    title: "Key skills",
    link: "Add key skills",
    desc: "Recruiters look for candidates with specific key skills",
  },
  {
    title: "Employment",
    link: "Add employment",
    desc: "Your employment details will help recruiters understand your experience",
  },
  {
    title: "Education",
    link: "Add education",
    desc: "Your qualification helps employers know your educational background",
  },
  {
    title: "Projects",
    link: "Add project",
    desc: "Stand out to employers by adding details about projects that you have done so far",
  },
  {
    title: "Resume",
    desc: "Your resume is the first impression you make on potential employers. Craft it carefully to secure your desired job or internship.",
  },
];

export default DetailsOverviewCards;
