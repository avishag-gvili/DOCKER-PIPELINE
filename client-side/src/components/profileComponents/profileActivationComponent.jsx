import React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

const ProfileActivationTimer = ({ profileActivationTime }) => {

  const durationSeconds = profileActivationTime * 60;

  const renderTime = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ fontSize: '18px' }}>{`${minutes}:${formattedSeconds}`}</div>
        <div style={{ fontSize: '10px', marginTop: '4px' }}>Time Left</div>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <CountdownCircleTimer
        isPlaying
        duration={durationSeconds}
        colors={[['rgb(45, 158, 126)']]}
        strokeWidth={4}
        size={100}
        trailColor="#d6d6d6"
        onComplete={() => console.log('Timer completed')}
      >
        {renderTime}
      </CountdownCircleTimer>
    </div>
  );
};

export default ProfileActivationTimer;