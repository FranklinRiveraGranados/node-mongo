import { initializeApp} from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCkIavs7t268we-4RxKG_fsknZBSri0yYw",
    authDomain: "pruebas-react-52946.firebaseapp.com",
    projectId: "pruebas-react-52946",
    storageBucket: "pruebas-react-52946.appspot.com",
    messagingSenderId: "189566073307",
    appId: "1:189566073307:web:5725a114dd6d92dd14cffe",
    measurementId: "G-HGXZMLR7TQ"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig)
  const store = getFirestore(app)

  export { store }
