import React, { useState } from "react";
import { GoSearch } from "react-icons/go";

const Dashboard: React.FC = () => {
  // State to hold the search input
  const [searchInput, setSearchInput] = useState("");

  // Function to handle the search action
  const handleSearch = () => {
    // You would implement your search logic here
    // For now, we'll just log the input to the console
    console.log(`Search for: ${searchInput}`);
  };

  // Function to handle changes in the search input
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  // Function to handle submission of the search
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSearch();
  };
  return (
    <main className="flex flex-row px-6 py-1 h-10">
      <div className="flex flex-col px-3"></div>
      <div className="flex flex-col px-3 flex-grow">
        <form
          onSubmit={handleSubmit}
          className="flex items-center border rounded overflow-hidden"
        >
          <input
            type="search"
            placeholder="جست و جو سرویس یا IP"
            value={searchInput}
            onChange={handleChange}
            className="pl-4 pr-3 py-2 flex-grow"
          />
          <button type="submit" className="p-2">
            <GoSearch />
          </button>
        </form>
      </div>
    </main>
  );
};

export default Dashboard;
