import React, { useEffect, useState, useRef } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import TrainingCard from './TrainingCard'
import { useSport } from '../../../utils/sport/SportContext'
import { getShortDate } from '../../../utils/global/DateService';
import { getBestTrainingPerformanceOfProgram, getFirstTrainingOfProgram, getLastTrainingOfProgram } from '../../../utils/sport/SportService';
import { useDraggable } from "react-use-draggable-scroll";
import AddButton from '../../global/AddButton';

export default function ProgramJourney({program}) {
  const { openTrainingForm } = useSport()
  const [isEditDropdownDisplayed, setIsEditDropdownDisplayed] = useState(false);
  const [lastTraining, setLastTraining] = useState('');
  const [firstTraining, setFirstTraining] = useState('');
  const [bestPerf, setBestPerf] = useState('');
  const ref = useRef();
  const { events } = useDraggable(ref);
  const dropdown = useRef(null)

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
    const last = getLastTrainingOfProgram(program);
    if (last) {
      setLastTraining(last)
    }
    const best = getBestTrainingPerformanceOfProgram(program);
    if (best) {
      setBestPerf(best);
    }
  }, [program])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdown.current && !dropdown.current.contains(event.target)) {
        setIsEditDropdownDisplayed(false);
      }
    };
  
    if (isEditDropdownDisplayed) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }
  }, [isEditDropdownDisplayed]);

  return (
    <div className="bg-primary text-secondary pl-10 p-5 rounded-3xl relative">
      <ProgramStateIndicator state={program.state} />
      {isEditDropdownDisplayed &&
        <EditProgramDropdown program={program} />
      }
      <div className='flex justify-between items-start mb-5 relative'>   
        <div className="flex items-center gap-3">   
          <Icon ref={dropdown} icon="icon-park-outline:hamburger-button" width="25" height="25" className='text-gray cursor-pointer' onClick={() => setIsEditDropdownDisplayed(true)} />    
          <div>
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
          <AddButton clicked={() => openTrainingForm(null, program.id, null)} css={'min-w-40 min-h-40'}/>  
        }            
      </div>
    </div>
  )
}

function ProgramStateIndicator(state) {
  const getBackgroundByState = () => {
    if (state.state === "ONGOING") {
      return 'bg-purple'
    } else if (state.state === "INITIAL" ) {
      return 'bg-blue'
    } else {
      return 'bg-green'
    }
  }
  const background = getBackgroundByState();

  return (
    <div className={`absolute top-0 left-0 w-5 h-full rounded-full ${background}`}>

    </div>
  )
}

function EditProgramDropdown({program}) {
  const { handleUpdateProgram, handleDeleteProgram } = useSport();

  const toggleFavorite = () => {
    const programFavorite = { ...program, is_favorite: !program.is_favorite};
    handleUpdateProgram(programFavorite);
  }

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

  const deleteProgram = () => {
    const confirm = window.confirm("Are you sure ?");
    if (confirm) {
      handleDeleteProgram(program)
    }
  }

  return (
    <div className="absolute top-0 left-5 flex flex-col gap-3 rounded-xl p-5 bg-primary z-10 shadow-custom">
      {program.state === 'ONGOING' &&
       <>
          <Icon icon="solar:star-bold" width="25" height="25" className={`${program.is_favorite ? 'text-yellow cursor-pointer' : 'text-lightPrimary'}`} onClick={toggleFavorite} />
          <Icon icon="heroicons:stop-circle-16-solid" width="25" height="25" className='text-orange cursor-pointer' onClick={stopProgram} />
          <Icon icon="mingcute:delete-fill" width="25" height="25" className='text-red cursor-pointer' onClick={deleteProgram} />
       </>
      }
      {program.state === 'INITIAL' &&        
        <Icon icon="mingcute:delete-fill" width="25" height="25" className='text-red cursor-pointer' onClick={deleteProgram} />
      }
      {program.state === 'COMPLETED' &&       
       <>
          <Icon icon="iconamoon:restart-bold" width="25" height="25" className='text-blue cursor-pointer' onClick={restartProgram} />
          <Icon icon="mingcute:delete-fill" width="25" height="25" className='text-red cursor-pointer' onClick={deleteProgram} />
       </>
      }
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
