import React, { useState } from 'react';

interface PlayerProps {
  showNumber: boolean;
  name: string;
  isCreator?: boolean;
  imageUrl?: string;
  enableHover?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

const Player: React.FC<PlayerProps> = ({ showNumber, name, imageUrl, enableHover, onEdit, onDelete, isCreator }) => {
  const [isHovered, setIsHovered] = useState(false);
  const defaultImageUrl = '/img/ellipse-1310@2x.png';
  const [displayName, setDisplayName] = useState(name.substring(0, 6) + '..');

  // Function to handle mouse enter and leave
  const handleMouseEnter = () => {
    if (enableHover) {
      setIsHovered(true);
      setDisplayName(name);
    }
  };
  const handleMouseLeave = () => {
    if (enableHover) {
      setIsHovered(false);
      setDisplayName(name.substring(0, 6) + '');
    }
  };

  return (
    <div className='flex w-full items-center h-[55px] px-0'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <div className='flex-col text-center items-center'>
        <img
          className='rounded-[50%] w-9 h-[35.7px] object-cover'
          alt=''
          src={imageUrl || defaultImageUrl}
        />
        <div className='pl-1 tracking-[1.45px] leading-[9.22px]'>
          {displayName}
        </div>
      </div>

      {showNumber && (
        <div className='flex justify-center items-center rounded-[50%] bg-[#A9A9A9] w-[18px] h-[18px] tracking-[1.45px] leading-[9.22px] text-base text-white'>
          3
        </div>
      )}
      {isCreator && (
        <div className='flex gap-2 z-[10]'>
          {onEdit &&
            <div className='hover:bg-white hover:shadow-xl rounded-full p-1 h-6 w-6 flex items-center justify-center cursor-pointer '>
              <svg
                onClick={onEdit}
                width="12"
                height="12"
                className="cursor-pointer "
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.0602 5.33409L10.3942 1.70604L11.6018 0.496696C11.9325 0.165565 12.3388 0 12.8207 0C13.3026 0 13.7085 0.165565 14.0386 0.496696L15.2463 1.70604C15.5769 2.03717 15.7494 2.43683 15.7638 2.90502C15.7782 3.37321 15.62 3.77259 15.2894 4.10314L14.0602 5.33409ZM12.8094 6.60822L3.666 15.7647H0V12.0935L9.14344 2.93699L12.8094 6.60822Z"
                  fill="#268D61"
                />
              </svg>
            </div>
          }
          {/* {onDelete && <svg
            onClick={onDelete}
            width="12"
            height="12"
            className="cursor-pointer"
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.74324 14.0131C1.74324 14.9765 2.75668 15.7647 3.99534 15.7647H13.0037C14.2424 15.7647 15.2558 14.9765 15.2558 14.0131V5.2549C15.2558 4.2915 14.2424 3.50327 13.0037 3.50327H3.99534C2.75668 3.50327 1.74324 4.2915 1.74324 5.2549V14.0131ZM15.2558 0.875817H12.4407L11.6412 0.253987C11.4385 0.0963398 11.1458 0 10.853 0H6.1461C5.85332 0 5.56055 0.0963398 5.35786 0.253987L4.55836 0.875817H1.74324C1.12391 0.875817 0.617188 1.26993 0.617188 1.75163C0.617188 2.23333 1.12391 2.62745 1.74324 2.62745H15.2558C15.8752 2.62745 16.3819 2.23333 16.3819 1.75163C16.3819 1.26993 15.8752 0.875817 15.2558 0.875817Z"
              fill="#CC0025"
            />
          </svg>} */}
        </div>
      )}
    </div>
  );
};

export default Player;
