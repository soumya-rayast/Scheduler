import React from 'react';

const InterviewForm = React.memo(({ formData, onChange, onSubmit, onDelete, isEditing }) => {
    return (
        <form onSubmit={onSubmit} className="p-4 space-y-6">
            <div className="grid grid-cols-1 gap-6">
                {/* Candidate Name Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Candidate Name
                        <input
                            type="text"
                            name="candidateName"
                            value={formData.candidateName}
                            onChange={onChange}
                            className="outline-none mt-1 p-2 block w-full rounded-md shadow-sm focus:ring-indigo-500 border border-gray-300"
                            placeholder="E.g., John Doe"
                            required
                        />
                    </label>
                </div>
                {/* Interviewer Name Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Interviewer Name
                        <input
                            type="text"
                            name="interviewerName"
                            value={formData.interviewerName}
                            onChange={onChange}
                            className="outline-none mt-1 p-2 block w-full rounded-md shadow-sm focus:ring-indigo-500 border border-gray-300"
                            placeholder="E.g., Jane Smith"
                            required
                        />
                    </label>
                </div>
                {/* Interview Type Dropdown */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Interview Type
                        <select
                            name="type"
                            value={formData.type}
                            onChange={onChange}
                            className="mt-1 block w-full p-2 rounded-md shadow-sm focus:ring-indigo-500 border border-gray-300"
                            required
                        >
                            <option value="">Select type...</option>
                            <option value="Technical">Technical</option>
                            <option value="HR">HR</option>
                            <option value="Behavioral">Behavioral</option>
                        </select>
                    </label>
                </div>
                {/* Start Time Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Start Time
                        <input
                            type="datetime-local"
                            name="startTime"
                            value={formData.startTime}
                            onChange={onChange}
                            className="mt-1 block w-full p-2 rounded-md shadow-sm focus:ring-indigo-500 border border-gray-300"
                            required
                        />
                    </label>
                </div>
                {/* End Time Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        End Time
                        <input
                            type="datetime-local"
                            name="endTime"
                            value={formData.endTime}
                            onChange={onChange}
                            className="mt-1 block w-full p-2 rounded-md shadow-sm focus:ring-indigo-500 border border-gray-300"
                            required
                        />
                    </label>
                </div>
                
            </div>
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-3">
                {/* Delete Button (only for editing) */}
                {isEditing && (
                    <button
                        type="button"
                        onClick={onDelete}
                        className="w-full sm:w-auto px-4 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 hover:bg-red-50"
                    >
                        Delete Interview
                    </button>
                )}
                <div className="flex w-full sm:w-auto space-x-3">
                    {/* Cancel Button */}
                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full sm:w-auto px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                        {isEditing ? 'Update Interview' : 'Schedule Interview'}
                    </button>
                </div>
            </div>

        </form>
    );
});

export default InterviewForm;