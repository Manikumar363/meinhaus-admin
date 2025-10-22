import React from "react";

const RequestModal = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
      <div className="bg-white rounded-2xl p-8 w-[600px] shadow-lg relative">
        <button className="absolute top-6 right-6 text-2xl text-gray-700">
          &times;
        </button>
        <div className="text-2xl font-semibold mb-6">Request Info</div>
        <form className="w-full">
          <div className="mb-6">
            <input
              type="text"
              className="w-full border rounded-xl px-6 py-4 bg-gray-50 text-md placeholder-gray-400 font-sm"
              placeholder="Type your message here..."
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-black text-white px-7 py-3 rounded-xl font-semibold text-base flex items-center gap-2"
            >
              Send
              <svg
                width="22"
                height="22"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M22 2L11 13" />
                <path d="M22 2L15 22L11 13L2 9L22 2Z" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestModal;
