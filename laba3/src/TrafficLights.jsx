import PropTypes from 'prop-types';
import Light from './Light';

export default function TrafficLights({ direction, currentSignal, isAutomatic, onSelect }) {
  return <div className={`traffic-light ${direction}`} aria-label="Світлофор">
    {['red', 'yellow', 'green'].map(color => <Light key={color} tlColor={color}
      active={currentSignal === color} disabled={isAutomatic} onSelect={onSelect} />)}
  </div>;
}
TrafficLights.propTypes = {
  direction: PropTypes.oneOf(['vertical', 'horizontal']).isRequired,
  currentSignal: PropTypes.oneOf(['red', 'yellow', 'green']).isRequired,
  isAutomatic: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};
