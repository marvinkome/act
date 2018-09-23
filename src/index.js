/** @jsx createElement */
const { render, createElement } = importAct();
const root = document.getElementById("root");

const mainElement = date => (
  <div>
    <h1>Trying reconcilation</h1>
    <p>{date}</p>
  </div>
);

const tick = () => {
  const date = new Date().toLocaleTimeString();
  const clock = mainElement(date);
  render(clock, root);
};

setInterval(tick, 1000);

// render(mainElement, root);
