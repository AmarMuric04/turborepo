import { sum } from "utilities/math";

const HomePage = () => {
  return (
    <div className="relative overflow-hidden">
      Home Page{"   "}
      {sum({ a: 2, b: 3 })}
    </div>
  );
};

export { HomePage };
