"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/** @jsx createElement */
var _importAct = importAct(),
    render = _importAct.render,
    createElement = _importAct.createElement,
    Component = _importAct.Component;

var root = document.getElementById("root");

var Main =
/*#__PURE__*/
function (_Component) {
  _inherits(Main, _Component);

  function Main(props) {
    var _this;

    _classCallCheck(this, Main);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Main).call(this, props));
    _this.state = {
      likes: 0
    }; // this.like = this.like.bind(this);

    return _this;
  }

  _createClass(Main, [{
    key: "like",
    value: function like() {
      console.log("liked");
      this.setState({
        likes: this.state.likes + 1
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      console.log(this.state);
      var name = this.props.name;
      var likes = this.state.likes;
      return createElement("div", null, createElement("h1", null, "Hello ", name), createElement("p", null, "We like you ", likes, " times"), createElement("button", {
        onClick: function onClick() {
          return _this2.like();
        }
      }, "like it"));
    }
  }]);

  return Main;
}(Component);

render(createElement(Main, {
  name: "Act"
}), root); // const mainElement = date => (
//   <div>
//     <h1>Trying reconcilation</h1>
//     <p>{date}</p>
//   </div>
// );
// const tick = () => {
//   const date = new Date().toLocaleTimeString();
//   const clock = mainElement(date);
//   render(clock, root);
// };
// setInterval(tick, 1000);