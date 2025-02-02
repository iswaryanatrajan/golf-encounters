import React, { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import { MapPinIcon } from "@heroicons/react/24/outline";
import Calendar from "../components/Calender";
import LocationSelectionPopup from "../components/LocationSelectionPopup";
import LiveEvents from "../pages/LiveEvents";
import PastEvents from "../pages/PastEvents";
import UpcomingEvents from "../pages/UpcomingEvents";
import { useTranslation } from "react-i18next";
import AllEvents from "../pages/AllEvents";
import { eventContextStore } from "../contexts/eventContext";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

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

interface TabsProps {
  events: Event[];
  setEvents: any;
  selectedCities?: any;
  setCurrentTabs: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({
  events,
  setEvents,
  selectedCities,
  setCurrentTabs,
}: TabsProps) => {
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();
  const [currentPage, setCurrentPage] = useState(1);
  const [localEvents, setLocalEvents] = useState<any>([]);
  const [currentTab, setCurrentTab] = useState<string>("ALL");
  const { handleEventStatus, clearFilter, handleSearch, handleClear } = eventContextStore();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const itemsPerPage = 6;

  useEffect(() => {
    const indexOfLastEvent = currentPage * itemsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - itemsPerPage;
    const newLocalEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
    setLocalEvents(newLocalEvents);
  }, [events, currentPage]);

  const [isLocationPopupOpen, setLocationPopupOpen] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [filterLocation, setFilterLocation] = useState<any>();
  const categories = {
    ALL: [],
    LIVE: [],
    UPCOMING: [],
    PAST: [],
  };

  const handleLocationSelect = (locations: string | string[]) => {
    const newLocations = Array.isArray(locations) ? locations : [locations];
    setSelectedLocations((prevSelectedLocations) => [
      ...prevSelectedLocations,
      ...newLocations,
    ]);
  };

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
    setCurrentTabs(tab);
  };

  const handleFilterLocation = (data: any) => {
    setFilterLocation(data);
  };

  useEffect(() => {
    // Set localEvents to all events
    handleEventStatus(currentTab);
  }, [currentTab]);

  const clearDates = () => {
    setStartDate(null);
    setEndDate(null);
    setFilterLocation([]);
    setSelectedLocations([]);
    setCurrentTab("ALL");
    handleClear(true);
    setCurrentTabs("ALL");
  };

  return (
    <div className="flex flex-wrap gap-4 ">
      <div className="w-full animate__animated animate__fadeInLeft">
       
        <Tab.Group selectedIndex={Object.keys(categories).indexOf(currentTab)} onChange={(index) => handleTabChange(Object.keys(categories)[index])}>
        <div className="border-2 border-blue-500">  


          <Tab.List className="w-auto md:w-full xl:col-span-12 items-center border-2 border-blue-500  rounded-md ">
            <div className="grid lg:grid-cols-3 md:flex flex-wrap gap-4 xl:gap-4 py-2 lg:flex-nowrap">
            <div className="md:flex  gap-4 xl:gap-4 py-2 lg:flex-nowrap justify-between">
            <button
                type="button"
                onClick={() => setLocationPopupOpen(true)}
                className=" rounded-lg flex justify-center items-center my-2 w-full px-3 xl:px-3 py-3 bg-[#fff] text-blue-500 border-blue-500 border hover:border-2 focus:border-2 cursor-pointer"
              >
                <MapPinIcon className="w-5" aria-hidden="true" />
                {filterLocation && filterLocation.length
                  ? filterLocation.length > 1
                    ? `${filterLocation[0]}...`
                    : filterLocation[0]
                  : t("LOCATION")}
              </button>

              {Object.keys(categories).map((category) => (
               
                <Tab
                  key={category}
                  className={({ selected }) =>
                    classNames(
                      "sm:w-auto md:w-full xl:w-[120px] rounded-md xl:px-3  font-normal  cursor-pointer  my-2",
                      "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 ",
                      selected
                        ? "bg-blue-500 text-white flex items-center justify-center"
                        : "text-blue-500  bg-[#ffff] shadow-lg border-solid border-2 border-blue-500 flex items-center justify-center hover:bg-blue-500 hover:text-[#fff]"
                    )
                  }
                >
                  {category === "LIVE" ? (
                    <div className="flex items-center justify-center text-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="red"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="red"
                        className="w-6 h-6 ml-14 xl:ml-0"
                      >
                        <path
                          strokeLinecap="round"
                          d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                        />
                      </svg>
                      <p className="w-[100px] xl:w-[50px] text-start xl:text-center px-2 xl:px-0">{t(category)}</p>
                    </div>
                  ) : (
                    <p className="w-[100px] xl:w-[100px]">{t(category)}</p>
                  )}
                </Tab>
               
              ))} </div>
              <div className="col-span-2 flex align-end">
                <Calendar startDate={startDate} endDate={endDate} setEndDate={setEndDate} setStartDate={setStartDate} setEvents={setEvents} setFilterLocation={setFilterLocation} />
              </div>
              <div className="col-span-1 flex  py-2">
              <button
                className="bg-[#fff] text-blue-500 border-blue-500 border font-bold px-3 py-3 w-full px-3 ml-5 rounded cursor-pointer
                hover:bg-blue-500 hover:text-[#fff] "
                onClick={clearDates}
              >
                {t("CLEAR")}
              </button>
            </div>
            </div>
          </Tab.List>
          </div>
          {isLocationPopupOpen && (
            <LocationSelectionPopup
              isOpen={isLocationPopupOpen}
              onClose={() => setLocationPopupOpen(false)}
              onLocationSelect={handleLocationSelect}
              selectedCitiesData={selectedCities}
              sendDataToParent={handleFilterLocation}
            />
          )}
          <div>
            <Tab.Panels>
              <Tab.Panel key="ALL">
                <AllEvents events={events} setEvents={setEvents} />
              </Tab.Panel>
              <Tab.Panel key="LIVE">
                <LiveEvents />
              </Tab.Panel>
              <Tab.Panel key="UPCOMING">
                <UpcomingEvents events={events} setEvents={setEvents} />
              </Tab.Panel>
              <Tab.Panel key="PAST">
                <PastEvents events={events} setEvents={setEvents} />
              </Tab.Panel>
            </Tab.Panels>
          </div>
        </Tab.Group>
      </div>
    </div>
  );
};

export default Tabs;
