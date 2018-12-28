"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp2;

var _index = require("../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = (_temp2 = _class = function (_BaseComponent) {
  _inherits(Index, _BaseComponent);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp", "anonymousState__temp2", "anonymousState__temp3", "anonymousState__temp4", "anonymousState__temp5", "isOpened", "type", "text", "timeVal", "icon", "__fn_onTost"], _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(Index.prototype.__proto__ || Object.getPrototypeOf(Index.prototype), "_constructor", this).call(this, props);
      this.state = {
        isOpened: false,
        type: 'text',
        text: '',
        timeVal: 2000,
        icon: ''
      };
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      this.__triggerPropsFn("onTost", [null].concat([this]));
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {}
  }, {
    key: "componentDidShow",
    value: function componentDidShow() {}
  }, {
    key: "componentDidHide",
    value: function componentDidHide() {}
  }, {
    key: "tostChild",
    value: function tostChild() {
      var _this2 = this;

      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (data === null) {
        data = {
          isOpened: true,
          type: 'text',
          text: '',
          timeVal: 2
        };
      } else {
        if (!data.hasOwnProperty("isOpened")) {
          data['isOpened'] = true;
        }
        if (!data.hasOwnProperty("type")) {
          data['type'] = 'text';
        }
        if (!data.hasOwnProperty("text")) {
          data['text'] = '';
        }
        if (!data.hasOwnProperty("timeVal")) {
          data['timeVal'] = 1.5;
        }
        if (data.type == 'loading') {
          data.timeVal = 100;
        }
        if (data.hasOwnProperty("icon")) {
          data.type = 'cus';
          data.timeVal = 3;
        }
      }
      if (data.type != 'loading') {
        setTimeout(function () {
          _this2.setState({
            isOpened: false,
            type: 'text',
            text: '',
            timeVal: 2
          });
        }, data.timeVal * 1000);
      }
      this.setState(data);
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      ;
      var anonymousState__temp = this.__state.type === 'text' ? this.__state.timeVal * 1000 : null;
      var anonymousState__temp2 = this.__state.type === 'error' ? this.__state.timeVal * 1000 : null;
      var anonymousState__temp3 = this.__state.type === 'success' ? this.__state.timeVal * 1000 : null;
      var anonymousState__temp4 = this.__state.type === 'loading' ? this.__state.timeVal * 1000 : null;
      var anonymousState__temp5 = this.__state.type === 'cus' ? this.__state.timeVal * 1000 : null;
      Object.assign(this.__state, {
        anonymousState__temp: anonymousState__temp,
        anonymousState__temp2: anonymousState__temp2,
        anonymousState__temp3: anonymousState__temp3,
        anonymousState__temp4: anonymousState__temp4,
        anonymousState__temp5: anonymousState__temp5
      });
      return this.__state;
    }
  }]);

  return Index;
}(_index.Component), _class.properties = {
  "__fn_onTost": {
    "type": null,
    "value": null
  }
}, _class.$$events = [], _class.defaultProps = {}, _temp2);
exports.default = Index;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Index));