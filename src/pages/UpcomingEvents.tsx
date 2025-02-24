import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import EventMap from "../components/EventMap";
import Pagination from "../components/Pagination";
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
  count: any;
}
interface TabsProps {
  events: Event[];
  setEvents: any;
}
const UpcomingEvents:  React.FC<TabsProps> = ({ events, setEvents }: TabsProps) => {
  const [UpcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const { handleEventStatus, handleStartDate} = eventContextStore();

  useEffect(() => {
    handleEventStatus('upcoming');
    handleStartDate('')
  }, [events]);

  const totalEvents = UpcomingEvents.length;
  const totalPages = Math.ceil(totalEvents / pageSize);
  const isPreviousDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalEvents);

  const visibleEvents = UpcomingEvents.slice(startIndex, endIndex);
 const handleLike = (eventId: string) => {
  console.log(`Liked event with ID: ${eventId}`);
};
useEffect(() => {
  handleEventStatus('upcomming')
}, []);
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <div className="col-span-3">
        <div className="animate__animated animate__fadeInLeft">
        <Table events={visibleEvents} handleLike={handleLike}  />
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page: any) => setCurrentPage(page)}
          pageSize={pageSize}
          isPreviousDisabled={isPreviousDisabled}
          isNextDisabled={isNextDisabled}
        />
      </div>

      <div>
         {/* <EventMap /> */ }
      </div>
    </div>
  );
};
export default UpcomingEvents;
