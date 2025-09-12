
import React, { useState } from "react";

const initialImages = [
  "https://images.unsplash.com/photo-1?w=100",
  "https://images.unsplash.com/photo-2?w=100",
  "https://images.unsplash.com/photo-3?w=100",
];

const CreateBooking = () => {
  const [isNewCustomer, setIsNewCustomer] = useState(true);
  const [isAddNewAddress, setIsAddNewAddress] = useState(true);
  const [images, setImages] = useState(initialImages);

	const handleImageRemove = (idx) => {
		setImages((imgs) => imgs.filter((_, i) => i !== idx));
	};

	const handleImageUpload = (e) => {
		const files = Array.from(e.target.files);
		const urls = files.map((file) => URL.createObjectURL(file));
		setImages((imgs) => [...imgs, ...urls]);
	};

	return (
		<div className="min-h-screen bg-gray-50 p-6">
			<div className="max-w-6xl mx-auto flex gap-8">
				   {/* Sidebar */}
				   <div className="w-64 bg-white rounded-lg p-6 h-fit mt-2">
							<div className="mt-8">
								<div className="py-2 px-4 rounded font-medium bg-gray-100 text-black">Customer Details</div>
								<div className="py-2 px-4 rounded font-medium mt-2 text-gray-400">Project Details</div>
							</div>
				   </div>
				{/* Main Form */}
				<form className="flex-1 space-y-8">
					{/* Customer Details */}
					<div className="bg-white rounded-lg p-6">
						<div className="font-semibold text-lg mb-4">Customer Details</div>
						<div className="flex gap-8 mb-4">
							<label className="flex items-center gap-2 cursor-pointer">
								<input type="checkbox" checked={isNewCustomer} onChange={() => setIsNewCustomer(true)} className="accent-black" />
								Create New Customer
							</label>
							<label className="flex items-center gap-2 cursor-pointer">
								<input type="checkbox" checked={!isNewCustomer} onChange={() => setIsNewCustomer(false)} className="accent-black" />
								Existing Customer
							</label>
						</div>
						<div className="space-y-4">
							<div>
								<label className="block text-sm mb-1">Full Name</label>
								<input type="text" placeholder="Enter Full Name" className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
							</div>
							<div>
								<label className="block text-sm mb-1">E-mail ID</label>
								<input type="email" placeholder="Enter E-mail ID" className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
							</div>
							<div>
								<label className="block text-sm mb-1">Phone Number</label>
								<input type="text" placeholder="+1 | Enter Phone Number" className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
							</div>
							<div className="flex gap-8 mb-2">
								<label className="flex items-center gap-2 cursor-pointer">
									<input type="checkbox" checked={isAddNewAddress} onChange={() => setIsAddNewAddress(true)} className="accent-black" />
									Add New Address
								</label>
								<label className="flex items-center gap-2 cursor-pointer">
									<input type="checkbox" checked={!isAddNewAddress} onChange={() => setIsAddNewAddress(false)} className="accent-black" />
									Choose Address
								</label>
							</div>
							<div>
								<label className="block text-sm mb-1">Address</label>
								<input type="text" placeholder="Enter a location (Restricted to Canada)" className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
							</div>
							<div>
								<label className="block text-sm mb-1">Coordinates</label>
								<input type="text" placeholder="--,--" className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
							</div>
						</div>
					</div>
					{/* Project Details */}
					<div className="bg-white rounded-lg p-6">
						<div className="font-semibold text-lg mb-4">Project Details</div>
						<div className="space-y-4">
							<div>
								<label className="block text-sm mb-1">Title</label>
								<input type="text" placeholder="Home Painting" className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
							</div>
							<div>
								<label className="block text-sm mb-1">When do you want your project done?</label>
								<select className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
									<option>Select</option>
									<option>ASAP</option>
									<option>Less than 1 week</option>
									<option>More than 2 weeks</option>
								</select>
							</div>
							<div>
								<label className="block text-sm mb-1">Description</label>
								<textarea placeholder="Enter description" className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" rows={3}></textarea>
							</div>
							<div>
								<label className="block text-sm mb-1">Images</label>
								<div className="flex items-center gap-2 mb-2">
									{images.map((img, idx) => (
										<div key={idx} className="relative">
											<img src={img} alt="preview" className="w-16 h-16 object-cover rounded border" />
											<button type="button" onClick={() => handleImageRemove(idx)} className="absolute -top-2 -right-2 bg-white border border-red-500 text-red-500 rounded-full w-6 h-6 flex items-center justify-center shadow">
												×
											</button>
										</div>
									))}
									<label className="flex flex-col items-center justify-center border border-dashed border-gray-400 rounded px-3 py-2 cursor-pointer hover:bg-gray-50">
										<span className="text-sm text-gray-500">Upload Images</span>
										<input type="file" multiple className="hidden" onChange={handleImageUpload} />
									</label>
								</div>
							</div>
						</div>
					</div>
					{/* Submit Button */}
					<div className="flex justify-end">
						<button type="submit" className="bg-black text-white px-8 py-2 rounded hover:bg-gray-800 font-medium text-lg">Submit</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateBooking;
