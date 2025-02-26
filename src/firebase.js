import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBvPaysj2bZyuObzBpxWgF3_W3zyY_Xx9Y",
  authDomain: "expenseapp-32330.firebaseapp.com",
  projectId: "expenseapp-32330",
  storageBucket: "expenseapp-32330.appspot.com",
  messagingSenderId: "714832335467",
  appId: "1:714832335467:web:a0c38ec79640d53832572e",
  measurementId: "G-36XT2CWJES",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("User Info:", result.user);
    localStorage.setItem("user", JSON.stringify(result.user));
  } catch (error) {
    console.error("Error signing in:", error);
  }
};

const logout = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem("user");
    console.log("User logged out");
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

// Export Firebase functions
export { auth, signInWithGoogle, logout };
