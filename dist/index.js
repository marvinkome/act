"use strict";

/** @jsx createElement */
var _importAct = importAct(),
    render = _importAct.render,
    createElement = _importAct.createElement;

var root = document.getElementById("root");
render(createElement(Main, {
  name: "Act"
}), root);