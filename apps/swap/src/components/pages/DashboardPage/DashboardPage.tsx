import { sum } from "utilities/math";

const DashboardPage = () => {
  const handleCaclulation = (a: number, b: number) => {
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
      <div className="bg-background-tertiary p-20 rounded-2xl text-center my-10 flex flex-col gap-8 items-center">
        <p>The result of doing sum(2, 1) is</p>
        <p className="bg-background-secondary rounded-lg text-xl size-20 grid place-items-center">
          {handleCaclulation(2, 1)}
        </p>
      </div>
    </div>
  );
};

export { DashboardPage };
