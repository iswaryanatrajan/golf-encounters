import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_ENDPOINTS } from "../appConfig";
import axios from "axios";
import { User } from '@pubnub/chat';

interface GigItem {
  id: string;
  title: string;
  price: number;
  imageUrl?: string;
}

const fetchAllTeachersGigs = async (setGigs: React.Dispatch<React.SetStateAction<GigItem[]>>) => {
  try {
    const token = localStorage.getItem("token");
    let endpoint = API_ENDPOINTS.GETPUBLICALLTEACHERSGIGS;
    if (token && token !== "undefined") {
      endpoint = API_ENDPOINTS.GETALLTEACHERSGIGS;
    }
    const response = await axios.get(endpoint, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        "ngrok-skip-browser-warning": "69420"
      }
    });

    setGigs(response.data.teachers);
  } catch (error) {
    console.log(error);
  }
};

const AllGigs: React.FC = () => {
  const [gigs, setGigs] = useState<any>([]);

  useEffect(() => {
    fetchAllTeachersGigs(setGigs);
  }, []);

  return (
    <div className='max-w-7xl mx-auto'>
      <h3>All Teachers Gigs</h3>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'>
        {gigs?.map((item:any) => (
            item?.teacherGigs.map((gig:any)=>(
                <div
                key={gig.id}
                className=" mt-4 bg-white border-2 border-[#17B3A6] border-solid rounded-lg shadow overflow-hidden relative text-center transition duration-300 hover:bg-[#17B3A6] hover:text-white"
               
              >
                <img
                  src={gig?.imageUrl ||  "/img/NOGIG.png"}
                  alt={gig?.title}
                  className="w-full h-70 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white py-2">
                    <h2>{gig?.title}</h2>
                  <div className='flex items-center justify-center gap-10'>
                    <img src={item?.profileImage ||  "img/profile-page.png"} alt="image" className='w-8 h-8 rounded-full bg-white' />
                    <h3 className="text-[22px] font-semibold">{item?.firstName}</h3>
                  </div>
                </div>
              </div>))
        ))}
        
      </div>
    </div>
  );
};

export default AllGigs;
