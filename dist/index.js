"use strict";

/** @jsx Didact.createElement */
var Didact = importDidact();
var mainElement = Didact.createElement("div", null, Didact.createElement("h1", null, "This is didact"), Didact.createElement("p", null, "using jsx!!!"));
var domRoot = document.getElementById("root");
Didact.render(mainElement(), domRoot);