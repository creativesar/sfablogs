'use client'

import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";

interface Comment {
  _id: string;
  name: string;
  comment: string;
  _createdAt: string;
}

export default function Comments({ postId }: { postId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    async function fetchComments() {
      const query = `*[_type == "comment" && post._ref == "${postId}"] | order(_createdAt desc) {
        _id, name, comment, _createdAt
      }`;
      const fetchedComments = await client.fetch(query);
      setComments(fetchedComments);
    }
    fetchComments();
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      _type: "comment",
      post: {
        _type: "reference",
        _ref: postId,
      },
      name: "Anonymous", // Replace with actual user name if available
      comment: newComment,
      _id: Math.random().toString(36).substr(2, 9), // Generate a random id for the comment
      _createdAt: new Date().toISOString(), // Set the current date as the creation date
    };

    await client.create(comment);
    setNewComment("");
    setComments([comment, ...comments]);
  };

  return (
    <div className="comments-section">
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="mt-2 px-4 py-2 bg-black text-white rounded hover:bg-zinc-600">
          Submit
        </button>
      </form>
      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment._id} className="comment mb-4 p-4 border rounded">
            <p className="font-bold">{comment.name}</p>
            <p>{comment.comment}</p>
            <p className="text-xs text-gray-500">{new Date(comment._createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
