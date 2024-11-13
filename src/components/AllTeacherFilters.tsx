import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import {  teacherContext, useTeacherContext } from '../contexts/teachersContext';
import RatingFilter from './filters/RatingFilter';
import AvailabilityFilter from './filters/AvailabilityFilter';
import TeacherSkills from './filters/TeacherSkills';
import NameFilter from './filters/NameFilter';
import { LocationFilter } from './filters/LocationFilter';
const AllTeacherFilters: React.FC = () => {
  const {handleAvailability, handleRating, handleSubjects, handleLocationSearch, handleNameSearch} = teacherContext();

  const { t } = useTranslation();

  const handleRatingChange = (rating: number | null) => {
    handleRating(rating);
  };

  const handleAvailabilityChange = (availability: string) => {
    const isAvailable = (availability && availability === 'available' ? "true" : "false");
    handleAvailability(isAvailable);
  };
  const handleSkillChange = (selectedSkills: string[]) => {
    handleSubjects(selectedSkills);
  };

  const handleLocationChange = (selectedValue: any) => {
    handleLocationSearch(selectedValue);
  };

  const [reset, setReset] = useState<any>(false);
  const handleClear = ()=>{
 
    setReset(true);
  }
  return (
    <div className="text-center p-4  bg-white shadow-lg">
      <div className='flex justify-between items-center '>
      <h2 className='text-start'>{t("FILTER_BY")}</h2>
      <button className='py-2 bg-[#17b3a6] text-white rounded-sm cursor-pointer' onClick={handleClear}>{t("CLEAR_FILTER")}</button>
      </div>
     
      <div>
        <LocationFilter reset={reset} setReset={setReset} handleLocationChange={handleLocationChange}/>
        <AvailabilityFilter reset={reset} setReset={setReset} onFilterChange={handleAvailabilityChange} />
        <RatingFilter reset={reset} setReset={setReset} onRatingChange={handleRatingChange} />
        <TeacherSkills  reset={reset} setReset={setReset} onSkillChange={handleSkillChange}/>
      </div>
    </div>
  );
};

export default AllTeacherFilters;
