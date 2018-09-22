"use strict";

/** @jsx Act.createElement */
var Act = importAct();
var mainElement = Act.createElement("div", null, Act.createElement("h1", null, "This is didact"), Act.createElement("p", null, "using jsx!!!"));
var domRoot = document.getElementById("root");
Act.render(mainElement, domRoot);