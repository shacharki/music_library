import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore,setDoc,doc } from 'firebase/firestore/lite'


const firebaseConfig = {
  apiKey: "AIzaSyCm8gGypo0w0YI_HzkwY7FA1ZST4WZARBc",
  authDomain: "music-library-57f47.firebaseapp.com",
  projectId: "music-library-57f47",
  storageBucket: "music-library-57f47.appspot.com",
  messagingSenderId: "236515981445",
  appId: "1:236515981445:web:c5f2a444661933b73bd1ec",
  measurementId: "G-98F3Q64B34"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export async function getSongs() {
  var songsList = [];
  const songCol = collection(db, 'songs');
  const songsSnapshot = await getDocs(songCol);

  songsSnapshot.docs.forEach(doc => {
    let song = doc.data();
    song.id = doc.id;
    songsList.push(song);
  })
  return songsList;
}

export async function addSong(title, artist, genre) {
  const song = {
    title: title,
    artist: artist,
    genre: genre,
  };

  await setDoc(doc(db, "songs", title), song);
}