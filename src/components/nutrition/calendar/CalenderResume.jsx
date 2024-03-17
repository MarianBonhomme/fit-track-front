import { addDays, format, subDays } from 'date-fns';
import { useEffect, useState } from "react";
import CalenderCard from "./CalenderCard";

export default function CalenderResume() {
  const [daysToDisplay, setDaysToDisplay] = useState();

  useEffect(() => {
    const daysArray = getTwoDaysAgoAndOneDaysAfter();
    setDaysToDisplay(daysArray);
  }, [])

  const getTwoDaysAgoAndOneDaysAfter = () => {
    const today = new Date();
    const twoDaysAgo = subDays(today, 2);
    const oneDaysAfter = addDays(today, 1);
    const daysArray = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = addDays(twoDaysAgo, i);
      if (currentDate >= twoDaysAgo && currentDate <= oneDaysAfter) {
        const formattedDate = format(currentDate, 'EEEE dd');
        daysArray.push({ date: format(currentDate, 'yyyy-MM-dd'), name: formattedDate });
      }
    }

    return daysArray;
  }

  return (
    <div className="grid grid-cols-4 gap-5">
      {daysToDisplay && daysToDisplay.map((day) => (
        <CalenderCard key={day.name} day={day} />
      ))}      
    </div>
  )
}