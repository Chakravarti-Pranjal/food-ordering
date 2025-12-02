import React from "react";
import { useSelector } from "react-redux";
import { selectAllPosts } from "../../redux/slices/postSlice";
import AsyncPostAuthor from "./AsyncPostAuthor";
import AsyncTimeAgo from "./AsyncTimeAgo";
import AsyncReactionButton from "./AsyncReactionButton";

const AsyncPostList = () => {
  const posts = useSelector(selectAllPosts);
  console.log(posts, "POSTS");

  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  const renderPosts = orderedPosts.map((post) => (
    <article key={post.id} className="border p-3 rounded mb-3">
      <h3 className="text-2xl font-semibold">{post?.title}</h3>
      <p className="text-lg">{post?.content?.substring(0, 100) || ""}</p>
      <p>
        <AsyncPostAuthor userId={post.userId} />
        <AsyncTimeAgo timestamp={post.date} />
      </p>
      <AsyncReactionButton post={post} />
    </article>
  ));
  return (
    <section>
      <h2 className="text-3xl font-bold mb-4">Posts</h2>
      {renderPosts}
    </section>
  );
};

export default AsyncPostList;
