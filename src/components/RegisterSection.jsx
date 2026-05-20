import React, { useState } from "react";
import { api } from "../api/dbService";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dobMonth: "01",
    dobDay: "01",
    phone: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
    newsletter: false,
  });
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const months = [
    { value: "01", label: "JANUARY" },
    { value: "02", label: "FEBRUARY" },
    { value: "03", label: "MARCH" },
    { value: "04", label: "APRIL" },
    { value: "05", label: "MAY" },
    { value: "06", label: "JUNE" },
    { value: "07", label: "JULY" },
    { value: "08", label: "AUGUST" },
    { value: "09", label: "SEPTEMBER" },
    { value: "10", label: "OCTOBER" },
    { value: "11", label: "NOVEMBER" },
    { value: "12", label: "DECEMBER" },
  ];

  const days = Array.from({ length: 31 }, (_, i) => {
    const val = (i + 1).toString().padStart(2, "0");
    return { value: val, label: val };
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validatePassword = (pwd) => {
    const minLength = pwd.length >= 8;
    const hasUpper = /[A-Z]/.test(pwd);
    const hasNumber = /\d/.test(pwd);
    return minLength && hasUpper && hasNumber;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setPasswordError("");

    if (formData.email !== formData.confirmEmail) {
      setError("Emails do not match.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!validatePassword(formData.password)) {
      setPasswordError(
        "Password must be at least 8 characters, include at least 1 uppercase character and 1 number."
      );
      return;
    }

    try {
      await api.registerUser(formData);
      alert(`Account created successfully for ${formData.email}!`);
      // In a real app, you might auto-login or redirect to login tab here
    } catch (err) {
      setError(err.message || "Failed to register account.");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="text-center mb-8 mt-4">
        <h2 className="text-3xl font-serif tracking-wide uppercase mb-3">
          New to MVMT?
        </h2>
        <p className="text-xs text-neutral-600 max-w-sm mx-auto leading-relaxed">
          Create a new MVMT account to get faster checkout and be the first to know about our exclusive offers.
        </p>
      </div>

      <div className="mt-2 relative flex items-center justify-center">
        <span className="bg-white px-4 text-[10px] font-bold tracking-widest text-neutral-800 uppercase z-10">
          Express Sign Up
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-6 mb-8">
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

      <div className="relative flex items-center justify-center mb-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-neutral-200"></div>
        </div>
        <span className="bg-white px-4 text-xs font-serif font-bold text-black z-10 uppercase tracking-widest">
          OR
        </span>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 border border-red-200 text-xs p-3 mb-6 rounded-sm text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleRegister} className="flex flex-col space-y-5">
        <div className="flex flex-col space-y-1">
          <label className="text-[9px] font-bold tracking-widest text-black uppercase">
            <span className="text-red-500 mr-1">*</span>First Name
          </label>
          <input
            type="text"
            required
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-[9px] font-bold tracking-widest text-black uppercase">
            <span className="text-red-500 mr-1">*</span>Last Name
          </label>
          <input
            type="text"
            required
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-[9px] font-bold tracking-widest text-black uppercase">
            Date Of Birth
          </label>
          <div className="flex space-x-4">
            <select
              name="dobMonth"
              value={formData.dobMonth}
              onChange={handleInputChange}
              className="flex-1 border border-neutral-200 px-4 py-3 text-xs focus:outline-none focus:border-black transition-colors tracking-widest uppercase appearance-none bg-white"
            >
              {months.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
            <select
              name="dobDay"
              value={formData.dobDay}
              onChange={handleInputChange}
              className="w-24 border border-neutral-200 px-4 py-3 text-xs focus:outline-none focus:border-black transition-colors tracking-widest uppercase appearance-none bg-white"
            >
              {days.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-[9px] font-bold tracking-widest text-black uppercase">
            <span className="text-red-500 mr-1">*</span>Phone Number
          </label>
          <input
            type="tel"
            required
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-[9px] font-bold tracking-widest text-black uppercase">
            <span className="text-red-500 mr-1">*</span>Email
          </label>
          <input
            type="email"
            required
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-[9px] font-bold tracking-widest text-black uppercase">
            <span className="text-red-500 mr-1">*</span>Confirm Email
          </label>
          <input
            type="email"
            required
            name="confirmEmail"
            value={formData.confirmEmail}
            onChange={handleInputChange}
            className="border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-[9px] font-bold tracking-widest text-black uppercase">
            <span className="text-red-500 mr-1">*</span>Password
          </label>
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              required
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full border pl-4 pr-10 py-3 text-sm focus:outline-none transition-colors ${
                passwordError ? "border-red-500 focus:border-red-500" : "border-neutral-200 focus:border-black"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black transition-colors focus:outline-none flex items-center justify-center"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {passwordError ? (
            <p className="text-[10px] text-red-500 mt-1 font-medium">{passwordError}</p>
          ) : (
            <p className="text-[10px] text-neutral-500 mt-1 leading-tight">
              Password must be at least 8 characters, include at least 1 uppercase character and 1 number.
            </p>
          )}
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-[9px] font-bold tracking-widest text-black uppercase">
            <span className="text-red-500 mr-1">*</span>Confirm Password
          </label>
          <div className="relative w-full">
            <input
              type={showConfirmPassword ? "text" : "password"}
              required
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full border border-neutral-200 pl-4 pr-10 py-3 text-sm focus:outline-none focus:border-black transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black transition-colors focus:outline-none flex items-center justify-center"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <div className="pt-2 pb-4">
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              name="newsletter"
              checked={formData.newsletter}
              onChange={handleInputChange}
              className="mt-1 w-4 h-4 rounded-sm border-gray-300 text-black focus:ring-black"
            />
            <span className="text-[11px] text-neutral-500 leading-snug">
              Sign-up to receive the latest updates and promotions from MVMT
            </span>
          </label>
        </div>

        <div className="pt-2 flex justify-center">
          <button
            type="submit"
            className="bg-[#1a1a1a] text-white px-8 py-3 text-[10px] font-bold tracking-widest uppercase hover:bg-[#333333] active:scale-95 transition-all rounded-sm"
          >
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
}
