import { useEffect, useState } from "react";
import TrafficLights from "./TrafficLights";
import "./App.css"; 

const phases = [
  ["red"],
  ["red", "yellow"],
  ["green"],
  ["yellow"],
];

function App() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((currentPhase) => {
        return (currentPhase + 1) % phases.length;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">
      <div className="traffic-wrapper">
        <TrafficLights
          direction="vertical"
          activeLights={phases[phase]}
        />

        <TrafficLights
          direction="horizontal"
          activeLights={phases[phase]}
        />
      </div>
    </div>
  );
}

export default App;