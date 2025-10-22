import React, { useState } from "react";
import ServiceList from "./ServiceList";
import ServiceForm from "./ServiceForm";

const ServiceSectionPage = () => {
  const [mode, setMode] = useState("list"); // 'list' | 'form'
  const [editId, setEditId] = useState("");

  const openAdd = () => { setEditId(""); setMode("form"); };
  const openEdit = (id) => { setEditId(id); setMode("form"); };
  const backToList = () => { setEditId(""); setMode("list"); };

  return mode === "list" ? (
    <ServiceList onAdd={openAdd} onEdit={openEdit} />
  ) : (
    <ServiceForm id={editId} onCancel={backToList} onSaved={backToList} />
  );
};

export default ServiceSectionPage;