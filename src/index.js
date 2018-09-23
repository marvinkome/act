/** @jsx createElement */
const { render, createElement } = importAct();
const root = document.getElementById("root");

const mainElement = (
  <div>
    <h1>This is didact</h1>
    <p>using jsx!!!</p>
  </div>
);

const tick = () => {
  const date = new Date().toLocaleTimeString();
  const clock = <p>{date}</p>;
  render(clock, root);
};

setInterval(tick, 1000);

// render(mainElement, domRoot);
