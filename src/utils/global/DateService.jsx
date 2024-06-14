import moment from "moment";

const getFullDate = (date) => {
  if (isToday(date)) {
    return "Today";
  } 
  
  const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dateOrdinals = ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'];

  const monthOfYear = monthsOfYear[date.getMonth()];
  const dayOfMonth = date.getDate();
  const dayOfWeek = daysOfWeek[date.getDay()];

  const dateOrdinal = dateOrdinals[dayOfMonth % 10 === 1 && dayOfMonth !== 11 ? 1 : dayOfMonth % 10];

  return `${dayOfWeek}, ${monthOfYear} ${dayOfMonth}${dateOrdinal}`;
};

const isToday = (date) => {
  const today = new Date();
  return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()
}

const getShortDate = (date) => {
  let month = (date.getMonth() + 1).toString();
  let day = date.getDate().toString();
  
  if (month.length === 1) {
    month = '0' + month;
  }
  if (day.length === 1) {
    day = '0' + day;
  }
  
  return `${day}/${month}`;
}

const getDayOfWeek = (date) => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return daysOfWeek[date.getDay()];
};

const getDayAndNumber = (date) => {
  const dayOfWeek = getDayOfWeek(date);
  const dayOfMonth = date.getDate();
  const suffix = getDaySuffix(dayOfMonth);
  
  return `${dayOfWeek} ${dayOfMonth}${suffix}`;
}

const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = ('0' + (d.getMonth() + 1)).slice(-2);
  const day = ('0' + d.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};

const getDaySuffix = (day) => {
  if (day >= 11 && day <= 13) {
    return 'th';
  }
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
};

const formatMonth = (date) => {
  return moment(date).format("MMMM YYYY");
};

const formatWeek = (startDate, endDate) => {
  return `${moment(startDate).format("DD")} - ${moment(endDate).format("DD MMM YYYY")}`;
};

export { getFullDate, getShortDate, getDayOfWeek, isToday, formatDate, getDayAndNumber, formatMonth, formatWeek };