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

    var _temp, _this2, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this2), _this2.$usedState = ["isShow", "imgPath", "marl", "mart", "x", "y", "img_w", "img_h", "box_w", "box_h", "fram_w", "fram_h", "shareTempFilePath", "startDistance", "oldscaleA", "__fn_onGetCut"], _this2.config = {
      navigationBarTitleText: ''
    }, _this2.$$refs = [], _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(Index, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(Index.prototype.__proto__ || Object.getPrototypeOf(Index.prototype), "_constructor", this).call(this, props);
      this.state = {
        isShow: false,
        success: function success() {},
        fail: function fail() {},

        imgPath: '', //原始图片地址
        marl: 0, //图片左侧距离
        mart: 0, //图片顶部距离
        x: 0, //图片移动时左侧距离
        y: 0, //图片移动时顶部距离
        img_w: 0, //图片宽度
        img_h: 0, //图片高度
        box_w: 0, //盒子宽度
        box_h: 0, //盒子高度
        fram_w: 350, //裁切框的宽度
        fram_h: 350, //裁切框的高度
        shareTempFilePath: '', //最终裁切的图片

        startDistance: 0, //第一次两个手指之间的距离
        oldscaleA: 1 //缩放比例
      };
    }
  }, {
    key: "touchStart",
    value: function touchStart(e) {
      var touches = e.touches;
      if (touches.length == 1) {
        this.setState({
          marl: touches[0].pageX - this.state.x,
          mart: touches[0].pageY - this.state.y
        });
      } else if (touches.length == 2) {
        this.setState({ ontFinger: false });
        var xMove = touches[1].clientX - touches[0].clientX; //手指在x轴移动距离
        var yMove = touches[1].clientY - touches[0].clientY; //手指在y轴移动距离
        var distance = Math.sqrt(xMove * xMove + yMove * yMove); //根据勾股定理算出两手指之间的距离 
        this.setState({
          startDistance: distance
        });
      }
    }
  }, {
    key: "touchMove",
    value: function touchMove(e) {
      var _this3 = this;

      var touches = e.touches;
      if (touches.length == 1) {
        //单指移动
        var newX = touches[0].pageX - this.state.marl;
        var newY = touches[0].pageY - this.state.mart;
        this.setState({
          x: newX,
          y: newY
        }, function () {
          _this3.paintImg();
        });
      } else if (touches.length == 2) {
        //双指放大缩小
        var xMove = e.touches[1].clientX - e.touches[0].clientX; //手指在x轴移动距离
        var yMove = e.touches[1].clientY - e.touches[0].clientY; //手指在y轴移动距离
        var moveDistance = Math.sqrt(xMove * xMove + yMove * yMove); //根据勾股定理算出两手指之间的距离 
        var diffdistance = moveDistance - this.state.startDistance;
        var Scale = this.state.oldscaleA + 0.001 * diffdistance;
        var _newX = this.state.x - this.state.img_w * (Scale - 1) / 2,
            _newY = this.state.y - this.state.img_h * (Scale - 1) / 2;
        this.setState({
          x: _newX,
          y: _newY,
          img_w: this.state.img_w * Scale, //图片宽度
          img_h: this.state.img_h * Scale, //图片高度
          ontFinger: false
        }, function () {
          _this3.paintImg();
        });
      }
    }
  }, {
    key: "touchEnd",
    value: function touchEnd() {}
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      this.__triggerPropsFn("onGetCut", [null].concat([this]));
      var fram_w = _index2.default.getSystemInfoSync().windowWidth * 0.9;
      this.setState({
        fram_w: fram_w, //裁切框的宽度
        fram_h: fram_w //裁切框的高度
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {}
  }, {
    key: "componentDidHide",
    value: function componentDidHide() {}
  }, {
    key: "componentDidShow",
    value: function componentDidShow() {}
  }, {
    key: "getBoxSize",
    value: function getBoxSize(id) {
      var _this4 = this;

      return new Promise(function (success, fail) {
        var queryImg = _index2.default.createSelectorQuery().in(_this4.$scope).select("#" + id);
        queryImg.boundingClientRect(function (res) {
          success(res);
        }).exec();
      });
    }
  }, {
    key: "setImg",
    value: function setImg(resLo, boxSize) {
      var _this = this;
      _index2.default.getImageInfo({
        src: resLo.tempFilePaths[0],
        success: function success(res) {
          var box_w = boxSize.width,
              box_h = boxSize.height;
          var newImgw = res.width,
              newImgh = res.height;
          if (newImgw > box_w && newImgw > newImgh) {
            var ratio = res.width / res.height;
            newImgw = box_w * 0.9;
            newImgh = newImgw / ratio;
          } else if (newImgh > box_h && newImgh > newImgw) {
            var _ratio = res.height / res.width;
            newImgh = box_h * 0.9;
            newImgw = newImgh / _ratio;
          }
          _this.setState({
            imgPath: res.path,
            x: box_w / 2 - newImgw / 2,
            y: box_h / 2 - newImgh / 2,
            img_w: newImgw,
            img_h: newImgh,
            box_w: box_w,
            box_h: box_h
          }, function () {
            _this.paintImg();
          });
        }
      });
    }
  }, {
    key: "addImg",
    value: function addImg(res) {
      //载入图片
      var _this = this;
      this.showModal().then(function () {
        _this.setState({
          success: res.success,
          fail: res.fail
        });
        _this.getBoxSize('cutBox').then(function (boxSize) {
          _this.setImg(res.resLo, boxSize);
        });
      });
    }
  }, {
    key: "showModal",
    value: function showModal() {
      var _this5 = this;

      return new Promise(function (success, fail) {
        _this5.setState({
          isShow: !_this5.state.isShow
        }, function () {
          success();
        });
      });
    }
  }, {
    key: "paintImg",
    value: function paintImg() {
      var x = this.state.x,
          y = this.state.y,
          w = this.state.img_w,
          h = this.state.img_h;

      var box_w = this.state.box_w,

      //盒子宽度
      box_h = this.state.box_h; //盒子高度
      var fram_w = this.state.fram_w,

      //裁切框的宽度
      fram_h = this.state.fram_h; //裁切框的宽度
      var path = this.state.imgPath;
      var ctx = _index2.default.createCanvasContext('shareImg', this.$scope);
      ctx.drawImage(path, x, y, w, h);
      ctx.setStrokeStyle('#f2383b');
      ctx.rect((box_w - fram_w) / 2, (box_h - fram_h) / 2, fram_w, fram_h);
      ctx.stroke();
      ctx.draw();
    }
  }, {
    key: "cutImgNow",
    value: function cutImgNow() {
      //裁切图片
      var _this = this;
      var box_w = this.state.box_w,

      //盒子宽度
      box_h = this.state.box_h; //盒子高度
      var fram_w = this.state.fram_w,

      //裁切框的宽度
      fram_h = this.state.fram_h; //裁切框的宽度
      _index2.default.canvasToTempFilePath({
        x: (box_w - fram_w) / 2,
        y: (box_h - fram_h) / 2,
        width: fram_w,
        height: fram_h,
        destWidth: fram_w,
        destHeight: fram_h,
        canvasId: 'shareImg',
        success: function success(res) {
          _this.setState({
            shareTempFilePath: res.tempFilePath
          });
          _this.showModal();
          _this.state.success(res.tempFilePath);
        },
        fail: function fail(res) {
          _this.state.fail(res);
          /* this.toast.tostChild({
              type: 'success',
              text: '图片绘制失败'
          }) */
        }
      }, this.$scope);
    }
  }, {
    key: "close",
    value: function close() {
      this.showModal();
      this.state.fail();
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      ;

      var isShow = this.__state.isShow;
      Object.assign(this.__state, {});
      return this.__state;
    }
  }]);

  return Index;
}(_index.Component), _class.properties = {
  "__fn_onGetCut": {
    "type": null,
    "value": null
  }
}, _class.$$events = ["touchMove", "touchStart", "touchEnd", "close", "cutImgNow"], _class.defaultProps = {
  onGetCut: function onGetCut() {}
}, _temp2);
exports.default = Index;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Index));