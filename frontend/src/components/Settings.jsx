import React, {useState} from 'react';
import "../main.css"
import { Link } from 'react-router-dom';


const Settings = ({ workTime, breakTime, setWorkTime, setBreakTime }) => {
  const [tempWorkTime, setTempWorkTime] = useState(workTime / 60);
  const [tempBreakTime, setTempBreakTime] = useState(breakTime / 60);

  const handleApply = () => {
    playSound2()
    setWorkTime(tempWorkTime * 60)
    setBreakTime(tempBreakTime * 60)
  }

  const playSound2 = () => {
    const audio = new Audio('click_sound.mp3');
    audio.play()
  }

  return (
    <div className='center'>
      <div>
        <h2>Settings</h2>
        <div style={{marginBottom:"30px"}}>
          <label>Work Time (minutes): </label>
          <input
            type="number"
            value={tempWorkTime}
            onChange={(e) => setTempWorkTime(e.target.value)}
            className='input'
          />
        </div>
        <div>
          <label>Break Time (minutes): </label>
          <input
            type="number"
            value={tempBreakTime}
            onChange={(e) => setTempBreakTime(e.target.value)}
            className='input'
          />
        </div>
        <Link to="/">
          <button className='button' onClick={playSound2}>Go Back</button>
        </Link>
        <button className='button' onClick={handleApply}>Apply</button>
      </div>
    </div>
  );
};

export default Settings;
