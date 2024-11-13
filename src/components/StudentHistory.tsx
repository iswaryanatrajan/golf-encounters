import React from 'react';

interface StudentHistoryProps {
  data: Array<{
    imageUrl: string;
    description: string;
    bgColor: string;
    borderColor: string;
  }>;
}

const StudentHistory: React.FC<StudentHistoryProps> = ({ data }) => {
  return (
    <div className="border-solid border-[3px] border-[#52FF86] rounded-xl p-3">
      {data.map((item, index) => (
        <div
          key={index}
          className={`flex max-w-5xl p-1 bg-${item.bgColor} border border-${item.borderColor} shadow-lg rounded-lg border-solid mt-3 `}
          style={{ backgroundColor: item.bgColor, border: item.borderColor }}
        >
          <div className="flex items-center">
            <img
              src={item.imageUrl}
              alt={`Profile ${index}`}
              className="h-10 w-10 rounded-full mr-4"
            />
            <div>
              <p className="text-gray-600 font-product-sans font-normal text-base">
                {item.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentHistory;
