import React from 'react';

const SpeedSelector = ({ selectedSpeed, onSpeedChange }) => {
  return (
    <div className="speed-selector">
      <select id="speed" value={selectedSpeed} onChange={onSpeedChange}>
        <option value="15">Slow</option>
        <option value="5">Medium</option>
        <option value="0.5">Fast</option>
      </select>
    </div>
  );
};

export default SpeedSelector;
