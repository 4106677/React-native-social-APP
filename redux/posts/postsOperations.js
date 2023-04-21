import {
  addDoc,
  collection,
  getDocs,
  query,
  getCountFromServer,
  where,
  doc,
  getFirestore,
} from "firebase/firestore";
import { postsAction } from "./postsSlice";
import app from "../../firebase/config";
const db = getFirestore(app);

const getAllPosts = () => async (dispatch, getState) => {
  try {
    const { userId } = getState().auth;

    // get all posts
    const posts = await getDocs(collection(db, "posts"));
    console.log("posts::", posts);

    // add id to collection and count comments
    const newPosts = posts.docs.map(async (doc) => {
      // Get comments count
      const snapshotComments = await getCountFromServer(
        collection(doc.ref, "comments")
      );
      const countComments = snapshotComments.data().count;

      // Get likes count
      const snapshotLikes = await getCountFromServer(
        collection(doc.ref, "likes")
      );
      const countLikes = snapshotLikes.data().count;

      // Post is Liked
      const q = query(
        collection(doc.ref, "likes"),
        where("authorId", "==", userId)
      );
      const likes = await getDocs(q);

      return {
        ...doc.data(),
        id: doc.id,
        countComments,
        countLikes,
        isLiked: !likes.empty,
      };
    });

    // Resolve all promises
    const payload = await Promise.all(newPosts);

    dispatch(postsAction.updatePosts(payload));
  } catch (error) {
    console.log(error);
  }
};

const getOwnPosts = () => async (dispatch, getState) => {
  try {
    const { userId } = getState().auth;
    const q = query(collection(db, "posts"), where("userId", "==", userId));
    const posts = await getDocs(q);

    // add id to collection and count comments
    const newPosts = posts.docs.map(async (doc) => {
      // Get comments count
      const snapshotComments = await getCountFromServer(
        collection(doc.ref, "comments")
      );
      const countComments = snapshotComments.data().count;

      // Get likes count
      const snapshotLikes = await getCountFromServer(
        collection(doc.ref, "likes")
      );
      const countLikes = snapshotLikes.data().count;

      // Post is Liked
      const q = query(
        collection(doc.ref, "likes"),
        where("authorId", "==", userId)
      );
      const likes = await getDocs(q);

      return {
        ...doc.data(),
        id: doc.id,
        countComments,
        countLikes,
        isLiked: !likes.empty,
      };
    });

    // Resolve all promises
    const payload = await Promise.all(newPosts);

    dispatch(postsAction.updateOwnPosts(payload));
  } catch (error) {
    toastError(error);
  }
};

const postOperation = {
  getAllPosts,
  getOwnPosts,
};

export default postOperation;
