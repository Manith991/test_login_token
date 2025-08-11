import React from "react";
import { useLoginWithGitHub } from "./components/auth/Github";
import { useLoginWithFaceBook } from "./components/auth/Facebook";
import { useLoginWithGoogle } from "./components/auth/Google";
import './App.css'; 

function App() {
  const {
    login: githubLogin,
    logout: githubLogout,
    isPending: githubPending,
    user: githubUser,
  } = useLoginWithGitHub();

  const {
    facebookLogin,
    logout: facebookLogout,
    isPending: facebookPending,
    user: facebookUser,
  } = useLoginWithFaceBook();

  const {
    googleLogin,
    logout: googleLogout,
    isPending: googlePending,
    user: googleUser,
  } = useLoginWithGoogle();

  const currentUser = githubUser || facebookUser || googleUser;
  const isPending = githubPending || facebookPending || googlePending;

  const getProvider = () => {
    if (githubUser) return "GitHub";
    if (facebookUser) return "Facebook";
    if (googleUser) return "Google";
    return "";
  };

  const handleLogout = () => {
    if (githubUser) githubLogout();
    else if (facebookUser) facebookLogout();
    else if (googleUser) googleLogout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          OAuth Login Demo
        </h1>

        {currentUser ? (
          <div className="flex flex-col items-center space-y-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Welcome, {currentUser.displayName || currentUser.email}!
            </h2>
            <p className="text-gray-500">
              You are logged in with{" "}
              <span className="font-medium">{getProvider()}</span>
            </p>

            {currentUser.photoURL ? (
              <img
                src={currentUser.photoURL}
                alt="Profile"
                className="w-16 h-16 rounded-full border-2 border-gray-300 object-cover"
                onError={(e) => (e.target.style.display = "none")}
              />
            ) : (
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-500 text-white text-xl font-bold">
                {(currentUser.displayName || currentUser.email || "U")
                  .charAt(0)
                  .toUpperCase()}
              </div>
            )}

            <button
              onClick={handleLogout}
              disabled={isPending}
              className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 disabled:opacity-50"
            >
              {isPending ? "Signing out..." : "Sign Out"}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <button
              onClick={googleLogin}
              disabled={googlePending}
              className="w-full px-4 py-2 bg-white border border-gray-300 hover:bg-gray-100 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              {googlePending ? "Loading..." : "Login with Google"}
            </button>

            <button
              onClick={githubLogin}
              disabled={githubPending}
              className="w-full px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg flex items-center justify-center gap-2 transition-colors duration-200"
            >
              <img
                src="https://www.svgrepo.com/show/512317/github-142.svg"
                alt="GitHub"
                className="w-5 h-5 invert"
              />
              {githubPending ? "Loading..." : "Login with GitHub"}
            </button>

            <button
              onClick={facebookLogin}
              disabled={facebookPending}
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors duration-200"
            >
              <img
                src="https://www.svgrepo.com/show/448224/facebook.svg"
                alt="Facebook"
                className="w-5 h-5"
              />
              {facebookPending ? "Loading..." : "Login with Facebook"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
