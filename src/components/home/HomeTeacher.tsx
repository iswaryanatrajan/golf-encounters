// TeacherCard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface TeacherCardProps {
    imageUrl: string;
    name: string;
    description: string;
    id:any;
}

const TeacherCard: React.FC<TeacherCardProps> = ({ imageUrl, name, description,id }) => {
  const router = useNavigate();

    return (
        <div className="mx-6 mt-20 bg-white  rounded-lg shadow p-4 text-center transition duration-300
                        hover:bg-[#17B3A6] hover:text-white hover:border hover:border-white hover:border-solid "  onClick={()=>{

                            router('/teacher-details/'+ id)
                        }
                       }>
            <img src={imageUrl} alt={name} className="w-full xl:h-64 object-fit rounded-t-lg" />
            <h3 className="text-[22px] font-semibold mt-6 m-1 ">{name}</h3>
            <hr className='bg-[#17B3A6] hover:bg-white h-1 w-[60px]' />
            <p className="mt-1 py-4 text-[16px]">{description}</p>
        </div>
    );
};

export default TeacherCard;
