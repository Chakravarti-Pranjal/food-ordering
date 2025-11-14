import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postAdded } from "../../redux/slices/postSlice";
import { selectAllUsers } from "../../redux/slices/usersSlice";

const AddPostForm = () => {
  const users = useSelector(selectAllUsers);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    title: "",
    content: "",
    userId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSave = () => {
    if (form.title && form.content) {
      dispatch(postAdded(form.title, form.content, form.userId));
      console.log("added");

      setForm({
        title: "",
        content: "",
        userId: "",
      });
    }
  };

  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  const canSave =
    Boolean(form.title) && Boolean(form.content) && Boolean(form.userId);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Add a New Post</h2>
      <input
        type="text"
        name="title"
        placeholder="Enter Title"
        className="border p-2 mr-2"
        value={form.title}
        onChange={handleChange}
      />
      <input
        type="text"
        name="content"
        placeholder="Enter content"
        className="border p-2 mr-4"
        value={form.content}
        onChange={handleChange}
      />

      <select
        name="userId"
        className="bg-gray-800 p-2 rounded mr-4 border"
        value={form.userId}
        onChange={handleChange}
      >
        <option value="">select</option>
        {userOptions}
      </select>

      <button
        className="bg-amber-600 border rounded p-2 cursor-pointer"
        onClick={onSave}
        // disabled={!canSave}
      >
        Save Post
      </button>
    </div>
  );
};

export default AddPostForm;
