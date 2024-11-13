import React from 'react';
import { useNavigate } from 'react-router-dom';

interface TopCommentsProps {
    imageUrl: string;
    name: string;
    id: any;
    PostimageUrl:string;

}

const TopComments: React.FC<TopCommentsProps> = ({ imageUrl, name ,id,PostimageUrl})=> {
    const router = useNavigate();

    return (
        <div className="mx-6 mt-20 bg-white border-2 border-[#17B3A6] border-solid rounded-lg shadow overflow-hidden relative text-center transition duration-300 hover:bg-[#17B3A6] hover:text-white"
          onClick={()=>{

            router('/read-post/'+ id)
          }}>
            <img src={imageUrl} alt={name} className="w-full h-64 object-cover" />

          
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white py-2">
                <div className='flex items-center justify-center gap-10'>
                <img src={PostimageUrl}  alt="image" className='w-10 h-10 rounded-full' />
                <h3 className="text-[22px] font-semibold">{name}</h3>
                </div>
                
            </div>

            {/* Heart icon in the top right corner */}
            {/* <div className="absolute top-4 right-4 bg-[#BEBEBE] rounded-full p-2 flex items-center  ">
                <svg viewBox="0 0 24 24" fill="red" width="24px" height="24px">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
            </div> */}

        </div>
    );
};

export default TopComments;
