import firestore from '@react-native-firebase/firestore';

const usersCol = firestore().collection('users');
const postsCol = firestore().collection('posts');

export const createUserProfile = (uid, profileData) =>
  usersCol.doc(uid).set(profileData);

export const fetchPosts = () =>
  postsCol.orderBy('createdAt', 'desc').get();

export const addPost = (uid, text) =>
  postsCol.add({
    authorId: uid,
    text,
    createdAt: firestore.FieldValue.serverTimestamp(),
  });

export const updatePost = (postId, newText) =>
  postsCol.doc(postId).update({
    text: newText,
    editedAt: firestore.FieldValue.serverTimestamp(),
  });

export const deletePost = postId =>
  postsCol.doc(postId).delete();