import React, { useState } from "react";
import PomodoroTimer from "./components/PomodoroTimer";
import Settings from "./components/Settings";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function App() {
  const [workTime, setWorkTime] = useState(1500); // 25 dakika
  const [breakTime, setBreakTime] = useState(300); // 5 dakika

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <PomodoroTimer workTime={workTime} breakTime={breakTime} />
            }
          />
          <Route
            path="/settings"
            element={
              <Settings
                workTime={workTime}
                breakTime={breakTime}
                setWorkTime={setWorkTime}
                setBreakTime={setBreakTime}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
