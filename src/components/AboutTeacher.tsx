
import { HandThumbUpIcon, MapPinIcon, PhoneArrowUpRightIcon, EnvelopeIcon, StarIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { useTranslation } from "react-i18next";
import { useTeacherContext } from '../contexts/teachersContext';
interface AboutTeacherProps {

}

const AboutTeacher: React.FC<AboutTeacherProps> = ({

}) => {
    const { teacher } = useTeacherContext();

    const { t } = useTranslation();
    return (
            <div className="py-4  rounded  text-red ">
                <div>
                    <div>
                        <h3 className='font-semibold mb-4 text-lg text-[#565656]'>{t("ABOUT_ME")}</h3>
                        <p className='leading-8 text-[#565656]'>{teacher?.aboutMyself} </p></div>
                    <div>

                    </div>
                </div>


            </div>
    );
};

export default AboutTeacher;
