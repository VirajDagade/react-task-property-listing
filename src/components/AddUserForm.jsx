import React, { useState } from "react";
import toast from "react-hot-toast";

export default function AddUserForm({ onAdd }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    company: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const newUser = await res.json();

      // locally enhance with company/address objects so rest of UI works
      const formattedUser = {
        id: newUser.id || Date.now(),
        name: newUser.name,
        email: newUser.email,
        address: { city: newUser.city || formData.city },
        company: { name: newUser.company || formData.company },
      };

      onAdd(formattedUser);
      setFormData({ name: "", email: "", city: "", company: "" });

      // ✅ Toast success
      toast.success("User added successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add user!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow border border-slate-200 mb-8"
    >
      <h3 className="text-lg font-semibold text-slate-800 mb-4">
        ➕ Add New User
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-slate-400 focus:outline-none"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-slate-400 focus:outline-none"
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          required
          className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-slate-400 focus:outline-none"
        />
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
          required
          className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-slate-400 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`px-5 py-2 rounded-lg text-sm text-white transition ${
          loading
            ? "bg-slate-400 cursor-not-allowed"
            : "bg-slate-800 hover:bg-slate-700"
        }`}
      >
        {loading ? "Adding..." : "Add User"}
      </button>
    </form>
  );
}
