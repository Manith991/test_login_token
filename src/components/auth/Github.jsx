import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase-config";
import {
  GithubAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export const useLoginWithGitHub = () => {
  const [error, setError] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [user, setUser] = useState(null);
  const provider = new GithubAuthProvider();
  
  // Add scopes for additional user info
  provider.addScope('user:email');

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

  const login = async () => {
    setError(null);
    setIsPending(true);
    try {
      const res = await signInWithPopup(auth, provider);
      if (!res) {
        throw new Error("Could not complete GitHub login.");
      }
      const user = res.user;
      console.log("GitHub user:", user);
      setIsPending(false);
    } catch (error) {
      console.log(error);
      setError(error.message || "GitHub login failed.");
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

  return { login, logout, user, error, isPending };
};