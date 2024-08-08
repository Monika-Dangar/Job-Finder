import React, { useState, useEffect } from "react";
import EmploymentManager from "../../../../databaseService/EmploymentManager";

const EmployOperations = ({ card }) => {
  const [employment, setEmployment] = useState([]);

  const userID = localStorage.getItem("userID");

  useEffect(() => {
    const fetchEmploy = async () => {
      try {
        const response = await EmploymentManager.getEmployService(userID);

        if (response) {
          // console.log("Employ from API: ", response);
          setEmployment(response);
        }
      } catch (error) {
        console.log("Error in fecthing employ: ", error);
      }
    };

    fetchEmploy();
  }, []);

  //   console.log("employ: ", employment);

  return (
    <>
      {card.title === "Employment" && (
        <div>
          {employment.map((item, index) => (
            <div key={index} className="employment-item px-2 mt-2">
              <div className="flex justify-between">
                <p>Employed: {item.employed === true ? "Yes" : "No"}</p>
                <p>Employment Type: {item.employmentType}</p>
              </div>
              <div className="flex justify-between">
                <p>Company Name: {item.companyName}</p>
                <p>Job Title: {item.jobTitle}</p>
              </div>
              <div className="flex justify-between">
                <p>Salary: ${item.salary}</p>
                <p>Skills Used: {item.skillUsed}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default EmployOperations;
