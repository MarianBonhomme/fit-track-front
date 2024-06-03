import React, { useEffect, useState } from 'react'
import { useHealth } from '../../../utils/health/HealthContext';
import { Icon } from '@iconify/react/dist/iconify.js';
import CardTitle from '../../global/CardTitle';
import moment from 'moment';
import { formatDate, isToday } from '../../../utils/global/DateService';
import Card from '../../global/Card';
import { useUser } from '../../../utils/user/UserContext';

export default function WeightCalendarCard() {
  const { currentDate, setCurrentDate, weightMeasurements } = useHealth();
  const [currentCalendarDate, setCurrentCalendarDate] = useState(currentDate);

  const daysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return new Date(year, month, 0).getDate();
  };

  const firstDayOfMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1; 
  };

  const handleDayClick = (dateClicked) => {
    setCurrentDate(new Date(dateClicked))
  };

  const isCurrentDate = (date) => {
    if (!currentDate) return false;
    return (
      date.getDate() === currentDate.getDate() &&
      date.getMonth() === currentDate.getMonth() &&
      date.getFullYear() === currentDate.getFullYear()
    );
  };

  const renderCalendar = () => {
    const days = [];
    const daysCount = daysInMonth(currentCalendarDate);
    const firstDay = firstDayOfMonth(currentCalendarDate);

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="empty-day"></div>);
    }

    for (let i = 1; i <= daysCount; i++) {
      const date = new Date(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth(), i);
      const dayMeasurement = weightMeasurements.find((measurement) => formatDate(measurement.date) == formatDate(date));
      let cellStyle = `relative p-2 cursor-pointer rounded-lg`;
      if (isCurrentDate(date)) cellStyle += ' bg-lightPrimary';
      let pelletStyle = `p-3 w-4 h-4 flex text-xs items-center justify-center m-auto rounded-full ${isToday(date) && 'bg-blue text-primary font-semibold'}`;
      days.push(
        <div key={i} className={cellStyle} onClick={() => handleDayClick(date)}>
          <div className={pelletStyle}>
            {i}
          </div>
          <div className='w-full h-6 flex items-center justify-center text-center'>{dayMeasurement && dayMeasurement.weight_value}</div>
          <div className={`absolute top-0 left-0 ${dayMeasurement ?? 'opacity-0'}`}>🔥</div>
        </div>
      );
    }

    return days;
  };

  return (
    <Card css={'flex max-sm:flex-col text-center gap-5 rounded-tl-none text-center'}>
      {/* <Stats date={currentCalendarDate}/> */}
      <WeightInput />
      <div className='sm:w-1/2'>
        <div className="w-full flex items-center justify-between mb-3 px-2">
          <CardTitle text={moment(currentCalendarDate).format("MMMM YYYY")} />
          <div className='flex gap-1'>
            <Icon icon="ic:round-chevron-left" width="25" height="25" className="bg-lightPrimary text-secondary rounded-full cursor-pointer" onClick={() => setCurrentCalendarDate(new Date(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth() - 1))} />
            <Icon icon="ic:round-chevron-right" width="25" height="25" className="bg-lightPrimary text-secondary rounded-full cursor-pointer" onClick={() => setCurrentCalendarDate(new Date(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth() + 1))} />
          </div>
        </div>
        <div className="w-full grid grid-cols-7 mb-3 text-xs">
          <div className="day-label">Mon</div>
          <div className="day-label">Tue</div>
          <div className="day-label">Wed</div>
          <div className="day-label">Thu</div>
          <div className="day-label">Fri</div>
          <div className="day-label">Sat</div>
          <div className="day-label">Sun</div>
        </div>
        <div className='w-full grid grid-cols-7'>{renderCalendar()}</div>
      </div>
    </Card>
  );
}

function WeightInput() {
  const { user } = useUser();
  const { weightMeasurements, currentDate, handleAddWeightMeasurement, handleUpdateWeightMeasurement } = useHealth();
  const [dailyWeightMeasurement, setDailyWeightMeasurement] = useState(null)
  const [newWeightMeasurement, setNewWeightMeasurement] = useState(0)
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    if (newWeightMeasurement === dailyWeightMeasurement?.weight_value || newWeightMeasurement === 0 || newWeightMeasurement === '') {
      setIsButtonDisabled(true)
    } else {
      setIsButtonDisabled(false);
    }
  }, [newWeightMeasurement, dailyWeightMeasurement])
  
  useEffect(() => {
    setDailyWeightMeasurement(getDailyWeightMeasurement());
  }, [weightMeasurements, currentDate])

  useEffect(() => {
    if (dailyWeightMeasurement) {
      setNewWeightMeasurement(dailyWeightMeasurement.weight_value);
    } else {
      setNewWeightMeasurement(0);
    }
  }, [dailyWeightMeasurement])

  const getDailyWeightMeasurement = () => {  
    const measurement = weightMeasurements.find(
      (measurement) => formatDate(measurement.date) === formatDate(currentDate)
    );
    return measurement || null
  }

  const addMeasurement = () => {
    if (newWeightMeasurement && newWeightMeasurement > 0 ) {
      const newWeight = {
        id: dailyWeightMeasurement ? dailyWeightMeasurement.id : null,
        user_id: user.id,
        date: currentDate,
        weight_value: newWeightMeasurement,
      }

      if (dailyWeightMeasurement) {
        handleUpdateWeightMeasurement(newWeight)
      } else {
        handleAddWeightMeasurement(newWeight);
      }
    }
  }

  return (
    <div className='flex justify-center items-center bg-lightPrimary max-w-fit mx-auto px-3 py-1 rounded-lg'>
      <input 
        name="Weight"
        type="number" 
        value={newWeightMeasurement} 
        onChange={() => setNewWeightMeasurement(event.target.value)} 
        className='flex font-bold max-w-14 text-xl text-secondary bg-transparent'
      />    
      <button onClick={addMeasurement} disabled={isButtonDisabled} className="flex">
        <Icon icon="icon-park-solid:check-one" className={`text-green size-[20px] ${isButtonDisabled && 'opacity-50'}`} />
      </button> 
    </div>  
  )
}

function Stats({date}) {
  const { weightMeasurements } = useHealth();
  const [minWeight, setMinWeight] = useState();
  const [maxWeight, setMaxWeight] = useState();
  const [averageWeight, setAverageWeight] = useState();
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    if (weightMeasurements && weightMeasurements.length > 0) {
      const filteredMeasurements = weightMeasurements.filter(measurement => {
        const measurementDate = new Date(measurement.date);
        return measurementDate.getMonth() === date.getMonth() &&
          measurementDate.getFullYear() === date.getFullYear();
      });

      if (filteredMeasurements.length > 0) {
        const weights = filteredMeasurements.map(measurement => measurement.weight_value);
        const min = Math.min(...weights);
        const max = Math.max(...weights);
        const average = (weights.reduce((acc, val) => acc + val, 0) / weights.length).toFixed(1);

        setMinWeight(min);
        setMaxWeight(max);
        setAverageWeight(average);
        setShowStats(true);
      } else {
        setMinWeight(undefined);
        setMaxWeight(undefined);
        setAverageWeight(undefined);
        setShowStats(false);
      }
    }
  }, [weightMeasurements, date]);

  return (
    showStats ? (
      <div className="sm:w-1/2 flex flex-col sm:justify-evenly max-sm:space-y-3">
      <Streaks /> 
      <div className='space-y-1'>
        <CardTitle text={'Weight Stats'} />
        <div className='flex justify-evenly items-center'>
          <div className='flex items-center justify-center gap-1'>
          <Icon icon="ph:arrow-down-left-bold" className='text-green size-[25px]' />
            <p className='text-xl font-bold'>
              {minWeight}
              <span className='text-xs font-normal'>kg</span>
            </p>
          </div>      
          <div className='flex items-center justify-center gap-1'>
          <Icon icon="ph:arrow-up-right-bold" className='text-red size-[25px]' />
            <p className='text-xl font-bold'>
              {maxWeight}
              <span className='text-xs font-normal'>kg</span>
            </p>
          </div>
          <div className='flex items-center justify-center gap-1'>
            <Icon icon="ph:approximate-equals-bold" className='text-blue size-[25px]' />
            <p className='text-xl font-bold'>
              {averageWeight}
              <span className='text-xs font-normal'>kg</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    ) : null   
  )
}

function Streaks() {  
  const { weightMeasurements } = useHealth();
  const [currentStreak, setCurrentStreak] = useState(0);

  useEffect(() => {
    if (weightMeasurements && weightMeasurements.length > 0) {
      const streak = calculateCurrentStreak()
      setCurrentStreak(streak);
    }
  }, [weightMeasurements])

  const calculateCurrentStreak = () => {
    const today = new Date();
    let streak = 0;
  
    const todayIndex = weightMeasurements.findIndex(measurement => 
      formatDate(measurement.date) === formatDate(today)
    );
  
    if (todayIndex === -1) {
      return streak;
    }
  
    streak++;
  
    for (let i = todayIndex; i > 0; i--) {
      const currentWeightMeasurement = weightMeasurements[i];
      const previousWeightMeasurement = weightMeasurements[i - 1];
  
      const currentDate = moment(currentWeightMeasurement.date);
      const previousDate = moment(previousWeightMeasurement.date);

      if (currentDate.diff(previousDate, 'days') === 1) {
        streak++;
      } else {
        break;
      }
    }
  
    return streak;
  }

  return (
    currentStreak ? (
      <div className='space-y-1'>
        <CardTitle text={'Current Streak'} />
        <div className='text-2xl font-bold'>{currentStreak}🔥</div>
      </div>
    ) : null
  )
}