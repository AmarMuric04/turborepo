import { sum } from "utilities/math";

const DashboardPage = () => {
  const handleCalculation = (a: number, b: number) => {
    return sum(a, b);
  };

  return <div className="text-lg font-semibold">{handleCalculation(2, 1)}</div>;
};

export { DashboardPage };
