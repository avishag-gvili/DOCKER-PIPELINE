import React, { useState } from 'react';
import axios from 'axios';

const EmailFrequency = () => {
  const [emailFrequency, setEmailFrequency] = useState('never');
  const [message, setMessage] = useState('');
  const preferenecId = '66930c2e2aad987e24078e12';

  const handleChange = (e) => {
    setEmailFrequency(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('emailFrequency', emailFrequency);

    try {
      const response = await axios.put(`http://localhost:3000/preferences/${preferenecId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      if (response.status === 200 && response.statusText === 'OK') {
        setMessage('העדפת תדירות ההודעות במייל עודכנה בהצלחה!');
      } else {
        setMessage('עדכון נכשל. אנא נסה שנית מאוחר יותר.');
      }
    } catch (error) {
      console.error('שגיאה בעדכון תדירות ההודעות במייל:', error);
      setMessage('שגיאה בעדכון תדירות ההודעות במייל. אנא נסה שנית מאוחר יותר.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          בחר/י תדירות לקבלת הודעות במייל:
          <select value={emailFrequency} onChange={handleChange}>
            <option value="never">אף פעם</option>
            <option value="daily">יומי</option>
            <option value="weekly">שבועי</option>
            <option value="monthly">חודשי</option>
            <option value="yearly">שנתי</option>
          </select>
        </label>
        <button type="submit">שמור</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default EmailFrequency;
