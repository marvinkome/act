/** @jsx Act.createElement */
const Act = importAct();

const mainElement = (
  <div>
    <h1>This is didact</h1>
    <p>using jsx!!!</p>
  </div>
);

const domRoot = document.getElementById("root");
Act.render(mainElement, domRoot);
