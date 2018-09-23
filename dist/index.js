"use strict";

/** @jsx createElement */
var _importAct = importAct(),
    render = _importAct.render,
    createElement = _importAct.createElement;

var root = document.getElementById("root");
var mainElement = createElement("div", null, createElement("h1", null, "This is didact"), createElement("p", null, "using jsx!!!"));

var tick = function tick() {
  var date = new Date().toLocaleTimeString();
  var clock = createElement("p", null, date);
  render(clock, root);
};

setInterval(tick, 1000); // render(mainElement, domRoot);