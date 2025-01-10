import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useInterviewStore = create(
  persist(
    (set) => ({
      interviews: [],
      addInterview: (interview) =>
        set((state) => ({
          interviews: [...state.interviews, { ...interview, id: Date.now() }],
        })),
      updateInterview: (id, updatedInterview) =>
        set((state) => ({
          interviews: state.interviews.map((interview) =>
            interview.id === id ? { ...updatedInterview, id } : interview
          ),
        })),
      deleteInterview: (id) =>
        set((state) => ({
          interviews: state.interviews.filter((interview) => interview.id !== id),
        })),
      hasConflict: (newInterview) => {
        const state = useInterviewStore.getState();
        return state.interviews.some((interview) => {
          if (interview.id === newInterview.id) return false;
          
          const sameInterviewer = interview.interviewerId === newInterview.interviewerId;
          const sameCandidate = interview.candidateId === newInterview.candidateId;
          
          if (!sameInterviewer && !sameCandidate) return false;
          
          const newStart = new Date(newInterview.startTime);
          const newEnd = new Date(newInterview.endTime);
          const existingStart = new Date(interview.startTime);
          const existingEnd = new Date(interview.endTime);
          
          return (
            (newStart >= existingStart && newStart < existingEnd) ||
            (newEnd > existingStart && newEnd <= existingEnd) ||
            (newStart <= existingStart && newEnd >= existingEnd)
          );
        });
      },
    }),
    {
      name: 'interview-store',
    }
  )
);

export default useInterviewStore;