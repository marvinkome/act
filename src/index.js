import Act from "./act";
import Main from "./comp";

const render = () => {
  const root = document.getElementById("root");
  Act.render(
    <main>
      <h1>Hello Act</h1>
      <Main />
    </main>,
    root
  );
};

render();

if (module.hot) {
  module.hot.accept(render);
}
