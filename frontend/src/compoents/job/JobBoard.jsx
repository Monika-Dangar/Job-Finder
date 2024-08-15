import React, { useState } from "react";
import SearchBar from "./SearchBar";
import FilterSalary from "./FliterSalary";
import FilterLocation from "./FilterLocation";
import JobList from "./JobList";

const JobBoard = () => {
  const [searchParams, setSearchParams] = useState({
    query: "",
    countryCode: "in",
    filters: {
      salary: [],
      location: [],
    },
    salary_min: null,
    salary_max: null,
  });

  const handleSearch = (data) => {
    // console.log("JobBoard onSearch data:", data);

    // Reset location filters if country code changes
    const updatedFilters =
      data.countryCode !== searchParams.countryCode
        ? {
            salary: searchParams.filters.salary,
            location: [], // Clear locations if country code changes
          }
        : data.filters;

    setSearchParams({
      query: data.query || "",
      countryCode: data.countryCode || "in",
      filters: updatedFilters || {
        salary: [],
        location: [],
      },
      salary_min: data.salary_min || null,
      salary_max: data.salary_max || null,
    });
  };

  return (
    <>
      <SearchBar
        onSearch={handleSearch}
        currentCountryCode={searchParams.countryCode}
      />
      <div className="flex flex-col justify-center md:flex-row max-w-screen-lg mx-auto">
        <div className="flex flex-col md:w-1/4 p-4 border-r">
          <FilterSalary
            initialSelectedSalary={searchParams.filters.salary || []}
            onSalaryChange={(newSalaryList) => {
              // Set min and max salary based on selected salary range
              if (newSalaryList.length > 0) {
                const [min, max] = newSalaryList[0].split("-");
                setSearchParams((prevParams) => ({
                  ...prevParams,
                  filters: {
                    ...prevParams.filters,
                    salary: newSalaryList,
                  },
                  salary_min: parseInt(min, 10),
                  salary_max: parseInt(max, 10),
                }));
              } else {
                setSearchParams((prevParams) => ({
                  ...prevParams,
                  filters: {
                    ...prevParams.filters,
                    salary: newSalaryList,
                  },
                  salary_min: null,
                  salary_max: null,
                }));
              }
            }}
          />
          <FilterLocation
            initialSelectedLocations={searchParams.filters.location}
            onLocationChange={(newLocationList) => {
              setSearchParams((prevParams) => ({
                ...prevParams,
                filters: {
                  ...prevParams.filters,
                  location: newLocationList,
                },
              }));
            }}
          />
        </div>

        <div className="flex-1 p-4">
          <JobList searchParams={searchParams} />
        </div>
      </div>
    </>
  );
};

export default JobBoard;
