import { FunctionComponent, useEffect, useState } from "react";
import PostHeader from "../components/PostHeader";

import PostCard from "../components/PostCard";
import { useTranslation } from "react-i18next";
import { postContext } from "../contexts/postsContext";

const PostPage: FunctionComponent = () => {
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
    handlePostId,
  } = postContext();
  

  useEffect(()=>{
    handleCategory("Public");
  },[])

  return (
    <div className="flex justify-center h-full  md:max-w-6xl mx-auto mt-10 font-poppins">
      <div  className="w-full">
        <PostHeader/>
        <PostCard />
        
      </div>
    </div>
  );
};

export default PostPage;
