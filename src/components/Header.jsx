import React from "react";

export default function Header() {
  return (
    <header className="bg-slate-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-wide">User Dashboard</h1>
        <span className="text-sm opacity-80">MERN Intern Task 1</span>
      </div>
    </header>
  );
}
