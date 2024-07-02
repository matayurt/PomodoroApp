import React, { useState } from "react";
import PomodoroTimer from "./components/PomodoroTimer";
import Settings from "./components/Settings";

function App() {
  const [workTime, setWorkTime] = useState(1500); // 25 dakika
  const [breakTime, setBreakTime] = useState(300); // 5 dakika

  return (
    <div className="App">
      <PomodoroTimer workTime={workTime} breakTime={breakTime} />
      <Settings
        workTime={workTime}
        breakTime={breakTime}
        setWorkTime={setWorkTime}
        setBreakTime={setBreakTime}
      />
    </div>
  );
}

export default App;
