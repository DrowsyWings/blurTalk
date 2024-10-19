import React from 'react';

function SkeletonBlogPost() {
  return (
    <div className='bg-[#1a1a35] rounded-lg p-6 mb-6 animate-pulse'>
      <div className='h-8 bg-gray-700 rounded w-3/4 mb-4'></div>
      <div className='h-4 bg-gray-700 rounded w-full mb-2'></div>
      <div className='h-4 bg-gray-700 rounded w-full mb-2'></div>
      <div className='h-4 bg-gray-700 rounded w-3/4 mb-4'></div>
      <div className='h-3 bg-gray-700 rounded w-1/4'></div>
    </div>
  );
}

export default SkeletonBlogPost;