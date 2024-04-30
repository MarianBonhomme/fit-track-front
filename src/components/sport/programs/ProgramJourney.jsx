import React, { useEffect, useState, useRef } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import TrainingCard from './TrainingCard'
import { useSport } from '../../../utils/sport/SportContext'
import { getShortDate } from '../../../utils/global/DateService';
import { getBestTrainingPerformanceOfProgram, getFirstTrainingOfProgram, getLastTraining } from '../../../utils/sport/SportService';
import { useDraggable } from "react-use-draggable-scroll";
import AddButton from '../../global/AddButton';
import PatternIndicator from '../global/PatternIndicator';

export default function ProgramJourney({program}) {
  const { openTrainingForm, openProgramForm, handleUpdateProgram } = useSport()
  const [lastTraining, setLastTraining] = useState('');
  const [firstTraining, setFirstTraining] = useState('');
  const [bestPerf, setBestPerf] = useState('');
  const ref = useRef();
  const { events } = useDraggable(ref);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            const scrollWidth = ref.current.scrollWidth;
            ref.current.scrollTo({
              left: scrollWidth,
              behavior: 'smooth'
            });
          }, 200);
          observer.unobserve(entry.target);
        }
      });
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    const first = getFirstTrainingOfProgram(program);
    if (first) {
      setFirstTraining(first)
    }
    if (program.trainings) {
      const last = getLastTraining(program.trainings);
      if (last) {
        setLastTraining(last)
      }
    }    
    const best = getBestTrainingPerformanceOfProgram(program);
    if (best) {
      setBestPerf(best);
    }
  }, [program])

  
  const stopProgram = () => {
    const confirm = window.confirm("Are you sure ?");
    if (confirm) {
      const programToStop = {...program, is_completed: 1 }
      handleUpdateProgram(programToStop)
    }
  }

  const restartProgram = () => {
    const confirm = window.confirm("Are you sure ?");
    if (confirm) {
      const programToRestart = {...program, is_completed: 0 }
      handleUpdateProgram(programToRestart)
    }
  }

  return (
    <div className="bg-primary text-secondary pl-10 p-5 rounded-2xl relative">
      <PatternIndicator pattern={program.pattern} />
      <div className='flex justify-between items-start mb-5 relative'>   
        <div className="flex items-center gap-3 cursor-pointer">   
          {program.state === "COMPLETED" ? (
            <Icon icon="iconamoon:restart-bold" width="40" height="40" className='text-purple' onClick={restartProgram} />
          ) : program.state === "ONGOING" && (
            <Icon icon="heroicons:stop-circle-16-solid" width="40" height="40" className='text-orange' onClick={stopProgram} />
          )}
          <div onClick={() => openProgramForm(program)}>
            <p className="text-xl font-bold">{program.name}</p>
            <p className='font-semibold'>{program.description}</p>
          </div>
        </div> 
        <div className="grid grid-cols-2 gap-x-5">
          <div>
            {program.state !== "INITIAL" && 
              <StartingDate date={getShortDate(new Date(firstTraining.date))} />
            }
            {program.state === "COMPLETED" &&    
              <EndedDate date={getShortDate(new Date(lastTraining.date))} />
            }
          </div>
          <div>
            {program.state !== "INITIAL" && (    
              <>
                <StartingPerf training={firstTraining} />
                <BestPerf perf={bestPerf} />
              </>
            )}
          </div>
        </div>
      </div>          
      <div className='flex items-stretch overflow-x-scroll hide-scrollbar gap-3' {...events} ref={ref}>
        {program.trainings && program.trainings.map((training) => (
          <TrainingCard key={training.id} training={training} />
        ))}        
        {program.state !== "COMPLETED" && 
          <div className='h-40 flex items-center justify-center'>
            <AddButton clicked={() => openTrainingForm(null, program.id, null)} css={'w-16 h-16'}/> 
          </div>
        }            
      </div>
    </div>
  )
}

function StartingDate({date}) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-20 text-sm text-center bg-green text-primary font-semibold rounded-md">Start</div>
      <p>{date}</p>
    </div>
  )
}

function EndedDate({date}) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-20 text-sm text-center bg-red text-primary font-semibold rounded-md">End</div>
      <p>{date}</p>
    </div>
  )
}

function StartingPerf({training}) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-20 text-sm text-center bg-yellow text-primary font-semibold rounded-md">Start</div>
      <p>{training.weight > 0 ? `${training.weight}kg` : training.comment}</p>
    </div>
  )
}

function BestPerf({perf}) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-20 text-sm text-center bg-purple text-primary font-semibold rounded-md">Best</div>
      <p>{perf}</p>
    </div>
  )
}
