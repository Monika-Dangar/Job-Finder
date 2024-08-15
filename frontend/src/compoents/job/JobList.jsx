import React, { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "./JobCard";
const API_ID = import.meta.env.VITE_ADZUNA_APP_ID_API;
const API_KEY = import.meta.env.VITE_ADZUNA_APP_KEY_API;

const JobList = ({ searchParams }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // console.log("Searchparams in joblist ", searchParams);

  useEffect(() => {
    const fetchJobs = async () => {
      // console.log("Fetching jobs with params:", searchParams); // Debugging line
      setLoading(true);
      setError(null);
      try {
        const params = {
          app_id: API_ID,
          app_key: API_KEY,
          what: searchParams.query || "", // Always include query if available
          where: searchParams.filters.location
            ? searchParams.filters.location.join(",")
            : undefined, // Include location if present
          salary_min: searchParams.salary_min || undefined, // Include salary_min if present
          salary_max: searchParams.salary_max || undefined, // Include salary_max if present
        };

        const response = await axios.get(
          `https://api.adzuna.com/v1/api/jobs/${searchParams.countryCode}/search/10`,
          { params }
        );
        setJobs(response.data.results);
      } catch (error) {
        console.log("Error while fetching: ", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [searchParams]);

  if (loading)
    return (
      <>
        <div role="status" className="max-w-sm animate-pulse">
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
          <span className="sr-only">Loading...</span>
        </div>
      </>
    );
  if (error) return <p>Error fetching jobs: {error.message}</p>;

  return (
    <>
      <div className="job-list-container">
        {jobs.length > 0 ? (
          <div className="grid grid-cols-1">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <p>No jobs found matching your criteria.</p>
        )}
      </div>
    </>
  );
};

export default JobList;
