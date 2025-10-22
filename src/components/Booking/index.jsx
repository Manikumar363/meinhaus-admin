import React, { useState } from "react";
import { bookingsData } from "../../constants/index.js";
import BookingTable from "./BookingTable.jsx";
import BookingHeader from "./BookingHeader.jsx";
import BookingPagination from "./BookingPagination.jsx";

const BookingSection = () => {
  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [search, setSearch] = useState("");

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

  const filteredBookings = bookingsData.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.customer.name.toLowerCase().includes(search.toLowerCase()) ||
      b.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="">
      <BookingHeader
        bookingsData={bookingsData}
        search={search}
        setSearch={setSearch}
      />

      <BookingTable
        filteredBookings={filteredBookings}
        selectAll={selectAll}
        handleSelectAll={handleSelectAll}
        handleSelect={handleSelect}
        selected={selected}
        setSelectAll={setSelectAll}
        setSelected={setSelected}
      />
      <BookingPagination />
    </div>
  );
};

export default BookingSection;
