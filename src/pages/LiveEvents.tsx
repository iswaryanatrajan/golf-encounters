import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";
import { formatDate } from "../utils/getStartedDate";
import EventMap from "../components/EventMap";
import Pagination from "../components/Pagination";
// import { fetchEvents } from "../utils/fetchEvents";
import Table from "../components/Table";
import { eventContextStore } from "../contexts/eventContext";

interface Event {
  id: string;
  creator:{
    nickName:any
  },
  isFavorite: Boolean;
  comments:[];
  accountHolderName: string;
  eventStartTime: string;
  eventStartDate: string;
  eventName: string;
  eventDetails: string;
  type: string;
  place: string;
  imageUrl: string;
  likes: Array<{
    counter: number;
    userId: string;
    id: number;
  }>;
}

const LiveEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const pageSize = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [localEvents, setLocalEvents] = useState<Event[]>([]);

  const itemsPerPage = 6;
  const currentDate = new Date();

  useEffect(() => {
    const todayEvents = events.filter((event: Event) => {
      return (
        new Date(event.eventStartDate).setHours(0, 0, 0, 0) ===
        currentDate.setHours(0, 0, 0, 0)
      );
    });

    const indexOfLastEvent = currentPage * itemsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - itemsPerPage;
    const newLocalEvents = todayEvents.slice(
      indexOfFirstEvent,
      indexOfLastEvent
    );

    setLocalEvents(newLocalEvents);
  }, [events, currentPage]);

  const todayEvents = events.filter((event: Event) => {
    return event.eventStartDate === formatDate(currentDate);
  });

  const indexOfLastEvent = currentPage * itemsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - itemsPerPage;
  const currentEvents = todayEvents.slice(indexOfFirstEvent, indexOfLastEvent);
  const isPreviousDisabled = currentPage === 1;

  const isNextDisabled =
    indexOfLastEvent >= todayEvents.length ||
    currentPage === Math.ceil(todayEvents.length / itemsPerPage);
  // const totalPages = Math.ceil(todayEvents.length / itemsPerPage);

  const handleLike = async (event: Event) => {
    try {
      const loggedInUser = JSON.parse(localStorage.getItem("id") || "");
      const likes = event?.likes || [];
      const userEvent = likes.find((like: any) => like.userId === loggedInUser);
      const newCounter = userEvent?.counter === 1 ? 0 : 1;

      const response = await axios.post(
        API_ENDPOINTS.ADDLIKE,
        { eventId: event.id, Count: newCounter, userId: loggedInUser },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setEvents((prevEvents) =>
        prevEvents.map((e) =>
          e.id === event.id
            ? {
                ...e,
                likes: userEvent
                  ? likes.map((like: any) =>
                      like.userId === loggedInUser
                        ? { ...like, counter: newCounter }
                        : like
                    )
                  : [
                      ...likes,
                      {
                        counter: newCounter,
                        userId: loggedInUser,
                        id: Math.floor(Math.random() * 10),
                      },
                    ],
              }
            : e
        )
      );
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

 const {handleStartDate, handleEventStatus} = eventContextStore();
 useEffect(() => {
  handleStartDate(currentDate);
  handleEventStatus('live')
}, []);
const { eventsCount, handlePageChange } = eventContextStore();
const totalPages = Math.ceil(eventsCount / 6); 
const onPageChange = (pageNumber:any) => {
  setCurrentPage(pageNumber); 
  handlePageChange(pageNumber); 
};
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <div className="col-span-3">
        <Table events={localEvents} handleLike={handleLike} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          pageSize={6}
          isPreviousDisabled={currentPage === 1}
          isNextDisabled={currentPage === totalPages}
        />
      </div>
      <div>
        {/* <EventMap /> */ }
      </div>
    </div>
  );
};

export default LiveEvents;
