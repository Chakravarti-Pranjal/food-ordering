import React from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../../redux/slices/usersSlice";

const PostAuthor = ({ userId }) => {
  const users = useSelector(selectAllUsers);

  const author = users.find((user) => user.id === userId);
  return <div>by {author ? author.name : "Unknown author"}</div>;
};

export default PostAuthor;
