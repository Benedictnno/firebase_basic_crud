import React from "react";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const CreatePost = ({ isAuth }) => {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  /* 
  the postCollectionRef accesses the with collection from the data base which is being used eg. 'post'
  */
  const postCollectionRef = collection(db, "post");
  let navigate = useNavigate();

  /*
  the CreatePost fuction performs a post request to the database using addDoc ; which accepts two aguements
   postCollectionRef (to know which collection is being used ) and an object of what is being sent to the database
  */
  async function CreatePost() {
    await addDoc(postCollectionRef, {
      title,
      postText,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    navigate("/");
  }

  useEffect(() => {
    // acts as a prodected route for users who aren't signed in but want to access the createpost route
    if (!isAuth) {
      navigate("/Login");
    }
  }, [isAuth]);
  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Create A Post</h1>
        <div className="inputGp">
          <label htmlFor="Title">Title :</label>

          <input
            type="text"
            placeholder="Title..."
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label htmlFor="Post">Post :</label>
          <textarea
            type="text"
            placeholder="Post..."
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />
        </div>
        <button onClick={CreatePost}>Submit Post</button>
      </div>
    </div>
  );
};

export default CreatePost;
