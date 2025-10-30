import React, { useEffect, useState } from "react";
import PropertyCard from "./PropertyCard";
import PropertyModal from "./PropertyModal";
import AddUserForm from "./AddUserForm";

const API = "https://jsonplaceholder.typicode.com/users";

export default function PropertyList() {
  const [properties, setProperties] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [filterCompany, setFilterCompany] = useState("");

  // 🔹 Fetch initial data
  useEffect(() => {
    fetch(API)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => setProperties(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // 🔹 Unique companies for dropdown
  const companies = [...new Set(properties.map((p) => p.company?.name))];

  // 🔹 Add new user callback
  function handleAddUser(newUser) {
    setProperties((prev) => [newUser, ...prev]);
  }

  // 🔹 Filter + search logic
  const filtered = properties.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.address?.city.toLowerCase().includes(search.toLowerCase());
    const matchesCompany = !filterCompany || p.company?.name === filterCompany;
    return matchesSearch && matchesCompany;
  });

  return (
    <section>
      {/* ✅ Add User Form */}
      <AddUserForm onAdd={handleAddUser} />

      {/* 🔍 Search + Filter Bar */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="text-xl font-medium text-slate-700">User Directory</h2>

        <div className="flex gap-2">
          {/* Search bar */}
          <input
            type="text"
            placeholder="Search by name or city"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-slate-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-slate-400"
          />

          {/* Filter dropdown */}
          <select
            value={filterCompany}
            onChange={(e) => setFilterCompany(e.target.value)}
            className="border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-slate-400"
          >
            <option value="">All Companies</option>
            {companies.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 🔄 Loading / Error States */}
      {loading && <div className="text-slate-500">Loading...</div>}
      {error && <div className="text-red-500">Error: {error}</div>}

      {/* 🧱 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((p) => (
          <PropertyCard key={p.id} property={p} onView={setSelected} />
        ))}
      </div>

      {/* 🪟 Modal */}
      <PropertyModal data={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
