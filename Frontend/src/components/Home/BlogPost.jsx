import React from "react";

function BlogPost({ post }) {
  return (
    <div className="bg-[#1a1a35] rounded-lg p-6 mb-6 text-white">
      <h2 className="text-2xl font-bold mb-4">
        {post.title.slice(0, 50) + "..."}
      </h2>
      <p className="mb-4">{post.content.slice(0, 200) + "..."}</p>
      <div className="text-sm text-gray-400">
        Posted by {post.author.username} on{" "}
        {new Date(post.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
}

export default BlogPost;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function BlogPst({ post }) {
//   const [author, setAuthor] = useState('Unknown');

//   useEffect(() => {
//     const fetchAuthor = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3000/api/users/${post.author}`);
//         if (response.data.success) {
//           setAuthor(response.data.user.username);
//         }
//       } catch (error) {
//         console.error('Failed to fetch author:', error);
//       }
//     };

//     fetchAuthor();
//   }, [post.author]);

//   return (
//     <div className='bg-[#1a1a35] rounded-lg p-6 mb-6 text-white'>
//       <h2 className='text-2xl font-bold mb-4'>{post.title}</h2>
//       <p className='mb-4'>{post.content}</p>
//       <div className='text-sm text-gray-400'>
//         Posted by {author} on {new Date(post.createdAt).toLocaleDateString()}
//       </div>
//     </div>
//   );
// }
