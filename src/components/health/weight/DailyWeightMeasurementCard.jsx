import React, { useEffect, useState } from 'react'
import { formatDate, getFullDate } from '../../../utils/global/DateService'
import { Icon } from '@iconify/react/dist/iconify.js'
import CardTitle from '../../global/CardTitle'
import { useHealth } from '../../../utils/health/HealthContext'
import { useUser } from '../../../utils/user/UserContext'
import Card from '../../global/Card'

export default function DailyWeightMeasurementCard() {
  const { user } = useUser();
  const { weightMeasurements, currentDate, incrementCurrentDate, decrementCurrentDate, handleAddWeightMeasurement, handleUpdateWeightMeasurement } = useHealth();
  const [dailyWeightMeasurement, setDailyWeightMeasurement] = useState(null)
  const [newWeightMeasurement, setNewWeightMeasurement] = useState(0)
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setDailyWeightMeasurement(getDailyWeightMeasurement());
  }, [weightMeasurements, currentDate])

  useEffect(() => {
    if (dailyWeightMeasurement) {
      setNewWeightMeasurement(dailyWeightMeasurement.weight_value);
      setIsEditing(false);
    } else {
      setNewWeightMeasurement(0);
      setIsEditing(true);
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
      setIsEditing(false);
    }
  }

  return (
    <Card>
      <div className="flex justify-between items-center mb-5">
        <CardTitle text={currentDate && getFullDate(currentDate)} />
        <div className='flex gap-1'>
          <Icon icon="ic:round-chevron-left" width="25" height="25" className="bg-lightPrimary text-secondary rounded-full cursor-pointer" onClick={decrementCurrentDate} />
          <Icon icon="ic:round-chevron-right" width="25" height="25" className="bg-lightPrimary text-secondary rounded-full cursor-pointer" onClick={incrementCurrentDate} />
        </div>
      </div>
      {dailyWeightMeasurement && !isEditing ? (
        <div className="flex justify-evenly relative">
          <div className="absolute top-0 right-0">
            <Icon icon="akar-icons:edit" className='text-secondary size-[15px]' onClick={() => setIsEditing(true)} />
          </div>
          <p className='text-2xl font-bold'>
            {dailyWeightMeasurement.weight_value}
            <span className='text-xs font-normal'>kg</span>
          </p>
        </div>
      ) : (
        <>
          <div className='flex items-center justify-evenly'>
            <input 
              name="Weight"
              type="number" 
              value={newWeightMeasurement} 
              onChange={() => setNewWeightMeasurement(event.target.value)} 
              className='flex font-bold max-w-20 text-2xl text-secondary text-center bg-transparent mx-auto'
            />     
          </div>
          <button onClick={addMeasurement} disabled={newWeightMeasurement === 0} className={`flex mx-auto mt-5 ${newWeightMeasurement === 0 && 'brightness-75'}`}>
            <Icon icon="icon-park-solid:check-one" className="text-secondary size-[25px]" />
          </button>
        </>
      )}
    </Card>
  )
}