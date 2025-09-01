const PercentageSelector: React.FC<{
  percentages: {
    value: number;
    action: () => void;
  }[];
}> = ({ percentages }) => {
  return (
    <div className="text-button-secondary flex items-center gap-2 text-xs opacity-0 transition-opacity duration-300 group-hover:opacity-100">
      {percentages.map((percentage) => (
        <button key={percentage.value} onClick={percentage.action}>
          {percentage.value}%
        </button>
      ))}
    </div>
  );
};

export { PercentageSelector };
