
import React, { useState } from "react";
import PriceFeedbackDetails from "./PriceFeedbackDetails";


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
		<div className="bg-gray-50 min-h-screen p-1">
			<div className="max-w-6xl mx-auto">
				<div className="text-xl font-bold mb-4">Price Feedback</div>
				{/* Search and Filter Bar */}
				<div className="flex gap-4 mb-2">
					<input type="text" placeholder="Search by Project title, Customer name, Address" className="flex-1 border justify-end rounded-md px-2 py-3 bg-[#E9E9E9] text-[#9D9D9D]" />
					<select className="border rounded-md px-4 py-3 bg-white text-gray-700">
						<option>Select Service Name</option>
						<option>Appliance Install</option>
						<option>Home Painting</option>
					</select>
				</div>
				{/* Table */}
				<div className="bg-white rounded-xl shadow p-4">
					<table className="min-w-full text-left">
						<thead>
							<tr className="text-gray-700 text-sm border-b">
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
									<td className="px-3 py-2 flex items-center gap-2">
										<button className="text-yellow-500 hover:text-yellow-600" title="View" onClick={() => setShowDetails(true)}>
											<svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg>
										</button>
										<div className="relative group">
											<button className="text-gray-400 hover:text-black" title="Menu">
												<svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>
											</button>
											<div className="hidden group-hover:block absolute right-0 mt-2 w-28 bg-white border rounded shadow z-10">
												<button className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-100 w-full text-sm">
													<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 6h18"/><path d="M9 6v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V6"/><path d="M10 11v6M14 11v6"/></svg>
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
