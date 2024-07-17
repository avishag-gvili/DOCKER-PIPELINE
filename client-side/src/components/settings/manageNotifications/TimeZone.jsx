import React, { useState } from 'react';
import moment from 'moment-timezone';
import axios from 'axios';
import Select from '../../../stories/Select/Select.jsx';
import GenericButton from '../../../stories/Button/GenericButton.jsx';

const validTimeZones = {
    'America/New_York': '🗽', 
    'Europe/London': '🎡',   
    'Asia/Tokyo': '🗼',    
    'Asia/Jerusalem': '🕍',
    'Europe/Paris':'🗼',
    'Europe/Madrid':'🏰'

};

const TimeZone = () => {
    const [timeZone, setTimeZone] = useState('');
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const preferenceId = '66930c2e2aad987e24078e12';//TO DO: get from state

    const handleFormSubmit  = async (event) => {
        const formData = new FormData();
        formData.append('timeZone', timeZone);

        try {
            const response = await axios.put(`${baseUrl}/preferences/${preferenceId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        } catch (error) {
            console.error('Error updating time zone preference:', error);
        }
    };
    const handleTimeZoneChange = (event) => {
        const selectedTimeZone = event.target.value;
        if (!Object.keys(validTimeZones).includes(selectedTimeZone)) {
            console.error('Invalid time zone selected:', selectedTimeZone);
            return;
        }

        setTimeZone(selectedTimeZone);
    };

    const formatTime = (time) => {
        if (timeZone) {
            return moment(time).tz(timeZone).format('YYYY-MM-DD HH:mm:ss');
        } else {
            return moment(time).format('YYYY-MM-DD HH:mm:ss');
        }
    };

    const getIconForTimeZone = (timeZone) => {
        return validTimeZones[timeZone] || '⏰'; // Default clock icon if no specific icon is defined
    };

    return (
        <div>
            <Select
                title="Select Time Zone:"
                options={Object.keys(validTimeZones).map(key => ({
                    text: key.replace('_', ' '), // Adjust label if needed
                    value: key,
                    icon: getIconForTimeZone(key)
                }))}
                value={timeZone}
                onChange={handleTimeZoneChange}
                size='large'
                widthOfSelect='200px'
            />
             <GenericButton label='Update Time Zone' size ='medium' onClick={handleFormSubmit}></GenericButton>
            <p>Current time in {timeZone}: {formatTime(new Date())}</p>
        </div>
    );
};

export default TimeZone;
