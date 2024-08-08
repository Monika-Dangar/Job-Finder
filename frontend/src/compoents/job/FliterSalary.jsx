import React, { useState, useEffect } from "react";

const FilterSalary = ({ initialSelectedSalary, onSalaryChange }) => {
  // Manage the selected salary state locally
  const [selectedSalary, setSelectedSalary] = useState(initialSelectedSalary);

  // List of available salaries criteria
  const salaries = [
    { label: "0-3 Lakhs", value: "0-3" },
    { label: "3-6 Lakhs", value: "3-6" },
    { label: "6-10 Lakhs", value: "6-10" },
    { label: "10-15 Lakhs", value: "10-15" },
    { label: "15-25 Lakhs", value: "15-25" },
  ];

  useEffect(() => {
    setSelectedSalary(initialSelectedSalary);
  }, [initialSelectedSalary]);

  const handleSalaryChange = (salary) => {
    // Update the selected salary based on checkbox state
    const updatedSalary = selectedSalary.includes(salary)
      ? selectedSalary.filter((sal) => sal !== salary)
      : [...selectedSalary, salary];

    setSelectedSalary(updatedSalary);
    // Notify parent about the change
    onSalaryChange(updatedSalary);
  };

  return (
    <div className="filter-card bg-white p-4 rounded-lg shadow-md mb-4">
      <h4>Salary Range</h4>
      {salaries.map((salary) => (
        <div key={salary.value} className="block mb-2">
          <input
            type="checkbox"
            className="mr-2"
            id={`salary-${salary.value}`}
            checked={selectedSalary.includes(salary.value)}
            onChange={() => handleSalaryChange(salary.value)}
          />
          <label htmlFor={`salary-${salary.value}`}>{salary.label}</label>
        </div>
      ))}
    </div>
  );
};

export default FilterSalary;
