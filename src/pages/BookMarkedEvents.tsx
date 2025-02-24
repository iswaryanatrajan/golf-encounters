import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";
import EventMap from "../components/EventMap";
import Pagination from "../components/Pagination";
import Table from "../components/Table";
import { toast } from "react-toastify";
import { ToastConfig, toastProperties } from "../constants/toast";
import { eventContextStore } from "../contexts/eventContext";
import CreatedEventTable from "../components/CreatedEventTable";

interface Event {
  id: string;
  creator: {
    nickName: any;
  };
  comments:[];
  isFavorite: boolean;
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

const BookMarkedEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [pageSize] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const { eventsCount, handlePageChange, handlePageSize, handleEventStatus } = eventContextStore();
  const totalPages = Math.ceil(eventsCount / 6); 
  const onPageChange = (pageNumber: any) => {
    setCurrentPage(pageNumber); 
    handlePageChange(pageNumber); 
  };

  useEffect(() => {
    handleEventStatus('fav');
  }, []);

  const itemsPerPage = 6;
  const indexOfLastEvent = currentPage * itemsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - itemsPerPage;
  const localEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
  const isPreviousDisabled = currentPage === 1;
  const isNextDisabled = indexOfLastEvent >= events.length;


  return (
    <div className="grid grid-cols-1 gap-6 mx-2 xl:mx-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <div className="col-span-3 ">
      <Table />
      <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          pageSize={pageSize}
          isPreviousDisabled={currentPage === 1}
          isNextDisabled={currentPage === totalPages}
        />
      </div>
      <div className="col-span-3 xl:col-span-1 ">
      {/* <EventMap /> */ }
      </div>
    </div>
  );
};

export default BookMarkedEvents;
