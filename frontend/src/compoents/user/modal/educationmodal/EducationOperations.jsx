import { useState, useEffect } from "react";
import EducationManager from "../../../../databaseService/EducationManager";

function EducationalOperations({ card }) {
  const [edu, setEdu] = useState([]);

  const userID = localStorage.getItem("userID");

  useEffect(() => {
    const fetchEdu = async () => {
      try {
        const response = await EducationManager.getEduService(userID);

        if (response) {
          //   console.log("Employ from API: ", response);
          setEdu(response);
        }
      } catch (error) {
        console.log("Error in fecthing employ: ", error);
      }
    };

    fetchEdu();
  }, [userID]);

  //   console.log("employ: ", employment);

  return (
    <>
      {card.title === "Education" && (
        <div>
          {edu.map((item, index) => (
            <div key={index} className="education-item px-2 mt-2">
              <div className="flex justify-between">
                <p>Degree: {item.degree}</p>
                <p>Course: {item.course}</p>
                <p>Course Type: {item.courseType}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default EducationalOperations;
