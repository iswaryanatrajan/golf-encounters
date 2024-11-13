import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Channel,
  Chat,
  Message,
  MixedTextTypedElement,
  TimetokenUtils,
  User,
} from "@pubnub/chat";
import "./app.css";
import { getAllUsers } from "../utils/fetchUser";
import { userAuthContext } from "../contexts/authContext";
import PubNub from "pubnub";

export default function ChatApp() {
  const { chatUser } = userAuthContext();

  const [chat, setChat] = useState<Chat>();
  const [text, setText] = useState("");
  const [channel, setChannel] = useState<Channel>();
  const [messages, setMessages] = useState<Message[]>([]);
  const messageListRef = useRef<HTMLElement>(null);
  const [users, setUsers] = useState<any>([]);
  const [unreadMessages, setUnreadMessages] = useState<any>({});

  useEffect(() => {
    console.log(unreadMessages[Number(localStorage.getItem('id'))], 'ume')
  }, [messages, unreadMessages])

  const userData = users?.map((user: any) => {
    return {
      id: user?.id.toString(),
      data: {
        name: user.nickName,
        custom: { initials: "SA", avatar: "#9fa7df" },
      },
    };
  });
  const randomizedUsers = Math.random() < 0.5 ? userData : userData.reverse();

  async function handleSend(event: React.SyntheticEvent) {
    event.preventDefault();
    if (!text || !channel) return;
    await channel.sendText(text);
    setText("");
  }

  console.log(typeof chatUser, "chat user");
  useEffect(() => {
    getAllUsers(setUsers);
  }, []);
  console.log(users, ";usu");
  useEffect(() => {
    if (!messageListRef.current) return;
    messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (!channel) return;
    return channel.connect((message: any) => {
      setMessages((messages) => [...messages, message]);
      if (message.user.id !== chatUser) {
        setUnreadMessages((prevUnread: any) => ({
          ...prevUnread,
          [message.user.id]: (prevUnread[message.user.id] || 0) + 1,
        }));
      }
    });
  }, [channel]);

  // console.log(channel)
  async function handleMessage(message: Message) {
    if (chat && !users.find((user: any) => user.id === message.userId)) {
      const user = await chat.getUser(message.userId);
      if (user) setUsers((prev: any) => [...prev, user]);
    }
    setMessages((messages) => [...messages, message]);
  }
  const hash = document.location.hash.split("?")[1];
    const params = new URLSearchParams(hash);
    const uuid = params.get("uuid");

  const pubnubKeys = {
    publishKey: params.get("pubkey") || (process.env.REACT_APP_PUB_KEY),
    subscribeKey: params.get("subkey") || (process.env.REACT_APP_SUB_KEY),
};

  useEffect(() => {
   

    async function initalizeChat() {
    
      const chat = await Chat.init({
        publishKey: pubnubKeys.publishKey,
        subscribeKey: pubnubKeys.subscribeKey || "",
        userId: localStorage.getItem("id") || "",
      });

      const interlocutor =
        (await chat.getUser(chatUser)) ||
        (await chat.createUser(
          chatUser,
          users.find((item: any) => item.id == chatUser)
        ));
      const { channel } = await chat.createDirectConversation({
        user: interlocutor,
        channelData: { name: chatUser },
      });
      setChat(chat);
      // setUsers([chatUser, interlocutor])
      setChannel(channel);

      const channelHistory = await channel.getHistory({ count: 10 });
      setMessages([]);
      channelHistory.messages.forEach(async (histrocialMessage) => {
        await handleMessage(histrocialMessage);
      });
    }

    initalizeChat();
  }, [chatUser]);

  const renderMessagePart = useCallback(
    (messagePart: MixedTextTypedElement) => {
      if (messagePart.type === "text") {
        return messagePart.content.text;
      }
      if (messagePart.type === "plainLink") {
        return (
          <a href={messagePart.content.link}>{messagePart.content.link}</a>
        );
      }
      if (messagePart.type === "textLink") {
        return (
          <a href={messagePart.content.link}>{messagePart.content.text}</a>
        );
      }
      if (messagePart.type === "mention") {
        return (
          <a href={`https://pubnub.com/${messagePart.content.id}`}>
            {messagePart.content.name}
          </a>
        );
      }

      return "";
    },
    []
  );

  if (!chat || !channel) return <p>Loading...</p>;

  return (
    <main className="bg-gray-200 flex flex-col rounded-md w-4/5 h-[87vh] p-4 shadow-lg ">
      <header className="flex bg-white justify-between items-center p-4 mb-4 shadow-md rounded-lg" >
      {messages.map((message) => {
            const user = users.find((user: any) => user.id == message.userId);
            return (
              <li className={`flex items-center ${localStorage.getItem('id') == user.id ? "" : "justify-end"} gap-2`} key={message.timetoken}>
            
                <article>
                
              
                  
                </article>
                {localStorage.getItem('id') != user.id && <div className="flex items-center gap-4 capitalize ">
                  <div>
                    <img
                      src={user?.imageUrl}
                      className="rounded-full w-10 h-10"
                      alt=""
                    />
                  </div>
                  {user?.nickName}
                </div>}
              </li>
            );
          })}
      </header>

      <section
        className="flex flex-col h-full justify-end overflow-y-auto message-list bg-white shadow-inner rounded-lg p-4"
        ref={messageListRef}
      >
        <ol className="max-h-full p-4 ml-6">
          {messages.map((message) => {
            const user = users.find((user: any) => user.id == message.userId);
            return (
              <li className={`flex items-center ${localStorage.getItem('id') == user.id ? "" : "justify-end"} gap-2`} key={message.timetoken}>
                {localStorage.getItem('id') == user.id && <div className="">
                  <div>
                    <img
                      src={user?.imageUrl}
                      className="rounded-full w-10 h-10"
                      alt=""
                    />
                  </div>
                  {user?.nickName}
                </div>}
                <article>
                  <h3>
                    {user?.name}
                    <time className="text-sm font-light">
                      {TimetokenUtils.timetokenToDate(
                        message.timetoken
                      ).toLocaleTimeString([], {
                        timeStyle: "short",
                      })}
                    </time>
                  </h3>
                  <p>
                    {message
                      .getLinkedText()
                      .map((messagePart: MixedTextTypedElement, i: number) => (
                        <span key={String(i)}>
                          {renderMessagePart(messagePart)}
                        </span>
                      ))}
                  </p>
                  
                </article>
                {localStorage.getItem('id') != user.id && <div className="">
                  <div>
                    <img
                      src={user?.imageUrl}
                      className="rounded-full w-10 h-10"
                      alt=""
                    />
                  </div>
                  {user?.nickName}
                </div>}
              </li>
            );
          })}
        </ol>
      </section>

      <form className="flex p-8 message-input" onSubmit={handleSend}>
        <input
          type="text"
          value={text}
          className="bg-white w-full rounded-md border-none p-3"
          onChange={(e) => setText(e.target.value)}
          placeholder="Send message"
        />
        <input
          type="submit"
          value="➔"
          className="cursor-pointer ml-2 w-auto bg-[#17b3a6] text-white rounded-lg"
          onClick={handleSend}
          style={{ color: text && "white" }}
        />
      </form>
    </main>
  );
}
