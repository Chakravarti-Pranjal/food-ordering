import React from "react";
import { useDispatch } from "react-redux";
import { reactionAdded } from "../../redux/slices/postSlice";

const reactionEmoji = {
  thumbsUp: "👍",
  wow: "😲",
  heart: "🧡",
  rocket: "🚀",
  coffee: "☕",
};

const AsyncReactionButton = ({ post }) => {
  const dispatch = useDispatch();

  const reactionBtn = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className=""
        onClick={() =>
          dispatch(reactionAdded({ postId: post.id, reaction: name }))
        }
      >
        {emoji} {post.reactions[name]}
      </button>
    );
  });

  return <div>{reactionBtn}</div>;
};

export default AsyncReactionButton;
