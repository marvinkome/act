/** @jsx Didact.createElement */
const Didact = importDidact();

const mainElement = (
  <div>
    <h1>This is didact</h1>
    <p>using jsx!!!</p>
  </div>
);

const domRoot = document.getElementById("root");
Didact.render(mainElement(), domRoot);
