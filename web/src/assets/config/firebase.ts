import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCpjj-nN1af5HxtQDsfYLQrrb_bgPrs59c",
    authDomain: "facebookauth-55396.firebaseapp.com",
    projectId: "facebookauth-55396",
    storageBucket: "facebookauth-55396.firebasestorage.app",
    messagingSenderId: "526023176833",
    appId: "1:526023176833:web:823b301bca7f2f95e85380",
    measurementId: "G-G1WJ980F2F"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
