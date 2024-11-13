import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
interface RatingFilterProps {
    onRatingChange: (rating: number | null) => void;
    reset:any,
    setReset:any
}


const RatingFilter: React.FC<RatingFilterProps> = ({ onRatingChange,reset, setReset }) => {
    const [selectedRating, setSelectedRating] = useState<number | null>(null);
    const { t, i18n } = useTranslation();
    const handleRatingSelect = (rating: number) => {
        const newRating = selectedRating === rating ? null : rating;
        setSelectedRating(newRating);
        onRatingChange(newRating); 
    };
    useEffect(() => {
        if(reset){
           setSelectedRating(null);
           onRatingChange(null);
          setReset(false);
        }
    }, [reset]);
    return (
        <div>
            <h3 className='text-start'>{t("RATING")}</h3>
            <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-2 flex-wrap gap-4">

                {[5, 4, 3, 2, 1].map((rating) => (
                    <button
                        key={rating}
                        className={`${(selectedRating ?? 0) >= rating ? 'bg-yellow-400' : 'bg-gray-200'
                            } p-2 rounded-full transition-colors duration-200`}
                        aria-pressed={(selectedRating ?? 0) >= rating}

                        onClick={() => handleRatingSelect(rating)}
                    >
                        {Array(rating)
                            .fill('★')
                            .map((_, index) => (
                                <span key={index} className="text-white text-sm">★</span>
                            ))}
                    </button>
                ))}
            </div>
        </div>

    );
};

export default RatingFilter;
