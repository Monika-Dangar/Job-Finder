import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

const SearchBar = ({ onSearch, currentCountryCode }) => {
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      query: "",
      countryCode: currentCountryCode,
    },
  });

  useEffect(() => {
    setValue("countryCode", currentCountryCode);
  }, [currentCountryCode, setValue]);

  const onSubmit = (data) => {
    // console.log("SearchBar onSubmit data:", data); // Debugging
    onSearch(data);
    // console.log("onSearch: ", data);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-sm md:max-w-lg mx-auto pt-10"
      >
        <div className="flex">
          <div className="relative">
            <Controller
              name="countryCode"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-0 focus:border-blue-500"
                >
                  <option value="in">India</option>
                  <option value="gb">Great Britain</option>
                  <option value="us">United States of America</option>
                </select>
              )}
            />
          </div>

          <div className="relative w-full">
            <Controller
              name="query"
              control={control}
              render={({ field }) => (
                <input
                  type="search"
                  id="search-dropdown"
                  {...field}
                  placeholder="Search job title"
                  className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                />
              )}
            />
            <button
              type="submit"
              className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
