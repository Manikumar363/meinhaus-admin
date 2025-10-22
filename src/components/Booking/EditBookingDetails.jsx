import React from "react";

const EditBookingDetails = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
      <div className="bg-white rounded-2xl p-8 w-[500px] shadow-lg relative">
        <button
          className="absolute top-4 right-4 text-2xl"
        >
          &times;
        </button>
        <div className="text-2xl font-bold mb-6">Edit Price Feedback</div>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Service Name</label>
          <select
            className="w-full border rounded px-4 py-3 bg-gray-100 text-lg"
            disabled
          >
            <option>Appliance Instal</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Description</label>
          <textarea
            className="w-full border rounded px-4 py-3 bg-gray-100 text-lg"
            rows={3}
            disabled
          >
            My Bathroom pipeline is damaged...
          </textarea>
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2">Images</label>
          <div className="flex gap-4">
            {[1, 2, 3].map((img, idx) => (
              <div key={idx} className="relative">
                <img
                  src={`https://images.unsplash.com/photo-${img}?w=100`}
                  alt="img"
                  className="w-20 h-20 object-cover rounded-lg border"
                />
                <span className="absolute top-2 left-2 w-6 h-6 bg-white border border-gray-300 rounded-full flex items-center justify-center">
                  {idx === 0 ? (
                    <svg
                      width="18"
                      height="18"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    <svg
                      width="18"
                      height="18"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <rect x="4" y="4" width="16" height="16" rx="2" />
                    </svg>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-8">
          <button className="border px-8 py-2 rounded font-bold text-lg">
            Save
          </button>
          <button className="bg-black text-white px-8 py-2 rounded font-bold text-lg">
            Save and Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBookingDetails;
