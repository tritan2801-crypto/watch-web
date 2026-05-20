import React from "react";

export default function PersonalInfo({ user }) {
  if (!user) return null;

  return (
    <div className="mb-12">
      <h3 className="text-sm font-bold tracking-[0.2em] uppercase mb-6">
        My Info
      </h3>
      
      <div className="mb-4">
        <h4 className="text-[10px] font-bold tracking-[0.1em] uppercase mb-3">
          Personal Information
        </h4>
        <div className="space-y-1 text-xs text-neutral-800">
          <p>
            <span className="font-bold">Name:</span> {user.lastName} {user.firstName}
          </p>
          <p>
            <span className="font-bold">Email:</span> {user.email}
          </p>
        </div>
      </div>
    </div>
  );
}
