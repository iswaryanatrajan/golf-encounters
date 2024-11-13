import React, { useRef } from 'react';
import Flickity from "react-flickity-component";
import 'flickity/css/flickity.css';
import { singleEventContextStore } from '../contexts/eventContext';
import { useTranslation } from "react-i18next";

export const FinalEventGallery = ({ children }) => {
    const { t, i18n } = useTranslation();
    const navCarouselRef = useRef();
    const { singleEvent } = singleEventContextStore();

    return (
        <div className="max-w-5xl mx-6 xl:mx-auto mt-10">
            <Flickity
                className="carousel-nav"
                options={{
                    accessibility: false,
                    prevNextButtons: true, // Enable previous/next buttons
                    contain: true,
                    pageDots: false,
                }}
                ref={navCarouselRef}
            >
                {children[1]}
            </Flickity>
        </div>
    );
}
