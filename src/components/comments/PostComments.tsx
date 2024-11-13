import { toast } from "react-toastify";
import { API_ENDPOINTS } from "../../appConfig";
import axios from "axios";
import { useEffect, useState } from "react";
import { addPostComment, fetchSinglePosts } from "../../utils/fetchPosts";
import { postContext } from "../../contexts/postsContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getTimeAgo } from "../../pages/ReadPost";
import { handleDeleteComment } from "../../utils/fetchCommunication";



interface PostCardCommentsProps  {
    singlePost: any;
}

const PostCardComments :React.FC<PostCardCommentsProps> = ({
    singlePost,
})=>{
    const { t, i18n } = useTranslation();
    document.body.dir = i18n.dir();
    const {
      handleDeletePost,
      handleMessage,
      handleCategory,
      category,
      handlePost,
      handlePosts,
      post,
    } = postContext();
    const [isEdit, setIsEdit] = useState<{ [key: string]: boolean }>({});
    const [updateFormData, setUpdateFormData] = useState<any>({
      updatedContent: "",
      commentId: "",
    });
    const [formData, setFormData] = useState<any>({
      content: "",
      postId: singlePost.id,
    });
  
    const currentUserId = localStorage.getItem("id");
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        await addPostComment(formData, handleMessage);
        toast.success(t("COMMENT_SUCCESS"));
       
        setFormData({ ...formData, content: "" });
      } catch (error) {
        toast.error(t("ERROR_ADDING_COMMENT"));
      }
    };
    const [isOpenMap, setIsOpenMap] = useState<{ [key: string]: boolean }>({});
    const toggleDropdown = (commentId: string) => {
      setIsOpenMap((prevState:any) => ({
        [commentId]: !prevState[commentId],
      }));
    };
 
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

      return (<>
      
          {/* comments */}
          <div className=" px-4 ">
                  <form method="post" className=" ">
                    <input type="hidden" name="userId" />
                    <input type="hidden" name="eventId" />

                    {singlePost?.PostComments.map((comment: any) => {
                      const commentTime = new Date(comment.createdAt);
                      const timeAgo = getTimeAgo(commentTime,t);
                      return (
                        <div key={comment.id} className="py-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <img
                                className="w-10 h-10 rounded-full"
                                src={comment.user?.imageUrl}
                                alt=""
                              />
                              <h4 className="inline-flex items-center mr-2 text-sm font-semibold text-gray-900 ">
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
                                  <span className="sr-only">
                                    Comment settings
                                  </span>
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

                                    <a
                                      href="#"
                                      className="block px-4 cursor-pointer py-2 hover:bg-[#17b3a6] hover:text-white "
                                    >
                                      Report
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
                      className="w-[80%] resize-y	 px-1 h-16 px-2 mb-4 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 dark:border-gray-500 dark:focus:border-gray-600"
                    ></textarea>
                    <div className="flex justify-start">
                      <button
                        data-modal-hide="popup-modal"
                        type="submit"
                        onClick={handleSubmit}
                        className="mb-4 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-[#17b3a6] hover:bg-green-600 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                      >
                        {t("POST_COMMENTS")}
                      </button>
                    </div>
                  </form>
                </div>
      
      
      </>);




}
export default PostCardComments;