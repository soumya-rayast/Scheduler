import React, { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import { useNavigate } from 'react-router-dom';
import useInterviewStore from '../store/interviewStore';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales: { 'en-US': enUS } });

const Dashboard = () => {
  const [interviews, setInterviews] = useState([]);
  const [filters, setFilters] = useState({
    interviewer: '',
    candidate: '',
    startDate: '',
    endDate: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = useInterviewStore.subscribe((state) => setInterviews(state.interviews));
    setInterviews(useInterviewStore.getState().interviews);
    return () => unsubscribe();
  }, []);
// function for styling an event 
  const getEventStyle = (event) => {
    const colors = {
      Technical: '#4F46E5',
      HR: '#059669',
      Behavioral: '#DC2626',
    };
    return {
      style: {
        backgroundColor: colors[event.resource.type] || '#4F46E5',
        borderRadius: '8px',
        border: 'none',
        color: 'white',
        cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      },
    };
  };

  const handleEventDrop = ({ event, start, end }) => {
    const updatedEvent = { ...event, start, end };
    useInterviewStore.getState().updateInterview(event.id, updatedEvent);
    const updatedInterviews = interviews.map((interview) =>
      interview.id === event.id ? updatedEvent : interview
    );
    setInterviews(updatedInterviews);
  };
  // function for filter 
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };
  // function for select event : its navigate to edit page
  const handleSelectEvent = (event) => {
    navigate(`/edit/${event.id}`);
  };
  // for filtered data
  const filteredEvents = interviews
    .filter((interview) => {
      const { interviewer, candidate, startDate, endDate } = filters;
      // Filter by interviewer
      const matchesInterviewer = !interviewer || (interview.interviewerName && interview.interviewerName.toLowerCase().includes(interviewer.toLowerCase()));
      // Filter by candidate
      const matchesCandidate = !candidate || (interview.candidateName && interview.candidateName.toLowerCase().includes(candidate.toLowerCase()));
      // Filter by date range
      const matchesStartDate = !startDate || new Date(interview.startTime) >= new Date(startDate);
      const matchesEndDate = !endDate || new Date(interview.endTime) <= new Date(endDate);
      return matchesInterviewer && matchesCandidate && matchesStartDate && matchesEndDate;
    })
    .map((interview) => ({
      id: interview.id,
      title: `${interview.candidateName} - ${interview.type}`,
      start: new Date(interview.startTime),
      end: new Date(interview.endTime),
      resource: interview,
    }));
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-4 p-2 sm:p-6">
        {/* Filter Controls */}
        <div className="flex flex-wrap gap-4 p-4 bg-white shadow rounded-lg">
          <input
            type="text"
            name="interviewer"
            value={filters.interviewer}
            onChange={handleFilterChange}
            className="border rounded p-2"
            placeholder="Filter by Interviewer"
          />
          <input
            type="text"
            name="candidate"
            value={filters.candidate}
            onChange={handleFilterChange}
            className="border rounded p-2"
            placeholder="Filter by Candidate"
          />
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
            className="border rounded p-2"
            placeholder="Start Date"
          />
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleFilterChange}
            className="border rounded p-2"
            placeholder="End Date"
          />
        </div>
        {/* Showing the filter  info here */}
        {(filters.interviewer || filters.candidate || filters.startDate || filters.endDate) && (
          <div className="p-4 bg-gray-100 rounded-lg shadow">
            <h3 className="font-bold text-gray-700">Active Filters:</h3>
            <ul className="list-disc list-inside text-gray-600">
              {filters.interviewer && <li>Interviewer: {filters.interviewer}</li>}
              {filters.candidate && <li>Candidate: {filters.candidate}</li>}
              {filters.startDate && <li>Start Date: {filters.startDate}</li>}
              {filters.endDate && <li>End Date: {filters.endDate}</li>}
            </ul>
          </div>
        )}
        {/* Calendar */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <Calendar
              localizer={localizer}
              events={filteredEvents}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 600 }}
              defaultView="month"
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