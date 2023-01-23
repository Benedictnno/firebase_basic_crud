import { deleteDoc, getDocs,doc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { collection } from "firebase/firestore";
import { auth, db } from "../firebase-config";

const Home = ({isAuth}) => {
  const [postList, setPostList] = useState([]);

  /* 
  the postCollectionRef accesses the with collection from the data base which is being used eg. 'post'
  */
  const postCollectionRef = collection(db, "post");

  /*
  the getpost fuction performs a get request to the database using getDocs ; which accepts one aguement
   postCollectionRef (to know which collection is being used ) 
  */
  async function getpost() {
    const data = await getDocs(postCollectionRef);
    /*
    getData itirates through the data and get a selected list of data from the request
    */
    const getData = data.docs.map((items) => ({
      ...items.data(),
      id: items.id,
    }));
    setPostList(getData);
  }

  useEffect(() => {
    getpost();
  }, [postList]);

  /*
  the deletePost fuction performs a delete request to the database using doc ; which accepts three aguement
  (db , name of the collection "post")to know which collection is being used and id to know which part of the collection to delete
  */
  async function deletePost(id) {
    const postDoc = doc(db, "post", id);
    await deleteDoc(postDoc);
  }

  return (
    <div className="homePage">
      {postList.map((post) => {
        console.log(post);
        return (
          <div className="post" key={post.id}>
            <div className="postHeader">
              <div className="title">
                <h1>{post.title}</h1>
              </div>
              <div className="deletePost">
                {/* checks to see if the user is loged in and authenticated to delete a post */}
                {isAuth && post.author.id === auth.currentUser.uid && (
                  <button onClick={() => deletePost(post.id)}>&#128465;</button>
                )}
              </div>
            </div>
            <div className="postTextContainer">{post.postText}</div>
            <h3>by {post.author.name}</h3>
          </div>
        );
      })}
    </div>
  );
}

export default Home
