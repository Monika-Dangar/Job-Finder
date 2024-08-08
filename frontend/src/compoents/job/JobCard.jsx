import React from "react";

const JobCard = ({ job }) => {
  if (!job) return null;

  // Destructure job properties
  const {
    title = "Job Title Unavailable",
    company = { display_name: "Company Unavailable" },
    location = { display_name: "Location Unavailable" },
    salary_min,
    salary_max,
    contract_type = "Contract Type Unavailable",
    contract_time = "Contract Time Unavailable",
    description = "No description available",
    redirect_url = "#",
  } = job;

  // Safely access nested properties
  const companyName = company.display_name || "Company Unavailable";
  const locationName = location.display_name || "Location Unavailable";

  return (
    <div className=" mx-auto bg-white shadow-md rounded-lg overflow-hidden mb-5">
      <div className="p-6">
        <h5 className="text-xl font-bold mb-2">{title}</h5>

        {companyName && (
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Company:</span> {companyName}
          </p>
        )}

        {locationName && (
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Location:</span> {locationName}
          </p>
        )}

        {salary_min && salary_max && (
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Salary:</span> {salary_min} -
            {salary_max} per annum
          </p>
        )}

        {contract_type && (
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Contract Type:</span>{" "}
            {contract_type}
          </p>
        )}

        {contract_time && (
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Contract Time:</span>{" "}
            {contract_time}
          </p>
        )}

        {description && (
          <p className="text-gray-800 mb-4">
            <span className="font-semibold">Description:</span> {description}
          </p>
        )}

        <a
          href={redirect_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
        >
          Apply
        </a>
      </div>
    </div>
  );
};

export default JobCard;
