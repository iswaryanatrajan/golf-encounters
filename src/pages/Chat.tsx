import ChatWrapper from "../chat/chatWrapper"
import AllUserChat from "../components/chat/ListUsers"
import { UsersList } from "../components/chat/UsersList"
// import ChatApp from "./ChatBox"
import Messages from "../components/chat/Messages"
import { userAuthContext } from "../contexts/authContext"

export const ChatSystem = () => {
    const {
        handleSelectedUser,
        receiver,
        handleNotificationCount,
        notificationCount,
        handleReceiver,
        handleChatId,
        activeChatId,
        allChat,
        handleLoading,
        loading,
    } = userAuthContext();
    const handleBack = () => {
        handleChatId(false)
    }
    return (
        <div className={`max-w-7xl md:flex block  custom-scrollbar  items-start mx-auto   rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark`} >
            {/* {activeChatId && <button onClick={
                handleBack
            }>
                back
            </button>} */}
            <AllUserChat />
            <Messages />

        </div>
    )
}