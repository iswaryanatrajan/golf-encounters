// CeremonyModal.js
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_ENDPOINTS } from '../appConfig'; // Adjust the path as needed

const CeremonyModal = ({ onClose ,eventId }: any) => {

  const [eventInfo, setEventInfo] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User not authenticated');
      }

      const formData = new FormData();
      formData.append('eventId', eventId);
      formData.append('eventInfo', eventInfo);
      files.forEach((file) => {
        formData.append('mediaFiles[]', file);
      });

      await axios.post(API_ENDPOINTS.ADD_EVENT_CEREMONY, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success('Ceremony details added successfully');
      onClose();
      resetForm();
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
  
    setEventInfo('');
    setFiles([]);
  };

  return (
    <div className="z-[1] fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center">
      <div className="modal-content bg-white rounded-lg p-6 max-w-lg w-full">
        <h2 className="text-2xl mb-4">Add Ceremony Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
     
            <input
              type="hidden"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              value={eventId}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Event Info</label>
            <textarea
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              value={eventInfo}
              onChange={(e) => setEventInfo(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Upload Files</label>
            <input
              type="file"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              multiple
              onChange={handleFileChange}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
              onClick={()=>{
                onClose(false)
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CeremonyModal;
