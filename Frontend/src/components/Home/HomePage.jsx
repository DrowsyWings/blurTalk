import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../Header.jsx';
import Sidebar from '../Sidebar.jsx';
import BlogPost from './BlogPost.jsx';
import SkeletonBlogPost from '../Skeleton/Skeleton.jsx';

function HomePage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!localStorage.getItem("blur-talk-user")) {
      navigate("/login");
    } else {
      fetchPosts();
    }
  }, []);

  const fetchPosts = async () => {
    if (!hasMore) return;
    try {
      const response = await axios.get('http://localhost:3000/api/post', {
        params: { limit: 10, page }
      });
      
      if (response.data.success) {
        setPosts(prevPosts => [...prevPosts, ...response.data.posts]);
        setHasMore(response.data.hasMore);
        setPage(prevPage => prevPage + 1);
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      toast.error('Failed to fetch posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight * 1.5 && !loading && hasMore) {
      setLoading(true);
      fetchPosts();
    }
  };

  return (
    <div className='bg-[#131324] min-h-screen font-poppins'>
      <Header />
      <div className='flex w-full'>
        <Sidebar />
        <div className='w-full flex flex-col items-center overflow-y-auto h-[91vh]' onScroll={handleScroll}>
          <div className='w-2/3 py-8'>
            {posts.map(post => (
              <BlogPost key={post._id} post={post} />
            ))}
            {loading && (
              <>
                <SkeletonBlogPost />
                <SkeletonBlogPost />
                <SkeletonBlogPost />
              </>
            )}
            {!hasMore && posts.length > 0 && <p className='text-white text-center'>No more posts to load</p>}
            {!loading && posts.length === 0 && <p className='text-white text-center'>No posts available</p>}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default HomePage;