import PropTypes from 'prop-types';

export const labels = { red: 'Червоний', yellow: 'Жовтий', green: 'Зелений' };

export default function Light({ tlColor, active, disabled, onSelect }) {
  return <button type="button" className={`light ${tlColor} ${active ? 'active' : ''}`}
    aria-label={labels[tlColor]} aria-pressed={active} disabled={disabled}
    onClick={() => onSelect(tlColor)}><span className="light-label">{labels[tlColor]}</span></button>;
}
Light.propTypes = {
  tlColor: PropTypes.oneOf(['red', 'yellow', 'green']).isRequired,
  active: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};
