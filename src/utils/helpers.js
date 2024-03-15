export const fullName = (fn, ln) => fn + " " + ln;

export const firstAvatar = (fn = "") => fn.charAt(0).toLocaleUpperCase();

export const transformedText = (text, length) => {
  return length <= 1 ? `${length} ${text}` : `${length} ${text}s`;
};

export const truncatedContent = (content) =>
  content?.length > 200 ? content.substring(0, 200) + "..." : content;
export const previewImage = (type, thumbnail) =>
  `${import.meta.env.VITE_SERVER_URI}/uploads/${type}/${thumbnail}`;
export function convertDateFormat(inputDate) {
  const date = new Date(inputDate);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const formattedMonth = String(month).padStart(2, "0");
  const formattedDay = String(day).padStart(2, "0");

  const formattedDate = `${formattedDay} ${getMonthName(month)} ${year}`;

  return formattedDate;
}

// Helper function to get month name from month number
function getMonthName(monthNumber) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months[monthNumber - 1];
}

export const getFormatedDate = (date) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

export const debounce = (func, delay) => {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};
