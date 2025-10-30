import React from "react";

export default function PropertyCard({ property, onView }) {
  return (
    <article className="bg-white rounded-xl shadow hover:shadow-lg transition-all duration-200 border border-slate-200 overflow-hidden">
      <div className="p-5">
        <h3 className="text-lg font-semibold text-slate-800 mb-1">
          {property.name}
        </h3>
        <div className="text-sm text-slate-500 mb-3">
          {property.address?.city} • {property.company?.name}
        </div>

        <p className="text-sm text-slate-600 mb-4 line-clamp-2">
          {property.company?.catchPhrase}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500">{property.email}</span>
          <button
            onClick={() => onView(property)}
            className="px-3 py-1 text-sm bg-slate-800 text-white rounded-full hover:bg-slate-700 transition"
          >
            View
          </button>
        </div>
      </div>
    </article>
  );
}
