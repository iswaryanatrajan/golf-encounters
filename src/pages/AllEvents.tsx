import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";
import Pagination from "../components/Pagination";
import EventMap from "../components/EventMap";
import Table from "../components/Table";
import { eventContextStore } from "../contexts/eventContext";
import { useNavigate, useParams } from "react-router-dom";

interface Event {
  id: string;
  creator: {
    nickName: any;
  };
  isFavorite: Boolean;
  comments: [];
  accountHolderName: string;
  eventStartTime: string;
  eventStartDate: string;
  eventName: string;
  eventDetails: string;
  type: string;
  place: string;
  imageUrl: string;
  count: any;
}

interface AllEventsProps {
  events: Event[];
  setEvents: any;
  status?: any;
}

const AllEvents: React.FC<AllEventsProps> = ({
  events, 
  setEvents,
  status
}: AllEventsProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [localEvents, setLocalEvents] = useState<any>([]);
  const itemsPerPage = 6;

  useEffect(() => {
    // Set localEvents to all events
    setLocalEvents(events);
  }, [events, currentPage]);

  // Pagination logic
  const indexOfLastEvent = currentPage * itemsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - itemsPerPage;
  const currentEvents = localEvents.slice(indexOfFirstEvent, indexOfLastEvent);
  const router = useNavigate();

  const { eventsCount, handlePageChange,pageSize, handlePageSize,handleStartDate,handleEndDate, handleEventStatus, handleUserId } = eventContextStore();
  const totalPages = Math.ceil(eventsCount / pageSize); 
  let onPageChange = (pageNumber: any) => {
    setCurrentPage(pageNumber); 
    handlePageChange(pageNumber); 
  };
  const params = useParams<{ userId: string }>();
  const userId = params.userId;

  if(userId){
    handleEventStatus("userpage")
    handleUserId(userId);
  }else{
    handleEventStatus('All');
  }
  useEffect(() => {
    handleEventStatus('All');
    handleStartDate('')
    handleEndDate('')
    handlePageChange(1)
   
  }, []);
 
  return (
    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4">
      <div className="col-span-1 lg:col-span-3">
        <Table events={currentEvents} {...status} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          pageSize={pageSize}
          isPreviousDisabled={currentPage === 1}
          isNextDisabled={currentPage === totalPages}
        />
      </div>
      <div className="col-span-1">
        <EventMap />
      </div>
    </div>
  );
};

export default AllEvents;
