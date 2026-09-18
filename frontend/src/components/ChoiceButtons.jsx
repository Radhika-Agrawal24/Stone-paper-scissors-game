import { CHOICES } from '../constants/choices';

export default function ChoiceButtons({ playerLabel, onSelect, disabled }) {
  return (
    <div className="choice-buttons card">
      <h3>{playerLabel}'s turn — pick one:</h3>
      <div className="choice-row">
        {CHOICES.map(({ key, label, emoji }) => (
          <button
            key={key}
            className="btn choice-btn"
            onClick={() => onSelect(key)}
            disabled={disabled}
            aria-label={label}
          >
            <span className="choice-emoji">{emoji}</span>
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
