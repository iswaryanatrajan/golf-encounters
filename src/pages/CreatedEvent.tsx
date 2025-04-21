import React, { useEffect, useState } from 'react';
import { Cog6ToothIcon, EyeDropperIcon, EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import { CreatedEventPagination } from '../components/CreatedEventPagination';
import { API_ENDPOINTS } from '../appConfig';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { deleteEvent, fetchCreatedEvents } from '../utils/fetchEvents';
import { createdEventsStore } from '../contexts/eventContext';
import { useTranslation } from "react-i18next";
import { singleTeamsContextStore } from '../contexts/teamContext';
interface Event {
    id: number;
    eventName: string;
    capacity: number;
    imageUrl: [];
    eventStartTime: string;
    eventStartDate: string;
    eventEndTime: string;
    eventEndDate: string;
    place: string;
    eventDetails: string;
    teamSize: string;
}


const CreatedEvents: React.FC = () => {
    const { t, i18n } = useTranslation();
    const { handleActiveTab, handleCurrentPage, activeTab, currentPage, totalPages, createdEvents, } = createdEventsStore();
    const { handleSingleTeam, totalJoinedMembers, teamMembers, isJoined, isLoading, teams, waitingUsers = [], joinedUsers = [], handleIsLoading } = singleTeamsContextStore()
    const tabs = [t('LIVE'), t('UPCOMING'), t('PAST')];
    const sendTab = ['live', 'upcoming', 'past'];
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [eventToDelete, setEventToDelete] = useState<Event | null>(null);

    // const [events, setEvents] = useState<Event[]>([]);
    // const [activeTab, setActiveTab] = useState<typeof tabs[number]>('past');
    // const [currentPage, setCurrentPage] = useState<number>(1);
    // const [totalPages, setTotalPage] = useState<number>(1);
    const [showPopup, setShowPopup] = useState(false);
    const pageSize = 6;
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const navigate = useNavigate();

    const handleTabClick = (tab: string) => {
        const normalizedTab = tab.toLowerCase();
        handleActiveTab(normalizedTab);
        localStorage.setItem('activeTab', normalizedTab);
    };

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const tabParam = searchParams.get('tab');
        if (tabParam && ['live', 'upcoming', 'past'].includes(tabParam)) {
            handleActiveTab(tabParam);
        }
    }, [handleActiveTab]);
    useEffect(() => {
        const storedTab = localStorage.getItem('activeTab');
        if (storedTab && ['live', 'upcoming', 'past'].includes(storedTab)) {
            handleActiveTab(storedTab);
        }
    }, [handleActiveTab]);

    const handlePageChange = (newPage: number) => {
        handleCurrentPage(newPage);
    };
    const handleCogIconClick = (event: Event) => {
        setSelectedEvent(event);
        setShowPopup(true);
    };

    const handleEditTeam = (id: any, eventName: any, eventStartDate: any, place: any, eventDetails: any, teamSize: any, imageUrl: any) => {
        navigate(`/edit-team-page?id=${id}&eventName=${encodeURIComponent(eventName)}&eventStartDate=${encodeURIComponent(eventStartDate)}&eventLocation=${encodeURIComponent(place)}&eventDetails=${encodeURIComponent(eventDetails)}&teamSize=${encodeURIComponent(teamSize)}&imageUrl=${encodeURIComponent(imageUrl)}`);
        setShowPopup(false);
    };

    const handleCancelEvent = () => {
        setShowPopup(false);
    };
    // function handleCreatedEventsUpdate(updatedEvents) {
    //     // This function should update the state with the new events list
    //     // Replace this with the actual state update logic
    //     setCreatedEvents(updatedEvents); // Assuming setCreatedEvents is your state updater function
    // }
    const { removeDeletedEvent } = createdEventsStore();
    const handleDeleteEvent = async (eventId: any, e: any) => {
        e.preventDefault(); // This should prevent any default action like form submission or link navigation.
        console.log("Deleting event with ID:", eventId);
        try {
            await deleteEvent(eventId);
            removeDeletedEvent(eventId);
            console.log("Event deleted and state updated.");
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };


    const handleDeleteClick = (event: Event) => {
        setEventToDelete(event);
        setShowConfirmPopup(true);
    };


    console.log({ activeTab })
    const handleEditScore = (id: number) => {
        navigate(`/add-score-page/${id}`);
    };
    return (
        <div className='mx-8 xl:max-w-[1400px] xl:mx-auto flex justify-center py-10 px-10  my-10  ' style={{
            boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
        }}>
            <div className="overflow-x-auto w-full">
                <h4>{t("CREATED_EVENTS")}</h4>
                <div className="flex justify-start space-x-2 mb-4">
                    {tabs.map((tab, index) => (<button
                        key={tab}
                        onClick={() => handleTabClick(sendTab[index])}
                        className={`sm:w-auto h-12 xl:h-16 md:w-full xl:w-[150px] rounded-md  xl:px-6 text-base font-normal leading-5 cursor-pointer ${activeTab === sendTab[index] ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-blue-400 hover:text-white'
                            }`}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                    ))}
                </div>
                <table className="min-w-full">
                    <thead>
                        <tr className='bg-[#fffff]'>
                            <th className="px-4  py-2 xl:px-6 xl:py-3 border-b border-gray-200 bg-[#054a51] text-left text-xs font-medium text-white uppercase tracking-wider">
                                {t("EVENT_NAME")}
                            </th>
                            <th className="px-6 py-3 border-b border-gray-200 bg-[#054a51] text-left text-xs font-medium text-white uppercase tracking-wider">
                                {t("TOTAL_PLAYERS")}
                            </th>
                            <th className="px-6 py-3 border-b border-gray-200 bg-[#054a51] text-left text-xs font-medium text-white uppercase tracking-wider">
                                {t("start_time")}
                            </th>
                            <th className="px-6 py-3 border-b border-gray-200 bg-[#054a51] text-left text-xs font-medium text-white uppercase tracking-wider">
                                {t("START_DATE")}
                            </th>
                            <th className="px-6 py-3 border-b border-gray-200 bg-[#054a51] text-left text-xs font-medium text-white uppercase tracking-wider">
                                {t("End_Time")}
                            </th>
                            <th className="px-6 py-3 border-b border-gray-200 bg-[#054a51] text-left text-xs font-medium text-white uppercase tracking-wider">
                                {t("END_DATE")}
                            </th>
                            <th className="px-6 py-3 border-b border-gray-200 bg-[#054a51] text-left text-xs font-medium text-white uppercase tracking-wider">
                                {t("ACTIONS")}
                            </th>
                        </tr>
                    </thead>
                    <tbody className="mt-2">
  {createdEvents?.length === 0 ? (
    <tr className='flex justify-center'>
      <td className="text-center py-4">
        {t("NO_EVENT")}
      </td>
    </tr>
  ) : (
    [...createdEvents]
      .sort((a, b) => new Date(b.eventStartDate).getTime() - new Date(a.eventStartDate).getTime())
      .map((event: any) => (
        <tr
          key={event.id}
          className="bg-white"
          style={{
            boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
          }}
        >
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-[#e4e4e4]">
            {event.eventName}
          </td>
          <td
            className="px-6 py-4 whitespace-nowrap cursor-pointer text-sm text-gray-500 border border-[#e4e4e4]"
            onClick={() => navigate(`/edit-team/${event.id}/#all-members`)}
          >
            {joinedUsers.joinedCount || 0} {t("confirmed")}, {waitingUsers.length || 0} {t("waiting")}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-[#e4e4e4]">
            {event.eventStartTime}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-[#e4e4e4]">
            {event.eventStartDate}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-[#e4e4e4]">
            {event.eventEndTime}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-[#e4e4e4]">
            {event.eventEndDate}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-[#e4e4e4] text-start xl:flex gap-4 ">
            <Link className='flex items-center gap-1 hover:text-[#054a51]' to={`/edit-team/${event.id}`}>
              <EyeIcon className="w-6 h-6 text-[#17b3a6] hover:text-[#054a51]" onClick={() => handleCogIconClick(event)} /> {t("VIEW")}
            </Link>
            <button
              className='bg-transparent flex items-center cursor-pointer gap-1 hover:text-green'
              type="button"
              onClick={() => handleEditScore(event.id)}
            >
              <PencilSquareIcon className='w-6 h-6 text-[green]' /> {t("EDITSCORE")}
            </button>
            <button
              className='bg-transparent flex items-center cursor-pointer gap-1 hover:text-red'
              type="button"
              onClick={() => handleDeleteClick(event)}
            >
              <TrashIcon className='w-6 h-6 text-[red]' /> {t("DELETE")}
            </button>
            <Link className='cursor-pointer flex items-center gap-1 hover:text-green' to={`/edit-event/${event.id}`}>
              <PencilSquareIcon className='w-6 h-6 cursor-pointer' />{t("EDIT")}
            </Link>
          </td>
        </tr>
      ))
  )}
</tbody>

                </table>
                <CreatedEventPagination
                    currentPage={currentPage}
                    pageSize={pageSize}
                    totalEvents={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
            {/* Confirmation Popup */}
            {
                showConfirmPopup && eventToDelete && (
                    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
                        <div className="bg-white p-8 rounded-md">
                            <h2 className="text-lg font-bold mb-4">Are you sure you want to delete this event?</h2>
                            <p>{eventToDelete.eventName}</p>
                            <div className="mt-4">
                                <button
                                    className="px-4 py-2 bg-blue-500 text-white mr-2"
                                    onClick={() => {
                                        if (eventToDelete) {
                                            handleDeleteEvent(eventToDelete.id, { preventDefault: () => { } });
                                        }
                                        setShowConfirmPopup(false);
                                    }}
                                >
                                    Delete
                                </button>
                                <button
                                    className="px-4 py-2 bg-[red] text-white"
                                    onClick={() => setShowConfirmPopup(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

            {
                showPopup && selectedEvent && (
                    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
                        <div className="bg-white p-8 rounded-md">
                            <h2 className="text-lg font-bold mb-4">Event Name <br /> {selectedEvent.eventName}</h2>

                            <button
                                className="px-4 py-2 bg-blue-500 text-white mr-2"
                                onClick={() => {
                                    if (selectedEvent) handleEditTeam(selectedEvent.id, selectedEvent.eventName, selectedEvent.eventStartDate, selectedEvent.place, selectedEvent.eventDetails, selectedEvent.teamSize, selectedEvent.imageUrl);


                                }}
                            >
                                Edit Team
                            </button>

                            <button
                                className="px-4 py-2 bg-[red] text-white"
                                onClick={handleCancelEvent}
                            >
                                Cancel
                            </button>

                        </div>
                    </div>
                )
            }

        </div >

    );
};

export default CreatedEvents;
function handleCreatedEventsUpdate(updatedEvents: any) {
    throw new Error('Function not implemented.');
}

