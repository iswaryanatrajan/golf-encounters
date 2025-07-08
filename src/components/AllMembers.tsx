// components/AllMembers.tsx

import React, { useState } from "react";
import { singleTeamsContextStore } from "../contexts/teamContext";
import { useTranslation } from "react-i18next";
import { singleEventContextStore } from "../contexts/eventContext";
import { approveEvent } from "../utils/fetchEvents";
import { deleteTeamMember, deleteWaitingUsers } from "../utils/fetchTeams";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import {
  CheckBadgeIcon,
  XMarkIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import AreSure from "./AreSure";

// Define the structure for the member to be removed
interface MemberToRemove {
  teamId: string;
  userId: string;
  eventId: string;
}

export default function AllMembers() {
  // State variables
  const [visibleCount, setVisibleCount] = useState(5);
  const [activeTab, setActiveTab] = useState("confirmed");
  const [showConfirm, setShowConfirm] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState<MemberToRemove | null>(null);

  // Hooks and context
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isCreated, singleEvent } = singleEventContextStore();
  const {
    handleSingleTeam,
    totalJoinedMembers,
    teamMembers,
    isJoined,
    isLoading,
    teams,
    waitingUsers = [],
    joinedUsers = [],
    handleIsLoading,
  } = singleTeamsContextStore();

  // Function to load more members
  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 5);
  };

  // Function to handle tab switching (if tabs are enabled)
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  // Function to approve a waiting member
  const handleApprove = async (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    handleIsLoading(true);
    try {
      const obj = {
        userId: id,
        eventId: singleEvent?.id,
      };
      console.log("Approving member with:", obj); // Debugging
      await approveEvent(obj);
      toast.success(t("Approved Successfully"));
      navigate(`/edit-team/${singleEvent?.id}`);
    } catch (error) {
      console.error('Error approving event:', error);
      toast.error(t("ERROR_APPROVING_EVENT"));
    } finally {
      handleIsLoading(false);
    }
  };

  // Function to remove a confirmed member
  const handleRemoveMember = async (
    e: React.MouseEvent<HTMLButtonElement>,
    teamId: string,
    memberId: string,
    eventId: string
  ) => {
    e.preventDefault();
    handleIsLoading(true);
    try {
      console.log("Removing member with:", { teamId, memberId, eventId });
      await deleteTeamMember(teamId, memberId, eventId);
      toast.success(t("MEMBER_REMOVED_SUCCESS"));

    } catch (error) {
      console.error('Error removing member:', error);
      toast.error(t("ERROR_REMOVING_MEMBER"));
    } finally {
      handleIsLoading(false);
      setShowConfirm(false);
      setMemberToRemove(null);
    }
  };

  // Function to remove a waiting member
  const handleRemoveWaitingMember = async (
    e: React.MouseEvent<HTMLButtonElement>,
    eventId: string,
    userId: string
  ) => {
    e.preventDefault();
    console.log('Handle Remove Waiting Member:', { eventId, userId }); // Debugging
    handleIsLoading(true);
    try {
      await deleteWaitingUsers(eventId, userId);
      // toast.success(t("MEMBER_REMOVED_SUCCESS"));
    
    } catch (error) {
      console.error('Error removing waiting member:', error);
      toast.error(t("ERROR_REMOVING_MEMBER"));
    } finally {
      handleIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-2 rounded-lg my-2">
      <div className="flex flex-col justify-center py-4 px-10 mt-10 shadow-[0_0_8px_rgba(0,0,0,0.12)] rounded-lg">
        {/* Header Section */}
        <div className="hidden xl:flex gap-2 items-center">
          <img src="/img/golfplyr.png" alt="Golf Player" width="30px" />
          <b className="text-xl lg:text-2xl text-darkslateblue-300 leading-[18px] [text-shadow:0px_7px_4px_#ccf2fe]">
            {t("ALL_MEMBERS")}
          </b>
        </div>

        {/* Tabs for Confirmed and Waiting Members (Optional) */}
        {/* Uncomment the below block if you want to enable tab functionality */}
        {/*
        <div className="grid grid-cols-2 gap-2 border-b border-gray-200 mb-4 py-6">
          <button
            className={`px-4 py-2 xl:py-4 text-[18px] xl:text-[20px] xl:font-bold  ${
              activeTab === 'confirmed'
                ? 'text-white bg-[#17b3a6]'
                : 'bg-transparent border-2 border-solid border-[#17B3A6] text-[#17B3A6]'
            }`}
            onClick={() => handleTabClick('confirmed')}
          >
            {t("Confirmed Members")}
          </button>
          <button
            className={`px-4 py-2 xl:py-4 text-[18px] xl:text-[20px] xl:font-bold ${
              activeTab === 'waiting'
                ? 'text-white bg-[#17b3a6]'
                : 'bg-transparent border-2 border-solid border-[#17B3A6] text-[#17B3A6]'
            }`}
            onClick={() => handleTabClick('waiting')}
          >
            {t("Waiting Members")}
          </button>
        </div>
        */}

        {/* Confirmed Members Section */}
        <div className="mb-4">
          <h2 className="px-4 py-2 xl:py-3 text-[13px] xl:text-[15px] xl:font-bold bg-[#17b3a6] text-white">
            {t("Confirmed Members")}
          </h2>
          <table className="w-full mt-2">
            <tbody>
              {joinedUsers && joinedUsers.length > 0 ? (
                joinedUsers?.some((members: any) =>
                  members.members?.some(
                    (player: any) => player.status === "joined"
                  )
                ) ? (
                  joinedUsers.map((members: any, index: number) =>
                    members.members?.map((player: any, idx: number) => {
                      if (player?.status !== "joined") return null;

                      // Debugging: Log the player object
                      console.log("Confirmed Member:", player);

                      // Determine the correct userId
                      const userId = player.userId || player.id; // Adjust based on actual data structure
                      if (!userId) {
                        console.warn(`User ID is missing for player:`, player);
                        return null;
                      }

                      return (
                        <tr key={player.id} className="border-b">
                          <td className="px-3 py-2 text-[16px] text-gray-500">
                            <div className="flex items-center">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={player?.imageUrl || "/default-avatar.png"}
                                alt={player?.nickName || "User"}
                              />
                              <div className="ml-4">
                                <div className="text-[16px] font-medium text-gray-900">
                                  {player?.nickName}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-3 py-2 text-right">
                            {isCreated && (
                              <button
                                className="flex items-center gap-1 cursor-pointer bg-transparent border border-solid border-[#e74c3c] text-[#e74c3c] rounded-lg my-2 py-1 px-2"
                                onClick={(e) => {
                                  setMemberToRemove({
                                    teamId: player.teamId,
                                    userId: userId, // Use the determined userId
                                    eventId: singleEvent?.id || "",
                                  });
                                  setShowConfirm(true);
                                }}
                                disabled={isLoading}
                              >
                                <TrashIcon className="w-5 h-5 text-[#e74c3c]" />
                                {t("Remove")}
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )
                ) : (
                  <tr>
                    <td className="px-3 py-2 text-lg text-gray-500 text-center" colSpan={2}>
                      {t("No confirmed members")}
                    </td>
                  </tr>
                )
              ) : (
                <tr>
                  <td className="px-3 py-2 text-lg text-gray-500 text-center" colSpan={2}>
                    {t("No confirmed members")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Waiting Members Section */}
        <div>
          <h2 className="px-4 py-2 xl:py-3 text-[13px] xl:text-[15px] xl:font-bold bg-[#17b3a6] text-white">
            {t("Waiting Members")}
          </h2>
          <table className="">
            <tbody className=" gap-2">
                {isCreated ? (
              waitingUsers && waitingUsers.length > 0 ? (
                waitingUsers.slice(0, visibleCount).map((player: any) => {
                  // Debugging: Log the player object
                  console.log("Waiting Member:", player);

                  // Determine the correct userId
                  const userId = player.userId || player.id; // Adjust based on actual data structure
                  if (!userId) {
                    console.warn(`User ID is missing for waiting player:`, player);
                    return null;
                  }

                  return (
                    
                    <tr key={player.id} className="border-b ">
                      <td className="px-3 py-2 text-[16px] text-gray-500">
                        <div className="flex items-center">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={player?.imageUrl || "/default-avatar.png"}
                            alt={player?.nickName || "User"}
                          />
                          <div className="ml-4">
                            <div className="text-[16px] font-medium text-gray-900">
                              {player?.nickName}
                            </div>
                          </div>
                        </div>
                        </td>
                        <td className=" text-right">
                        {isCreated && (
                          <div className="flex flex-row space-x-2">
                            <button
                              className="flex items-center gap-1 cursor-pointer bg-[#17b3a6] text-white rounded-lg my-2 py-1 px-2"
                              onClick={(e) => handleApprove(e, userId)}
                              disabled={isLoading}
                            >
                              <CheckBadgeIcon className="w-6 h-6 text-white" />
                              {t("ACCEPT")}
                            </button>

                            <button
                              className="flex items-center gap-1 cursor-pointer bg-transparent border border-solid border-[#17b3a6] rounded-lg my-2 py-1 text-[#17b3a6]"
                              onClick={(e) => {
                                handleRemoveWaitingMember(
                                  e,
                                  singleEvent?.id || "",
                                  userId
                                );
                              }}
                              disabled={isLoading}
                            >
                              <XMarkIcon className="w-5 h-5 text-[#17b3a6]" />
                              {t("DECLINE")}
                            </button>
                          </div>
                        )}
                      </td>
                      
                     
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td className="px-3 py-2 text-lg font-medium text-gray-500 text-center" colSpan={2}>
                    {t("NO_WAITING")}
                  </td>
                </tr>
              )
            ) : (
              <tr>
                <td className="px-3 py-2 text-lg font-medium text-gray-500 text-center" colSpan={2}>
                  {t("Waiting Members")}: {waitingUsers?.length || 0}
                </td>
              </tr>
            )}
            </tbody>
          </table>

          {/* Load More Button */}
          {visibleCount < waitingUsers?.length && (
            <div className="flex justify-center mt-4">
              <button
                className="px-4 py-2 bg-[#17b3a6] text-white rounded-md"
                onClick={loadMore}
              >
                {t("Load More")}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && memberToRemove && (
        <AreSure
          mainFunc={(e:any) => {
            handleRemoveMember(
              e,
              memberToRemove.teamId,
              memberToRemove.userId,
              memberToRemove.eventId
            );
          }}
          toggleModal={() => setShowConfirm(false)}
          isModalOpen={showConfirm}
          title={t("Are you sure you want to remove this member?")}
        />
      )}
    </div>
  );
}
