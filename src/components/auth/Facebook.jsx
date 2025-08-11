import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase-config";
import {
  FacebookAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export const useLoginWithFaceBook = () => {
  const [error, setError] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [user, setUser] = useState(null);
  const provider = new FacebookAuthProvider();
  
  // Add scopes for additional user info
  provider.addScope('email');
  provider.addScope('public_profile');

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe(); // Cleanup subscription
  }, []);

  const facebookLogin = async () => {
    setError(null);
    setIsPending(true);
    try {
      const res = await signInWithPopup(auth, provider);
      if (!res) {
        throw new Error("Could not complete Facebook login.");
      }
      const user = res.user;
      console.log("Facebook user:", user);
      setIsPending(false);
    } catch (error) {
      console.log(error);
      setError(error.message || "Facebook login failed.");
      setIsPending(false);
    }
  };

  // Logout function
  const logout = async () => {
    setError(null);
    setIsPending(true);
    try {
      await signOut(auth);
      console.log("User signed out successfully.");
      setIsPending(false);
    } catch (error) {
      console.error("Logout error:", error);
      setError(error.message || "Logout failed.");
    } finally {
      setIsPending(false);
    }
  };

  return { facebookLogin, logout, user, error, isPending };
};