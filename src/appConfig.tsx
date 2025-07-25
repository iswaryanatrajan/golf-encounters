// http://18.216.79.130:5000
// http://localhost:5000
// https://0271-18-216-79-130.ngrok-free.app
// https://shaggy-turtle-15.telebit.io
// https://18.216.79.130:5000/api/login
// https://18.216.79.130:5000
// https://backend.golf-encounters.com:5000/
const API_BASE_URL = "https://backend.golf-encounters.com:5000"
const API_VERSION = "api";

export const API_ENDPOINTS = {
  //authen
  REGISTER: `${API_BASE_URL}/${API_VERSION}/register`,
  LOGIN: `${API_BASE_URL}/${API_VERSION}/login`,
  UPDATEUSERPROFILE: `${API_BASE_URL}/${API_VERSION}/edit-user-profile/`,
  GET_USER: `${API_BASE_URL}/${API_VERSION}/user/`,
  UPDATEUSER: `${API_BASE_URL}/${API_VERSION}/update-profile`,
  ALLUSERS: `${API_BASE_URL}/${API_VERSION}/get-total-users`,
  GETUSEREVENTS: `${API_BASE_URL}/${API_VERSION}/get-user-all-events/`,
  EDITUSERIDPROOF: `${API_BASE_URL}/${API_VERSION}/edit-user-identification-image/`,
  ISIDENTIFICATIONIMAGEUPLOADED: `${API_BASE_URL}/${API_VERSION}/is-identification-image-uploaded/`,
 
  
  //event
  CREATEEVENT: `${API_BASE_URL}/${API_VERSION}/createEvent`,
  GETALLEVENT: `${API_BASE_URL}/${API_VERSION}/getAllEvents`,
  PUBLICEVENTS: `${API_BASE_URL}/${API_VERSION}/get-public-events`,
  ADDCOMMENT: `${API_BASE_URL}/${API_VERSION}/add-comment`,
  ADDLIKE: `${API_BASE_URL}/${API_VERSION}/add-like`,
  MARKASFAVORITE: `${API_BASE_URL}/${API_VERSION}/is-favourite-event/`,
  GETFAVEVENTS: `${API_BASE_URL}/${API_VERSION}/get-favourite-events`,
  GETEVENTSBYID: `${API_BASE_URL}/${API_VERSION}/get-events-by-user-id`,
  GETJOINEDEVENTS: `${API_BASE_URL}/${API_VERSION}/get-joined-events`,
  JOINEDEVENTS: `${API_BASE_URL}/${API_VERSION}/join-event/`,
  GETEVENTBYID: `${API_BASE_URL}/${API_VERSION}/get-event-by-id/`,
  GETPUBLICEVENTBYID: `${API_BASE_URL}/${API_VERSION}/get-public-event-by-id/`,
  DELETE_EVENT: `${API_BASE_URL}/${API_VERSION}/delete-event-by-id/`,
  UPDATE_EVENT: `${API_BASE_URL}/${API_VERSION}/update-event-by-id/`,
  UPDATE_EVENT_MEDIA: `${API_BASE_URL}/${API_VERSION}/update-event-media`,

  APPROVE_EVENT: `${API_BASE_URL}/${API_VERSION}/approve-join-request`,
  SEARCH_EVENT: `${API_BASE_URL}/${API_VERSION}/search-event-by-name`,
  SEARCH_EVENT_NAME: `${API_BASE_URL}/${API_VERSION}/get-event-col-data`,
  GETMEMBERSLIST: `${API_BASE_URL}/${API_VERSION}/get-joined-and-wait-list/`,
  JOINPRIVATEEVENT: `${API_BASE_URL}/${API_VERSION}/verify-event-private-password/`,

  GETTEMPLATES: `${API_BASE_URL}/admin/get-course-events`,
  

  // EVent ceremony
  ADD_EVENT_CEREMONY: `${API_BASE_URL}/${API_VERSION}/add-event-ceremony-details`,
  GET_EVENT_CEREMONY: `${API_BASE_URL}/${API_VERSION}/get-ceremony-details`,
  UPDATE_EVENT_CEREMONY: `${API_BASE_URL}/${API_VERSION}/update-event-ceremony-details`,


  // get notfication
  GET_NOTIFICATION: `${API_BASE_URL}/${API_VERSION}/get-notifications`,
  TRANSLATE_NOTIFICATION: `${API_BASE_URL}/${API_VERSION}/translate`,

  // teacher
  BECOMETEACHER: `${API_BASE_URL}/${API_VERSION}/become-teacher`,
  GETALLTEACHERS: `${API_BASE_URL}/${API_VERSION}/get-all-teachers`,
  GETALLTEACHERSPUBLIC: `${API_BASE_URL}/${API_VERSION}/get-all-teachers-public`,
  GETTEACHERBYID: `${API_BASE_URL}/${API_VERSION}/get-teacher-by-id/`,
  GETPUBLICTEACHERBYID: `${API_BASE_URL}/${API_VERSION}/get-public-teacher-by-id/`,
  BOOKAPPOINTMENT: `${API_BASE_URL}/${API_VERSION}/book-appointment`,
  GETTEACHERBOOKEDAPPOINTMENTS: `${API_BASE_URL}/${API_VERSION}/get-teacher-booked-appointments`,
  GETUSERBOOKEDAPPOINTMENTS: `${API_BASE_URL}/${API_VERSION}/get-user-booked-appointments`,
  GETTEACHERAPPPOINTMENTCOUNT: `${API_BASE_URL}/${API_VERSION}/get-teacher-appointments-count`,
  GETTEACHERAPPPOINTMENTPUBLICCOUNT: `${API_BASE_URL}/${API_VERSION}/get-public-teacher-appointments-count`,
  UPDATEAPPOINTMENTSTATUS: `${API_BASE_URL}/${API_VERSION}/update-appointment-status`,
  COMPLETEAPPOINTMENTSTATUS: `${API_BASE_URL}/${API_VERSION}/complete-appointment`,
  GETFAVORITETEACHER: `${API_BASE_URL}/${API_VERSION}/get-favorite-teachers`,
  ACCEPTAPPOINTMENT: `${API_BASE_URL}/${API_VERSION}/accept-appointment`,
  DECLINEAPPOINTMENT: `${API_BASE_URL}/${API_VERSION}/decline-appointment`,
  UPDATETEACHERPROFILE: `${API_BASE_URL}/${API_VERSION}/update-teacher-profile`,
  DELETESHIFTSBYID: `${API_BASE_URL}/${API_VERSION}/delete-shift`,
  DELETESCHEDULEBYID: `${API_BASE_URL}/${API_VERSION}/delete-schedule`,
  DELETETEACHER: `${API_BASE_URL}/${API_VERSION}/delete-teacher/`,
  // feedback
  FEEDBACKTEACHER: `${API_BASE_URL}/${API_VERSION}/feedback-teacher`,



  // GIGS
  ADDGIGS: `${API_BASE_URL}/${API_VERSION}/add-gigs`,
  GETGIGSBYTEACHER: `${API_BASE_URL}/${API_VERSION}/get-gigs-by-teacher/`,
  GETGIGBYID: `${API_BASE_URL}/${API_VERSION}/get-gig-by-id/`,
  GETPUBLICGIGBYID: `${API_BASE_URL}/${API_VERSION}/get-public-gig-by-id/`,
  GETALLTEACHERSGIGS: `${API_BASE_URL}/${API_VERSION}/get-all-teachers-gigs`,
  GETPUBLICALLTEACHERSGIGS: `${API_BASE_URL}/${API_VERSION}/get-public-all-teachers-gigs`,
  GETPUBLICGIGSBYTEACHER: `${API_BASE_URL}/${API_VERSION}/get-public-gigs-by-teacher/`,
  DELETEGIGBYID: `${API_BASE_URL}/${API_VERSION}/delete-gig/`,
  UPDATEGIG: `${API_BASE_URL}/${API_VERSION}/update-gig/`,
  RESERVEGIG: `${API_BASE_URL}/${API_VERSION}/reserve-gig`,
  MANAGEGIG: `${API_BASE_URL}/${API_VERSION}/manage-gig-reservation`,
  GETTEACHERRESERVEGIGS: `${API_BASE_URL}/${API_VERSION}/get-teacher-reserved-gigs`,
  GETUSERRESERVEGIGS: `${API_BASE_URL}/${API_VERSION}/get-user-reserved-gigs`,
  GETALLRESERVATIONS: `${API_BASE_URL}/${API_VERSION}/get-all-reservations`,

  // teams
  GETALLTEAMS: `${API_BASE_URL}/${API_VERSION}/get-all-teams`,
  GETPUBLICTEAMSBYEVENT: `${API_BASE_URL}/${API_VERSION}/get-public-teams-by-event/`,
  GETTEAMSBYEVENT: `${API_BASE_URL}/${API_VERSION}/get-teams-by-event/`,
  UPDATETEAMMEMBER: `${API_BASE_URL}/${API_VERSION}/update-team-member`,
  DELETETEAMEMBER: `${API_BASE_URL}/${API_VERSION}/delete-team-member`,
  DELETE_WAITING_MEMBERS:`${API_BASE_URL}/${API_VERSION}/delete-waiting-user`,
  // student
  FAVORITETEACHER: `${API_BASE_URL}/${API_VERSION}/favorite-teacher`,

  //posts
  CREATEPOSTS: `${API_BASE_URL}/${API_VERSION}/create-post`,
  GETPOSTS: `${API_BASE_URL}/${API_VERSION}/get-posts`,
  GETPUBLICPOSTS: `${API_BASE_URL}/${API_VERSION}/get-public-posts`,
  GETPOSTBYID: `${API_BASE_URL}/${API_VERSION}/get-post-by-id/`,
  GETALLPOSTS: `${API_BASE_URL}/${API_VERSION}/get-all-posts`,
  GETPUBLICALLPOSTS: `${API_BASE_URL}/${API_VERSION}/get-public-all-posts`,
  ADDPOSTCOMMENT: `${API_BASE_URL}/${API_VERSION}/add-post-comment`,
  ADDPOSTLIKE: `${API_BASE_URL}/${API_VERSION}/add-post-like`,
  DELETEPOST: `${API_BASE_URL}/${API_VERSION}/delete-post/`,
  UPDATEPOST: `${API_BASE_URL}/${API_VERSION}/update-post/`,
  GETMYPOSTS: `${API_BASE_URL}/${API_VERSION}/get-my-posts`,
  EDITPOSTCOMMENTS: `${API_BASE_URL}/${API_VERSION}/edit-comment`,
  DELETECOMMENTBYID: `${API_BASE_URL}/${API_VERSION}/delete-comment/`,
  GETMOSTCOMMENTSPOSTS: `${API_BASE_URL}/${API_VERSION}/get-top-commented-post`,
  GETMOSTLIKEDPOSTS: `${API_BASE_URL}/${API_VERSION}/get-top-liked-post`,
  GETUSERALLPOSTS: `${API_BASE_URL}/${API_VERSION}/get-user-all-posts/`,
  UPDATEPOSTMEDIA: `${API_BASE_URL}/${API_VERSION}/update-post-media`,

  //location
  GETEVENTPLACE: `${API_BASE_URL}/${API_VERSION}/get-event-places`,
  GETEVENTPLACES: `${API_BASE_URL}/${API_VERSION}/get-public-event-places`,

  // Score 
  GETALLSCORE: `${API_BASE_URL}/${API_VERSION}/get-all-score-cards`,
  GETALLSCOREPUBLIC: `${API_BASE_URL}/${API_VERSION}/get-all-public-score-cards`,
  ADDSCORE: `${API_BASE_URL}/${API_VERSION}/add-score-card`,
  GETSCOREBYEVENTID: `${API_BASE_URL}/${API_VERSION}/get-score-card-by-event/`,
  GETPUBLICSCOREBYEVENTID: `${API_BASE_URL}/${API_VERSION}/get-public-score-card-by-event/`,


  //notification hanlder
  UPDATENOTIFICATIONSTATUS: `${API_BASE_URL}/${API_VERSION}/update-notification-response`,
  UPDATEALLNOTIFICATIONSTATUS: `${API_BASE_URL}/${API_VERSION}/mark-all-notification-as-read`,



  GETEVENTPAYMENT: `${API_BASE_URL}/${API_VERSION}/get-event-payment`,
  GETTEACHERPAYMENT: `${API_BASE_URL}/${API_VERSION}/get-teacher-payment`,

  //chat
  ALLCHAT: `${API_BASE_URL}/${API_VERSION}/all-chat`,
  GETCHAT: `${API_BASE_URL}/${API_VERSION}/get-chat`,
  POSTCHAT: `${API_BASE_URL}/${API_VERSION}/post-chat`,
  UPDATECHATSTATUS: `${API_BASE_URL}/${API_VERSION}/update-chat-status`,
  UPDATEMESSAGESTATUS: `${API_BASE_URL}/${API_VERSION}/update-message-status`,
  DELETEMESSAGE: `${API_BASE_URL}/${API_VERSION}/delete-message`,
  UPDATEMESSAGE: `${API_BASE_URL}/${API_VERSION}/update-message`,
  UPDATEUSERPRESENSE: `${API_BASE_URL}/${API_VERSION}/user-presense`,
  ONLINEUSERS: `${API_BASE_URL}/${API_VERSION}/online-users`,
  PUSHERAUTH: `${API_BASE_URL}/${API_VERSION}/pusher/auth`,
};
