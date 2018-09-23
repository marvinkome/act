"use strict";

/** @jsx createElement */
var _importAct = importAct(),
    render = _importAct.render,
    createElement = _importAct.createElement;

var root = document.getElementById("root");

var mainElement = function mainElement(date) {
  return createElement("div", null, createElement("h1", null, "Trying reconcilation"), createElement("p", null, date));
};

var tick = function tick() {
  var date = new Date().toLocaleTimeString();
  var clock = mainElement(date);
  render(clock, root);
};

setInterval(tick, 1000); // render(mainElement, root);