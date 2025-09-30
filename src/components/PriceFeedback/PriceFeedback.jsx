
import React, { useState } from "react";
import PriceFeedbackDetails from "./PriceFeedbackDetails";
import { searchIcon as SearchIcon, DeleteIcon , EyeIcon, dotsIcon as DotsIcon} from "../ui/icons";


const dummyRows = [
	{
		id: 1,
		title: "Home Painting service...",
		customer: {
			name: "James Robert",
			email: "jameadfsjarobertgmail.com",
			phone: "+11209876534",
			avatar: "https://randomuser.me/api/portraits/men/32.jpg"
		},
		address: "Highway 407, Vaughan, Ontario, Canada, ...",
		time: "Less than 1 week",
		created: "25 July, 2025, 17:14:25",
		service: "Appliance Install"
	},
    {
		id: 1,
		title: "Home Painting service...",
		customer: {
			name: "James Robert",
			email: "jameadfsjarobertgmail.com",
			phone: "+11209876534",
			avatar: "https://randomuser.me/api/portraits/men/32.jpg"
		},
		address: "Highway 407, Vaughan, Ontario, Canada, ...",
		time: "Less than 1 week",
		created: "25 July, 2025, 17:14:25",
		service: "Appliance Install"
	},
    {
		id: 1,
		title: "Home Painting service...",
		customer: {
			name: "James Robert",
			email: "jameadfsjarobertgmail.com",
			phone: "+11209876534",
			avatar: "https://randomuser.me/api/portraits/men/32.jpg"
		},
		address: "Highway 407, Vaughan, Ontario, Canada, ...",
		time: "Less than 1 week",
		created: "25 July, 2025, 17:14:25",
		service: "Appliance Install"
	},
    {
		id: 1,
		title: "Home Painting service...",
		customer: {
			name: "James Robert",
			email: "jameadfsjarobertgmail.com",
			phone: "+11209876534",
			avatar: "https://randomuser.me/api/portraits/men/32.jpg"
		},
		address: "Highway 407, Vaughan, Ontario, Canada, ...",
		time: "Less than 1 week",
		created: "25 July, 2025, 17:14:25",
		service: "Appliance Install"
	},
    {
		id: 1,
		title: "Home Painting service...",
		customer: {
			name: "James Robert",
			email: "jameadfsjarobertgmail.com",
			phone: "+11209876534",
			avatar: "https://randomuser.me/api/portraits/men/32.jpg"
		},
		address: "Highway 407, Vaughan, Ontario, Canada, ...",
		time: "Less than 1 week",
		created: "25 July, 2025, 17:14:25",
		service: "Appliance Install"
	},
    {
		id: 1,
		title: "Home Painting service...",
		customer: {
			name: "James Robert",
			email: "jameadfsjarobertgmail.com",
			phone: "+11209876534",
			avatar: "https://randomuser.me/api/portraits/men/32.jpg"
		},
		address: "Highway 407, Vaughan, Ontario, Canada, ...",
		time: "Less than 1 week",
		created: "25 July, 2025, 17:14:25",
		service: "Appliance Install"
	},
	// ...repeat for more rows
];


const PriceFeedback = () => {
	const [showDetails, setShowDetails] = useState(false);

	if (showDetails) {
		return <PriceFeedbackDetails onBack={() => setShowDetails(false)} />;
	}

	return (
		<div className="bg-gray-50 min-h-screen">
			<div className="max-w-7xl mx-auto">
				<div className="text-xl font-bold mb-4">Price Feedback</div>
				{/* Search and Filter Bar */}
	       <div className="flex gap-4 mb-2 items-center justify-end">
		       <div className="relative w-[420px]">
			       <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9D9D9D]">
				       <SearchIcon />
			       </span>
			       <input
				       type="text"
				       placeholder="Search by Project title, Customer name, Address"
				       className="w-full border rounded-md pl-10 pr-2 py-3 bg-[#E9E9E9] text-[#9D9D9D] text-base"
			       />
		       </div>
		       <select className="border rounded-md px-4 py-3 bg-[#E9E9E9] text-[#9D9D9D] text-base w-[220px]">
			       <option>Select Service Name</option>
			       <option>Appliance Install</option>
			       <option>Home Painting</option>
		       </select>
	       </div>
				{/* Table */}
				<div className="bg-white rounded-xl shadow p-1">
					<table className="min-w-full text-left">
						<thead>
							<tr className="text-[#262626] font-semibold text-base border-b">
								<th className="px-3 py-2 font-semibold">S.No.</th>
								<th className="px-3 py-2 font-semibold">Title</th>
								<th className="px-3 py-2 font-semibold">Customer</th>
								<th className="px-3 py-2 font-semibold">Address</th>
								<th className="px-3 py-2 font-semibold">Time</th>
								<th className="px-3 py-2 font-semibold">Created At <span className="inline-block align-middle">▼</span></th>
								<th className="px-3 py-2 font-semibold">Service Name</th>
								<th className="px-3 py-2 font-semibold">Action</th>
							</tr>
						</thead>
						<tbody>
							{dummyRows.map((row, idx) => (
								<tr key={row.id} className="border-b text-sm">
									<td className="px-3 py-2">{idx + 1}</td>
									<td className="px-3 py-2">
										<div className="flex flex-col gap-1">
											<span className=" bg-[#67A90B1F] text-[#67A90B] px-2 py-0.5 rounded text-xs font-medium ">0 Request</span>
											<span className=" bg-[#F7A71E1F] text-[#F7A71E] px-2 py-0.5 rounded text-xs font-medium ">From Share</span>

											<span className="font-semibold">{row.title}</span>
											<span className="text-xs text-[#9D9D9D]">{row.customer.email}</span>
										</div>
									</td>
									<td className="px-3 py-2">
										<div className="flex items-center gap-2">
											<img src={row.customer.avatar} alt="avatar" className="w-8 h-8 rounded-full border" />
											<div>
												<div className="font-medium">{row.customer.name}</div>
												<div className="text-xs text-gray-500">{row.customer.phone}</div>
											</div>
										</div>
									</td>
									<td className="px-3 py-2">{row.address}</td>
									<td className="px-3 py-2">{row.time}</td>
									<td className="px-3 py-2">{row.created}</td>
									<td className="px-3 py-2">{row.service}</td>
									<td className="px-5 py-4 flex items-center gap-4">
										<button className="text-yellow-500 hover:text-yellow-600" title="View" onClick={() => setShowDetails(true)}>
											<EyeIcon />
										</button>
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

export default PriceFeedback;
