import React, { useState } from 'react';

const EmailFrequency = () => {
  const [emailFrequency, setEmailFrequency] = useState('never');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setEmailFrequency(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/update-email-frequency', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emailFrequency }),
      });
      const data = await response.json();
      if (data.success) {
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
