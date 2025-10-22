import toast from "react-hot-toast";

// Show error toast
export const showError = (error) => {
  if (error && typeof error === "object" && "data" in error && error.data !== undefined) {
    const message =
      (error.data && error.data.message) ||
      (error.message ? error.message : "Something went wrong! Please try again later.");
    toast.error(message);
  } else if (error && error.message) {
    toast.error(error.message);
  } else {
    toast.error("Something went wrong! Please try again later.");
  }
};

// Generate random id of given length (base36 chars)
export const generateRandomId = (length = 6) => {
  try {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array, (byte) => ("0" + (byte % 36).toString(36)).slice(-1)).join("");
  } catch {
    // Fallback if crypto not available
    let str = "";
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
      str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
  }
};

// Convert seconds to whole days
export function secondsToDays(seconds) {
  return Math.floor(seconds / 86400);
}

// Digits only?
export function isDigitsOnly(value) {
  return /^\d+$/.test(value);
}

// Format ISO to date,time (IST)
export function formatDate(isoDate) {
  const date = new Date(isoDate);
  const options = {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  };
  return new Intl.DateTimeFormat("en-IN", options).format(date);
}

// Convert string to date (short/long)
export const convertToDate = (date, format = "short") => {
  if (!date) return undefined;
  const d = new Date(date);
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const year = d.getFullYear();
  if (format === "long") {
    const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return `${monthNames[d.getMonth()]} ${day}, ${year}`;
  }
  return `${day < 10 ? "0" + day : day}/${month < 10 ? "0" + month : month}/${year}`;
};

// Strip HTML tags
export function filterHtmlTags(text) {
  return text.replace(/<\/?[^>]+(>|$)/g, "");
}

// Is given date today?
export function isToday(dateString) {
  const incomingDate = new Date(dateString);
  const today = new Date();
  return (
    incomingDate.getFullYear() === today.getFullYear() &&
    incomingDate.getMonth() === today.getMonth() &&
    incomingDate.getDate() === today.getDate()
  );
}

// Is given date yesterday?
export function isYesterday(dateString) {
  const incomingDate = new Date(dateString);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  return (
    incomingDate.getFullYear() === yesterday.getFullYear() &&
    incomingDate.getMonth() === yesterday.getMonth() &&
    incomingDate.getDate() === yesterday.getDate()
  );
}

// Calculate video duration (sets state with {hours, minutes, seconds})
export const calculateDuration = ({ file, setDuration }) => {
  if (!file) return;
  const videoUrl = URL.createObjectURL(file);
  const video = document.createElement("video");
  video.style.display = "none";
  video.addEventListener("loadedmetadata", () => {
    const totalSeconds = video.duration;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    setDuration({ hours, minutes, seconds });
    URL.revokeObjectURL(videoUrl);
  });
  video.addEventListener("error", (e) => {
    console.log("Error loading video meta data", e);
    URL.revokeObjectURL(videoUrl);
  });
  video.src = videoUrl;
};

// Truncate string keeping last part
export const truncateString = (str, num) => {
  if (str.length > num) {
    return "..." + str.slice(str.length - (num - 3));
  }
  return str;
};

const getCleanTime = (time) => {
  let cleanTime = "";
  cleanTime += time[0] === "_" ? "0" : time[0];
  if (time[1] !== "_") cleanTime += time[1];
  return Number(cleanTime);
};

export const TimeToSeconds = (time) => {
  const [h, m, s] = time.split(":");
  return getCleanTime(h) * 3600 + getCleanTime(m) * 60 + getCleanTime(s);
};

export function secondsToTime(totalSeconds) {
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

export function extractVideoURLKey(url) {
  const fileName = url.split("/").pop();
  return fileName ? fileName.replace(/\.[^/.]+$/, "") : "";
}

export function strippedHtmlTags(str) {
  return str.replace(/<(.|\n)*?>/g, "").trim();
}