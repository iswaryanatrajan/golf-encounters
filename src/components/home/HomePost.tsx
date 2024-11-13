// import React from 'react';
// import Slider from 'react-slick';
// import HomeEventCard from './HomeEventCard'; 
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import "./home.css"
// const HomePost: React.FC = () => {
//     const Events = [
//         {
//             imageUrl: "/img/teacher1.png",
//             name: "TJK Golf Event",
//             description: "Lorem Ipsum is simply highd dummy text of the print and types text of the erdt and s printing and types. Text of the erdt and s printing and types erdssd"
//         },
//         {
//             imageUrl: "/img/teacher2.png",
//             name: "TJK Golf Event",
//             description: "Lorem Ipsum is simply highd dummy text of the print and types text of the erdt and s printing and types. Text of the erdt and s printing and types erdssd"
//         },
//         {
//             imageUrl: "/img/teacher1.png",
//             name: "TJK Golf Event",
//             description: "Lorem Ipsum is simply highd dummy text of the print and types text of the erdt and s printing and types. Text of the erdt and s printing and types erdssd"
//         },
//         {
//             imageUrl: "/img/teacher2.png",
//             name: "TJK Golf Event",
//             description: "Lorem Ipsum is simply highd dummy text of the print and types text of the erdt and s printing and types. Text of the erdt and s printing and types erdssd"
//         },
//         {
//             imageUrl: "/img/teacher1.png",
//             name: "TJK Golf Event",
//             description: "Lorem Ipsum is simply highd dummy text of the print and types text of the erdt and s printing and types. Text of the erdt and s printing and types erdssd"
//         }
//     ];

//     const settings = {
//         dots: true,
//         infinite: false,
//         speed: 500,
//         slidesToShow: 4,
//         slidesToScroll: 4,
//         responsive: [
//             {
//               breakpoint: 1024,
//               settings: {
//                 slidesToShow: 3,
//                 slidesToScroll: 3,
//               }
//             },
//             {
//               breakpoint: 600,
//               settings: {
//                 slidesToShow: 1,
//                 slidesToScroll: 2,
//               }
//             },
//             {
//               breakpoint: 480,
//               settings: {
//                 slidesToShow: 1,
//                 slidesToScroll: 1,
//               }
//             }
//           ]
//     };

//     return (
//         <div className="px-4 py-10"  style={{ 
//             backgroundImage: "url('/img/triangle.png')",
//             backgroundSize: 'cover', 
//             backgroundPosition: 'center' 
//           }}>
//             <div>
//                 <img src="/img/colorarrow.png" width="230px" className='absolute right-[63%]' alt="" />
//             </div>
//             <h2 className="text-center text-2xl font-bold my-8 text-white bg-[#17B3A6] shadow-lg max-w-2xl py-4 border-2 border-white border-solid mx-auto">Recommended Events Around You</h2>
//             <Slider {...settings} className='mx-2 xl:mx-20'>
//                 {Events.map((teacher, index) => (
//                     <HomeEventCard key={index} imageUrl={teacher.imageUrl} name={teacher.name} id={teacher?.id} description={teacher.description} />
//                 ))}
//             </Slider>
//         </div>
//     );
// };

// export default HomePost;
