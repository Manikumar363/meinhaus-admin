import React from "react";

const PriceModal = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
      <div
        className={`bg-white rounded-2xl p-8 shadow-lg relative text-gray-900`}
      >
        <button className={`absolute text-3xl text-gray-700`}>&times;</button>
        <div className="flex items-center justify-between mb-6">
          <div className="text-2xl font-bold text-gray-900 tracking-tight">
            Price Feedback
          </div>
          <button className="border px-5 py-2 rounded-xl font-semibold text-base shadow-sm">
            + Add Another Form
          </button>
        </div>
        <form>
          <div></div>
          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              className="border px-8 py-2 rounded-xl font-bold text-base tracking-tight"
            >
              Save
            </button>
            <button
              type="button"
              className="bg-black text-white px-8 py-2 rounded-xl font-bold text-base tracking-tight"
            >
              Save and Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PriceModal;
