import { useEffect, useState } from "react";
import { addPostComment, fetchSinglePosts } from "../utils/fetchPosts";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API_ENDPOINTS } from "../appConfig";
import axios from "axios";
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
  ShareIcon,
} from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import { hasImageExtension } from "../utils/imgExtension";
import { Slide } from "react-slideshow-image";
import { postContext } from "../contexts/postsContext";
import { handleDeleteComment } from "../utils/fetchCommunication";
import ShareComponent from "../components/ShareComponent";
export interface SinglePostProps {
  posts: any;
  category: string;
  tags: string;
  mediaFile?: any;
  text: string;
  PostComments: any;
  PostLikes: any;
  createdAt: any;
  id: any;
}
export const getTimeAgo = (pastTime: any, t: any) => {
  const currentTime: any = new Date();

  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const elapsed = currentTime - pastTime;

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + " " + t("SEC_AGO");
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + " " + t("MIN_AGO");
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + " " + t("HOUR_AGO");
  } else if (elapsed < msPerMonth) {
    return "" + Math.round(elapsed / msPerDay) + " " + t("DAYS_AGO")
  } else if (elapsed < msPerYear) {
    return "" + Math.round(elapsed / msPerMonth) + " " + t("MONTH_AGO");
  } else {
    return "" + Math.round(elapsed / msPerYear) + " " + t("YEAR_AGO");
  }
};
const ReadPost: React.FC = () => {
  const { handlePostId, handleMessage, handlePost, singlePost, message } =
    postContext();

  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();
  const params = useParams<{ id?: string }>();
  const postId = params.id;
  const [formData, setFormData] = useState<any>({
    content: "",
    postId: postId,
  });
  const [updateFormData, setUpdateFormData] = useState<any>({
    updatedContent: "",
    commentId: "",
  });

  useEffect(() => {
    if (postId) {
      handlePostId(postId);
    }
  }, [postId]);
  const [userHasLiked, setUserHasLiked] = useState<any>(false);
  const [localEvents, setLocalEvents] = useState<any>([]);
  const [isOpenMap, setIsOpenMap] = useState<{ [key: string]: boolean }>({});
  const currentUserId = localStorage.getItem("id");
  const [shareIcons, setShare] = useState<any>(false);
  const [isEdit, setIsEdit] = useState<{ [key: string]: boolean }>({});

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

  useEffect(() => {
    if (singlePost) {
      const loggedInUser = JSON.parse(localStorage.getItem("id") || "null");
      setUserHasLiked(
        singlePost.PostLikes.some(
          (like: any) => like.userId === loggedInUser && like.counter === 1
        )
      );
    }
  }, [singlePost]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addPostComment(formData, handleMessage);
      toast.success(t("COMMENT_SUCCESS"));
      fetchSinglePosts(handlePost, postId!);
      setFormData({ ...formData, content: "" });
    } catch (error) {
      toast.error(t("ERROR_ADDING_COMMENT"));
    }
  };
  const likescount = singlePost?.PostLikes.length;
  const handleLike = async () => {
    try {
      const loggedInUser = JSON.parse(localStorage.getItem("id") || "");
      const likes = singlePost?.PostLikes || [];
      const userPosts = likes?.find(
        (like: any) => like.userId === loggedInUser
      );
      // console.log(singlePost?.PostLikes, "s");
      const newCounter = userPosts?.counter === 1 ? 0 : 1;

      // console.log(likes, "true or false");
      const response = await axios.post(
        API_ENDPOINTS.ADDPOSTLIKE,
        { postId: postId, Count: newCounter, userId: loggedInUser },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        setUserHasLiked(!userHasLiked);
        // fetchSinglePosts(handlePost, postId);
        setLocalEvents((prev: any) =>
          prev.map((e: any) =>
            e.id === singlePost?.id
              ? {
                ...e,
                likes: userPosts
                  ? likes.map((like: any) =>
                    like.userId === loggedInUser
                      ? { ...like, counter: newCounter }
                      : like
                  )
                  : [
                    ...likes,
                    {
                      counter: newCounter,
                      userId: loggedInUser,
                      id: Math.floor(Math.random() * 10),
                    },
                  ],
              }
              : e
          )
        );
      }
    } catch (error) {
      toast.error(t("ERROR_UPDATE_LIKES"));
    }
  };

  const toggleDropdown = (commentId: string) => {
    setIsOpenMap((prevState) => ({
      [commentId]: !prevState[commentId],
    }));
  };

  const postTime = new Date(singlePost?.createdAt);
  const timeAgo = getTimeAgo(postTime, t);

  var settings = {
    dots: true,
    speed: 500,
    slidesToShow: 1,

    initialSlide: 1,
    arrows: false,
  };
  // useEffect(() => {
  //   if (singlePost) {
  //     setFormData({
  //       content: singlePost.PostComments.map((item: any) => item.content),
  //       postId: postId,
  //     });
  //   }
  // }, [singlePost]);

  const navigate = useNavigate();
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
  const isAuthenticated = () => {
    return localStorage.getItem("token");
  };
  const handleInteraction = (event: React.MouseEvent<HTMLElement | SVGSVGElement>, postId: string) => {
    if (!isAuthenticated()) {
      navigate("/login-page");
      return;
    }
    const interactionType = event.currentTarget.getAttribute("data-interaction");

    if (interactionType === "share") {
      const postUrl = `${window.location.origin}/read-post/${postId}`;
      navigator.clipboard.writeText(postUrl).then(() => {
        toast.success("Post URL has been copied to clipboard!");
      }).catch(err => {
        console.error("Failed to copy the URL:", err);
      });
    }
  }
  return (
    <div
      className="mx-6 md:mx-auto max-w-7xl px-6  my-4 py-4"
      style={{
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
      }}
    >
      <div className="flex gap-2 items-center py-4 justify-between">
        <div
          className="flex gap-2 items-center cursor-pointer  py-4"
          onClick={(e) => {
            e.preventDefault();
            navigate("/user-page/" + singlePost?.userId);
          }}
        >
          <img
            className="w-16 h-16 rounded-full "
            src={singlePost?.posts.imageUrl}
            alt="Post"
          />
          <div>
            <h4 className="m-0 font-medium text-lg hover:text-[#17b3a6]  uppercase text-[#565656]">
              {singlePost?.posts.nickName}
            </h4>
            <p className="m-0 p-0 text-sm">{timeAgo}</p>
          </div>
        </div>

        <div>
          <Link to="/post-page" className="">
            <button
              type="button"
              className="bg-[#17b3a6] hover:bg-blue-700 text-white font-bold py-2 px-2 rounded cursor-pointer"
            >
              {t("BACK")}
            </button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="col-span-8  ">
          <div
            className="mb-4"
            dangerouslySetInnerHTML={{ __html: singlePost?.text ?? "" }}
          />
          {singlePost?.mediaFile?.map((img: string, index: number) => {
            if (singlePost?.mediaFile?.length === 1) {
              return (
                <img
                  className="w-full h-[300px] xl:h-[600px] rounded-lg"
                  src={img}
                  alt="Blog Post Image"
                />
              );
            }
          })}
          <Slider {...settings}>
            {singlePost?.mediaFile?.map((img: string, index: number) => {
              if (singlePost?.mediaFile?.length === 1) {
                return;
              } else {
                return (
                  <div key={`multiple-${index}`}>
                    {" "}
                    {/* Ensure key is unique and at the top element */}
                    {hasImageExtension(img) ? (
                      <img
                        className="w-full h-[300px] xl:h-[600px] rounded-lg"
                        src={img}
                        alt="Blog Post Image"
                      />
                    ) : (
                      <video
                        controls
                        className="w-full h-[300px] xl:h-[600px] rounded-lg"
                        src={img}
                      />
                    )}
                  </div>
                );
              }
            })}
          </Slider>
        </div>
        <div className="col-span-4">
          <div>
            <div className="  ">
              <form method="post" className=" ">
                <input type="hidden" name="userId" />
                <input type="hidden" name="eventId" />

                {singlePost?.PostComments.map((comment: any) => {
                  const commentTime = new Date(comment.createdAt);
                  const timeAgo = getTimeAgo(commentTime, t);
                  return (
                    <div key={comment.id} className="py-4">
                      <div className="flex items-center justify-between">
                        <div
                          className="flex items-center gap-4 cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate("/user-page/" + comment?.userId);
                          }}
                        >
                          <img
                            className="w-10 h-10 rounded-full"
                            src={comment.user.imageUrl}
                            alt=""
                          />
                          <h4 className="inline-flex items-center hover:text-[#17b3a6] mr-2 text-sm font-semibold text-gray-900 ">
                            {comment.user.nickName}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {timeAgo}
                          </p>
                        </div>
                        <div className="relative inline-block text-left">
                          {currentUserId == comment.userId && (
                            <button
                              id={`dropdownCommentButton-${comment.id}`} // Ensure unique ID for each comment
                              onClick={() => toggleDropdown(comment.id)} // Pass comment ID to toggle function
                              className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg dark:text-gray-400 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50  dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
                              <span className="sr-only">Comment settings</span>
                            </button>
                          )}
                          {isOpenMap[comment.id] && (
                            <div
                              id="dropdownComment1"
                              className="z-99 origin-top-right absolute right-0 mt-2 w-36 bg-white divide-y divide-gray-100 rounded shadow "
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
                                    handleDeleteComment(comment.id, comment.userId, handleMessage, setIsEdit)

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

                      <div>
                        <div className="p-0 pl-14 m-0 text-gray-500 dark:text-gray-400">
                          {isEdit[comment.id] ? (
                            <form onSubmit={handleEditForm}>
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
                                className="w-full px-1 h-16 px-2 mb-4 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 dark:border-gray-500 dark:focus:border-gray-600"
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
                                  onClick={handleEditForm}
                                  className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-[#17b3a6] hover:bg-green-600 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                                >
                                  {t("UPDATE_COMMENT")}
                                </button>
                                <button
                                  data-modal-hide="popup-modal"
                                  type="submit"
                                  onClick={() => {
                                    setIsEdit({ false: false });
                                  }}
                                  className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-[#17b3a6] hover:bg-green-600 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                                >
                                  {t("CLOSE_COMMENT")}
                                </button>
                              </div>
                            </form>
                          ) : (
                            <p className="comment-content p-0 m-0 text-gray-500 dark:text-gray-400">
                              {comment.content}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className="flex items-center justify-between ">
                  <h4 className="">{t("ADD_COMMENTS")}</h4>
                </div>
                <textarea
                  name="content"
                  id=""
                  value={formData.content}
                  placeholder={t("WRITE_COMMENTS")}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  className="w-full px-1 h-16 px-2 mb-4 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 dark:border-gray-500 dark:focus:border-gray-600"
                ></textarea>
                <div className="flex justify-start">
                  <button
                    data-modal-hide="popup-modal"
                    type="submit"
                    onClick={handleSubmit}
                    className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-[#17b3a6] hover:bg-green-600 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                  >
                    {t("POST_COMMENTS")}
                  </button>
                </div>
              </form>
              <div className="flex gap-4 items-center my-10">
                <div className="flex items-center gap-0">
                  <div className="flex items-center">
                    <button
                      onClick={handleLike}
                      className="flex items-center cursor-pointer bg-transparent"
                    >
                      {userHasLiked ? (
                        <HandThumbUpIcon className="w-6 h-6 text-[#17b3a6]" />
                      ) : (
                        <HandThumbUpIcon className="w-6 h-6 text-gray-500" />
                      )}
                    </button>
                  </div>{" "}
                  {
                    (singlePost?.PostLikes || []).filter(
                      (like: any) => like.counter
                    ).length
                  }{" "}
                  {t("LIKES")}
                </div>

                <span
                  className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer"
                  data-interaction="share"
                  onClick={(e) => {
                    e.preventDefault();
                    // handleInteraction(e, post.id);


                    setShare(!shareIcons)

                  }}
                >
                  {" "}
                  <ShareIcon
                    className="w-4 h-4 cursor-pointer"
                    aria-hidden="true"

                    data-interaction="share"
                  />
                  {t("SHARE")}
                </span>
              </div>
              {
                shareIcons && <ShareComponent url={singlePost?.id} justify="start"/>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadPost;
