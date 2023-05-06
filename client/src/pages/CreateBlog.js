import React, { useState } from 'react'
import { useCookies } from 'react-cookie';
import {useGetUserID} from "../hooks/useGetUserID";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateBlog() {
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);
  const [bloginput, setBlog] = useState({
    blog: "",
    userOwner: userID,
  });
  

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBlog({ ...bloginput, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(bloginput);
    console.log(bloginput.userOwner);
    console.log(bloginput.blog);
    try {
      await axios.post(
        "http://localhost:3001/blog/createblog",
        { ...bloginput },
        {
          headers: { authorization: cookies.access_token },
        }
      );

      alert("Blog Created");
      console.log(bloginput);
      navigate("/blog");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="blog__wrapper">
        <h1>Create of blogs</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="blog">Blog</label>
          <textarea
            id="blog"
            name="blog"
            value={bloginput.blog}
            onChange={handleChange}
          ></textarea>
          <button type="submit">Send</button>
        </form>
      </div>
    </>
  );
}

export default CreateBlog;
