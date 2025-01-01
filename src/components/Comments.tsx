'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface Comment {
  name: string;
  email: string;
  comment: string;
  image: string;
}

const userImages = [
  "https://pagedone.io/asset/uploads/1710225753.png",
  "https://pagedone.io/asset/uploads/1710238051.png",
  "https://pagedone.io/asset/uploads/1710237485.png",
  "https://pagedone.io/asset/uploads/1710231234.png",
  "https://pagedone.io/asset/uploads/1710235678.png"
];

const Comments = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [imageIndex, setImageIndex] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newComment = { name, email, comment, image: userImages[imageIndex] };
    setComments([...comments, newComment]);
    setName('');
    setEmail('');
    setComment('');
    setImageIndex((imageIndex + 1) % userImages.length);
  };

  return (
    <section className="py-24 relative">
      <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
        <div className="w-full flex-col justify-start items-start lg:gap-14 gap-7 inline-flex">
          <h2 className="text-gray-900 text-4xl font-bold font-manrope leading-normal">Comments</h2>
          <form onSubmit={handleSubmit} className="w-full flex-col justify-start items-start gap-8 flex bg-white p-6 rounded-lg shadow-md">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full py-3 px-5 rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-3 px-5 rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              placeholder="Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full py-3 px-5 rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button type="submit" className="w-full py-3 px-5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
              Submit
            </button>
          </form>
          <div className="w-full flex-col justify-start items-start gap-8 flex">
            {comments.map((comment, index) => (
              <div key={index} className="w-full lg:p-8 p-5 bg-white rounded-3xl border border-gray-200 flex-col justify-start items-start flex shadow-md">
                <div className="w-full flex-col justify-start items-start gap-3.5 flex">
                  <div className="w-full justify-between items-center inline-flex">
                    <div className="justify-start items-center gap-2.5 flex">
                      <div className="w-10 h-10 bg-stone-300 rounded-full justify-start items-start gap-2.5 flex">
                        <Image className="rounded-full object-cover" src={comment.image} alt="User image" />
                      </div>
                      <div className="flex-col justify-start items-start gap-1 inline-flex">
                        <h5 className="text-gray-900 text-sm font-semibold leading-snug">{comment.name}</h5>
                        <h6 className="text-gray-500 text-xs font-normal leading-5">{comment.email}</h6>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-800 text-sm font-normal leading-snug">{comment.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comments;
