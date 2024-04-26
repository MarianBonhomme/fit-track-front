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

export { getFullDate, getShortDate, getDayOfWeek };