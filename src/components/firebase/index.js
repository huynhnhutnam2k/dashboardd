
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyDfedB8-ihlmyaJkVDrPw7FZ9ifTj3_fqg",
    authDomain: "sv-image-dhyd.firebaseapp.com",
    projectId: "sv-image-dhyd",
    storageBucket: "sv-image-dhyd.appspot.com",
    messagingSenderId: "654883237560",
    appId: "1:654883237560:web:dfbd7ca9f55b8884794e4d",
    measurementId: "G-135NTBK649"
  };
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  export {storage}