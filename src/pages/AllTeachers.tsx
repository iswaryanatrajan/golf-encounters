import React from "react";
import FilterItem from "../components/AllTeacherFilters";

const AllTeachers: React.FC<any> = () => {

  return (
    <div className="grid grid-cols-2 gap-6 mt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <FilterItem/>
    </div>
  );
};

export default AllTeachers;
