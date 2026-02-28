import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../State/Auth/Action";
import {
  XMarkIcon,
  UserIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth?.user) {
      onClose();
    }
  }, [auth?.user, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    if (isLogin) {
      const payload = {
        email: data.get("email"),
        password: data.get("password"),
      };
      dispatch(login(payload));
    } else {
      const payload = {
        name: data.get("name"),
        email: data.get("email"),
        password: data.get("password"),
        role: data.get("role"),
      };
      dispatch(register(payload));
    }
  };

  const handleClose = () => {
    if (auth?.error) {
      dispatch({ type: "CLEAR_ERROR" });
    }
    onClose();
  };

  <button onClick={handleClose}>
    <XMarkIcon className="w-5 h-5" />
  </button>;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 w-full max-w-md rounded-3xl shadow-2xl border border-gray-700 relative overflow-hidden text-white">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-gray-400 text-sm mt-2">
              {isLogin
                ? "Login to book amazing events."
                : "Register to start booking events."}
            </p>
          </div>

          <div className="flex bg-gray-900 rounded-xl p-1 mb-6 border border-gray-700">
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${
                isLogin
                  ? "bg-gray-800 text-blue-400 shadow-md border border-gray-600"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${
                !isLogin
                  ? "bg-gray-800 text-blue-400 shadow-md border border-gray-600"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              Sign Up
            </button>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none text-white placeholder-gray-500 transition-colors"
                  placeholder="Enter full name"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-400 mb-2">
                Email
              </label>
              <div className="relative">
                <UserIcon className="absolute left-4 top-3 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full pl-11 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none text-white placeholder-gray-500 transition-colors"
                  placeholder="Enter email"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 mb-2">
                Password
              </label>
              <div className="relative">
                <LockClosedIcon className="absolute left-4 top-3 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  name="password"
                  required
                  className="w-full pl-11 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none text-white placeholder-gray-500 transition-colors"
                  placeholder="Enter password"
                />
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-2">
                  Select Role
                </label>
                <select
                  name="role"
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none text-white transition-colors"
                >
                  <option value="" className="text-gray-400">
                    Choose role
                  </option>
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
            )}

            {auth?.error && (
              <div className="bg-red-900/50 text-red-400 border border-red-800 p-3 rounded-lg text-sm">
                {auth.error}
              </div>
            )}

            <button
              type="submit"
              disabled={auth?.loading}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-bold shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {auth?.loading
                ? "Please wait..."
                : isLogin
                  ? "Login"
                  : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
