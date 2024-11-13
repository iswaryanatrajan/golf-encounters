import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_ENDPOINTS } from "../appConfig";
import axios from "axios";
import { User } from '@pubnub/chat';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from "react-i18next";
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
    const { t } = useTranslation();
    useEffect(() => {
        fetchAllTeachersGigs(setGigs);
    }, []);
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        className: "center",

        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };
    return (
        <div className='xl:mx-20'>
            {/* <div>
                <img src="/img/colorarrow.png" width="230px" className='absolute right-[66%]' alt="" />
            </div> */}
            <Link to="/all-teacher-gigs">
                <h2 className="cursor-pointer text-center text-2xl font-bold my-8 text-white bg-[#17B3A6] shadow-lg max-w-2xl py-4  border-2 border-white border-solid mx-4 xl:mx-auto">{t("ALL_GIGS")}</h2>
            </Link>
            <div className=''>
                <Slider {...settings} className=''>
                    {gigs?.map((item: any) => (
                        item?.teacherGigs.map((gig: any) => (
                            <div className=''>
                                <div
                                    key={gig.id}
                                    className="mx-2 mt-4 bg-white h-[250px]  border-2 border-[#17B3A6] border-solid rounded-lg shadow overflow-hidden relative text-center transition duration-300 hover:bg-[#17B3A6] hover:text-white"

                                >
                                    <img
                                        src={gig?.imageUrl || "/img/NOGIGS.png"}
                                        alt={gig?.title}
                                        className="w-full h-70 object-cover"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white py-2">
                                     
                                        <div className='flex items-center justify-center gap-10'>
                                            <img src={item?.profileImage || "img/profile-page.png"} alt="image" className='w-8 h-8 rounded-full bg-white' />
                                            <h3 className="text-[22px] font-semibold">{item?.firstName}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ))}

                </Slider>
            </div>
        </div>
    );
};

export default AllGigs;
