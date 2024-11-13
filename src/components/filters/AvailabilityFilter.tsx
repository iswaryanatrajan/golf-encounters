import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
interface AvailabilityFilterProps {
  onFilterChange: (availability: 'available' | 'not-available' | '') => void;
  reset:any,
  setReset:any
}

const AvailabilityFilter: React.FC<AvailabilityFilterProps> = ({ onFilterChange, reset, setReset }) => {
  const [selectedTab, setSelectedTab] = useState<any>(' ');
  const { t } = useTranslation();
  const handleTabChange = (tab: any) => {
    setSelectedTab(tab);
    onFilterChange(tab);
  };
  useEffect(() => {
    if(reset){
      setSelectedTab('');
      onFilterChange('');
      setReset(false);
    }
}, [reset]);
  return (
    < >
    <div className='py-4'>
    <h3 className='text-start'>{t("Today_Availability")}</h3>
     <div className="flex border-b">
      <button
        className={`flex-1 py-2 text-center ${
          selectedTab === 'available' ? 'border-b-2 border-[#2bb9ad] font-medium text-[#2bb9ad]' : 'text-gray-500'
        }`}
        onClick={() => handleTabChange('available')}
      >
       {t("AVAILABLE")}
      </button>
      <button
        className={`flex-1 py-2 text-center ${
          selectedTab === 'not-available' ? 'border-b-2 border-[#2bb9ad] font-medium text-[#2bb9ad]' : 'text-gray-500'
        }`}
        onClick={() => handleTabChange('not-available')}
      >
         {t("NOT_AVAILABLE")}
      </button>
    </div>
    </div>
    
    </>
   
  );
};

export default AvailabilityFilter;
