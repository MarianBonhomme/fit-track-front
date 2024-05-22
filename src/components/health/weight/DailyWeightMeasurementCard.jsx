import React, { useEffect, useState } from 'react'
import { getFullDate } from '../../../utils/global/DateService'
import { Icon } from '@iconify/react/dist/iconify.js'
import CardTitle from '../../global/CardTitle'
import { useHealth } from '../../../utils/health/HealthContext'
import { useProfile } from '../../../utils/profile/ProfileContext'

export default function DailyWeightMeasurementCard() {
  const { profile } = useProfile();
  const { weightMeasurements, currentDate, incrementCurrentDate, decrementCurrentDate, handleAddWeightMeasurement, handleUpdateWeightMeasurement } = useHealth();
  const [dailyWeightMeasurement, setDailyWeightMeasurement] = useState(null)
  const [newWeightMeasurement, setNewWeightMeasurement] = useState(0)
  const [isFasting, setIsFasting] = useState(true)
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setDailyWeightMeasurement(getDailyWeightMeasurement());
  }, [weightMeasurements, currentDate])

  useEffect(() => {
    if (dailyWeightMeasurement) {
      setNewWeightMeasurement(dailyWeightMeasurement.weight_value);
      setIsFasting(dailyWeightMeasurement.is_fasting)
    } else {
      setNewWeightMeasurement(0);
      setIsFasting(true)
    }
  }, [dailyWeightMeasurement])

  const getDailyWeightMeasurement = () => {  
    const formatDate = (date) => {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = ('0' + (d.getMonth() + 1)).slice(-2);
      const day = ('0' + d.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    };
  
    const formattedCurrentDate = formatDate(currentDate);

    const measurement = weightMeasurements.find(
      (measurement) => formatDate(measurement.date) === formattedCurrentDate
    );

    if (measurement) {
      setIsEditing(false);
      return measurement
    } else {
      setIsEditing(true)
      return null
    }
  }

  const addMeasurement = () => {
    if (newWeightMeasurement && newWeightMeasurement > 0 ) {
      const newWeight = {
        id: dailyWeightMeasurement ? dailyWeightMeasurement.id : null,
        profile_id: profile.id,
        date: currentDate,
        weight_value: newWeightMeasurement,
        is_fasting: isFasting,
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
    <div className="w-full bg-primary max-sm:p-3 sm:px-4 sm:py-3 rounded-3xl sm:rounded-tl-none relative">
      <div className="flex justify-between items-center mb-5">
        <Icon icon="ic:round-chevron-left" width="25" height="25" className="text-dark cursor-pointer" onClick={decrementCurrentDate} />
        <CardTitle text={currentDate && getFullDate(currentDate)} />
        <Icon icon="ic:round-chevron-right" width="25" height="25" className="text-dark cursor-pointer" onClick={incrementCurrentDate} />
      </div>
      {dailyWeightMeasurement && !isEditing ? (
        <div className="flex justify-evenly relative">
          <div className="absolute top-0 right-0">
            <Icon icon="akar-icons:edit" className='size-[15px]' onClick={() => setIsEditing(true)} />
          </div>
          <div className='flex flex-col items-center'>
            <p className='mb-1'>Weight</p>
            <p className='text-2xl font-bold'>
              {dailyWeightMeasurement.weight_value}
              <span className='text-xs font-normal'>kg</span>
            </p>
          </div>
          <div className='flex flex-col items-center'>
            <p className='mb-1'>Fasting</p>
            {dailyWeightMeasurement.is_fasting ? (
              <Icon icon="icon-park-solid:check-one" className="text-green size-[20px]" />
            ) : (
              <Icon icon="material-symbols:cancel-rounded" className='text-red size-[20px]' />
            )}
          </div>
        </div>
      ) : (
        <>
          <div className='flex items-center justify-evenly'>
            <div className='flex flex-col items-center'>
              <label htmlFor="weight" className='mb-1'>Weight</label>
              <input 
                name="Weight"
                type="number" 
                value={newWeightMeasurement} 
                onChange={() => setNewWeightMeasurement(event.target.value)} 
                className='flex font-bold max-w-20 text-2xl text-secondary text-center bg-transparent mx-auto'
              />
            </div>
            <div className='flex flex-col items-center'>
              <p className='mb-1'>Fasting</p>
              <div className="flex border border-lightPrimary rounded-full overflow-hidden">
                <div className={`px-3 py-2 ${!isFasting ? 'bg-lightPrimary' : 'cursor-pointer'}`} onClick={() => setIsFasting(0)}>
                  <Icon icon="material-symbols:cancel-rounded" className='text-red size-[20px]' />
                </div>
                <div className={`px-3 py-2 ${isFasting ? 'bg-lightPrimary' : 'cursor-pointer'}`} onClick={() => setIsFasting(1)}>
                  <Icon icon="icon-park-solid:check-one" className="text-green size-[20px]" />
                </div>
              </div>
            </div>
          </div>
          <button onClick={addMeasurement} disabled={newWeightMeasurement === 0} className={`flex font-bold bg-blue text-primary tetx-xxs px-3 py-2 rounded-3xl mx-auto mt-5 ${newWeightMeasurement === 0 && 'brightness-75'}`}>Confirm</button>
        </>
      )}
    </div>
  )
}