import React from 'react';

const customStyles = `
  .slick-arrow {
    width: 50px; 
    height: 50px; 
  }
  .slick-arrow::before {
    font-size: 50px; 
    color: #17b3a6;
  }
  
  .slick-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 500px;
  }
  .slick-slide {
    z-index: 0;
    opacity: 0.5;
    filter: brightness(0.5);
    margin-left: 2px;
    position: relative;

  }
  .slick-current + div {
    border-radius: 20px;
    z-index: 9999;
    transform: scale(1.5) skew(-6deg);
    opacity: 1;
    filter: brightness(1);
    padding: 10px 15px;
    background-color: white;
    height: auto;
    box-shadow: 0px 1px 30px -2px rgba(0,0,0,0.46);
  } 
  
  .slick-current + div img {
    transform: scale(1) skew(4deg);
  }
  
  .slick-arrow {
    z-index: 10;
  }
  .slide {
    margin: 0 10px;
  }
  .card {
    width: 200px; 
    border: 1px solid #ccc;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
    background-color: white;
  }
  .CustomNextArrow:before, .CustomPrevArrow:before {
    color: black;
  }
  #my-slider-container .custom-slick-next, 
  #my-slider-container .custom-slick-prev {
    width: 50px;
    height: 50px;
  }
  
  #my-slider-container .custom-slick-next {
    right: -25px; 
  }
  
  #my-slider-container .custom-slick-prev {
    left: -25px; 
  }
  .slick-current + div + div .object-cover  {
    display: block !important;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 10px;
    background-color: white;
    border-radius: 0px;
    margin-left: -40px;
  }
`;

export const SliderStyles = () => {
  return (
  
      <style>{customStyles}</style>
  );
};


const customResponsiveStyles = `
  .slick-dots {
    position: sticky !important;
  }
  
  
`;

export const ResponsiveSliderStyles = () => {
  return (
  
      <style>{customResponsiveStyles}</style>
  );
};

