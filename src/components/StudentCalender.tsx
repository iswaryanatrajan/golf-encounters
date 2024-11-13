import React from "react";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
const CalendarSection: React.FC = () => {
  const {t, i18n} = useTranslation();
document.body.dir = i18n.dir();
  const iconStyles: React.CSSProperties = {
    fontSize: "16px",
    color: "black",
  };
  return (
    <div className="mx-0 lg:mx-16 xl:mx-20">
       <Link to="/activties-page ">
       <div className="flex justify-center  bg-[#51ff85] rounded-md cursor-pointer hover:animate-bounce">
     
      <div className="flex items-center gap-2 ">
        <div>
          <FontAwesomeIcon icon={faCalendar} style={iconStyles} />
        </div>
        <h4 className="font-sans text-base font-medium text-black">
          {t('CHECK_CALENDER')}
        </h4>
      </div>
      
     
    </div>
    </Link>
    </div>
    
  );
};

export default CalendarSection;
