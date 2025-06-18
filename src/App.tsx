import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useNavigate,
  useLocation,
} from "react-router-dom";
import ScoreBoard from "./pages/ScoreBoard";
import HomePage from "./pages/HomePage";
import OngoingIndiviualScore from "./pages/OngoingIndiviualScore";
import { ToastProvider } from "./utils/ToastProvider";
import StudentPage from "./pages/StudentPage";
import EventMainPage from "./pages/EventMainPage";
import Header from "./components/Header";
import ActivtiesPage from "./pages/ActivtiesPage";
import CreateEvent from "./pages/CreateEvent";
import SideIconMenu from "./components/SideIconMenu";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Logout from "./pages/Logout";
import EditTeamPage from "./pages/EditTeamPage";
import PaymentForm from "./pages/PaymentForm";
import "animate.css";
import BookMarkedEvents from "./pages/BookMarkedEvents";
import JoinedEvents from "./pages/JoinedEvents";
import CreateTeacher from "./pages/CreateTeacher";
import AllNotificationPage from "./pages/AllNotificationsPage";
import AppointmentNotificationPage from "./pages/AppointmentNotification";
import TeacherProfilePage from "./pages/TeacherProfilePage";
import EditTeacher from "./pages/EditTeacher";
import PostPage from "./pages/PostPage";
import CompleteLessonsPage from "./components/CompletedLessons";
import UpcomingLessonsPage from "./components/UpcomingLesson";
import PendingLessonsPage from "./components/PendingLesson";
import ReadPost from "./pages/ReadPost";
import CreatedEvents from "./pages/CreatedEvent";
import AddScorePage from "./pages/AddScorePage";
import ProfilePage from "./pages/Profile";
import { useParams } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PostContext } from "./contexts/postsContext";
import {
  CreatedEventContext,
  EventsContext,
  SingleEventsContext,
} from "./contexts/eventContext";
import { SingleTeamsContext } from "./contexts/teamContext";
import TeacherDetails from "./pages/TeacherDetails";
import TeacherListpage from "./pages/TeachersListPage";
import ScorePage from "./pages/ScorePage";
import { ScoreContextProvider } from "./contexts/scoreContext";
import {
  TeacherContext,
  TeacherDetailsContext,
} from "./contexts/teachersContext";
import UpdatePost from "./components/UpdatePost";
import EditEvent from "./pages/EditEvent";
import UpdateProfilePage from "./pages/EditUserPage";
import { NotificationsContext } from "./contexts/notificationContext";
import UserPage from "./pages/UserPage";
import { UserContext } from "./contexts/authContext";
import Pubnub from "pubnub";
import { ChatSystem } from "./pages/Chat";
import UpdateTeacher from "./pages/UpdateTeacher";
import { TeacherCatalog } from "./pages/TeacherCatalogs";
import { TeacherGigsProvider } from "./contexts/gigsContext";
import UserPosts from "./pages/UserPosts";
import { TeacherAppointments } from "./pages/Appointments";
import AllStripeSessions from "./components/payment/PaymentForm";
import Coupons from "./pages/Coupons";
import CompletedEvents from "./pages/CompletedEvents";
import CompleteProfile from "./pages/CompleteProfile";
import StudentActivitiesNew from "./components/StudentActivitiesNew";
import GigDetails from "./components/GigDetails";
import AllGigs from "./components/AllGigs";
import UpdateGig from "./components/UpdateGig";
import UpdateSchedules from "./components/UpdateSchedules";
import EditTeacherProfile from "./components/EditTeacherPro";
import ReservationDetails from "./components/TeacherReservedGigs"
import ProtectedCreateEvent from "./components/ProtectedCreateEvent"
// import StudentActivitiesPage from "./components/StudentActivitiesPage";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useTranslation } from 'react-i18next';

function App() {

  const action = useNavigationType();
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const [isTeacher, setIsTeacher] = useState(false);
  const tId = localStorage.getItem("teacher_id");
  const { i18n } = useTranslation();

  useEffect(() => {
    // Add a class to the `html` element based on the current language
    document.documentElement.lang = i18n.language;
    document.documentElement.className = i18n.language;
  }, [i18n.language]);



  useEffect(() => {
    const token = localStorage.getItem("token");
    const tokenTimestamp = localStorage.getItem("tokenTimestamp");
    const tokenExpirationTime = 24 * 60 * 60 * 1000;

    if (token && tokenTimestamp) {
      const currentTime = new Date().getTime();
      if (currentTime - parseInt(tokenTimestamp) > tokenExpirationTime) {
        localStorage.clear();
      }
    }
  }, []);

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/ongoing-indiviual-score":
        title = "";
        metaDescription = "";
        break;
      case "/home-page":
        title = "";
        metaDescription = "";
        break;
      case "/score-board":
        title = "";
        metaDescription = "";
        break;
      case "/teacher-page":
        title = "";
        metaDescription = "";
        break;
      case "/event-main-page":
        title = "";
        metaDescription = "";
        break;
      case "/activties-page":
        title = "";
        metaDescription = "";
        break;
      case "/student-page":
        title = "";
        metaDescription = "";
        break;
      case "/create-event":
        title = "";
        metaDescription = "";
        break;
      case "/register-page":
        title = "";
        metaDescription = "";
        break;
      case "/login-page":
        title = "";
        metaDescription = "";
        break;
      case "/logout":
        title = "";
        metaDescription = "";
        break;
      case "/edit-team-page":
        title = "";
        metaDescription = "";
        break;
      case "/pay-now":
        title = "";
        metaDescription = "";
        break;
      case "/booked-mark":
        title = "";
        metaDescription = "";
        break;
      case "/joined-events":
        title = "";
        metaDescription = "";
        break;
      case "/create-teacher":
        title = "";
        metaDescription = "";
        break;
      case "/edit-teacher":
        title = "";
        metaDescription = "";
        break;
      case "/teacher-profile-page":
        title = "";
        metaDescription = "";
        break;
      case "/post-page":
        title = "";
        metaDescription = "";
        break;
      case "/completed-lesson":
        title = "";
        metaDescription = "";
        break;
      case "/upcomming-lesson":
        title = "";
        metaDescription = "";
        break;
      case "/pending-lesson":
        title = "";
        metaDescription = "";
        break;
      case "/created-events":
        title = "";
        metaDescription = "";
        break;
      case "/edit-team":
        title = "";
        metaDescription = "";
        break;
      case "/notification-page":
        title = "";
        metaDescription = "";
        break;
      case "/add-score-page":
        title = "";
        metaDescription = "";
        break;
      case "/profile-page":
        title = "";
        metaDescription = "";
        break;
      case "/teacher-details":
        title = "";
        metaDescription = "";
        break;
      case "/all-teachers":
        title = "";
        metaDescription = "";
        break;
      case "/user-page/":
        title = "";
        metaDescription = "";
        break;
      case "all-teacher-gigs":
        title = "";
        metaDescription = "";
        break;
      case "update-schedules":
        title = "";
        metaDescription = "";
        break;
      case "edit-teacher-profile":
        title = "";
        metaDescription = "";
        break;
      case "teacher-reserved-gigs":
        title = "";
        metaDescription = "";
        break;
    }


    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag: HTMLMetaElement | null = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  var [token, setToken] = useState<any>();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  });

  useEffect(() => {
    const tch = localStorage.getItem("teacher_id");
    const checkTeacher = tch && tch !== "null" ? true : false;
    setIsTeacher(checkTeacher);
  });

  if (token === "undefined") {
    token = false;
  }

  return (
    <ToastProvider iconColor="white" textColor="white">
      <div className="">
        <Header/>
        <SideIconMenu />
        <div className="container mt-[20px] xl:max-w-7xl lg:max-w-4xl md:max-w-2xl max-w-sm mx-auto px-2 md:px-0">
        <Routes>
          <Route path="/event-main-page" element={<EventMainPage />} index />
          <Route path="/event-main-page/:userId" element={<EventMainPage />} index />

          <Route
            path="/ongoing-indiviual-score"
            element={token ? <OngoingIndiviualScore /> : <LoginPage />}
          />
          <Route
            path="/all-teacher-gigs"
            element={token ? <AllGigs /> : <LoginPage />}
          />
          <Route
            path="/teacher-reserved-gigs/:id"
            element={token ? <TeacherDetailsContext> <ReservationDetails /></TeacherDetailsContext> : <LoginPage />}
          />
          <Route
            path="/"
            element={
              <TeacherContext>
                {" "}
                <HomePage />
              </TeacherContext>
            }
          />
          <Route path="/event-main-page" element={<EventMainPage />} />
          <Route
            path="/teacher-activities-page"
            element={
              token ? (
                <TeacherDetailsContext>
                  <ActivtiesPage />{" "}
                </TeacherDetailsContext>
              ) : (
                <LoginPage />
              )
            }
          />
          <Route
            path="/student-activties-page"
            element={
              token ? (
                <TeacherDetailsContext>
                  <StudentActivitiesNew />{" "}
                </TeacherDetailsContext>
              ) : (
                <LoginPage />
              )
            }
          />
          <Route
            path={isTeacher ? "/teacher-page/:id" : "/teacher-page"}
            element={
              token ? (
                isTeacher ? (
                  <TeacherDetailsContext>
                    <UpdateTeacher />
                  </TeacherDetailsContext>
                ) : (
                  <CreateTeacher />
                )
              ) : (
                <LoginPage />
              )
            }
          />
          <Route
            path="/student-page"
            element={
              <TeacherContext>
                <StudentPage />{" "}
              </TeacherContext>
            }
          />
          <Route path="/complete-profile" element={<CompleteProfile />} />
          <Route
            path="/create-event/:id"
            element={token ?   <ProtectedCreateEvent>
    <CreateEvent />
  </ProtectedCreateEvent> : <LoginPage />}
          />
          <Route
            path={isTeacher ? "/update-schedules/:id" : "/teacher-page"}
            element={
              token ? (
                isTeacher ? (
                  <TeacherDetailsContext>
                    <TeacherGigsProvider>
                      <UpdateSchedules />
                    </TeacherGigsProvider>

                  </TeacherDetailsContext>
                ) : (
                  <CreateTeacher />
                )
              ) : (
                <LoginPage />
              )
            }
          />
          <Route
            path={isTeacher ? "/edit-teacher-profile/:id" : "/teacher-page"}
            element={
              token ? (
                isTeacher ? (
                  <TeacherDetailsContext>
                    <EditTeacherProfile />
                  </TeacherDetailsContext>
                ) : (
                  <CreateTeacher />
                )
              ) : (
                <LoginPage />
              )
            }
          />
          <Route
            path="/pay"
            element={token ? <AllStripeSessions /> : <LoginPage />}
          />
          <Route
            path="/coupons"
            element={token ? <Coupons /> : <LoginPage />}
          />
          <Route
            path="/score-board/:id"
            element={
              <ScoreContextProvider>
                <SingleEventsContext>
                  <SingleTeamsContext>
                    <ScoreBoard />
                  </SingleTeamsContext>
                </SingleEventsContext>
              </ScoreContextProvider>
            }
          />
          <Route
            path="/user-page/:id"
            element={
              <UserContext>
                <UserPage />
              </UserContext>
            }
          />
          <Route
            path="/user-posts/:id"
            element={
              <PostContext>
                {" "}
                <UserPosts />{" "}
              </PostContext>
            }
          />
          <Route path="/score-board" element={<ScoreBoard />} />
          <Route
            path="/message-page"
            element={token ? <ChatSystem /> : <LoginPage />}
          />
           <Route
            path="/message-page/:newChat"
            element={token ? <ChatSystem /> : <LoginPage />}
          />
          <Route path="/login-page" element={<LoginPage />} />
          <Route path="/register-page" element={<RegisterPage />} />
          <Route path="/logout" element={<Logout />} />
          <Route
            path="/pay-now/:id"
            element={
              token ? (
                <SingleEventsContext>
                  <PaymentForm onSubmit={(values) => console.log(values)} />
                </SingleEventsContext>
              ) : (
                <LoginPage />
              )
            }
          />
          <Route
            path="/booked-mark"
            element={token ? <BookMarkedEvents /> : <LoginPage />}
          />
          <Route
            path="/joined-events"
            element={token ? <JoinedEvents /> : <LoginPage />}
          />
          <Route
            path="/completed-events"
            element={token ? <CompletedEvents /> : <LoginPage />}
          />
          <Route
            path="/create-teacher"
            element={
              token || token !== "undefined" ? <CreateTeacher /> : <LoginPage />
            }
          />

          <Route
            path="/edit-teacher"
            element={token ? <EditTeacher /> : <LoginPage />}
          />
          <Route
            path="/edit-profile"
            element={token ? <UpdateProfilePage /> : <LoginPage />}
          />
          <Route
            path="/teacher-profile-page"
            element={<TeacherProfilePage />}
          />
          <Route
            path="/post-page"
            element={
              <PostContext>
                <PostPage />
              </PostContext>
            }
          />
          <Route
            path="/edit-post/:id"
            element={
              <PostContext>
                <UpdatePost />
              </PostContext>
            }
          />
          <Route
            path="/completed-lesson"
            element={
              token || token === "undefined" ? (
                <CompleteLessonsPage />
              ) : (
                <LoginPage />
              )
            }
          />
          <Route
            path="/upcomming-lesson"
            element={token ? <UpcomingLessonsPage /> : <LoginPage />}
          />
          <Route
            path="/pending-lesson"
            element={token ? <PendingLessonsPage /> : <LoginPage />}
          />
          <Route
            path="/created-events"
            element={
              token ? (
                <CreatedEventContext>
                  {" "}
                  <CreatedEvents />{" "}
                </CreatedEventContext>
              ) : (
                <LoginPage />
              )
            }
          />
          <Route
            path="/notification-page"
            element={
              token ? (
                <NotificationsContext>
                  <AllNotificationPage />
                </NotificationsContext>
              ) : (
                <LoginPage />
              )
            }
          />
            <Route
            path="/appointment-notification-page"
            element={
              token ? (
                <NotificationsContext>
                  <AppointmentNotificationPage />
                </NotificationsContext>
              ) : (
                <LoginPage />
              )
            }
          />
          <Route
            path="/profile-page"
            element={
              token ? (
                <PostContext>
                  <EventsContext>
                    <CreatedEventContext>
                      <TeacherDetailsContext>
                        <TeacherGigsProvider>
                          <ProfilePage />

                        </TeacherGigsProvider>
                      </TeacherDetailsContext>
                    </CreatedEventContext>
                  </EventsContext>

                </PostContext>
              ) : (
                <LoginPage />
              )
            }
          />
          <Route
            path="/create-catalogs/:id"
            element={
              token && tId ? (




                <TeacherGigsProvider>

                  <TeacherDetailsContext>

                    <TeacherCatalog />
                  </TeacherDetailsContext>
                </TeacherGigsProvider>

              ) : (
                <LoginPage />
              )
            }
          />
          <Route
            path="/teacher-details/:id"
            element={
              <TeacherDetailsContext>
                <TeacherGigsProvider>
                  <TeacherDetails />
                </TeacherGigsProvider>
              </TeacherDetailsContext>
            }
          />
          <Route
            path="/gig/:gigId"
            element={
              <TeacherDetailsContext>
                <TeacherGigsProvider>
                  <GigDetails />
                </TeacherGigsProvider>
              </TeacherDetailsContext>
            }
          />
          <Route
            path="/update-gig/:gigId"
            element={
              <TeacherGigsProvider>
                <UpdateGig />
              </TeacherGigsProvider>
            }
          />
          <Route
            path="/all-teachers"
            element={
              <TeacherContext>
                <TeacherListpage />
              </TeacherContext>
            }
          />
          <Route
            path="/edit-team/:id"
            element={
              <SingleTeamsContext>
                <SingleEventsContext>
                  <EditTeamPage />
                </SingleEventsContext>
              </SingleTeamsContext>
            }
          />
          <Route
            path="/add-score-page/:id"
            element={
              <SingleTeamsContext>
                <SingleEventsContext>
                  <ScoreContextProvider>
                    <AddScorePage />
                  </ScoreContextProvider>
                </SingleEventsContext>
              </SingleTeamsContext>
            }
          />
          <Route
            path="/score-page/:id"
            element={
              <SingleTeamsContext>
                <SingleEventsContext>
                  <ScoreContextProvider>
                    <ScorePage />
                  </ScoreContextProvider>
                </SingleEventsContext>
              </SingleTeamsContext>
            }
          />
          <Route
            path="/read-post/:id"
            element={
              token ? (
                <PostContext>
                  {" "}
                  <ReadPost />
                </PostContext>
              ) : (
                <LoginPage />
              )
            }
          />
          <Route
            path="/appointments"
            element={
              token ? (
                <TeacherDetailsContext>

                  <NotificationsContext>
                    <TeacherAppointments />
                  </NotificationsContext>

                </TeacherDetailsContext>
              ) : (
                <LoginPage />
              )
            }
          />
          <Route
            path="/edit-event/:id"
            element={
              token ? (
                <CreatedEventContext>
                  <SingleEventsContext>
                    <EditEvent />
                  </SingleEventsContext>
                </CreatedEventContext>
              ) : (
                <LoginPage />
              )
            }
          />
        </Routes>
        </div>
      </div>
    </ToastProvider>
  );
}
export default App;
