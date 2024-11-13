import React from 'react';

interface StudentListButtonProps {
    color: string;
    title: string;
    icon: string;
    onClick?: (() => void) | undefined;
    textColor?: string;
}

const StudentListButton: React.FC<StudentListButtonProps> = ({
    color,
    title,
    icon,
    onClick,
    textColor,
}) => {
    let textCol = textColor ? 'text-' +[textColor] : 'text-white';
    return (
        <button
            className={`${color} ${textCol} font-bold text-[8.72px] leading-[10.57px] h-[24.49px] py-2 px-2 rounded-xl cursor-pointer flex justify-center items-center`}
            onClick={onClick}
        >
            <img className='mr-1' src={icon} alt='' />
            <span>{title}</span>
        </button>
    );
};
export default StudentListButton;
