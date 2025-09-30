import React from "react";
import {searchIcon as SearchIcon, dotsIcon as DotsIcon, DeleteIcon} from "../ui/icons";

const dummyStats = [
  {
    label: "Minimum Amount",
    value: "$2700.00",
    color: "bg-[#F1DFFF] text-purple-700",
    icon: (
      <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="50" height="50" rx="25" fill="#E8D4F8"/>
<path d="M25 32L31 26M25 32L19 26M25 32L25 18" stroke="#A64DEB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

    ),
  },
  {
    label: "Maximum Amount",
    value: "$5500.00",
    color: "bg-[#CEE5FF] text-blue-700",
    icon: (
      <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="50" height="50" rx="25" fill="#C0DBFA"/>
<path d="M25 18L19 24M25 18L31 24M25 18L25 32" stroke="#5B8EC8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

    ),
  },
  {
    label: "Optimal Pro",
    value: "$3500.00",
    color: "bg-[#FFEFAF] text-yellow-700",
    icon: (
      <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="50" height="50" rx="25" fill="#F6E6A5"/>
<path d="M24.7322 17.9585C24.9471 17.9585 25.1531 18.0441 25.305 18.1965C25.4569 18.3488 25.5422 18.5555 25.5422 18.771V19.2455C26.6114 19.408 27.4322 20.3353 27.4322 21.4544C27.4322 21.6699 27.3469 21.8766 27.195 22.0289C27.0431 22.1813 26.8371 22.2669 26.6222 22.2669C26.4074 22.2669 26.2014 22.1813 26.0495 22.0289C25.8976 21.8766 25.8122 21.6699 25.8122 21.4544C25.8122 21.2927 25.7482 21.1375 25.6341 21.0231C25.5201 20.9088 25.3655 20.8445 25.2042 20.8445H24.4622C24.2474 20.8445 24.0414 20.9301 23.8895 21.0825C23.7376 21.2348 23.6522 21.4415 23.6522 21.657V21.9441C23.6521 22.1097 23.7024 22.2713 23.7964 22.4074C23.8904 22.5435 24.0236 22.6476 24.1782 22.7057L25.8554 23.3362C26.3186 23.5104 26.7178 23.8223 26.9996 24.2302C27.2813 24.6381 27.4323 25.1225 27.4322 25.6187V25.9058C27.4323 26.4582 27.2453 26.9942 26.9019 27.426C26.5586 27.8579 26.0791 28.1599 25.5422 28.2827V28.7918C25.5422 29.0073 25.4569 29.214 25.305 29.3664C25.1531 29.5187 24.9471 29.6043 24.7322 29.6043C24.5174 29.6043 24.3114 29.5187 24.1595 29.3664C24.0076 29.214 23.9222 29.0073 23.9222 28.7918V28.3173C23.3958 28.237 22.9156 27.9698 22.5688 27.5645C22.222 27.1592 22.0316 26.6425 22.0322 26.1084C22.0322 25.8929 22.1176 25.6863 22.2695 25.5339C22.4214 25.3815 22.6274 25.2959 22.8422 25.2959C23.0571 25.2959 23.2631 25.3815 23.415 25.5339C23.5669 25.6863 23.6522 25.8929 23.6522 26.1084C23.6522 26.4453 23.9244 26.7183 24.2603 26.7183H25.0022C25.2171 26.7183 25.4231 26.6327 25.575 26.4804C25.7269 26.328 25.8122 26.1213 25.8122 25.9058V25.6187C25.8121 25.4534 25.7617 25.2919 25.6678 25.156C25.5738 25.0201 25.4407 24.9162 25.2863 24.8582L23.609 24.2267C23.1458 24.0524 22.7466 23.7405 22.4649 23.3326C22.1831 22.9248 22.0322 22.4403 22.0322 21.9441V21.657C22.0322 21.1046 22.2191 20.5686 22.5625 20.1368C22.9059 19.7049 23.3853 19.4029 23.9222 19.2802V18.771C23.9222 18.5555 24.0076 18.3488 24.1595 18.1965C24.3114 18.0441 24.5174 17.9585 24.7322 17.9585Z" fill="#BD9A0F"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M25.7419 14.5493C25.4248 14.4039 25.0803 14.3286 24.7316 14.3286C24.3829 14.3286 24.0384 14.4039 23.7213 14.5493L17.5393 17.3855C17.1158 17.5796 16.7567 17.8917 16.5049 18.2846C16.2532 18.6776 16.1192 19.1348 16.1191 19.602V25.5224C16.1191 27.2091 16.6354 28.884 17.7186 30.2284C18.5826 31.3009 19.7566 32.6637 20.9565 33.7644C21.5559 34.3147 22.1812 34.8174 22.7946 35.1868C23.3919 35.5475 24.0625 35.8335 24.7311 35.8335C25.4007 35.8335 26.0703 35.5475 26.6686 35.1868C27.282 34.8174 27.9073 34.3147 28.5067 33.7644C29.7066 32.6637 30.8795 31.302 31.7446 30.2284C32.8278 28.884 33.343 27.2091 33.343 25.5224V19.602C33.343 18.6486 32.7889 17.782 31.9239 17.3855L25.7419 14.5493ZM24.3952 16.027C24.5009 15.9784 24.6159 15.9533 24.7321 15.9533C24.8484 15.9533 24.9634 15.9784 25.0691 16.027L31.251 18.8631C31.3921 18.9279 31.5117 19.0319 31.5956 19.1629C31.6795 19.2939 31.7241 19.4463 31.7241 19.602V25.5224C31.7241 26.8809 31.3093 28.1841 30.4853 29.2068C29.6407 30.2555 28.5273 31.5446 27.4149 32.5651C26.8576 33.0765 26.3208 33.5011 25.8348 33.7947C25.3337 34.097 24.9676 34.2085 24.7332 34.2085C24.4978 34.2085 24.1317 34.097 23.6295 33.7947C23.1435 33.5022 22.6067 33.0765 22.0505 32.5651C20.9381 31.5446 19.8246 30.2555 18.9801 29.2068C18.156 28.1841 17.7402 26.8809 17.7402 25.5235V19.6009C17.7402 19.4452 17.7848 19.2928 17.8687 19.1618C17.9525 19.0309 18.0721 18.9268 18.2133 18.862L24.3952 16.027Z" fill="#BD9A0F"/>
</svg>

    ),
  },
];

const dummyRows = [
  {
    id: 1,
    name: "James Robert",
    email: "Jamesrobert@gmail.com",
    phone: "+11209876534",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    amount: "$2800",
    days: 2,
    replied: "25 July, 2025 at 17:14:25",
    badges: ["I", "G"],
    isOptimal: false,
  },
  {
    id: 2,
    name: "James Robert",
    email: "Jamesrobert@gmail.com",
    phone: "+11209876534",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    amount: "$2800",
    days: 2,
    replied: "25 July, 2025 at 17:14:25",
    badges: ["I", "G"],
    isOptimal: false,
  },
  {
    id: 3,
    name: "James Robert",
    email: "Jamesrobert@gmail.com",
    phone: "+11209876534",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    amount: "$2800",
    days: 2,
    replied: "25 July, 2025 at 17:14:25",
    badges: ["I", "G"],
    isOptimal: false,
  },
  {
    id: 4,
    name: "James Robert",
    email: "Jamesrobert@gmail.com",
    phone: "+11209876534",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    amount: "$2800",
    days: 2,
    replied: "25 July, 2025 at 17:14:25",
    badges: ["Optimal"],
    isOptimal: true,
  },
];

const PriceFeedbackDetails = ({ onBack }) => {
  return (
    <div className="bg-gray-50 min-h-screen p-1">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-1 py-3">
          <button onClick={onBack} className="mr-2 text-gray-500 hover:text-black">
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
          </button>
          <span className="text-xl text-[#262626] font-bold">Price Feedback / Appliance Install</span>
        </div>
        {/* Stats - horizontal icon beside text */}
        <div className="flex gap-4 mb-4">
          {dummyStats.map((stat, idx) => (
            <div key={idx} className={`flex items-center px-4 py-2 rounded-xl font-bold text-sm ${stat.color}`} style={{ minWidth: 200 }}>
              <div className="mr-2 flex-shrink-0">{stat.icon}</div>
              <div className="flex flex-col justify-center">
                <div className="text-xl font-bold text-[#262626]">{stat.value}</div>
                <div className="text-sm font-medium mt-1 text-gray-600">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
        {/* Search Bar */}
        <div className="flex mb-2 items-center justify-end">
          <div className="relative w-[420px]">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9D9D9D]">
              <SearchIcon />
            </span>
            <input
              type="text"
              placeholder="Search by Professional name"
              className="w-full border rounded-md pl-10 pr-2 py-3 bg-[#E9E9E9] text-[#9D9D9D] text-base"
            />
          </div>
        </div>
        {/* Table */}
        <div className="bg-white rounded-xl shadow p-4">
          <table className="min-w-full text-left">
            <thead>
              <tr className="text-[#262626]  font-semibold border-b">
                <th className="px-3 py-2 font-semibold">S.No.</th>
                <th className="px-3 py-2 font-semibold">Professional</th>
                <th className="px-3 py-2 font-semibold">Email Id</th>
                <th className="px-3 py-2 font-semibold">Amount</th>
                <th className="px-3 py-2 font-semibold">Days</th>
                <th className="px-3 py-2 font-semibold">Replied At</th>
                <th className="px-3 py-2 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {dummyRows.map((row, idx) => (
                <tr key={row.id} className="border-b text-sm">
                  <td className="px-3 py-2">{idx + 1}</td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <img src={row.avatar} alt="avatar" className="w-8 h-8 rounded-full border" />
                      <div>
                        <div className="font-medium flex items-center gap-1">
                          {row.name}
                          {row.badges.map((badge, i) => (
                            <span key={i} className={`ml-1 px-1.5 py-0.5 rounded text-xs font-bold ${badge === "Optimal" ? "bg-yellow-100 text-yellow-700 border border-yellow-400" : "bg-gray-100 text-gray-500"}`}>{badge}</span>
                          ))}
                        </div>
                        <div className="text-xs text-gray-500">{row.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2">{row.email}</td>
                  <td className="px-3 py-2">{row.amount}</td>
                  <td className="px-3 py-2">{row.days}</td>
                  <td className="px-3 py-2">{row.replied}</td>
                  <td className="px-3 py-2 flex items-center gap-2">
                    <div className="relative group">
                      <button className="text-gray-400 hover:text-black" title="Menu">
                        <DotsIcon />
                      </button>
                      <div className="hidden group-hover:block absolute right-0 mt-2 w-28 bg-white border rounded shadow z-10">
                        <button className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-100 w-full text-sm">
                          <DeleteIcon />
                          Delete
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="flex justify-center items-center mt-6 gap-2 text-gray-600">
            <span>Previous</span>
            <button className="w-7 h-7 rounded bg-blue-100 text-blue-700 font-bold">1</button>
            <button className="w-7 h-7 rounded hover:bg-blue-100">2</button>
            <button className="w-7 h-7 rounded hover:bg-blue-100">3</button>
            <button className="w-7 h-7 rounded hover:bg-blue-100">4</button>
            <button className="w-7 h-7 rounded hover:bg-blue-100">5</button>
            <span>Next</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceFeedbackDetails;
