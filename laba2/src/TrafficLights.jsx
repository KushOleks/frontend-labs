import PropTypes from "prop-types";
import Light from "./Light";
import "./TrafficLights.css";

const TrafficLights = ({
  direction = "vertical",
  activeLights = [],
}) => {
  return (
    <div className={`traffic-light ${direction}`}>
      <div className="hood">
        <Light
          tlColor="red"
          active={activeLights.includes("red")}
        />
      </div>

      <div className="hood">
        <Light
          tlColor="yellow"
          active={activeLights.includes("yellow")}
        />
      </div>

      <div className="hood">
        <Light
          tlColor="green"
          active={activeLights.includes("green")}
        />
      </div>
    </div>
  );
};

TrafficLights.propTypes = {
  direction: PropTypes.oneOf(["vertical", "horizontal"]),
  activeLights: PropTypes.arrayOf(PropTypes.string),
};

export default TrafficLights;