import { sum } from "utilities/math";

const DashboardPage = () => {
  const handleCaclulation = ({ a, b }: { a: number; b: number }) => {
    return sum(a, b);
  };

  return (
    <div>
      <h1>
        This page uses the sum(a, b) function created in the
        &quot;utilities/math&quot; package!
      </h1>
      <p>This package is fully covered with jest tests!</p>
      <p>
        It is also not a &apos;Just in time&apos; package, it get&apos;s built
        and we use the files inside of the /dist folder of the package!
      </p>
      <div className="bg-background-tertiary my-10 flex flex-col items-center gap-8 rounded-2xl p-20 text-center">
        <p>The result of doing sum(2, 1) is</p>
        <p className="bg-background-secondary grid size-20 place-items-center rounded-lg text-xl">
          {handleCaclulation({ a: 2, b: 3 })}
        </p>
      </div>
    </div>
  );
};

export { DashboardPage };
