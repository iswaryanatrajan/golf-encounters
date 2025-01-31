import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_ENDPOINTS } from "../appConfig";
import { useToast } from "../utils/ToastProvider";
import {
  eventContextStore,
  singleEventContextStore,
  SingleEventsContext,
} from "../contexts/eventContext";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { getTimeAgo } from "../pages/ReadPost";
import {
  handleDeleteComment,
 
} from "../utils/fetchCommunication";
interface CommentModelProps {
  eventIsd?: any;
  closeModal: () => void;
}

interface AddComment {
  userId: any;
  eventId: any;
  content: any;
}

interface Comment {
  id: any;
  content: any;
  userId: any;
  createdAt: Date;
  eventIsd: any;
}

interface Event {
  id: any;
  creator: {
    nickName: any;
  };
  isFavorite: Boolean;
  comments: Comment[];
  accountHolderName: string;
  eventStartTime: string;
  eventStartDate: string;
  eventName: string;
  eventDetails: string;
  type: string;
  place: string;
  imageUrl: string;
  likes: Array<{
    counter: number;
    userId: string;
    id: number;
  }>;
}

const CommentModel: React.FC<CommentModelProps> = ({ closeModal, eventIsd }) => {
  const { singleEvent, handleSingleEventID, handleMessage } =
    singleEventContextStore();
  const [isOpenMap, setIsOpenMap] = useState<{ [key: string]: boolean }>({});

  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();
  const { showToast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [commentData, setCommentData] = useState<{
    userId: number;
    content: string;
    createdAt: string;
  }>({
    userId: 0,
    content: "",
    createdAt: "",
  });
  const [commentsToShow, setCommentsToShow] = useState(2);
  const currentUserId = localStorage.getItem("id");

  const token = localStorage.getItem("token");
  const uid = localStorage.getItem("id");
  const [formData, setFormData] = useState<AddComment>({
    userId: uid,
    eventId: eventIsd,
    content: "",
  });

  useEffect(() => {
    handleSingleEventID(eventIsd);
    setFormData((prev: any) => ({
      ...prev,
      userId: uid,
      eventId: eventIsd,
      content: "",
    }))
  }, [eventIsd]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedContent = formData.content.trim();
    if (submitting || !formData.content.trim()) {
      return;
    }

    setSubmitting(true);

    try {
      const response = await axios.post(API_ENDPOINTS.ADDCOMMENT, formData, {

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 201) {
        toast.success(response.data.message);

        handleMessage(response.data);
        setFormData({
          userId: uid,
          eventId: eventIsd,
          content: "",
        });
      }

      // setFormData({ userId: uid,
      //   eventId: eventId,
      //   content: "",});
    } catch (error) {
      toast.error(t("GETTING_ERROR", "red"));
    } finally {
      setSubmitting(false);
    }
  };

  const loadMoreComments = () => {
    setCommentsToShow(singleEvent?.comments?.length);
  };
  const toggleDropdown = (commentId: string) => {
    setIsOpenMap((prevState) => ({
      [commentId]: !prevState[commentId],
    }));
  };
  const [isEdit, setIsEdit] = useState<{ [key: string]: boolean }>({});
  const [updateFormData, setUpdateFormData] = useState<any>({
    updatedContent: "",
    commentId: "",
  });

  const handleEditComment = (commentId: string, content: any) => {
    setIsOpenMap((prevState) => ({
      [commentId]: false,
    }));
    setIsEdit((prevState) => ({
      [commentId]: !prevState[commentId],
    }));

    if (isEdit) {
      setUpdateFormData((prevState: any) => ({
        commentId: commentId,
        content: content,
      }));
    }
  };
  const handleEditForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        API_ENDPOINTS.EDITPOSTCOMMENTS,
        {
          commentId: updateFormData.commentId,
          content: updateFormData.content,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setIsEdit((prevState: any) => ({
        false: false,
      }));
      if (response.status === 200) {
        handleMessage(response.data.updatedComment.content);
        toast.success(t("COMMENT_UPDATE"));
      }
    } catch (error) {
      toast.error(t("ERROR_UPDATE_LIKES"));
    }
  };
  return (
    <>
      <td
        colSpan={8}
        id="popup-modal"
        tabIndex={-1}
        className="p-2 max-w-7xl mx-auto  bg-white rounded-lg shadow-lg mt-[-10px] "
      >
        <div className="col-span-12 ">
          <div className="flex items-center justify-between mx-4 z-[-1]">
            {token ? (
              <h2 className="mx-4 text-[15px]">{t("ADD_COMMENTS")}</h2>
            ) : (
              <h2 className="mx-4 text-[15px]">Recent Comments</h2>
            )}
            <button
              type="button"
              className="flex items-center justify-center w-7 h-7 p-2 text-white bg-blue-500 rounded-full shadow-lg cursor-pointer hover:bg-blue-600 hover:text-white-900 "
              data-modal-hide="popup-modal"
              onClick={closeModal}
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="relative max-h-full p-4 ">
            {token && (
              <form method="post" className="mx-4  " onSubmit={handleSubmit}
              >
                <input type="hidden" name="userId" />
                <input type="hidden" name="eventId" />

                <textarea
                  name="content"
                  id=""
                  placeholder={t("WRITE_COMMENTS")}
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  required
                  className="w-full h-16 p-2 mb-4 text-lg font-medium  border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 "
                ></textarea>
                <div className="flex justify-start">
                  <button
                    data-modal-hide="popup-modal"
                    type="submit"
                    className="inline-flex items-center py-4 px-6 text-xs font-medium text-center text-white bg-blue-500  rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-blue-600"
                  >
                    {t("POST_COMMENTS")}
                  </button>
                </div>
              </form>
            )}
            <div key={singleEvent.id} className="p-2">
              {singleEvent?.comments
                ?.slice(0, commentsToShow)
                .map((comment: any) => {
                  if (comment.eventId === eventIsd) {
                    return (
                      <div key={comment.id} className="py-4">
                        <div className="grid grid-cols-3 items-start gap-[25px]">
                          <div className="flex col-span-2 items-start gap-4">
                            <img
                              className="w-10 h-10 rounded-full"
                              src={comment.user?.imageUrl}
                              alt=""
                            />
                            <div className="w-full">
                              <div className="grid grid-row-2 grid-cols-1 p-4 rounded-xl bg-slate-100">
                                {!isEdit[comment.id] && (
                                  <h3 className="inline-flex items-center m-0 font-semibold text-gray-900 text-[12px]">
                                    {comment.user?.nickName}
                                  </h3>
                                )}
                                {isEdit[comment.id] ? (
                                  <form
                                    className=""
                                    // onSubmit={(e) => {
                                    //   handleEditForm(
                                    //     e,
                                    //     setIsEdit,
                                    //     handleMessage,
                                    //     updateFormData
                                    //   );
                                    // }}
                                  >
                                    <textarea
                                      name="editContent"
                                      id=""
                                      value={updateFormData?.content}
                                      onChange={(e) => {
                                        setUpdateFormData({
                                          commentId: comment.id,
                                          content: e.target.value,
                                        });
                                      }}
                                      className="w-[90%] resize-none h-16 mb-4 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300"
                                    ></textarea>
                                    <input
                                      type="hidden"
                                      name="commentId"
                                      value={comment.id}
                                    />
                                    <div className="flex gap-2">
                                      <button
                                        data-modal-hide="popup-modal"
                                        type="submit"
                                        onClick={(e) => handleEditForm(e)}
                                        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-[#17b3a6] hover:bg-green-600 rounded-lg focus:ring-4 focus:ring-primary-200  hover:bg-primary-800"
                                      >
                                        {t("UPDATE_COMMENT")}
                                      </button>

                                      <button
                                        data-modal-hide="popup-modal"
                                        type="submit"
                                        onClick={() => {
                                          setIsEdit({ false: false });
                                        }}
                                        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-[#17b3a6] hover:bg-green-600 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800"
                                      >
                                        {t("CLOSE_COMMENT")}
                                      </button>
                                    </div>
                                  </form>
                                ) : (
                                  <p className="comment-content text-[12px] p-0 m-0 text-gray-500 ">
                                    {comment.content}
                                  </p>
                                )}
                              </div>
                              <p className="col-start-2  text-[12px] text-gray-600 ">
                                {getTimeAgo(new Date(comment.createdAt), t)}
                              </p>
                            </div>
                          </div>
                          <div className="relative">
                            {currentUserId == comment.userId && (
                              <button
                                id="dropdownComment1Button"
                                data-dropdown-toggle="dropdownComment1"
                                onClick={() => toggleDropdown(comment.id)} // Pass comment ID to toggle function
                                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg  hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50  "
                                type="button"
                              >
                                <svg
                                  className="w-4 h-4"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 16 3"
                                >
                                  <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                </svg>
                                <span className="sr-only">
                                  Comment settings
                                </span>
                              </button>
                            )}
                            {isOpenMap[comment.id] && (
                              <div
                                id="dropdownComment1"
                                className="z-99 left-0 origin-top-right absolute right-0 mt-2 w-36 bg-white divide-y divide-gray-100 rounded shadow "
                              >
                                <div
                                  className="py-1 text-sm text-gray-700 "
                                  aria-labelledby="dropdownComment1Button"
                                >
                                  <a
                                    type="button"
                                    onClick={() =>
                                      handleEditComment(
                                        comment.id,
                                        comment.content
                                      )
                                    }
                                    className="block px-4 cursor-pointer py-2 hover:bg-[#17b3a6] hover:text-white "
                                  >
                                    Edit
                                  </a>

                                  <a
                                    type="button"
                                    onClick={() =>
                                      handleDeleteComment(
                                        comment.id,
                                        comment.userId,
                                        handleMessage,
                                        setIsEdit
                                      )
                                    }
                                    className="block px-4 cursor-pointer py-2 hover:bg-[#17b3a6] hover:text-white "
                                  >
                                    Remove
                                  </a>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
            </div>
            {singleEvent?.comments?.length > commentsToShow && (
              <div className="">
                <button
                  className="text-white text-[16px] bg-[#17b3a6] p-1 rounded-sm  cursor-pointer text-left hover:underline  flex justify-center items-center"
                  onClick={loadMoreComments}
                >
                  {t("LOAD_COMMENTS")}
                </button>

                <p className="text-gray-500 text-[12px] cursor-pointer text-right hover:underline">
                  2 of {singleEvent?.comments?.length}
                </p>
              </div>
            )}
          </div>
        </div>
      </td>
    </>
  );
};

export default CommentModel;
