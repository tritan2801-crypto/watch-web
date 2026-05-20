import React, { useState } from "react";
import { api } from "../api/dbService";

export default function LoginSection({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const user = await api.loginUser(email, password);

    if (user) {
      if (onLoginSuccess) {
        onLoginSuccess(user);
      }
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="text-center mb-8 mt-4">
        <h2 className="text-3xl font-serif tracking-wide uppercase mb-3">
          Welcome Back
        </h2>
        <p className="text-xs text-neutral-600 max-w-sm mx-auto leading-relaxed">
          Sign into your existing MVMT account to check existing orders and more.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 border border-red-200 text-xs p-3 mb-6 rounded-sm text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="flex flex-col space-y-5">
        <div className="flex flex-col space-y-1">
          <label className="text-[9px] font-bold tracking-widest text-black uppercase">
            <span className="text-red-500 mr-1">*</span>Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors placeholder:text-neutral-300"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-[9px] font-bold tracking-widest text-black uppercase">
            <span className="text-red-500 mr-1">*</span>Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors placeholder:text-neutral-300"
          />
        </div>

        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded-sm border-gray-300 text-black focus:ring-black"
            />
            <span className="text-[10px] text-neutral-500 font-bold tracking-widest uppercase">
              Remember Me
            </span>
          </label>
          <a
            href="#"
            className="text-[10px] text-neutral-500 font-bold tracking-widest uppercase underline hover:text-black transition-colors"
          >
            Forgot Password?
          </a>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="bg-[#1a1a1a] text-white px-8 py-3 text-[10px] font-bold tracking-widest uppercase hover:bg-[#333333] active:scale-95 transition-all rounded-sm"
          >
            Sign In
          </button>
        </div>
      </form>

      <div className="mt-8 relative flex items-center justify-center">
        <span className="bg-white px-4 text-[10px] font-bold tracking-widest text-neutral-800 uppercase z-10">
          Express Sign In
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <button className="flex-1 bg-[#4267B2] hover:opacity-90 active:scale-95 text-white py-3 px-4 flex items-center justify-center rounded-sm transition-all text-[10px] font-bold tracking-widest uppercase">
          <svg className="w-4 h-4 fill-current mr-2" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          Sign In
        </button>
        <button className="flex-1 bg-[#DB4437] hover:opacity-90 active:scale-95 text-white py-3 px-4 flex items-center justify-center rounded-sm transition-all text-[10px] font-bold tracking-widest uppercase">
          <svg className="w-4 h-4 fill-current mr-2" viewBox="0 0 24 24">
            <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
          </svg>
          Sign In
        </button>
      </div>
    </div>
  );
}
