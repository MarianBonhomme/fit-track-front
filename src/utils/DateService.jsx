const getFormattedDate = (date) => {
  if (isToday(date)) {
    return "Today";
  } 
  
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dateOrdinals = ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'];

  const dayOfWeek = daysOfWeek[date.getDay()];
  const dayOfMonth = date.getDate();

  const dateOrdinal = dateOrdinals[dayOfMonth % 10 === 1 && dayOfMonth !== 11 ? 1 : dayOfMonth % 10];

  return `${dayOfWeek} ${dayOfMonth}${dateOrdinal}`;
};

const isToday = (date) => {
  const today = new Date();
  return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()
}


export { getFormattedDate };