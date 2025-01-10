import React, { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import { useNavigate } from 'react-router-dom';
import useInterviewStore from '../store/interviewStore';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { AiOutlinePlus } from 'react-icons/ai';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales: { 'en-US': enUS } });

const Dashboard = () => {
  const [interviews, setInterviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = useInterviewStore.subscribe((state) => setInterviews(state.interviews));
    setInterviews(useInterviewStore.getState().interviews);
    return () => unsubscribe();
  }, []);

  const getEventStyle = (event) => {
    const colors = {
      Technical: '#4F46E5',
      HR: '#059669',
      Behavioral: '#DC2626'
    };
    return {
      style: {
        backgroundColor: colors[event.resource.type] || '#4F46E5',
        borderRadius: '8px',
        border: 'none',
        color: 'white',
        cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }
    };
  };

  const handleSelectEvent = (event) => {
    navigate(`/edit/${event.id}`);
  };

  const handleEventDrop = ({ event, start, end }) => {
    const updatedEvent = { ...event, start, end };
    useInterviewStore.getState().updateInterview(event.id, updatedEvent);
    const updatedInterviews = interviews.map((interview) =>
      interview.id === event.id ? updatedEvent : interview
    );
    setInterviews(updatedInterviews);
  };
  
  const events = interviews.map((interview) => ({
    id: interview.id,
    title: `${interview.candidateName} - ${interview.type}`,
    start: new Date(interview.startTime),
    end: new Date(interview.endTime),
    resource: interview,
  }));
  return (
    <DndProvider backend={HTML5Backend}> 
      <div className="space-y-4 p-2 sm:p-6">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 600 }}
              defaultView="week"
              views={['month', 'week', 'day']}
              eventPropGetter={getEventStyle}
              onSelectEvent={handleSelectEvent}
              onEventDrop={handleEventDrop}
              draggable
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default Dashboard;
