import React, {  useCallback, useEffect, useState } from 'react';
import { createPost, deletePost, fetchAllPosts, fetchMostCommentedPosts, fetchMostLikedPosts, fetchMyPosts, fetchPosts, fetchSinglePosts,fetchUserPosts } from '../utils/fetchPosts';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';


const PostsContext = React.createContext<any>({});
interface CreatePostType {
    text: string;
    category: string;
    tags: string;
    userId: string | null;
    mediaFiles: File[];
  }

export const PostContext = ({children}:any)=>{
    const [post, setPost] = useState<any[]>([]);
    const [postLoading, setpostLoading]=useState(true)
    const [singlePost, setSinglePost] = useState<any>();
    const [mostLiked, setMostLiked] = useState<any>();
    const [mostCommented, setMostCommented] = useState<any>();
    const [category, setCategory] = useState<string>('Public');
    const token = localStorage.getItem("token");
    const router = useNavigate();
    const [deletePostId, setDeletePostId] = useState<any>();
    const [postId, setPostId] = useState<any>();
    const [message, setMessage] = useState<any>();
    const [pageSize, setPageSize] = useState<any>(6);
    const [currentPage, setCurrentPage] = useState<any>(1);
    const [count, setCount] = useState<any>(null);



    const [formData, setFormData] = useState<CreatePostType>({
        userId: "",
        text: "",
        category: "",
        tags: "",
        mediaFiles: [],
      });

   
    const handleCategory = useCallback((category: string) => {
        if(!token){
            router("/login-page");
        }
        setCurrentPage(1);
        setCategory(category)
        
    }, [category]);
    const handlePostId = useCallback((value: any) => {

        if(!token){
            router("/login-page");
        }
        setPostId(value)
        
    }, [postId])
  
    const handleDeletePost = useCallback((postId: any) => {
        setDeletePostId(postId);
        deletePost(postId, setMessage, router); 
    }, [router]);


    
    const handleCreatePost = () => {
        createPost(formData, setMessage); 
    };
    
    const handlePost = useCallback((value: any) => {
        setSinglePost(value)
    }, [singlePost])

    const { id } = useParams<{ id: string }>();
    const reqObj = {
        currentPage,
        pageSize
    }
    const handleFetchUserPosts = useCallback((userId: any) => {
        setpostLoading(true);
        fetchUserPosts(userId, setpostLoading, navigator);
    }, [reqObj]);
    useEffect(() => {
        setCurrentPage(1);
     }, []);
     useEffect(() => {
        switch (category) {
            case 'MyPost':
                fetchMyPosts(setPost, setpostLoading, navigator);
                break;
            case 'UserPosts': 
               fetchUserPosts(postId, setPost, setpostLoading, navigator);
                break;
            case 'All':
                fetchAllPosts(setPost, reqObj, setpostLoading, navigator, setCount);
                break;
            case 'Public':
            case 'Private':
                fetchPosts(setPost, category, navigator, setCount, setpostLoading, reqObj);
                break;
            default:
                break;
        }
        if(id){

            fetchUserPosts(id, setPost, setpostLoading, navigator);
        }

        console.log(category);
        fetchMostLikedPosts(setMostLiked);
        fetchMostCommentedPosts(setMostCommented);
    }, [category, currentPage, message]);

     const handlePosts = useCallback((post: any) => {
        return setPost(post);
    }, [post,message, handleDeletePost]);

    const handleMessage =  useCallback((value: any) => {
        return setMessage(value);

    }, [message]);
    useEffect(() => {
        if (postId) {
            fetchSinglePosts(handlePost, postId);
        }
    }, [ setSinglePost,message, postId]);
    useEffect(() => {
        if (message) {
            fetchSinglePosts(handlePost, postId);
        }
    }, [message, handleMessage, setMessage]);


    const handleCurrentPage =  useCallback((value: any) => {
        return setCurrentPage(value);
    }, [currentPage]);

    const value =  {handleMessage,handleCurrentPage, handlePostId,setPostId, handlePosts,handlePost, handleDeletePost, handleCategory,handleCreatePost,setFormData,postLoading, currentPage,count, pageSize, mostLiked, mostCommented, formData, singlePost, category, post,handleFetchUserPosts }
   
    return <PostsContext.Provider  value={value}> {children}</PostsContext.Provider>
}

export const postContext = ()=> React.useContext(PostsContext);

