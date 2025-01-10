import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import useInterviewStore from '../store/interviewStore';
import InterviewForm from '../components/InterviewFrom';

const EditInterview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { interviews, updateInterview, deleteInterview, hasConflict } = useInterviewStore();
  const [formData, setFormData] = useState({
    candidateName: '',
    interviewerName: '',
    type: '',
    startTime: '',
    endTime: '',
    googleMeetLink: '',
  });

  const interview = interviews.find((i) => i.id === parseInt(id));

  useEffect(() => {
    if (interview) {
      setFormData(interview);
    }
  }, [interview]);

  if (!interview) {
    return <div>Interview not found</div>;
  }
  // function for set values 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  // function for submit the updated data
  const handleSubmit = (e) => {
    e.preventDefault();
    if (hasConflict({ ...formData, id: parseInt(id) })) {
      toast.error('Interview time conflicts with existing schedule');
      return;
    }
    updateInterview(parseInt(id), formData);
    toast.success('Interview updated successfully');
    navigate('/');
  };
  // function for delete data
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this interview?')) {
      deleteInterview(parseInt(id));
      toast.success('Interview deleted successfully');
      navigate('/');
    }
  };
  return (
    <div className="max-w-2xl mx-auto bg-white shadow sm:rounded-lg md:py-8">
      <h3 className="text-lg leading-6 font-medium pl-5 text-gray-900">Edit Interview</h3>
      <InterviewForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
        isEditing={true}
      />
    </div>
  );
};

export default EditInterview;