import React from 'react';

interface TeacherListButtonProps {
    color?: string;
    title: string;
    icon: string;
    onClick?: (() => void) | undefined;
    textColor?: string;
}

const TeacherListButton: React.FC<TeacherListButtonProps> = ({
    color, title, icon, onClick, textColor
}) => {
    let textCol = textColor ? 'text-' + textColor : 'text-white';
    return (
        <button
            className={`${color} ${textCol} my-2 cursor-pointer font-bold text-[8.72px] leading-[10.57px] h-[24.49px] py-2 px-2 rounded-xl flex items-center`}
            onClick={onClick}
        >
            <img className='mr-1' src={icon} alt='' />
            <span>{title}</span>
        </button>
    );
};

export default TeacherListButton;
