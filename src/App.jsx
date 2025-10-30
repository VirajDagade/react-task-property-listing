import React from "react";
import PropertyList from "./components/PropertyList";
import Header from "./components/Header";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-br from-slate-100 via-white to-slate-100">
      <Header />
      <main className="max-w-7xl mx-auto p-6 sm:p-10">
        <PropertyList />
      </main>
    </div>
  );
}
