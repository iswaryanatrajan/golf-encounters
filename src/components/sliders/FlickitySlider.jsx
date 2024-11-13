import { useRef } from "react";
import Flickity from "react-flickity-component";
import 'flickity/css/flickity.css';
import "flickity-as-nav-for";
import './styles.css'

export const FlexitySlider = ({ children }) => {
  return (
    <Flickity
      className="carousel-main2  mb-6"
      options={{
        contain: true,
        percentPosition: false,
        initialIndex: 1,
        wrapAround: true,
      
    }}
    >
      {children}
    </Flickity>
  );
};
