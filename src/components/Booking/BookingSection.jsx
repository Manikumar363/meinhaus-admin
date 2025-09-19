import React, { useState } from "react";
import CreateBooking from "./createBooking.jsx";
import BookingDetails from "./BookingDetails.jsx";
import { viewIcon as ViewIcon,
    dotsIcon as DotsIcon,
    deleteIcon as DeleteIcon,
 } from "../ui/icons";

// Dummy data for demonstration
const bookingsData = Array.from({ length: 8 }).map((_, i) => ({
	id: i + 1,
	title: "Home Painting service...",
	customer: {
		name: "James Robert",
		email: "jameadfsjarobertgmail.com",
		phone: "+1209876534",
		avatar: "https://randomuser.me/api/portraits/men/32.jpg",
	},
	address: "Highway 407, Vaughan, Ontario, Canada,...",
	time: "Less than 1 week",
	createdAt: "25 July, 2025, 17:14:25",
	status: i < 3 ? "Not Viewed" : "Viewed",
	fromShare: i === 2,
}));

const BookingSection = () => {
	const [selected, setSelected] = useState([]);
	const [selectAll, setSelectAll] = useState(false);
	const [search, setSearch] = useState("");
	const [showBulk, setShowBulk] = useState(false);
	const [page, setPage] = useState(1);
	const [showCreate, setShowCreate] = useState(false);
	const [detailsBooking, setDetailsBooking] = useState(null);

	const handleSelectAll = () => {
		if (selectAll) {
			setSelected([]);
		} else {
			setSelected(bookingsData.map((b) => b.id));
		}
		setSelectAll(!selectAll);
	};

	const handleSelect = (id) => {
		setSelected((prev) =>
			prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
		);
	};

	const handleDeleteSelected = () => {
		// Implement delete logic
		alert("Deleted selected bookings");
		setSelected([]);
		setSelectAll(false);
	};

	const filteredBookings = bookingsData.filter(
		(b) =>
			b.title.toLowerCase().includes(search.toLowerCase()) ||
			b.customer.name.toLowerCase().includes(search.toLowerCase()) ||
			b.address.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<div className="p-6 bg-white rounded-lg shadow">
			{showCreate ? (
				<div className="w-full max-w-5xl mx-auto">
					<button onClick={() => setShowCreate(false)} className="mb-4 text-2xl">←</button>
					<CreateBooking />
				</div>
			) : detailsBooking ? (
				<BookingDetails booking={detailsBooking} onClose={() => setDetailsBooking(null)} />
			) : (
				<>
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-2xl font-semibold">Bookings (56)</h2>
					<div className="flex items-center gap-4">
						<div className="relative">
							<input
								type="text"
								className="pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
								placeholder="Search by Project title, Customer name, Address"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								style={{ minWidth: 320 }}
							/>
							<span className="absolute left-3 top-2.5 text-gray-400">
								<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
							</span>
						</div>
						<button className="bg-black  text-white px-4 py-2 rounded hover:bg-gray-800 font-medium"
							onClick={() => setShowCreate(true)}>
							+ Create Booking
						</button>
					</div>
				</div>
				<div className="overflow-x-auto rounded-lg border">
					<table className="min-w-full bg-white">
						<thead>
							<tr className="bg-gray-50 text-gray-700 text-sm">
								<th className="px-3 py-2 relative">
									<input
										type="checkbox"
										checked={selectAll}
										onChange={handleSelectAll}
										className="accent-black"
										onClick={() => setShowBulk(!showBulk)}
									/>
									{showBulk && (
										<div className="absolute left-0 mt-2 w-36 bg-white border rounded shadow z-10">
											<button
												className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
												onClick={handleDeleteSelected}
											>
												Delete Selected
											</button>
											<button
												className="block w-full text-left px-4 py-2 hover:bg-gray-100"
												onClick={() => { setSelected([]); setSelectAll(false); }}
											>
												Deselect All
											</button>
										</div>
									)}
								</th>
								<th className="px-3 py-2 text-left font-semibold">Title</th>
								<th className="px-3 py-2 text-left font-semibold">Customer</th>
								<th className="px-3 py-2 text-left font-semibold">Address</th>
								<th className="px-3 py-2 text-left font-semibold">Time</th>
								<th className="px-3 py-2 text-left font-semibold cursor-pointer">
									Created At <span className="inline-block align-middle">▼</span>
								</th>
								<th className="px-3 py-2 text-left font-semibold">Status</th>
								<th className="px-3 py-2 text-left font-semibold">Action</th>
							</tr>
						</thead>
						<tbody>
							{filteredBookings.map((b, idx) => (
								<tr
									key={b.id}
									className={
										"border-b text-sm " +
										(b.status === "Not Viewed" ? "bg-yellow-50" : "")
									}
								>
									<td className="px-3 py-2 text-center">
										<input
											type="checkbox"
											checked={selected.includes(b.id)}
											onChange={() => handleSelect(b.id)}
											className="accent-black"
										/>
									</td>
									<td className="px-3 py-2">
										{b.fromShare && (
											<span className="inline-block text-xs bg-yellow-200 text-yellow-800 rounded px-2 py-0.5 mr-1">From Share</span>
										)}
										<div className="font-medium">{b.title}</div>
										<div className="text-xs text-gray-400">{b.customer.email}</div>
									</td>
									<td className="px-3 py-2 flex items-center gap-2">
										<img src={b.customer.avatar} alt="avatar" className="w-7 h-7 rounded-full border" />
										<div>
											<div className="font-medium">{b.customer.name}</div>
											<div className="text-xs text-gray-400">{b.customer.phone}</div>
										</div>
									</td>
									<td className="px-3 py-2">{b.address}</td>
									<td className="px-3 py-2">{b.time}</td>
									<td className="px-3 py-2">{b.createdAt}</td>
									<td className="px-3 py-2">
										<span
											className={
												"px-2 py-1 rounded text-xs font-semibold " +
												(b.status === "Not Viewed"
													? "bg-orange-100 text-orange-600"
													: "bg-green-100 text-green-600")
											}
										>
											{b.status}
										</span>
									</td>
									<td className="px-3 py-2 flex items-center gap-2">
										<button className="text-yellow-500 hover:text-yellow-600" title="View"
											onClick={() => setDetailsBooking(b)}>
											<ViewIcon />
										</button>
										<div className="relative group">
											<button className="text-gray-400 hover:text-red-500" title="Delete">
												<DotsIcon />
											</button>
											<div className="hidden group-hover:block absolute right-0 mt-2 w-20 bg-white border rounded shadow z-10">
												<button className="flex items-center gap-1 text-red-600 px-3 py-1 hover:bg-gray-100 w-full">
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
				</div>
				{/* Pagination */}
				<div className="flex justify-between items-center mt-4">
					<div className="text-gray-500">Previous</div>
					<div className="flex gap-2">
						{[1, 2, 3, 4, 5].map((p) => (
							<button
								key={p}
								className={`w-8 h-8 rounded ${p === page ? "bg-black text-white" : "bg-gray-100 text-gray-700"}`}
								onClick={() => setPage(p)}
							>
								{p}
							</button>
						))}
						<button className="ml-2 text-blue-600">Next</button>
					</div>
				</div>
				</>
			)}
		</div>
	);
};

export default BookingSection;
