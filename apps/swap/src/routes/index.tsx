import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

console.log(123);
// console.error(321);
console.warn(421);

const handleClick = () => {};

const handleClick2 = () => {};

const handleClick3 = () => {};

// console.error(123);

// const handleClick4 = () => {};

const handleClick4 = () => {};

handleClick4();

function RouteComponent() {
  return (
    <div>
      Hello, welcome!
      <button onClick={handleClick}></button>
      <button onClick={handleClick3}></button>
      <button onClick={handleClick2}></button>
    </div>
  );
}
