import React, { useCallback, useEffect, useState } from 'react';
import { singleEventContextStore } from '../contexts/eventContext';
import EventEditModal from '../components/EventCeremonyModal';
import { FlexitySlider } from './sliders/FlickitySlider';
import { useTranslation } from "react-i18next";
const EventDetailsCeremony: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { t } = useTranslation();
    const { isCreated, eventCeremony, handleLoading, loading } = singleEventContextStore();
    const [singleEventC, setsingleEventC] = useState<any>({});

    const openModal = (id: any) => {
        console.log(isModalOpen, "Open Modal called for event");
        const selectedEvent = eventCeremony?.find((item: any) => item.id === id);


        if (selectedEvent) {
            setIsModalOpen(true);
            setsingleEventC(selectedEvent);
        } else {
            setIsModalOpen(false);

        }
    };

    const closeModal = useCallback((value: any) => {
        setIsModalOpen(value);
    }, [isModalOpen]);

    // Effect to open modal only after the selected event is set
    useEffect(() => {
        if (singleEventC) {
            setIsModalOpen(false); // Open modal when selected event is set
        }
    }, [singleEventC]);

    // Check if eventCeremony is undefined or empty and return null to hide the component
    if (!eventCeremony || eventCeremony.length === 0) {
        return null; // Or return a fallback component/message if preferred
    }

    return (
        <div className="max-w-6xl mx-auto p-4 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">{t("EVENT_MEMORY")}</h2>
            <FlexitySlider>
                {eventCeremony?.map((item: any) => {
                    console.log(item, "Event item details");
                    const parsedArray = JSON.parse(item.ceremonyImages);

                    return (
                        <div key={item.eventId} className="relative">
                            <p className="text-gray-700 mb-4 px-10 capitalize text-sm md:text-base leading-8">
                                {item.eventInfo || "No event info available"}
                            </p>
                            {parsedArray.map((image: any, index: any) => (
                                <div key={index}>
                                    <img
                                        src={image}
                                        alt={`Event image ${index}`}
                                        className="w-full object-cover max-h-[300px] md:max-h-[500px] rounded-lg"
                                    />
                                </div>
                            ))}
                            {isCreated && (
                                <button
                                    onClick={() => openModal(item.id)}
                                    className="px-4 py-2 my-4 bg-blue-500 text-white rounded-md text-sm md:text-base"
                                >
                                   {t("EVENT_EDIT")}
                                </button>
                            )}
                        </div>
                    );
                })}
            </FlexitySlider>


            {isModalOpen && singleEventC && (
                <>
                    {/* Overlay for modal with opacity effect */}
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative">
                            <EventEditModal
                                event={singleEventC}
                                handleLoading={handleLoading}
                                closeModal={closeModal}
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default EventDetailsCeremony;
