import PropTypes from "prop-types";

const Light = ({ tlColor = "red", active = false }) => {
  const inactiveColor = {
    red: "#3a0909",
    yellow: "#3a3205",
    green: "#073a12",
  };

  return (
    <div
      style={{
        background: active
          ? `radial-gradient(circle at 35% 30%, white 0%, ${tlColor} 18%, ${tlColor} 60%, black 100%)`
          : `radial-gradient(circle at 35% 30%, #555 0%, ${inactiveColor[tlColor]} 50%, #050505 100%)`,

        width: 70,
        height: 70,
        borderRadius: "50%",
        border: "3px solid #111",

        boxShadow: active
          ? `0 0 18px ${tlColor},
             0 0 35px ${tlColor},
             inset 0 0 12px rgba(255,255,255,0.5)`
          : "inset 0 0 12px rgba(0,0,0,0.9)",

        transition: "all 0.35s ease",
      }}
    />
  );
};

Light.propTypes = {
  tlColor: PropTypes.string,
  active: PropTypes.bool,
};

export default Light;