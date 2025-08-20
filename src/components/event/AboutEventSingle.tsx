import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import i18n from "../../locale";
import { singleEventContextStore } from "../../contexts/eventContext";


export const EventMap = () => {
  const { singleEvent } = singleEventContextStore();
  const [mapCenter, setMapCenter] = useState({ lat: 35.6895, lng: 139.6917 }); // Default: Tokyo
  const [markerPosition, setMarkerPosition] = useState(mapCenter);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY || "",
  });

  const geocodeAddress = (address: string) => {
    if (!address || !window.google) return;

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK" && results && results[0].geometry) {
        const location = results[0].geometry.location;
        const latLng = { lat: location.lat(), lng: location.lng() };
        setMapCenter(latLng);
        setMarkerPosition(latLng);
      } else {
        console.error("Geocode was not successful:", status);
      }
    });
  };

  useEffect(() => {
    if (isLoaded && singleEvent?.address) {
      geocodeAddress(singleEvent.address);
    }
  }, [isLoaded, singleEvent?.address]);

  if (!isLoaded) return <div>Loading Map...</div>;
  return(
  <div className="xl:h-[100%]">
        <GoogleMap center={mapCenter} zoom={15} mapContainerStyle={{ width: "100%", height: "100%" }}>
          <Marker position={markerPosition} />
        </GoogleMap>
      </div>
      );
};

export const AboutEvent = ({ totalJoinedMembers }: any) => {
  const { t } = useTranslation();
  const { singleEvent } = singleEventContextStore();

  const [selectedDays, setSelectedDays] = useState<number>(10);
  const [cancellationFeePercentage, setCancellationFeePercentage] = useState<string>("0%");
  const [calculatedCancellationFee, setCalculatedCancellationFee] = useState<string>("¥0");
  /*const [mapCenter, setMapCenter] = useState({ lat: 35.6895, lng: 139.6917 }); // Default: Tokyo
  const [markerPosition, setMarkerPosition] = useState(mapCenter);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY || "",
  });

  const geocodeAddress = (address: string) => {
    if (!address || !window.google) return;

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK" && results && results[0].geometry) {
        const location = results[0].geometry.location;
        const latLng = { lat: location.lat(), lng: location.lng() };
        setMapCenter(latLng);
        setMarkerPosition(latLng);
      } else {
        console.error("Geocode was not successful:", status);
      }
    });
  };

  useEffect(() => {
    if (isLoaded && singleEvent?.address) {
      geocodeAddress(singleEvent.address);
    }
  }, [isLoaded, singleEvent?.address]);*/



  useEffect(() => {
    const percentage = selectedDays === 5 ? 30 : selectedDays === 1 ? 50 : 0;
    setCancellationFeePercentage(`${percentage}%`);

    const totalCancellationFee = Number(singleEvent?.cancellationFee) || 0;
    const calculatedFee = (percentage / 100) * totalCancellationFee;
    setCalculatedCancellationFee(`¥${calculatedFee.toFixed(2)}`);
  }, [selectedDays, singleEvent?.cancellationFee]);

  const getYoutubeEmbedUrl = (url?: string) => {
    if (!url) return undefined;
    const regex = /(?:youtube\.com\/(?:[^\/]+\/[^\/]+\/|[^\/]+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/;
    const match = url.match(regex);
    return match ? `https://www.youtube.com/embed/${match[1]}` : undefined;
  };

  const embedUrl = getYoutubeEmbedUrl(singleEvent?.eventVideoUrl);

  

  return (
    <div className="max-w-6xl mx-auto mt-10 shadow-[0_0_8px_rgba(0,0,0,0.12)] rounded-lg">
      {/* Header */}
      <div className="xl:flex items-center gap-10 justify-center bg-[#17b3a6] rounded-t-lg py-2 px-8">
        <h2 className="leading-[15px] font-semibold text-white text-2xl">{t('ABOUT_EVENT')}</h2>
       {/* <h2 className="text-white text-xl m-0">{singleEvent?.eventName}</h2> */}
      </div>

      {/* Content */}
      <div className="grid grid-cols-1">
        {/* Event Date Section */}
        <div className="text-start  py-4 px-10">
          <div className="text-black text-xl font-bold mb-2">{t('DATE')}</div>
          <div className="py-2 flex flex-wrap items-center gap-4 text-black">
            <div className="text-[#17B3A6] text-[16px] font-bold w-[160px]">{t('EVENT_DATE')}:</div>
            <span className="text-[16px]">{t('START_FROM')} {singleEvent?.eventStartDate} {singleEvent?.eventStartTime} {t('TO')} {singleEvent?.eventEndTime} {singleEvent?.eventEndDate}</span>
          </div>
          <div className="py-2 flex flex-wrap items-center gap-4 text-black">
            <div className="text-[#17B3A6] text-[16px] font-bold w-[160px]">{t('APPLICATION_DEADLINE')}:</div>
            <span className="text-[16px]">{singleEvent?.eventEndDate}</span>
          </div>
        </div>

        {/* Location Section */}
        <div className="py-4 px-10">
          <div className="text-black text-xl font-bold mb-2">{t('EVENT_LOCATION')}</div>
          <div className="py-2 flex flex-wrap items-center gap-4 text-black">
            <div className="text-[#17B3A6] text-[16px] font-bold w-[160px]">{t('LOCATION')}:</div>
            <span className="text-[16px]">{singleEvent?.place}</span>
          </div>
          <div className="py-2 flex flex-wrap items-center gap-4 text-black">
            <div className="text-[#17B3A6] text-[16px] font-bold w-[160px]">{t('EVENT_ADDRESS')}:</div>
            <span className="text-[16px]">{singleEvent?.address}</span>
          </div>
        </div>

        {/* Google Map */}
       {/*  <EventMap />*/}
       {/* <div className="xl:h-[400px]">
          <GoogleMap center={mapCenter} zoom={15} mapContainerStyle={{ width: "100%", height: "100%" }}>
            <Marker position={markerPosition} />
          </GoogleMap>

        </div>*/}

        {/* Event Details Section */}
        <div className=" py-4 px-10">
          <div className="text-black text-xl font-bold mb-2">{t('EVENT_DETAILS')}</div>

          <div className="py-2 flex flex-wrap items-center gap-4 text-black">
            <div className="text-[#17B3A6] text-[16px] font-bold w-[160px]">{t('ABOUT_EVENT')}:</div>
            <span className="text-[16px]">{singleEvent?.eventDetails}</span>
          </div>

          <div className="py-2 flex flex-wrap items-center gap-4 text-black">
            <div className="text-[#17B3A6] text-[16px] font-bold w-[160px]">{t('EVENT_TYPE')}:</div>
            <span className="text-[16px]">{singleEvent?.eventType}</span>
          </div>

          {/* Short Video URL */}
          <div className="py-2 flex flex-wrap items-center gap-4 text-black overflow-x-auto">
            <div className="text-[#17B3A6] text-[16px] font-bold w-[160px]">{t('SHORT_VIDEO')}:</div>
            <span className="text-[16px]">
              {singleEvent?.eventVideoUrl || <span className="text-gray-500">{t('NO_MOVIE_OR_VIDEO_ADDED')}</span>}
            </span>
          </div>

          {/* Embedded YouTube Video */}
          {embedUrl && (
            <div className="w-full max-w-full xl:max-w-3xl mx-auto py-4">
              <iframe
                className="w-full h-[45vw] md:h-[30vw] lg:h-[25vw] xl:h-[450px] "
                src={embedUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
