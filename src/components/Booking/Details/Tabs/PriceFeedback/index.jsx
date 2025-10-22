import React from "react";

const PriceFeedbackTab = () => {
  return (
    <div className="bg-white rounded-2xl p-6 mb-8">
      <div className="text-xl font-semibold mb-4 text-gray-800">
        Price Feedback{" "}
        <span className="ml-1 bg-gray-200 rounded px-2 text-base font-normal">
          (3)
        </span>
      </div>
      <table className="min-w-full text-left">
        <thead>
          <tr className="text-gray-700 text-sm">
            <th className="px-3 py-2 font-medium">
              <input type="checkbox" className="accent-black" />{" "}
              <span className="ml-2 align-middle">▼</span>
            </th>
            <th className="px-3 py-2 font-medium">Service Name</th>
            <th className="px-3 py-2 font-medium">Requests</th>
            <th className="px-3 py-2 font-medium">Optimal Amount</th>
            <th className="px-3 py-2 font-medium">
              Created At <span className="inline-block align-middle">▼</span>
            </th>
            <th className="px-3 py-2 font-medium">Status</th>
            <th className="px-3 py-2 font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {dummyFeedback.map((row) => (
            <tr key={row.id} className="border-b text-sm">
              <td className="px-3 py-2 text-center">
                <input type="checkbox" className="accent-black" />
              </td>
              <td className="px-3 py-2 font-normal text-gray-900">
                {row.service}
              </td>
              <td className="px-3 py-2 text-gray-700">{row.requests}</td>
              <td className="px-3 py-2 text-gray-700">{row.amount}</td>
              <td className="px-3 py-2 text-gray-700">{row.created}</td>
              <td className="px-3 py-2">
                {row.status === "Sent" ? (
                  <span className="bg-green-50 text-green-700 px-3 py-1 rounded font-medium text-xs">
                    Sent
                  </span>
                ) : (
                  <span className="bg-orange-50 text-orange-700 px-3 py-1 rounded font-medium text-xs">
                    Not Sent
                  </span>
                )}
              </td>
              <td className="px-3 py-2 flex items-center gap-2">
                <button
                  className="text-yellow-500 hover:text-yellow-600"
                  title="View"
                >
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </button>
                <div className="relative group">
                  <button
                    className="text-gray-400 hover:text-black"
                    title="Menu"
                  >
                    <svg
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="5" cy="12" r="2" />
                      <circle cx="12" cy="12" r="2" />
                      <circle cx="19" cy="12" r="2" />
                    </svg>
                  </button>
                  <div className="hidden group-hover:block absolute right-0 mt-2 w-32 bg-white border rounded shadow z-10">
                    <button
                      className="flex items-center gap-2 px-4 py-2 text-green-700 hover:bg-gray-100 w-full text-sm"
                      onClick={() => setEditId(row.id)}
                    >
                      <svg
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M2 12l1.5-1.5a2 2 0 0 1 2.83 0l1.5 1.5" />
                        <path d="M2 12v6a2 2 0 0 0 2 2h6" />
                        <path d="M16 2l6 6" />
                        <path d="M16 2v6h6" />
                      </svg>
                      Send
                    </button>
                    <button
                      className="flex items-center gap-2 px-4 py-2 text-blue-700 hover:bg-gray-100 w-full text-sm"
                      onClick={() => setEditId(row.id)}
                    >
                      <svg
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19.5 3 21l1.5-4L16.5 3.5z" />
                      </svg>
                      Edit
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-100 w-full text-sm">
                      <svg
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M3 6h18" />
                        <path d="M9 6v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V6" />
                        <path d="M10 11v6M14 11v6" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PriceFeedbackTab;
