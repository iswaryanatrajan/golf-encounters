import React from 'react';
import HomeCard from './HomeCard'; // Ensure the path is correct based on your project structure
import Steps from "./Steps";
import { useTranslation } from "react-i18next";
const HomeCardSec: React.FC = () => {
  const { t, i18n } = useTranslation();
  const offerings = [
    {
        title: t("OFFERING_1_TITLE"),
        description: t("OFFERING_1_DESCRIPTION")
    },
    {
        title: t("OFFERING_2_TITLE"),
        description: t("OFFERING_2_DESCRIPTION")
    },
    {
        title: t("OFFERING_3_TITLE"),
        description: t("OFFERING_3_DESCRIPTION")
    },
    {
        title: t("OFFERING_4_TITLE"),
        description: t("OFFERING_4_DESCRIPTION")
    }
];

const additionalOfferings = [
    {
        title: t("ADDITIONAL_OFFERING_1_TITLE"),
        description: t("ADDITIONAL_OFFERING_1_DESCRIPTION")
    },
    {
        title: t("ADDITIONAL_OFFERING_2_TITLE"),
        description: t("ADDITIONAL_OFFERING_2_DESCRIPTION")
    },
    {
        title: t("ADDITIONAL_OFFERING_3_TITLE"),
        description: t("ADDITIONAL_OFFERING_3_DESCRIPTION")
    }
];

    return (
        <div className=" mx-auto px-10 py-10">
            <h2 className="text-center text-[#17B3A6] text-[32px] font-medium my-8">{t("THIS_GOLF")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
                {offerings.map((offering, index) => (
                    <HomeCard key={index} title={offering.title} description={offering.description} />
                ))}
            </div>
            <Steps />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mt-8">
                {additionalOfferings.map((offering, index) => (
                    <HomeCard key={index} title={offering.title} description={offering.description} />
                ))}
            </div>
        </div>
    );
};

export default HomeCardSec;
