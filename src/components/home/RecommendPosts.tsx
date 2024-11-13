// RecommendedPosts.tsx
import React, { useContext } from 'react';
import {postContext} from '../../contexts/postsContext';
import HomeTeacher from './HomeTeacher'; 
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./home.css"
import TopLikes from './TopLikes';
import TopComments from './TopComments';
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom';
const RecommendedPosts: React.FC = () => {
  const { t, i18n } = useTranslation();
    const {mostLiked, mostCommented}=postContext()

    const comments = [
        {
            imageUrl: "/img/teacher1.png",
            name: "Top Player",
            description: "Lorem Ipsum is simply highd dummy text of the print and types text of the erdt and s printing and types. Text of the erdt and s printing and types erdssd"
        },
        {
            imageUrl: "/img/teacher2.png",
            name: "Joshika Nain",
            description: "Lorem Ipsum is simply highd dummy text of the print and types text of the erdt and s printing and types. Text of the erdt and s printing and types erdssd"
        },
        {
            imageUrl: "/img/second-image.jpg",
            name: "Top Player",
            description: "Lorem Ipsum is simply highd dummy text of the print and types text of the erdt and s printing and types. Text of the erdt and s printing and types erdssd"
        },
        {
            imageUrl: "/img/third.jpg",
            name: "Joshika Nain",
            description: "Lorem Ipsum is simply highd dummy text of the print and types text of the erdt and s printing and types. Text of the erdt and s printing and types erdssd"
        },
        {
            imageUrl: "/img/teacher1.png",
            name: "Oliver Brown",
            description: "Lorem Ipsum is simply highd dummy text of the print and types text of the erdt and s printing and types. Text of the erdt and s printing and types erdssd"
        }
    ];
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
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
        <div>
             <div>
                <img src="/img/colorarrow.png" width="230px" className='absolute right-[66%]' alt="" />
            </div>
            <Link to="/post-page">
            <h2 className="cursor-pointer text-center text-2xl font-bold my-8 text-white bg-[#17B3A6] shadow-lg max-w-2xl py-4  border-2 border-white border-solid mx-4 xl:mx-auto">{t("RECOMMENDED_POST")}</h2>
            </Link>
            
            <div className=" px-4 py-10 xl:py-20 "style={{ 
            backgroundImage: "url('/img/shape.png')",
            backgroundSize: 'cover', 
            // Center the background image
          }}>
            <div>
            <h3 className='text-[24px] font-semibold text-[#17B3A6] ml-8 xl:ml-24 xl:pt-20 pt-10'>{t("TOP_LIKED")}</h3>
           
           <Slider {...settings} className='mx-2 xl:mx-20'>
               {mostLiked?.map((teacher: any, index: React.Key | null | undefined) => (
                   <TopLikes key={index} id={teacher?.id} imageUrl={teacher?.mediaFile[0]} name={teacher?.posts?.nickName} PostimageUrl={teacher?.posts?.imageUrl}   />
               ))}
               </Slider>
            </div>
            <div>
            <h3 className='text-[24px] font-semibold text-[#17B3A6] ml-8 xl:ml-24 xl:pt-20 pt-10'>{t("TOP_COMMENTS")}</h3>
           
           <Slider {...settings} className='mx-2 xl:mx-20'>
              {mostCommented?.map((teacher: any, index: React.Key | null | undefined) => (
                   <TopComments key={index}  id={teacher?.id} imageUrl={teacher?.mediaFile[0]} name={teacher?.posts?.nickName} PostimageUrl={teacher?.posts?.imageUrl}  />
               ))}
               </Slider>
            </div>
            </div>
        </div>
      
      
    );
};

export default RecommendedPosts;
