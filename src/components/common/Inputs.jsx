import React, { useRef } from "react";
import { CiEdit as EditIcon } from "react-icons/ci";
import { MdDelete as DeleteIcon } from "react-icons/md";
import { IoIosArrowUp as ExpandButtonIcon } from "react-icons/io";
import { IoMdAdd as AddIcon } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { motion } from "framer-motion";
import ReactQuill from "react-quill";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { LoadingSpinner } from "./LoadingSpinner";
import { modules, formats } from "../../lib/reusable-data";

// Minimal implementations (ensure these names exist). Replace with your styled versions if you have them.
import { useState } from "react";

export const CustomInput = ({ text, setText, className = "", ...props }) => (
  <input
    value={text}
    onChange={(e) => setText(e.target.value)}
    className={`w-full border rounded px-3 py-2 bg-transparent ${className}`}
    {...props}
  />
);

export const CustomSelect = ({ menu = [], value, onChange, className = "", ...props }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className={`w-full border rounded px-3 py-2 bg-transparent ${className}`}
    {...props}
  >
    {menu.map((m) => (
      <option key={m} value={m}>
        {m}
      </option>
    ))}
  </select>
);

// Textarea input
export const CustomTextArea = ({ maxChars, text, setText, className = "", ...props }) => {
  const classes = `resize-none border-gray-400 ${className}`;
  const handleChange = (e) => {
    if (maxChars && e.target.value.length > maxChars) return;
    setText(e.target.value);
  };
  return (
    <>
      <Textarea
        id="message"
        placeholder="Type your description here..."
        value={text}
        onChange={handleChange}
        className={classes}
        {...props}
      />
      {maxChars && (
        <p className={`text-sm ms-1 ${text.length === maxChars ? "text-red-500" : "text-gray-500"}`}>
          {maxChars - text.length} characters remaining
        </p>
      )}
    </>
  );
};

// Generic action button
export const CustomButton = ({ children, handleClick, className = "", ...props }) => (
  <Button className={`w-max ${className} transition`} onClick={handleClick} {...props}>
    {children}
  </Button>
);

// Mutation buttons
export const UpdateButton = ({ handleClick, className = "", ...props }) => (
  <Button variant="outline" size="icon" className={`green-button ${className}`} onClick={handleClick} {...props}>
    <EditIcon size={20} />
  </Button>
);

export const AddButton = ({ handleClick, className = "", ...props }) => (
  <Button variant="outline" size="icon" className={`green-button ${className}`} onClick={handleClick} {...props}>
    <AddIcon size={20} />
  </Button>
);

export const DeleteButton = ({ handleClick, className = "", isDeleting, ...props }) => (
  <Button
    variant="destructive"
    size="icon"
    className={`ml-2 ${className}`}
    onClick={handleClick}
    disabled={isDeleting}
    {...props}
  >
    {isDeleting ? <LoadingSpinner /> : <DeleteIcon size={20} />}
  </Button>
);

// View button
export const ViewButton = ({ handleClick, className = "", ...props }) => (
  <Button
    variant="outline"
    size="icon"
    className={`bg-[var(--golden)] hover:bg-[var(--dark-golden)] ${className} transition`}
    onClick={handleClick}
    {...props}
  >
    <FaEye size={20} />
  </Button>
);

// Expand button
export const ExpandButton = ({ handleClick, className = "", isExpanded, ...props }) => (
  <motion.button
    className={`bg-[var(--lightpurple)] hover:opacity-95 transition-opacity p-[0.5rem] rounded-sm ${className}`}
    onClick={handleClick}
    animate={{ rotate: isExpanded ? 180 : 0 }}
    {...props}
  >
    <span className="flex items-center">
      <ExpandButtonIcon size={17} />
    </span>
  </motion.button>
);

// Custom Quill Input
export const CustomReactQuill = ({ text, setText, maxChars }) => {
  const quillRef = useRef(null);
  const filteredText = text.replace(/<[^>]*>/g, "");
  const handleTextChange = (value) => {
    const quill = quillRef.current?.getEditor?.();
    const textOnly = value.replace(/<[^>]*>/g, "");
    if (quill) {
      if (!maxChars || textOnly.length <= maxChars) {
        setText(value);
      } else {
        const range = quill.getSelection();
        if (range) quill.deleteText(range.index - 1, 1);
      }
    } else {
      setText(value);
    }
  };
  return (
    <>
      <div className="h-full overflow-scroll">
        <ReactQuill
          theme="snow"
          value={text}
          onChange={handleTextChange}
          modules={modules}
          formats={formats}
          ref={quillRef}
          className="bg-[#fff]"
          style={{ border: "1px solid black", color: "black" }}
        />
      </div>
      {maxChars && (
        <p className={`text-sm ms-1 ${filteredText.length === maxChars ? "text-red-500" : "text-gray-500"}`}>
          {maxChars - filteredText.length} characters remaining
        </p>
      )}
    </>
  );
};

// Custom Checkbox
export const CustomCheckBox = ({ className = "", onChange, value }) => (
  <Checkbox
    onCheckedChange={onChange}
    checked={value}
    className={`w-4 h-4 disabled:cursor-not-allowed data-[state=checked]:bg-[var(--softpurple)] ${className}`}
  />
);