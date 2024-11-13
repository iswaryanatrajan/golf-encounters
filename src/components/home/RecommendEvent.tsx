import React from 'react';
import Slider from 'react-slick';
import HomeEventCard from './HomeEventCard'; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./home.css"
import { eventContextStore } from '../../contexts/eventContext';
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom';
const RecommendedEvents: React.FC = () => {
  const { t, i18n } = useTranslation();
  const {eventss} =eventContextStore()
    const Events = [
        {
            imageUrl: "/img/teacher1.png",
            name: "TJK Golf Event",
            description: "Lorem Ipsum is simply highd dummy text of the print and types text of the erdt and s printing and types. Text of the erdt and s printing and types erdssd"
        },
        {
            imageUrl: "/img/teacher2.png",
            name: "TJK Golf Event",
            description: "Lorem Ipsum is simply highd dummy text of the print and types text of the erdt and s printing and types. Text of the erdt and s printing and types erdssd"
        },
        {
            imageUrl: "/img/teacher1.png",
            name: "TJK Golf Event",
            description: "Lorem Ipsum is simply highd dummy text of the print and types text of the erdt and s printing and types. Text of the erdt and s printing and types erdssd"
        },
        {
            imageUrl: "/img/teacher2.png",
            name: "TJK Golf Event",
            description: "Lorem Ipsum is simply highd dummy text of the print and types text of the erdt and s printing and types. Text of the erdt and s printing and types erdssd"
        },
        {
            imageUrl: "/img/teacher1.png",
            name: "TJK Golf Event",
            description: "Lorem Ipsum is simply highd dummy text of the print and types text of the erdt and s printing and types. Text of the erdt and s printing and types erdssd"
        }
    ];
    function SampleNextArrow(props:any) {
      const { className, style, onClick } = props;
      return (
        <div
          className={className}
          style={{ ...style, display: "block", background: "red" }}
          onClick={onClick}
        />
      );
    }
    
    function SamplePrevArrow(props:any) {
      const { className, style, onClick } = props;
      return (
        <div
          className={className}
          style={{ ...style, display: "block", background: "green" }}
          onClick={onClick}
        />
      );
    }
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        className: "center",
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
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
        <div className="px-4 py-10"  style={{ 
            backgroundImage: "url('/img/triangle.png')", 
            backgroundSize: 'cover', 
            backgroundPosition: 'center' 
          }}>
            <div>
                <img src="/img/colorarrow.png" width="230px" className='absolute right-[66%]' alt="" />
            </div>
            <Link to="/event-main-page">
            <h2 className="cursor-pointer text-center text-2xl font-bold my-8 text-white bg-[#17B3A6] shadow-lg max-w-2xl py-4 border-2 border-white border-solid mx-auto">{t("RECOMMENDED_EVENT")}</h2>
            </Link>
            
            <Slider {...settings} className='mx-2 xl:mx-20'>
                {eventss.map((teacher:any, index:any) => (
                    <HomeEventCard key={index} imageUrl={teacher?.imageUrl[0]} id={teacher?.id} name={teacher?.eventName} description={teacher?.eventDetails} />
                ))}
                
            </Slider>
        </div>
    );
};

export default RecommendedEvents;
