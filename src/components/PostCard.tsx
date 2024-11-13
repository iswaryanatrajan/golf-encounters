import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShareIcon,
  HandThumbUpIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/solid";
import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";
import { postContext } from "../contexts/postsContext";
import {
  EllipsisVerticalIcon,
  HandThumbDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import PostModal from "./PostModel";
import UpdatePost from "./UpdatePost";
import { toast } from "react-toastify";
import { fetchPosts } from "../utils/fetchPosts";
import { useTranslation } from "react-i18next";
import { getTimeAgo } from "../pages/ReadPost";
import ImageComponent from "./ImageComponent";
import PostCardComments from "./comments/PostComments";
import PostProfile from "../components/PostProfilePrompt";
import Pagination from "./Pagination";
import ShareComponent from "./ShareComponent";
interface Post {
  createdAt: string | number | Date;
  id: string;
  tags: string[];
  text: string;
  userId:any;
  posts: any;
  mediaFile: string[];
  imageUrl: string[0];
  PostComments: string[];
  PostLikes: any[];
}

const PostCard = () => {
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();
  const {
    handleDeletePost,
    mostCommented,
    mostLiked,
    handleCategory,
    category,
    handlePosts,
    currentPage,
    count,
    pageSize,
    handleCurrentPage,
    post,
    postLoading,
  } = postContext();
  
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLikesModelOpen, setLikesModelOpen] = useState(false);
  const [commentModelOpen, setCommentModelOpen] = useState(false);

  const uId = localStorage.getItem("id");
  const likes = post.PostLikes || [];

  const isAuthenticated = () => {
    return localStorage.getItem("token");
  };

  const handleInteraction = (event: React.MouseEvent<HTMLElement>, postId: string) => {
    if (!isAuthenticated) {
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
  };

  const [activeDropdownPostId, setActiveDropdownPostId] = useState(null);
  const [activeCommentModel, setActiveCommentModel] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [postwId, setPostwId] = useState("");
  const [shareIcons, setShare] = useState<any>(false);

  const handleMouseEnter = (index: any) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(-1);
  };
  const handleEllipsisClick = (event: any, postId: any) => {
    event.preventDefault();
    setActiveDropdownPostId(activeDropdownPostId === postId ? null : postId);
  };
  const deletePost = (postId: any) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmed) {
      handleDeletePost(postId);
    } else {
      console.log("Post deletion canceled");
    }
  };
  const editPost = (postId: any) => {
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);
  const loggedInUser = localStorage.getItem("id");
  const handleLike = async (postId: string, hasLiked: any, event: any) => {
    event.preventDefault();
    event.stopPropagation();
    if (!isAuthenticated()) {
      navigate("/login-page");
      return;
    }
    try {
      const newCounter = hasLiked ? 0 : 1;
      const response = await axios.post(
        API_ENDPOINTS.ADDPOSTLIKE,
        { postId, Count: newCounter, userId: loggedInUser },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {

        const userEvent = post.map((e: any) =>
          e.PostLikes?.find(
            (like: any) => like.userId === loggedInUser && like.counter === 1
          )
        );

        handlePosts((prev: any) => {
          return prev.map((e: any) => {
            return e.id === postId
              ? {
                  ...e,
                  PostLikes: userEvent
                    ? e.PostLikes.map((like: any) =>
                        like.userId == loggedInUser
                          ? { ...like, counter: like.counter === 1 ? 0 : 1 } 
                          : like
                      )
                    : [
                        ...e.PostLikes,
                        {
                          id: Math.floor(Math.random() * 1000), 
                          counter: newCounter,
                          userId: Number(loggedInUser),
                          postId: postId,
                        },
                      ],
                }
              : e;
          });
        });

        const tt = post.some((item: any) => {
          if (postId === item.id) {
            return item?.PostLikes.some(
              (i: any) => i.userId == loggedInUser && i.counter === 1
            );
          }
        });

        if (!tt) {
          toast.success(t("POST_LIKED"));
        } else {
        
        }
      }
    } catch (error) {
      toast.error(t("MUST_CREATE_GIG"));
    }
  };
  const handleLikes = (postId: string, hasLiked: any, event: any) => {
    event.preventDefault();
    setLikesModelOpen(true);
    setPostwId(postId);
  };
  const sortedPosts = [...post].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    return Number(dateB) - Number(dateA);
  });

  const closeLikesModel = (event: any) => {
    event.preventDefault();
    setLikesModelOpen(false);
  };
  const stripHtmlTags = (html: any) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };
  const handleCommentModel = (e: any, postId: any) => {
    e.preventDefault();
    setActiveCommentModel(activeCommentModel === postId ? null : postId);
  };
  const totalPages = Math.ceil(count / pageSize); 

  console.log(count, "md ");
  return <>
  {postLoading ? (<div className="flex justify-center items-center h-[100vh]">
      <div>
        <img className="w-10 h-10 animate__animated animate__bounce animate__infinite " src="/img/golfball.jpg" alt="" />
        <p>loading...</p>
      </div>

    </div>) : (
    
    <div className="relative grid grid-cols-2 lg:grid grid-flow-col bg-white mt-10 gap-8">
      <div className="row-span-3 col-span-8">
        <PostProfile />
        {sortedPosts.map((post: Post, index: any) => {
          const loggedInUser = JSON.parse(localStorage.getItem("id") || "null");
          const userHasLiked = post.PostLikes.find(
            (like: any) => like.userId === loggedInUser && like.counter === 1
          );
          const postUrl = `${window.location.origin}/read-post/${post.id}`;

          return (
            <div className="w-full">
              <Link
                key={post.id}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                to={`/read-post/${post?.id}`}
                className="text-black hover:rounded-lg "
              >
                {isLikesModelOpen && post?.id === postwId ? (
                  <div className="z-[9999] fixed inset-0 flex items-center justify-center p-4 bg-gray-500 bg-opacity-50 backdrop-blur-sm">
                    <div
                      className="w-full max-w-sm p-6 mx-auto bg-white rounded-lg "
                      style={{
                        boxShadow:
                          "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
                      }}
                    >
                      <button
                        onClick={closeLikesModel}
                        className="p-2 rounded-full cursor-pointer"
                      >
                        <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                      </button>
                      {post.PostLikes.filter(
                        (item: any) => item.counter !== 0
                      ).map((item: any) => (
                        <div
                          key={item.key}
                          className="flex items-center gap-2 m-0 p-0 "
                          
                        >
                          <img
                            className="w-10 h-10 rounded-full"
                            src={item.user?.imageUrl}
                          />
                          <p className="text-black">{item.user?.nickName}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
                <div className="">
                  <div
                    className="col-span-8 mb-8 mx-4 lg:mx-0 lg:flex-col p-4 relative rounded-lg hover:rounded-lg hover:bg-[#17b3a6] hover:text-white"
                    style={{
                      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    }}
                  >
                    <div className="p-4">
                      <div className="flex items-center gap-2 justify-between">
                        <div className="flex items-center  gap-2 hover:text-black" onClick={(e)=>{
                            e.preventDefault();
                            navigate('/user-page/' + post?.userId)
                          }}>
                          <img
                            className="w-8 h-8 rounded-full "
                            src={post.posts?.imageUrl}
                            alt="Post"
                          />

                          <p className="p-0 text-sm flex gap-4 items-center">
                            {post.posts?.nickName}{" "}
                            <span className="text-[10px]">
                              {getTimeAgo(new Date(post?.createdAt),t)}
                            </span>
                          </p>
                        </div>
                        {post.posts?.id === loggedInUser && (
                          <div
                            className="relative"
                            onClick={(event) =>
                              handleEllipsisClick(event, post?.id)
                            }
                          >
                            <EllipsisVerticalIcon
                              className="w-6 h-6 cursor-pointer "
                              aria-hidden="true"
                              onClick={(event) =>
                                handleEllipsisClick(event, post?.id)
                              }
                            />
                            {activeDropdownPostId === post?.id && (
                              <div className="absolute right-[20px] top-0  w-[100px] overflow-hidden bg-white">
                                <ul className="p-0 m-0">
                                  <Link
                                    className="decoration-none text-[#43bcb0] hover:text-[#000] "
                                    to={"/edit-post/" + post.id}
                                  >
                                    <li className="list-none p-2 hover:shadow-lg  text-start">
                                      {t("EDIT_POST")}
                                    </li>
                                  </Link>
                                  <li className="list-none p-2 hover:shadow-lg text-start">
                                    <a
                                      className="decoration-none text-[#43bcb0] hover:text-[red]"
                                      onClick={() => deletePost(post.id)}
                                    >
                                      {t("DELETE")}
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      <div
                        className="p-0 text-sm comment-content overflow-hidden"
                        dangerouslySetInnerHTML={{ __html: post?.text }}
                      ></div>

                      <div className="mt-2">
                        <div className="flex space-x-2">
                          <span
                            className={`bg-[#17b3a6] ${
                              hoveredIndex === index
                                ? "bg-black text-white"
                                : "bg-[#17b3a6] text-white"
                            } hover:bg-black  text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full`}
                          >
                            {post.tags}
                          </span>
                        </div>
                      </div>
                    </div>
                    {post.mediaFile?.[0] && <ImageComponent src={post.mediaFile?.[0]} /> }
                    <div className="flex justify-between items-center mt-4  z-10 relative">
                      <div className="flex item-center">
                        <span
                          className="flex items-center gap-0 text-[10px] hover:bg-black p-1 rounded-lg"
                          onClick={(e) => handleInteraction(e, post.id)}
                          data-interaction="share"
                        ></span>
                      </div>
                    </div>

                    <div className="flex  justify-between z-10 relative items-end	">
                      <div
                        className="flex items-center gap-0   rounded-lg "
                        onClick={(event) =>
                          handleLike(post.id, userHasLiked, event)
                        }
                      >
                        <div>
                          <div
                            className="flex items-center gap-0 hover:bg-black p-0 rounded-lg "
                            onClick={(event) =>
                              handleLikes(post?.id, userHasLiked, event)
                            }
                          >
                            <div className="flex items-center "></div>{" "}
                            <span className="flex items-center gap-2 text-[14px] cursor-pointer">
                              {userHasLiked ? t("BY_YOU") : ""}
                              {uId !== post?.PostLikes[0]?.userId &&
                              post?.PostLikes.length > 1
                                ? userHasLiked
                                  ? " &  "
                                  : post?.PostLikes[0]?.user?.nickName + " & "
                                : "  "}{" "}
                              {post?.PostLikes.length > 0 &&
                                (post?.PostLikes || []).filter(
                                  (like: any) => like.counter
                                ).length +
                                  (userHasLiked ? -1 : 0) +
                                  t("OTHER")}
                            </span>
                          </div>
                          <div className="flex items-center ">
                            <button className="flex items-center cursor-pointer bg-transparent">
                              {userHasLiked ? (
                                <HandThumbUpIcon
                                  className={`w-6 h-6  ${
                                    hoveredIndex === index
                                      ? "text-white "
                                      : "text-[#17b3a6]"
                                  } text-[#17b3a6]`}
                                />
                              ) : (
                                <HandThumbUpIcon
                                  className={`w-6 h-6  ${
                                    hoveredIndex === index
                                      ? "text-white"
                                      : "text-black"  
                                  } `}
                                />
                              )}
                            </button>
                            <span
                              className={`flex items-center gap-2 cursor-pointer ${
                                hoveredIndex === index
                                  ? "text-white "
                                  : "text-[#17b3a6]"
                              } ${
                                userHasLiked ? "text-[#17b3a6]" : "text-black"
                              }`}
                            >
                              {t("LIKE")}
                            </span>
                          </div>{" "}
                        </div>
                      </div>
                      <div>
                        <div className="flex item-center">
                          <span
                            className="flex items-center text-[14px] gap-0 hover:bg-black  rounded-lg"
                            onClick={(e) => handleCommentModel(e, post?.id)}
                            data-interaction="comment"
                          >
                            {" "}
                            {post.PostComments?.length} {t("COMMENTS")}
                          </span>
                        </div>
                        <span
                          className="flex items-center gap-0 hover:bg-black p-0 rounded-lg"
                          onClick={(e) => handleCommentModel(e, post?.id)}
                          data-interaction="comment"
                        >
                          {" "}
                          <EnvelopeIcon
                            className="w-4 h-4 cursor-pointer"
                            aria-hidden="true"
                          />
                          {t("COMMENTS")}
                        </span>
                      </div>

                      <span
                        className="flex items-center gap-0 hover:bg-black p-0 rounded-lg"
                       

                        onClick={(e) => {
                          e.preventDefault();
                          // handleInteraction(e, post.id);
                   

                          setShare(!shareIcons)
                          
                        }}
                        data-interaction="share"
                      >
                        <ShareIcon
                          className="w-4 h-4 cursor-pointer"
                          aria-hidden="true"
                          data-interaction="share"
                        />
                        {t("SHARE")}
                      </span>
                     
                    </div>
                    {
                       shareIcons && <ShareComponent url={post.id} />
                      }
                  </div>
                  
                </div>
              </Link>
              { activeCommentModel == post?.id && (
                <PostCardComments singlePost={post} />
              )}
            </div>
          );
        })}
      {
        <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handleCurrentPage}
        pageSize={pageSize}
        isPreviousDisabled={currentPage === 1}
        isNextDisabled={currentPage === pageSize}
      />
      }
      </div>
 
      <div
        className="hidden lg:block row-span-2 mx-4 lg:mx-0 lg:sticky top-0 col-span-12 px-4 w-[300px]  bg-[#F7F9F9] shadow-lg"
        style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
      >
        <div>
          <h5>{t("TOP_LIKED")}</h5>
          <ul className="p-0">
            {mostLiked?.map((item: any) => {
              return (
                <li
                  key={item.id}
                  className="list-none cursor-pointer py-2 text-[#43bcb0] my-2 px-2 hover:bg-[#EFEFEF] rounded-lg"
                  // style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
                  onClick={() => navigate(`/read-post/${item.id}`)}
                >
                  <div className="flex items-center gap-2">
                  <img
                      className="w-10 h-10 rounded-full"
                      src={item.posts.imageUrl}
                    />
                    <p className="p-0 m-0 text-black">{item.posts.nickName}</p>
                  </div>
                   
                  <div className="flex items-center gap-2 m-0 p-0 ">
                   
                   
                    <div
                      className="p-0 text-sm comment-content overflow-hidden"
                      dangerouslySetInnerHTML={{
                        __html: item?.text
                          ? `${item.text.slice(0, 20).trim()}...`
                          : "",
                      }}
                    >
                      
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <h5>{t("TOP_COMMENTS")}</h5>
          <ul className="p-0">
            {mostCommented?.map((item: any) => {
              return (
                <li
                  onClick={() => navigate(`/read-post/${item.id}`)}
                  className="list-none cursor-pointer py-2 text-[#43bcb0] my-2 px-2 hover:bg-[#EFEFEF] rounded-lg"
                  // style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
                >
                  {" "}
                  <div className="flex items-center gap-2 m-0 p-0 ">
                    <img
                      className="w-10 h-10 rounded-full"
                      src={item.mediaFile[0]}
                    />
                    <div
                      className="p-0 text-sm comment-content overflow-hidden"
                      dangerouslySetInnerHTML={{
                        __html: item?.text
                          ? `${item.text.slice(0, 20).trim()}...`
                          : "",
                      }}
                    ></div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
     
    </div>
  )}
  
  
  </>
};

export default PostCard;
