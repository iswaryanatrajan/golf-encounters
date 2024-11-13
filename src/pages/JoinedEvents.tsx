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

const JoinedEvents: React.FC = () => {
  const [pageSize] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);





  const { eventsCount, handlePageSize, handleEventStatus,events } = eventContextStore();
  const totalPages = Math.ceil(eventsCount / 6); 
  const onPageChange = (pageNumber: any) => {

  };

  useEffect(() => {
    handleEventStatus('joined');
  }, []);

  
  return (
    <div className="grid grid-cols-1 gap-6 mx-4 xl:mx-40 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <div className="col-span-12 ">
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
   
    
    </div>
  );
};

export default JoinedEvents;
