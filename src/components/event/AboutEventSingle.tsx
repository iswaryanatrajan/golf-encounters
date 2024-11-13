import { useTranslation } from "react-i18next";
import { singleEventContextStore } from "../../contexts/eventContext";
import { useEffect, useState } from "react";
import i18n from "../../locale";

export const AboutEvent = ({ totalJoinedMembers }: any) => {
  const { t } = useTranslation();
  const { singleEvent } = singleEventContextStore();
  const [selectedDays, setSelectedDays] = useState<number>(10);
  const [cancellationFeePercentage, setCancellationFeePercentage] = useState<string>("0%");
  const [calculatedCancellationFee, setCalculatedCancellationFee] = useState<string>("¥0");
  useEffect(() => {
    let percentage = 0;
    if (selectedDays === 5) {
      percentage = 30;
    } else if (selectedDays === 1) {
      percentage = 50;
    }
    setCancellationFeePercentage(`${percentage}%`);

    // Check if singleEvent?.cancellationFee is null, NaN, or undefined; if so, default to 0
    const totalCancellationFee = Number(singleEvent?.cancellationFee);
    const validTotalCancellationFee = !totalCancellationFee || isNaN(totalCancellationFee) ? 0 : totalCancellationFee;

    const calculatedFee = (percentage / 100) * validTotalCancellationFee;
    setCalculatedCancellationFee(`¥${calculatedFee.toFixed(2)}`);
  }, [selectedDays, singleEvent?.cancellationFee]);
  const getYoutubeEmbedUrl = (url: string | undefined): string | undefined => {
    if (!url) return undefined;
    const regex = /(?:youtube\.com\/(?:[^\/]+\/[^\/]+\/|[^\/]+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/;
    const match = url.match(regex);
    return match ? `https://www.youtube.com/embed/${match[1]}` : undefined;
  };

  const embedUrl = getYoutubeEmbedUrl(singleEvent?.eventVideoUrl);
  const isEnglish = i18n.language === "en";
  return <div className="max-w-6xl mx-6 xl:mx-auto    mt-10 shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] rounded-lg">
    <div className="xl:flex items-center gap-10 justify-center bg-[#17b3a6] rounded-t-lg py-4 px-8 xl:p-0">

      <h2 className="leading-[20px] xl:leading-[32px] font-semibold text-white text-xl  xl:text-[45px]"> {t('ABOUT_EVENT')}</h2>
      <h2 className=" text-white text-xl m-0 xl:text-[31px]">{singleEvent?.eventName}</h2>
    </div>

    <div className="grid grid-cols-1 gap-0 ">
      <div className="text-start items-center gap-10  bg-[#D7FBF8] py-4 px-10">
        <div className="text-black text-[24px] font-bold basis-4"> {t('DATE')}</div>
        <p className="py-2 ml-0  capitalize text-black xl:flex items-center gap-4"><h2 className="text-[#17B3A6] text-[20px] font-bold ">{t('EVENT_DATE')}:</h2> <span className={`xl:text-[22px]  text-[#000000] ${isEnglish ? "xl:ml-[120px]" : "xl:ml-[150px]"}  `}>{t('START_FROM')} {singleEvent?.eventStartDate}  {singleEvent?.eventStartTime} <span className="ml-8">{t('TO')} </span>   <span className="text-black">{singleEvent?.
          eventEndTime
        }  {singleEvent?.eventEndDate}</span></span> </p>
        <p className="py-2 ml-0  text-lg capitalize text-black xl:flex items-center gap-4"><h2 className="text-[#17B3A6] text-[20px]  font-bold">{t('APPLICATION_DEADLINE')} :</h2> <span className={`xl:text-[22px]  text-[#000000] ${isEnglish ? "xl:ml-[10px]" : "xl:ml-[130px]"}  `}>{singleEvent?.eventEndDate}</span> </p>
      </div>
      <div className=" items-center gap-10  py-4 px-10 ">
        <div className=" text-[24px] font-bold basis-4 text-black"> {t('EVENT_LOCATION')}</div>
        <p className="py-2 ml-0  text-lg  capitalize text-black xl:flex items-center gap-4"><h2 className="text-[#17B3A6] text-[20px] font-bold">{t('LOCATION')} :</h2> <span className={`xl:text-[22px]  text-[#000000] ${isEnglish ? "xl:ml-[140px]" : "xl:ml-[170px]"}  `}>{singleEvent?.place}</span></p>
        <div className="flex items-center gap-10  ">

          <p className="py-2 ml-0  xl:text-[22px]  capitalize rounded-sm text-black xl:flex items-center gap-4 "><h2 className={`text-[#17B3A6] text-[20px] font-bold  ${isEnglish ? "xl:w-auto" : "xl:w-[full]"}`}>{t('EVENT_ADDRESS')} :</h2 ><p className={`xl:text-[22px]  text-[#000000] ${isEnglish ? "xl:ml-[70px]" : "xl:ml-[35px]"}  `}></p>{singleEvent?.address}</p>
        </div>

      </div>
      <div className="xl:h-[400px] ">
        <iframe
          className="col-span-4 sm:col-span-4 xl:h-full"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8181116.269949623!2d130.64039243803072!3d36.56179855912495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34674e0fd77f192f%3A0xf54275d47c665244!2sJapan!5e0!3m2!1sen!2s!4v1700468556527!5m2!1sen!2s"
          width="100%"
          height="350px"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>


      </div>
      <div className=" items-center   bg-[#D7FBF8] py-4 px-10">
        <div className="text-black text-[24px] font-bold basis-4 "> {t('EVENT_DETAILS')}</div>
        <p className="py-2 ml-0   capitalize text-black xl:flex items-center gap-4 xl:text-[22px] "><span className={`text-[#17B3A6] text-[20px] font-bold  ${isEnglish ? "xl:w-auto" : "xl:w-[full]"}`}>{t('ABOUT_EVENT')} :</span><p className={`xl:text-[22px]  text-[#000000] ${isEnglish ? "xl:ml-[30px]" : "xl:ml-[40px]"}  `}></p> {singleEvent?.eventDetails}</p>
        <div className="flex items-center gap-10  ">

          <p className="py-2 ml-0  text-lg capitalize rounded-sm text-black xl:flex items-center gap-4 "><h2 className={`text-[#17B3A6] text-[20px] font-bold  ${isEnglish ? "xl:w-auto" : "xl:w-[full]"}`}>{t('EVENT_TYPE')}  :</h2> <span className={`xl:text-[22px]  text-[#000000] ${isEnglish ? "xl:ml-[100px]" : "xl:ml-[75px]"}  `}>{singleEvent?.
            eventType}</span> </p>
        </div>
        <div className="flex items-center gap-10 w-full overflow-x-scroll xl:overflow-x-auto">
          <p className="py-2 ml-0 text-lg capitalize rounded-sm text-black xl:flex items-center gap-4">
            <span className={`text-[#17B3A6] text-[20px] font-bold ${isEnglish ? "xl:w-auto" : "xl:w-[full]"}`}>
              {t('SHORT_VIDEO')}
            </span>
            <p className={`xl:text-[22px] xl:overflow-x-auto ${isEnglish ? "xl:ml-[110px]" : "xl:ml-[134px]"}`}>
              {singleEvent?.eventVideoUrl ? (
                singleEvent?.eventVideoUrl
              ) : (
                <span className="text-gray-500">{t('NO_MOVIE_OR_VIDEO_ADDED')}</span>
              )}
            </p>
          </p>
        </div>

        <div className="flex items-center gap-10 w-full overflow-x-hidden xl:overflow-x-auto">
          <p className="py-2 ml-0  text-lg capitalize rounded-sm text-black xl:flex items-center gap-4 w-full">
            {embedUrl ? (
              <div className="w-full max-w-full sm:max-w-full md:max-w-full lg:max-w-full xl:max-w-3xl">
                <iframe
                  className="w-full  h-[45vw] md:h-[30vw] lg:h-[25vw] xl:h-[450px] max-h-[450px]"
                  src={embedUrl}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              ""
              // <span className="xl:text-[22px]">{singleEvent?.eventVideoUrl}</span>
            )}
          </p>
        </div>
      </div>



      {/* <div className="flex items-center gap-10  ">

        <p className="py-2 ml-0  text-lg capitalize rounded-sm text-black flex items-center gap-4"><span className="text-[#17B3A6] text-[20px]  font-bold">{t('JOINED_MEMBER')} :</span> <span className="xl:text-[22px]  ">{totalJoinedMembers}</span> </p>
      </div> */}
    </div>

    <div className="items-center gap-10 py-4 px-10">
      <div className="text-black text-[24px] font-bold basis-4">{t('PRICE')}</div>
      <p className="py-2 ml-0 text-lg capitalize text-black xl:flex flex-col xl:flex-row items-center gap-4">
        <h2 className="text-[#17B3A6] text-[20px] font-bold">{t('PARTICIPATION_FEE')} :</h2>
        <span className={`xl:text-[22px]  text-[#000000] ${isEnglish ? "xl:ml-[30px]" : "xl:ml-[160px]"}  `}>{singleEvent?.participationFee}</span>
      </p>
    </div>
    <div className="items-center bg-[#D7FBF8] gap-10 py-4 px-10">
      <div className="text-black text-[24px] font-bold basis-4">{t('PRICE')}</div>
      <p className="py-2 ml-0 text-lg capitalize text-black xl:flex flex-col xl:flex-row items-center gap-4">
        <h2 className={`text-[#17B3A6] text-[20px] font-bold  ${isEnglish ? "xl:w-auto" : "xl:w-[15%]"}`}>{t('CANCELLATION')} :</h2>
        <span className={`xl:text-[22px]  text-[#000000] ${isEnglish ? "xl:ml-[30px]" : "xl:ml-[85px]"}  `}>{singleEvent?.cancellationFee}</span>
      </p>
    </div>

  </div>
}