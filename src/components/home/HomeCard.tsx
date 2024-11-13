import React from 'react';

interface HomeCardProps {
  title: string;
  description: string;
}

const HomeCard: React.FC<HomeCardProps> = ({ title, description }) => {
  return (
    <div className="mx-auto px-10 ">
       
        <div className="py-0 xl:py-10">
      <h3 className="text-lg font-semibold text-center">{title}</h3>
      <p className="text-[#9B9B9B] mt-2 text-center text-sm">{description}</p>
    </div>
    </div>
  
  );
};

export default HomeCard;
