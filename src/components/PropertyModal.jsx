import React from "react";

export default function PropertyModal({ data, onClose }) {
  if (!data) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-slate-900/30 backdrop-blur-sm">
      <div className="bg-white w-96 sm:w-[28rem] p-6 rounded-2xl shadow-2xl relative animate-fadeIn border border-slate-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-400 hover:text-slate-700 text-lg"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold mb-2 text-slate-800 border-b pb-2">
          {data.name}
        </h2>

        {/* Details */}
        <div className="text-slate-600 space-y-1 mt-3 text-sm">
          <p>
            <strong>Email:</strong> {data.email}
          </p>
          <p>
            <strong>Phone:</strong> {data.phone}
          </p>
          <p>
            <strong>City:</strong> {data.address?.city}
          </p>
          <p>
            <strong>Company:</strong> {data.company?.name}
          </p>
          <p>
            <strong>Website:</strong>{" "}
            <a
              href={`https://${data.website}`}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              {data.website}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
