import React, { useState } from 'react';
import axios from 'axios';
import Select from '../../../stories/Select/Select.jsx';

const EmailFrequency = () => {
  const [emailFrequency, setEmailFrequency] = useState('');
  const [message, setMessage] = useState('');
  const preferenceId = '66930c2e2aad987e24078e12';
  const url ='http://localhost:3000'

  const handleChange = async (e) => {
    const selectedFrequency = e.target.value;
    setEmailFrequency(selectedFrequency);

    // Send update to the server
    const formData = new FormData();
    formData.append('emailFrequency', selectedFrequency);

    try {
      const response = await axios.put(`${url}/preferences/${preferenceId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      if (response.status === 200 && response.statusText === 'OK') {
        setMessage('Email frequency preference updated successfully!');
      } else {
        setMessage('Update failed. Please try again later.');
      }
    } catch (error) {
      console.error('Error updating email frequency preference:', error);
      setMessage('Error updating email frequency preference. Please try again later.');
    }
  };

  return (
    <div>
      <Select
        className="select-email-frequency"
        options={[
          { text: 'never', value: 'never' , icon: '🚫'},
          { text: 'daily', value: 'daily', icon: '📅' },
          { text: 'weekly', value: 'weekly', icon: '📆' },
          { text: 'monthly', value: 'monthly' , icon: '🗓️'},
          { text: 'yearly', value: 'yearly', icon: '📅' }
        ]}
        title="Select Email Frequency"
        onChange={handleChange}
        value={emailFrequency}
        size="large"
        widthOfSelect="200px"
      />
      <p>{message}</p>
    </div>
  );
};

export default EmailFrequency;
