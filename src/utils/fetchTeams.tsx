import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export const fetchTeams = async (setTeams: any, eventId: any, setTeamMembers: any, setTotalJoinedMembers:any) => {
    try {
        const token = localStorage.getItem("token");
        let letUrl = API_ENDPOINTS.GETPUBLICTEAMSBYEVENT+ eventId;
        
        if(token){
            letUrl = API_ENDPOINTS.GETTEAMSBYEVENT+ eventId;
        }else{
        }

        const response = await fetch(letUrl, {
            headers: {
                Authorization: `Bearer ${token}`,

            },
        });
        const data = await response.json();
        setTeams(data.teams);
        setTotalJoinedMembers(data.totalJoinedMembers);
        setTeamMembers(data.teams.map((team: any) => team.members))
        

    } catch (error) {
        if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
            localStorage.clear();
            toast.error("Session expired. Please log in again.");
          } else {
            toast.error("An error occurred. Please try again.");
          }
    }
};
export const fetchTeam = async (teamId: any) => {
    try {
        const token = localStorage.getItem("token");
        const headers: any = {
        "ngrok-skip-browser-warning": "69420"
      };
        let url = API_ENDPOINTS.GETPUBLICTEAMSBYEVENT + teamId
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
            url = API_ENDPOINTS.GETTEAMSBYEVENT + teamId
        }
        const response = await axios.get( url ,
            {
                headers
            }
        );

        return response.data;
        

    } catch (error) {
        if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
            localStorage.removeItem('token');
                localStorage.removeItem('tokenTimestamp');
                localStorage.removeItem('nickName');
                localStorage.removeItem('teacher_id');
                localStorage.removeItem('user');
                localStorage.removeItem('id');
                localStorage.removeItem('score');
                localStorage.removeItem('par');
            toast.error("Session expired. Please log in again.");
          } else {
            toast.error("An error occurred. Please try again.");
          }
    }
};
export const fetchAllMembers = async (teamId: any) => {
    try {
        const token = localStorage.getItem("token");
        const headers: any = {
        "ngrok-skip-browser-warning": "69420"
      };
        let url = API_ENDPOINTS.GETPUBLICTEAMSBYEVENT + teamId
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
            url = API_ENDPOINTS.GETMEMBERSLIST + teamId
        }
        const response = await axios.get( url ,
            {
                headers
            }
        );
        console.log(response.data,'khan11')
        
        return response.data;
        

    } catch (error) {
        if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
            localStorage.clear();
            toast.error("Session expired. Please log in again.");
          } else {
            toast.error("An error occurred. Please try again.");
          }
    }
};
export const updateTeams = async (event: any, selectedUserId: any, selectedTeamId: any) => {
    event.preventDefault();
 const { t } = useTranslation();
    const uId = selectedUserId.toString();
    const formDataObj = {

        userId: uId,
        teamId: selectedTeamId,
    };
    try {
        const response = await axios.put(API_ENDPOINTS.UPDATETEAMMEMBER,
            JSON.stringify(formDataObj),
            {
                headers: {
                    'Content-Type': 'application/json', 
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            });
        if (response.status !== 200) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        toast.success(t('MEMBER_UPDATED_SUCCESS'));

    } catch (error) {
        if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
            localStorage.removeItem('token');
                localStorage.removeItem('tokenTimestamp');
                localStorage.removeItem('nickName');
                localStorage.removeItem('teacher_id');
                localStorage.removeItem('user');
                localStorage.removeItem('id');
                localStorage.removeItem('score');
                localStorage.removeItem('par');
            toast.error("Session expired. Please log in again.");
          } else {
            toast.error("An error occurred. Please try again.");
          }
    }
};
export const deleteTeamMember = async (teamId: any, userId: any,eventId:any) => {
    try {
        const token = localStorage.getItem("token");

        const response = await axios.delete(API_ENDPOINTS.DELETETEAMEMBER, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            data: {
                teamId,
                userId,
                eventId
                
            },
        });

        if (response.status === 200) {
            toast.success("Team member removed successfully.");
            window.location.reload()
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
            localStorage.clear();
            toast.error("Session expired. Please log in again.");
        } else {
            toast.error("An error occurred while deleting the team member. Please try again.");
        }
    }
};
export const deleteWaitingUsers = async (eventId: string, userId: string) => {
    try {
      const token = localStorage.getItem("token");
  
      // Log the data being sent
      console.log('Deleting waiting user with:', { eventId, userId });
  
      const response = await axios.delete(API_ENDPOINTS.DELETE_WAITING_MEMBERS, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: { eventId, userId },
      });
  
      if (response.status === 200) {
        console.log('Delete successful:', response.data);
        toast.success("Waiting user deleted successfully.");
        // Optionally, refresh the data or update the UI as needed
      }
    } catch (error) {
      console.error('Error deleting waiting user:', error);
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 404) {
          toast.error("No users with status 'waiting' found.");
        } else if (error.response.status === 401) {
          // Clear user data and redirect to login if unauthorized
          localStorage.clear();
          toast.error("Session expired. Please log in again.");
          // Optionally, redirect to login page
        } else if (error.response.status === 400) {
          toast.error("Bad request. Please check your input.");
        } else {
          toast.error("An error occurred while deleting waiting users. Please try again.");
        }
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };
  