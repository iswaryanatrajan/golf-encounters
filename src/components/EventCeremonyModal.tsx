import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { updateCeremonyDetails } from '../utils/fetchEvents';
import { useTranslation } from "react-i18next";
interface EventEditModalProps {
    event: any;
    closeModal: any;
    handleLoading: any;
}

const EventEditModal: React.FC<EventEditModalProps> = ({ event, closeModal, handleLoading }) => {

    const { t } = useTranslation();
    const [formdata, setFormdata] = useState<any>({
        removedMediaUrls: "",
        eventId: "",
        id: "",
        eventInfo: "",
        mediaFiles: ""
    });
    const [message, setMessage] = useState<string>('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files) {
            setFormdata((prev: any) => ({
                ...prev,
                mediaFiles: files
            }));
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        updateCeremonyDetails(formdata, handleLoading, closeModal);
    };

    const handleDelete = async (e: React.FormEvent, removedMediaUrls: any) => {
        setFormdata((prev: any) => ({
            ...prev,
            removedMediaUrls
        }));
        if (formdata.removedMediaUrls) {
            updateCeremonyDetails(formdata, handleLoading, closeModal);
        }
    };

    useEffect(() => {
        if (event) {
            setFormdata({
                eventId: event.eventId || "",
                eventInfo: event.eventInfo || "",
                mediaFiles: "",
                id: event.id || "",
                removedMediaUrls: ''
            });
        }
    }, [event]);

    const handleInput = (e: any) => {
        const { name, value } = e.target;

        setFormdata((prev: any) => ({
            ...prev,
            eventInfo: value
        }));
    };

    if (!event) {
        return null; // Or a loading spinner/message, if needed
    }

    return (

        <div className=" flex items-center justify-center p-4 ">
            <div className="w-full max-w-xl p-6 bg-white rounded-lg  relative">
                <div className='w-6 h-6 flex items-center justify-center rounded-full bg-blue-500 cursor-pointer absolute top-2 right-2' onClick={() => {
                    closeModal(false);
                }}>
                    <button

                        className=" bg-transparent text-white cursor-pointer"
                    >
                        X
                    </button>
                </div>

                <h2 className="text-xl font-bold mb-4"> {t("EVENT_EDIT")}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="eventInfo" className="block text-gray-700">{t("EVENT_INFO")}</label>
                        <textarea
                            id="eventInfo"
                            value={formdata.eventInfo}
                            name="eventInfo"
                            onChange={handleInput}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="fileInput" className="block text-gray-700">{t("UPLOAD_FILES")}:</label>
                        <input
                            id="fileInput"
                            type="file"
                            multiple
                            onChange={handleFileChange}
                            className="mt-1 block"
                        />
                    </div>

                    <div className="mb-4">
                        <p className="text-gray-700">Current Images:</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {event.ceremonyImages && JSON.parse(event.ceremonyImages).map((image: string, index: number) => (
                                <div className="relative">
                                    <img src={image} alt={`Event image ${index + 1}`} className="w-32 h-32 object-cover rounded-lg" />
                                    <button
                                        onClick={(e) => handleDelete(e, image)}
                                        className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 rounded-full"
                                    >
                                        X
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                        {t("UPDATE_CEREMONT")}
                    </button>
                    {message && <p className="mt-4 text-green-500">{message}</p>}
                </form>
            </div>
        </div>

    );
};

export default EventEditModal;
