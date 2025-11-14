import React from "react";
import Counter from "./components/Counter";
import PostList from "./components/posts/PostList";
import AddPostForm from "./components/posts/AddPostForm";

const App = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full  gap-4  bg-gray-800 text-white h-screen">
      {/*<Counter />*/}
      <AddPostForm />
      <PostList />
    </div>
  );
};

export default App;
