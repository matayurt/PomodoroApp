// src/components/Settings.js
import React from 'react';

const Settings = ({ workTime, breakTime, setWorkTime, setBreakTime }) => {
  return (
    <div>
      <h2>Settings</h2>
      <div>
        <label>Work Time (minutes): </label>
        <input
          type="number"
          value={workTime / 60}
          onChange={(e) => setWorkTime(e.target.value * 60)}
        />
      </div>
      <div>
        <label>Break Time (minutes): </label>
        <input
          type="number"
          value={breakTime / 60}
          onChange={(e) => setBreakTime(e.target.value * 60)}
        />
      </div>
    </div>
  );
};

export default Settings;
