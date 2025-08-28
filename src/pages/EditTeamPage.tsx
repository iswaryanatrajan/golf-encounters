import { FunctionComponent, useEffect, useRef, useState } from "react";
import Player from "../components/Player";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { API_ENDPOINTS } from "../appConfig";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { fetchTeams } from "../utils/fetchTeams";
import { approveEvent, fetchSingleEvent } from "../utils/fetchEvents";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FinalEventGallery } from "../components/FinalEventGallery";
import { FinalSlider } from "../components/sliders/FinalEventSlider";
import EditTeamScore from "../components/EditTeamScore";
import { singleEventContextStore } from "../contexts/eventContext";
import { singleTeamsContextStore } from "../contexts/teamContext";
import CommentModel from "../components/CommentModel";
import { ResponsiveSliderStyles, SliderStyles } from "../components/sliderStyles";
import NotFound from "./404";
import { AboutEvent } from "../components/event/AboutEventSingle";
import { EventMap } from "../components/event/AboutEventSingle";
import { CheckBadgeIcon, XMarkIcon } from "@heroicons/react/24/solid";
import EventDetails from "../components/event/EventDetails";
import AllMembers from "../components/AllMembers";
import CeremonyModal from "../components/CeremonyModal";
import { useLocation } from 'react-router-dom';
interface Team {
  id: number;
  name: string;
  imageUrl?: string;
  members: Members[];
}
interface Members {
  imageUrl?: string | undefined;
  nickName: string;
  userId: string;
  teamId: any;
}
interface SingleEvent {
  id: string;
  userId:any;
  creator: {
    nickName: string;
  };
  isFavorite: Boolean;
  comments: [];
  accountHolderName: string;
  eventStartTime: string;
  eventStartDate: string;
  eventEndTime: string;
  eventEndDate: string;
  eventDeadlineDate: string;
  eventName: string;
  eventDetails: string;
  address: string;
  eventType: string;
  place: string;
  imageUrl: [0];
  count: any;
  teamSize: any;
  capacity: any;
  scoringType: string;
  shotsPerHoles: any;
  selectedHoles: any;
  participationFee: any
  cancellationFee: any

}

const EditTeamPage: FunctionComponent = () => {
  const { hash } = useLocation();
  const params = useParams<{ id?: string }>();
  const teamId = params.id;
  const { isCreated, singleEvent } = singleEventContextStore();
  const [ceremonyModel, setCeremonyModel] = useState(false)
  console.log(singleEvent, 'sE')
  const { handleSingleTeam, totalJoinedMembers, teamMembers, isJoined, isLoading, teams, waitingUsers, joinedUsers = [], handleIsLoading } = singleTeamsContextStore()

  const router = useNavigate();
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();


  //   useEffect(() => {
  //     if (hash) {
  //         const element = document.querySelector(hash);
  //         if (element) {
  //             element.scrollIntoView({ behavior: 'smooth' });
  //         }
  //     }
  // }, [hash]);
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element && !isLoading) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.hash, isLoading]);
  function CustomNextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, position: 'absolute', right: '125px', zIndex: '1' }}
        onClick={onClick}
      />
    );
  }

  function CustomPrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, position: 'absolute', left: '180px', zIndex: '1' }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    dots: false,
    infinite: true,
    centerMode: true,
    centerPadding: '0px',
    className: "center",
    slidesToShow: 3,
    speed: 500,
    afterChange: (index: any) => {
      setCenterIndex(index);
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          centerMode: false,
          infinite: true,
          dots: true,
          nextArrow: <></>,
          prevArrow: <></>,
        }
      },
    ]
  };


  const [open, setOpen] = useState(false);
  const [selectedPlayerNickname, setSelectedPlayerNickname] = useState("");
  const [selectedPlayerImageUrl, setselectedPlayerImageUrl] = useState("");
  const [selectedTeamName, setSelectedTeamName] = useState("");
  const [currentTeamSize, setCurrentTeamSize] = useState(singleEvent?.teamSize);
  const [capacity, setCapacity] = useState(singleEvent?.capacity);
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<any>([]);
  const [showPlayerList, setShowPlayerList] = useState(false);
  const [showWideSlider, setShowWideSlider] = useState(window.innerWidth > 1080);
  const navigate = useNavigate();
  const playerList = [
    { name: "John Doe" },
    { name: "Jane Smith" },
    { name: "Mike Johnson" },
  ];

  const teamCapacity = singleEvent?.capacity;

  const updateTeamLocal = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ selectedPlayerNickname, selectedTeamName, selectedTeamId, selectedUserId, teamCapacity }, "updateTeamLocal");
   /* handleSingleTeam((prev: Team[]) => {
      let newState = [...prev].map((team: any) => {
        console.log({ team });
        if (team.id == selectedTeamId && team.members?.length < teamCapacity) {
          return {
            ...team,
            members: [
              ...team.members,
              {
                nickName: selectedPlayerNickname,
                teamId: selectedTeamId,
                userId: selectedUserId,
              },
            ],
          
          };
          
        } else {
          return {
            ...team,
            members: team.members.filter(
              (member: any) => member.userId !== selectedUserId
            ),
          };
        }
      });

      return [...newState];
    });*/
 let updatedTeams: Team[] = [];
 handleSingleTeam((prev: Team[]) => {
    updatedTeams = prev.map((team: Team) => {
      const filteredMembers = team.members.filter(
        (member) => member.userId !== selectedUserId
      );
      console.log({ filteredMembers }, "filteredMembers",team.id,selectedTeamId, team.id === selectedTeamId, filteredMembers.length < teamCapacity, "teamCapacity", teamCapacity);
      // Only add if not already present
    const alreadyInTeam = filteredMembers.some(
      (member) => member.userId === selectedUserId
    );
      if (team.id === selectedTeamId && filteredMembers.length < teamCapacity && !alreadyInTeam) {
        console.log("Adding member to team:", team.name);
        return {
          ...team,
          members: [
            ...filteredMembers,
            {
              nickName: selectedPlayerNickname,
              teamId: selectedTeamId,
              userId: selectedUserId,
            },
          ],
        };
      }

      return { ...team, members: filteredMembers };
    });

    return updatedTeams;
  });

  // Persist this move only
  try {
    const formDataObj = {
      eventId: singleEvent?.id,
      teams: updatedTeams,
      teamSize: singleEvent?.teamSize,
      capacity: capacity === undefined ? totalCapacity : Number(capacity),
    };
    console.log("formDataObj", formDataObj);

    const response = await axios.put(
      API_ENDPOINTS.UPDATETEAMMEMBER,
      JSON.stringify(formDataObj),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.status !== 200) throw new Error("Failed to update");

    toast.success("Player moved successfully");
  } catch (error) {
    console.error("Error moving player:", error);
    toast.error("Failed to move player in backend");
  }

  };
  const [centerIndex, setCenterIndex] = useState(0);
  console.log(centerIndex, "cc")
  const updateTeams = async (event: any) => {
    event.preventDefault();

    // Check if the team size is being reduced
    if (currentTeamSize < teams.length) {
      // Check if there are any members in the teams that will be removed
      for (let i = currentTeamSize; i < teams.length; i++) {
        const team = teams[i];
        if (team.members && team.members.length > 0) {
          // Show error message if there are members in the team that will be removed
          toast.error(`${team.name} has members. Please move or remove the members before reducing the team size.`);
          return; // Stop the update process
        }
      }
    }

    const uId = selectedUserId.toString();
    const initialTeamSize = singleEvent?.teamSize;
    const initialCapacity = singleEvent?.capacity;
    const initialMembers = teamMembers;

    const hasCapacityChanged = capacity !== initialCapacity;
    const hasTeamSizeChanged = currentTeamSize !== initialTeamSize;
    const hasMembersChanged =
      JSON.stringify(teamMembers) !== JSON.stringify(initialMembers);

    if (!hasCapacityChanged && !hasTeamSizeChanged && !hasMembersChanged) {
      toast.error(t("MAKE_CHANGES"));
      return;
    }

    const formDataObj = {
      eventId: singleEvent?.id,
      teamSize: currentTeamSize == undefined ? singleEvent?.teamSize : Number(currentTeamSize),
      capacity: capacity === undefined ? totalCapacity : Number(capacity),
      teams,
    };
    console.log("formDataObj in updateTeams", formDataObj);

    try {
      const response = await axios.put(
        API_ENDPOINTS.UPDATETEAMMEMBER,
        JSON.stringify(formDataObj),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      toast.success(t('MEMBER_UPDATED_SUCCESS'));
      window.location.reload();
    } catch (error) {
      console.error("Error updating team:", error);
      toast.error("Please make changes before updating.");
    }
  };

  let previousIndex = centerIndex - 1;
  let nextIndex = centerIndex + 2;

  useEffect(() => {
    localStorage.setItem("showEditTeamDialog", open.toString());
  }, [open]);
  const [opens, setEditOpen] = useState(false);
  /*useEffect(() => {
    localStorage.setItem("showEditTeamDialog", opens.toString());
  }, [open]);*/
  useEffect(() => {
    const handleResize = () => {
      setShowWideSlider(window.innerWidth > 1080);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const cancelButtonRef = useRef(null);
  const totalCapacity = singleEvent?.capacity * singleEvent?.teamSize;
  const handleOpenPlayerList = () => {
    setShowPlayerList(true);
  };

  const generateTableHeaders = () => {
    const headers = [];
    for (let i = 1; i <= teamCapacity; i++) {
      headers.push(
        <th key={i} className=" py-3 leading-[10.25px] font-medium text-[13px] xl:text-[15px]">
          {i}
        </th>
      );
    }
    return headers;
  };
  if (isLoading) {
    return <div className="flex justify-center items-center h-[100vh]">
      <div>
        <img className="w-10 h-10 animate__animated animate__bounce animate__infinite " src="/img/golfball.jpg" alt="" />
        <p>loading...</p>
      </div>

    </div>;
  }
  const handleNavigateHome = () => {
    navigate('/add-score-page/' + singleEvent?.id);
  };

  const handleApprove = (e: any, id: any) => {
    e.preventDefault();
    handleIsLoading(true);
    const obj = {
      userId: id,
      eventId: singleEvent?.id,
    }
    approveEvent(obj);
    toast.success(t("UPDATED"));
    navigate(`/edit-team/${singleEvent?.id}`);

  }
  const currentDate = new Date();
  const endDate = new Date(singleEvent?.eventEndDate);
  const deadlineData = new Date(singleEvent?.eventDeadlineDate);
  const isEventOver = currentDate > endDate;
  const isDeadlineOver = currentDate > deadlineData;
  console.log({ teams }, "teams")
  return (
    <>
      {showWideSlider ? <SliderStyles /> : <ResponsiveSliderStyles />}
      {singleEvent?.id ?
        <div className="py-10 mx-4 ">
          <div className=" xl:max-w-[1200px] mx-auto  text-left text-lg font-poppins  ">
            <div className="flex justify-around   mx-auto  rounded-lg bg-white shadow-[0_0_8px_rgba(0,0,0,0.12)] p-5  text-left text-xl text-white font-body-b2">
              <div className="xl:flex justify-around w-full">
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-[24px]">
                  <img
                    className="w-[123px] h-[123px] object-cover rounded-[100%] text-center md:text-start"
                    alt="Event"
                    src={singleEvent?.imageUrl ? singleEvent?.imageUrl[0] : "/img/BG-GOLF.jpg"}
                  />

                  <div className="flex flex-col items-start justify-center gap-4">
                    <div className="text-white bg-[#17b3a6]  rounded-lg">
                      <p className="p-1 px-2 m-0 uppercase">{singleEvent?.eventType}</p>
                    </div>
                    <div className="uppercase relative text-2xl md:text-2xl tracking-[-0.17px] lg:text-16xl leading-[40px] font-semibold text-black">
                      {singleEvent?.eventName}
                    </div>
                    <div className="flex flex-row items-center justify-start gap-2 text-base md:text-xl text-darkslategray-300">
                      <img
                        className="w-[22.5px] h-6"
                        alt=""
                        src="/img/group-1000008655.svg"
                      />
                      <div className="relative  leading-[18px]">
                        {singleEvent?.eventStartDate || "Default Date"}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 md:text-5xl lg:text-darkgray-400">
                  <img
                    className="w-[23px] h-[27.9px]"
                    alt=""
                    src="/img/group-1000008649.svg"
                  />
                  <div className="flex flex-col items-start justify-center gap-4">
                    <div className="relative text-base md:text-xl leading-[18px] text-black mt-4 xl:mt-0">
                      {singleEvent?.place || t("NO_LOCATION")}
                    </div>
                    <div className="relative text-base md:text-xl  leading-[18px] text-lightseagreen-200">
                      {singleEvent?.address || t("NO_ADDRESS")}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          <div className="grid lg:grid-cols-2 gap-4 items-center">
            <div>
            <div id="my-slider-container" className="mx-auto max-w-2xl slider-container">
             {/* {singleEvent && singleEvent.imageUrl?.length > 1 && (
                <Slider {...settings}>
                  {singleEvent.imageUrl.slice(0, 3).map((item: any, index: any) => {

                    console.log(index, index === nextIndex, "next");

                    return <div key={index} className="w-full">
                      <img
                        className={`w-full h-[200px] object-cover  rounded-lg ${index === centerIndex ? "slick-center" : ""}`}
                        src={item || ""}
                        alt={`Event Image ${index + 1}`}
                        style={{
                          boxShadow: index === centerIndex ? '0px 0px 10px rgba(0, 0, 0, 0.25)' : 'none',
                          backgroundColor: index === centerIndex ? 'white' : 'transparent',
                          borderRadius: index === centerIndex + 1 ? '10px' : '5px',
                          display: index === previousIndex || index === nextIndex ? 'none' : 'block',

                        }}
                      />
                    </div>
                  }

                  )}
                </Slider> 
              )} */}
                 <FinalEventGallery >
                          {singleEvent.imageUrl?.map((item: any) => {
                            return <FinalSlider item={item} type="top" />;
                          })}
                          {singleEvent.imageUrl?.map((item: any) => {
                            return <FinalSlider item={item} />;
                          })}
              
                        </FinalEventGallery>
            </div>
            <div className="xl:h-[250px]"><EventMap /></div>
            <div className="xl:flex justify-between ">
                {(!isCreated && !isJoined && !isDeadlineOver) && (
                  <>
                    <div className="flex justify-start text-center ">
                      <button
                        className="py-3 text-md  lg:py-3 w-full mx-auto px-3 xl:mx-auto mt-5  font-bold  text-white uppercase bg-blue-500 rounded-md cursor-pointer hover:bg-blue-700"
                        onClick={() => router(`/pay-now/${singleEvent?.id}`)}
                      >
                        {t('JOIN_NOW')}
                      </button>
                    </div>

                  </>
                )}
                <Link to="/message-page">
                  <div className="flex items-end gap-40">
                    {(!isCreated) &&  (
                      <>
                        <div className=" flex justify-start text-center w-full">
                          <a href="#"
                            className="py-3 text-md lg:py-1 w-full mx-5 px-3 xl:mx-0 mt-5  text-black items-center gap-1   rounded-md cursor-pointer inline-flex text-blue-700"
                            onClick={(e) => {
                              e.preventDefault();
                              router('/message-page/' + singleEvent?.creatorId);
                            }}
                          >
                           <span className=""> {t("CONTACT")}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#3B82F6" className="w-8 h-8">
  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
</svg>

  </a>
                      
                        </div>

                      </>
                    )}
                  </div>
                </Link>
              </div>
            </div>
            <div className="mt-5">
                <AboutEvent totalJoinedMembers={totalJoinedMembers} />
              </div>
          </div>
            {/* <EventDetails /> */}


            <div className="max-w-5xl mx-auto mt-5">
              {/* {isCreated &&
                <div className="mr-20 flex justify-end">
                  <button onClick={() => {
                    setCeremonyModel(true)

                  }} className="cursor-pointer p-2 bg-[#17b3a6] rounded-md text-white text-lg">{t('ADD_EVENT_DETEIALS')}</button>
                </div>
              } */}
              {
                ceremonyModel && <CeremonyModal onClose={setCeremonyModel} eventId={singleEvent.id} />
              }
              

              <div className="" id="all-members">
                <AllMembers />
              </div>
              {/* <div className="max-w-5xl mx-6 xl:mx-auto py-4 px-10 mt-10 shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] rounded-lg">
                <div className="flex gap-2 ">
                  <div>
                    <img src="/img/golfplyr.png" alt="" width="40px" />
                    <b className="text-xl lg:text-17xl text-darkslateblue-300 leading-[18px] [text-shadow:0px_7px_4px_#ccf2fe]">
                      {t("MEMBERS")}
                    </b>
                  </div>
                </div>
                <div className="">

                  <div className=" ">
                    <div className="bg-[#0d7168] text-white rounded-sm ">
                      <h4 className="p-2">{t("Confirmed Members")}</h4>
                    </div>
                    <table className=" ">

                      <tbody className="flex flex-wrap gap-2  ">
                        {joinedUsers?.length && joinedUsers?.map((player: any, index: any) => (
                          <tr key={player.id} className="">
                            <td className="px-3 py-2 text-sm text-gray-500">
                              <div className="text-center">
                                <img className="h-10 w-10 rounded-full" src={player.imageUrl} alt="" />
                                <div>
                                  <div className="text-sm font-medium text-gray-900">{player.nickName}</div>

                                </div>
                              </div>
                            </td>



                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className=" ">
                    <div className="bg-[#17b3a6] text-white rounded-sm ">
                      <h4 className="p-2">{t("Waiting Members")}</h4>
                    </div>
                    <table className=" ">

                      <tbody className="flex flex-wrap gap-2 ">
                        {waitingUsers?.length && waitingUsers?.map((player: any, index: any) => (

                          <tr key={player.id} className="">
                            <td className="px-3 py-2 text-sm text-gray-500">
                              <div className="text-center">
                                <img className="h-10 w-10 rounded-full" src={player.imageUrl} alt="" />
                                <div>
                                  <div className="text-sm font-medium text-gray-900">{player.nickName}</div>
                                  {isCreated &&
                                    <div>


                                      <button className="flex items-center gap-1 cursor-pointer bg-[#17b3a6] text-white rounded-lg my-2" onClick={(e) => { handleApprove(e, player.id) }}><CheckBadgeIcon className="w-6 h-6 text-white" />{t("ACCEPT")}</button>
                                      <button className="flex items-center gap-1 cursor-pointer bg-transparent border border-solid border-[#17b3a6]  rounded-lg my-2 py-1 text-[#17b3a6]" onClick={(e) => { }}><XMarkIcon className="w-5 h-5 text-[#17b3a6]" />{t("DECLINE")}</button>
                                    </div>
                                  }

                                </div>
                              </div>
                            </td>


                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className=" ">
                  <div className="bg-[#17b3a6] text-white rounded-sm ">
                    <h4 className="p-2">{t("Bookedmark Members")}</h4>
                  </div>
                  <table className=" ">

                    <tbody className="flex flex-wrap gap-2 ">
                      {waitingUsers?.length && waitingUsers?.map((player: any, index: any) => (
                        <tr key={player.id} className="">
                          <td className="px-3 py-2 text-sm text-gray-500">
                            <div className="text-center">
                              <img className="h-10 w-10 rounded-full" src={player.imageUrl} alt="" />
                              <div>
                                <div className="text-sm font-medium text-gray-900">{player.nickName}</div>

                              </div>
                            </div>
                          </td>



                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div> */}

             
              {singleEvent?.eventType === "チーム(team)" && (
                <>
                  <div className="max-w-5xl mx-auto xl:mx-auto ">
                    <div className="xl:flex items-center justify-between   gap-40 py-8">
                      {isCreated ? (
                        <>
                          <div className="flex gap-2 m-4 xl:m-0">
                            <div>
                              <img src="/img/golfplyr.png" alt="" width="40px" />
                              <b className="text-xl lg:text-10xl text-darkslateblue-300 leading-[18px] [text-shadow:0px_7px_4px_#ccf2fe]">
                                {t('EDIT_TEAMS')}
                              </b>
                            </div>
                          </div>
                          <div className="xl:flex flex flex-wrap gap-2 items-center xl:place-self-end">
                            <div className="flex-wrap  xl:flex items-center gap-2 m-4 xl:m-0">
                              <label
                                className="block mb-2 text-xs font-normal tracking-wide text-black capitalize"
                                htmlFor="capacity"
                              >
                                {t('CAPACITY')}
                              </label>
                              <input
                                className="appearance-none block w-[80px] bg-gray-200 text-green border border-[#51ff85] bg-transparent rounded py-2 px-2 mb-0 leading-tight focus:outline-none "
                                id="capacity"
                                type="number"
                                name="capacity"
                                value={capacity === undefined ? totalCapacity : capacity}
                                onChange={(e) => setCapacity(e.target.value)}
                                min="0"
                              />
                            </div>
                            <div className="flex-wrap xl:flex items-center gap-2 m-4 xl:m-0">
                              <label
                                className="block mb-2 text-xs font-normal tracking-wide text-black capitalize"
                                htmlFor="teamSize"
                              >
                                {t('TEAM_SIZE')}
                              </label>
                              <input
                                className="appearance-none block w-[80px] bg-gray-200 text-green border border-[#51ff85] bg-transparent hover:animate-bounce rounded py-2 px-2 mb-0 leading-tight focus:outline-none "
                                id="teamSize"
                                type="number"
                                name="teamSize"
                                value={
                                  currentTeamSize == undefined
                                    ? singleEvent?.teamSize
                                    : currentTeamSize
                                }
                                onChange={(e) => setCurrentTeamSize(e.target.value)}
                                min="0"
                              />
                            </div>

                            {isCreated && (
                              <div className="flex">

                                <button
                                  className="px-2 py-1 xl:py-2 font-normal text-white bg-blue-500 rounded hover:bg-blue-700"
                                  onClick={updateTeams}
                                >
                                  {t('UPDATE_TEAM')}

                                </button>
                              </div>
                            )}
                            {singleEvent.scoringType !== "Normal" &&
                              <button
                                className="px-2 py-1 xl:py-0 font-normal text-white bg-blue-500 rounded hover:bg-blue-700"
                                onClick={handleNavigateHome}
                              >
                                {t('ADD_PLAYER_SCORE')}

                              </button>
                            }

                          </div>
                        </>
                      ) : isJoined && singleEvent?.scoringType !== "Normal" ? (
                        <>

                          <div className="flex items-center gap-4">

                          </div>
                          {!isEventOver || !isDeadlineOver ? <div className="flex gap-4 justify-end w-full">
                            <button
                              className="p-4 font-normal text-white uppercase bg-blue-500 rounded cursor-pointer hover:bg-blue-700"
                              onClick={() => router(`/add-score-page/${singleEvent?.id}`)}
                            >
                              {t('ADDSCORE')}
                            </button>
                             <button
                              className="px-6 py-4 font-medium text-white uppercase bg-blue-500 rounded cursor-pointer hover:bg-blue-700"
                              onClick={() => router(`/score-board/${singleEvent?.id}`)}
                            >
                              {t('CHECK_THE_RESULT')}
                            </button>
                          </div>: <div className="flex justify-end w-full">
                            <button
                              className="px-6 py-4 font-medium text-white uppercase bg-red-500 rounded cursor-pointer hover:bg-blue-700"
                              onClick={() => router(`/score-board/${singleEvent?.id}`)}
                            >
                             {/*t('View Score')*/}  {t('CHECK_THE_RESULT')}
                            </button>
                          </div>}

                        </>
                      ) : (
                        <>


                        </>
                      )}
                    </div>
                    {singleEvent?.eventType !== 'individual' && (
                      <div className="overflow-x-scroll sm:overflow-x-scroll xl:overflow-x-auto  shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] px-4 xl:px-10 ">
                        <div className="flex items-center gap-4 pt-8">
                          <div>

                            <b className="text-xl lg:text-2xl text-darkslateblue-300 leading-[18px] [text-shadow:0px_7px_4px_#ccf2fe]">
                              {t("TEAM_MEMBERS")}
                            </b>
                          </div>
                        </div>
                        <table className="w-full border-spacing-y-5 px-1 ">
                          <thead className="text-left text-whitesmoke-100">
                            <tr className="shadow-[0px_4px_10px_rgba(0,_0,_0,_0.10)] bg-lightseagreen-200 h-[55px] text-xl  ">
                              <th className="pl-4 py-3 whitespace-nowrap rounded-s-[3px] leading-[10.25px] font-bold text-[13px] xl:text-[15px]">
                                {t('TEAM_NAME')}
                              </th>
                              {generateTableHeaders()}
                            </tr>
                          </thead>
                          <tbody className="text-left text-black">
                            {teams?.map((team: any, index: any) => (
                              <tr className="shadow-[0px_0px_10px_rgba(0,_0,_0,_0.10)] h-[69px] font-medium  overflow-scroll xl:overflow-hidden">
                                <td className="whitespace-nowrap pl-1 relative top-1 tracking-[1.45px] leading-[9.22px] flex items-center justify-between min-w-[182px] rounded-s-[3px] ">
                                  <div className={`w-[156px] relative pl-3 rounded text-base h-[58px] flex items-center font-semibold leading-5 text-black bg-[#e0e0e0]`}>
                                    <h4>{team.name}</h4>
                                    <div className="absolute top-[50%] z-20 -right-[20px] -translate-y-2/4 h-[58px] w-[58px] overflow-hidden text-lg leading-5 font-semibold z-[0]">
                                      {team.imageUrl ? (
                                        <img className="w-full h-full object-cover rounded-[50%]" alt="" src={team.imageUrl} />
                                      ) : (
                                        <img className="w-full h-full object-cover rounded-[50%]" alt="Default Image" src="/img/BG-GOLF.jpg" />
                                      )}
                                    </div>
                                  </div>
                                </td>
                                {team.members?.filter((member: any) => member.status === 'joined').map((member: any, memberIndex: any) => (
                                  <td className="py-4 pl-4 whitespace-nowrap" key={memberIndex}>
                                    <Player
                                      isCreator={isCreated}
                                      showNumber={false}
                                      enableHover={true}
                                      onEdit={() => {
                                        setSelectedPlayerNickname(member.nickName);
                                        setSelectedUserId(member.userId);
                                        setSelectedTeamName(team.name);
                                        setselectedPlayerImageUrl(member.imageUrl);
                                        setEditOpen(true);
                                      }}
                                      onDelete={() => console.log('Delete clicked')} 
                                      name={member.nickName}
                                      imageUrl={member.imageUrl}
                                    />
                                  </td>
                                ))}

                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}



                    <Transition.Root show={showPlayerList} as={Fragment}>
                      <Dialog
                        as="div"
                        className="relative z-[9999]"
                        onClose={() => setShowPlayerList(false)}
                      >
                        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
                        <div className="fixed inset-0 z-10 overflow-y-auto">
                          <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                              enter="ease-out duration-300"
                              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                              enterTo="opacity-100 translate-y-0 sm:scale-100"
                              leave="ease-in duration-200"
                              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                              <Dialog.Panel className="px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl w-fullrelative sm:my-8 sm:max-w-lg sm:w-full sm:p-6">
                                <div className="flex items-start justify-between">
                                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                                    Removed Players List
                                  </h3>
                                  <div className="flex items-start justify-between">
                                    <div
                                      className="cursor-pointer"
                                      onClick={() => setShowPlayerList(false)}
                                    >
                                      <svg
                                        className="w-6 h-6 text-gray-900"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M6 18L18 6M6 6l12 12"
                                        />
                                      </svg>
                                    </div>
                                  </div>
                                </div>
                                <div className="mt-2">
                                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                      <tr>
                                        <th scope="col" className="px-6 py-3">
                                          Player Name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                          Action
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {playerList.map((player: any, index: any) => (
                                        <tr
                                          key={index}
                                          className={`bg-white border-b dark:bg-gray-900 dark:border-gray-700`}
                                        >
                                          <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                                          >
                                            {player.name}
                                          </th>
                                          <td className="px-6 py-4">
                                            <button className="px-2 py-1 text-white bg-blue-500 rounded-full cursor-pointer hover:bg-blue-700 font-xs">
                                              Add To Team
                                            </button>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </Dialog.Panel>
                            </Transition.Child>
                          </div>
                        </div>
                      </Dialog>
                    </Transition.Root>

                    <Transition.Root show={open} as={Fragment}>
                      <Dialog
                        as="div"
                        className="relative z-10"
                        initialFocus={cancelButtonRef}
                        onClose={setOpen}
                      >
                        <Transition.Child
                          as={Fragment}
                          enter="ease-out duration-300"
                          enterFrom="opacity-0"
                          enterTo="opacity-100"
                          leave="ease-in duration-200"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 " />
                        </Transition.Child>

                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                          <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                              as={Fragment}
                              enter="ease-out duration-300"
                              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                              enterTo="opacity-100 translate-y-0 sm:scale-100"
                              leave="ease-in duration-200"
                              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                              <Dialog.Panel className="relative overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-[#17B3A6] px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                  <div className="flex justify-center">
                                    <div className="flex items-center justify-center w-20 h-20 bg-white rounded-full">
                                      <svg
                                        width="40"
                                        height="54"
                                        viewBox="0 0 40 54"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M40 19.5565L37.2164 24.3897L3.45163 4.83325L6.23521 0L14.6973 4.88912L18.483 3.85542L30.5358 10.8399L31.5658 14.6674L40 19.5565ZM0 47.7458V14.2204H14.1127L33.4029 25.3955V47.7458C33.4029 49.2277 32.8164 50.6489 31.7723 51.6968C30.7283 52.7446 29.3123 53.3333 27.8358 53.3333H5.56715C4.09065 53.3333 2.67462 52.7446 1.63058 51.6968C0.586537 50.6489 0 49.2277 0 47.7458Z"
                                          fill="#FF292C"
                                        />
                                      </svg>
                                    </div>
                                  </div>
                                  <div className="flex items-center justify-center">
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 ">
                                      <div className="mt-2">
                                        <p className="text-3xl font-medium text-center text-white">
                                          Are you sure you want to Remove this Player?
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="bg-[#17B3A6] px-4 py-3 sm:flex justify-center sm:flex-row-reverse sm:px-6">
                                  <button
                                    type="button"
                                    className="cursor-pointer inline-flex w-full justify-center rounded-full bg-[#FF292C] px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                    onClick={() => setOpen(false)}
                                  >
                                    Remove
                                  </button>
                                  <button
                                    type="button"
                                    className="cursor-pointer mt-3 inline-flex w-full justify-center rounded-full bg-[#00FF92] px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm  hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                    onClick={() => setOpen(false)}
                                    ref={cancelButtonRef}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </Dialog.Panel>
                            </Transition.Child>
                          </div>
                        </div>
                      </Dialog>
                    </Transition.Root>
                    <Transition.Root show={opens} as={Fragment}>
                      <Dialog
                        as="div"
                        className="relative z-[9999]"
                        initialFocus={cancelButtonRef}
                        onClose={setEditOpen}
                      >
                        <Transition.Child
                          as={Fragment}
                          enter="ease-out duration-300"
                          enterFrom="opacity-0"
                          enterTo="opacity-100"
                          leave="ease-in duration-200"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                          <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                              as={Fragment}
                              enter="ease-out duration-300"
                              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                              enterTo="opacity-100 translate-y-0 sm:scale-100"
                              leave="ease-in duration-200"
                              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                              <Dialog.Panel className="relative overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-[#17B3A6] px-4 pb-4 pt-5 ">
                                  <form className="px-8" onSubmit={updateTeamLocal}>
                                    <div className="relative w-full">
                                      <label
                                        htmlFor="team"
                                        className="inline text-2xl font-semibold text-white font-helvetica "
                                      >
                                        Team Name
                                      </label>

                                      <div className="relative flex items-center w-full">
                                        <img
                                          src="/img/ellipse-23087@2x.png"
                                          alt="Team Logo"
                                          className="absolute w-10 h-10 transform -translate-y-1/2 rounded-full left-2 top-1/2"
                                        />
                                        <input
                                          type="text"
                                          id="teamname"
                                          className="w-full py-4 text-gray-900 border-none rounded-md pl-14 bg-gray-50 sm:text-sm"
                                          value={selectedTeamName}
                                          onChange={(e) =>
                                            setSelectedTeamName(e.target.value)
                                          }
                                        />

                                        <div className="absolute left-8 top-[30px] bg-[#4CAF50] rounded-full w-4 h-4 text-white flex items-center justify-center">
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            className="w-3 h-3 cursor-pointer"
                                          >
                                            <path
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                              stroke-width="2"
                                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                            />
                                          </svg>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="relative flex items-center justify-start w-full gap-2 mt-3">
                                      <label
                                        htmlFor="team"
                                        className="font-medium text-center text-white font-helvetica "
                                      >
                                        {t("PLAYER")} Name
                                      </label>

                                      <div className="relative flex items-center w-full gap-2">
                                        {selectedUserId && selectedPlayerNickname && (
                                          <img
                                            src={selectedPlayerImageUrl ? selectedPlayerImageUrl : "/img/ellipse-13@2x.png"}
                                            alt="Player"
                                            className="absolute w-10 h-10 transform -translate-y-1/2 rounded-full left-2 top-1/2"
                                          />
                                        )}

                                        <input
                                          type="text"
                                          id="playerName"
                                          placeholder="Player 1"
                                          className="w-full py-3 text-gray-900 border-none rounded-md pl-14 bg-gray-50 sm:text-sm"
                                          value={selectedPlayerNickname}
                                          onChange={(e) =>
                                            setSelectedPlayerNickname(e.target.value)
                                          }
                                        />
                                        <input
                                          type="hidden"
                                          name="userId"
                                          id="playerName"
                                          placeholder="Player 1"
                                          className="w-full py-3 text-gray-900 border-none rounded-md pl-14 bg-gray-50 sm:text-sm"
                                          value={selectedUserId}
                                          onChange={(e) =>
                                            setSelectedUserId(e.target.value)
                                          }
                                        />
                                        <select
                                          name="teamId"
                                          id="teamSelect"
                                          className="w-1/2 py-3 text-gray-900 border-none rounded-md bg-gray-50 sm:text-sm"
                                          onChange={(e) =>
                                            setSelectedTeamId(Number(e.target.value))
                                          }
                                        >
                                          <option value="" disabled selected>
                                            Select a Team
                                          </option>
                                          {teams?.map((team: any) => (
                                            <option key={team.id} value={team.id}>
                                              {team.name}
                                            </option>
                                          ))}
                                        </select>

                                        <div className="absolute left-8 top-[30px] bg-[#4CAF50] rounded-full w-4 h-4 text-white flex items-center justify-center">
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            className="w-3 h-3 cursor-pointer"
                                          >
                                            <path
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                              stroke-width="2"
                                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                            />
                                          </svg>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="bg-[#17B3A6]  py-3 flex justify-end gap-0">
                                      <button
                                        type="submit"
                                        className="cursor-pointer mt-3 inline-flex w-full justify-center rounded-full bg-[#00FF92] px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm  hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={() => setEditOpen(false)}
                                        //ref={cancelButtonRef}
                                      >
                                        Confirm
                                      </button>
                                      <button
                                        type="button"
                                        className="cursor-pointer inline-flex w-full  rounded-full bg-[#FF292C] px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-2 sm:w-auto"
                                        onClick={() => setEditOpen(false)}
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </form>
                                </div>
                              </Dialog.Panel>
                            </Transition.Child>
                          </div>
                        </div>
                      </Dialog>
                    </Transition.Root>
                  </div>

                </>
              )}

             {/* Added to show add score option in individual match type*/} 
             {singleEvent?.eventType === "個人(individual)" && (
                <>
                  <div className="max-w-5xl mx-auto xl:mx-auto ">
                    <div className="xl:flex items-center justify-between   gap-40 py-8">
                      {isJoined ? (
                        <>

                          <div className="flex items-center gap-4">

                          </div>
                          {!isEventOver || !isDeadlineOver ? <div className="flex justify-end w-full">
                            <button
                              className="p-4 font-normal text-white uppercase bg-blue-500 rounded cursor-pointer hover:bg-blue-700"
                              onClick={() => router(`/add-score-page/${singleEvent?.id}`)}
                            >
                              {t('Add Score')}
                            </button>
                          </div> : <div className="flex justify-end w-full">
                            <button
                              className="px-6 py-4 font-medium text-white uppercase bg-red-500 rounded cursor-pointer hover:bg-blue-700"
                              onClick={() => router(`/score-board/${singleEvent?.id}`)}
                            >
                              {t('View Score')}
                            </button>
                          </div>}

                        </>
                      ) : (
                        <>


                        </>
                      )}
                    </div>
               
                  </div>

                </>
              )}

              <table className="w-full mt-4 mb-4">
                <CommentModel eventIsd={singleEvent?.id} closeModal={() => { }} />

              </table>
            </div>

          </div>
        </div>
        : <NotFound />}
    </>
  );
};

export default EditTeamPage;