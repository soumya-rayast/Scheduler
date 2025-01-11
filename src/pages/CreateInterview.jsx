import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useInterviewStore from '../store/interviewStore';
import InterviewForm from '../components/InterviewFrom';

const CreateInterview = React.memo(() => {
  const [formState, setFormState] = useState({
    candidateName: '',
    interviewerName: '',
    type: '',
    startTime: '',
    endTime: '',
    errors: {},
  });
  const navigate = useNavigate();
  // function for set values 
  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value, errors: { ...formState.errors, [e.target.name]: '' } });
  };
  // function for validation 
  const validateForm = () => {
    const errors = {};
    const { candidateName, interviewerName, type, startTime, endTime } = formState;
    if (!candidateName) errors.candidateName = 'Candidate name is required';
    if (!interviewerName) errors.interviewerName = 'Interviewer name is required';
    if (!type) errors.type = 'Interview type is required';
    if (!startTime) errors.startTime = 'Start time is required';
    if (!endTime) errors.endTime = 'End time is required';
    return errors;
  };
  // function for handle submit data 
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormState({ ...formState, errors });
      return;
    }
    const { candidateName, interviewerName, type, startTime, endTime } = formState;
    const interviewData = { candidateName, interviewerName, type, startTime, endTime };

    if (useInterviewStore.getState().hasConflict(interviewData)) {
      toast.error('Interview time conflicts with existing schedule');
      return;
    }
    useInterviewStore.getState().addInterview(interviewData);
    toast.success('Interview scheduled successfully');
    setFormState({
      candidateName: '',
      interviewerName: '',
      type: '',
      startTime: '',
      endTime: '',
      errors: {},
    });
    navigate('/');
  };
  return (
    <div className="max-w-2xl mx-auto px-1 sm:px-6 lg:px-8 md:py-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Schedule an Interview</h2>
          <InterviewForm
            formData={formState}
            onChange={handleChange}
            onSubmit={handleSubmit}
            isEditing={false}
          />
        </div>
      </div>
    </div>
  );
});

export default CreateInterview;
