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

var noUserFace = "/images/noUserFace.png"; //轻提示组件二次封装

var Index = (_temp2 = _class = function (_BaseComponent) {
  _inherits(Index, _BaseComponent);

  function Index() {
    var _ref;

    var _temp, _this2, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this2), _this2.$usedState = ["noUserFace", "UserFace"], _this2.config = {
      navigationBarTitleText: '修改头像'
    }, _this2.$$refs = [], _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(Index, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(Index.prototype.__proto__ || Object.getPrototypeOf(Index.prototype), "_constructor", this).call(this, props);
      this.state = {
        UserFace: '' //头像的链接
      };
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {}
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
    key: "upImg",
    value: function upImg() {
      var _this = this;
      this.ImageModal.showModal({
        //调用ChooseImgModal组件选择获取图片的方式--相册/相机
        camera: function camera() {
          var sourceType = ['camera'];
          _this.chooseImage(sourceType);
        },
        album: function album() {
          var sourceType = ['album'];
          _this.chooseImage(sourceType);
        }
      });
    }
  }, {
    key: "chooseImage",
    value: function chooseImage(sourceType) {
      //选择图片
      var _this = this;
      _index2.default.chooseImage({ //选择图片
        count: 1,
        sourceType: sourceType,
        success: function success(res) {
          //拿到图片之后调用裁切图片组件，成功之后它会返回此图片
          _this.CutModal.addImg({
            resLo: res,
            success: function success(img) {
              //接收到返回的图片修改视图层
              _this.setState({
                UserFace: img
              });
            },
            fail: function fail() {
              _this.toast.tostChild({
                type: 'error',
                text: '您已经取消'
              });
            }
          });
        },
        fail: function fail(res) {
          _this.toast.tostChild({
            type: 'error',
            text: '您已经取消'
          });
        }
      });
    }
  }, {
    key: "getTost",
    value: function getTost(obj) {
      //获取toast组件的作用域
      this.toast = obj;
    }
  }, {
    key: "getImageModal",
    value: function getImageModal(obj) {
      //获取Imagemodal组件的作用域
      this.ImageModal = obj;
    }
  }, {
    key: "getCutModal",
    value: function getCutModal(obj) {
      this.CutModal = obj; //获取getCutModal组件的作用域
    }
  }, {
    key: "clickFace",
    value: function clickFace() {
      var _this = this;
      var UserFace = this.state.UserFace;
      if (UserFace == '') {
        this.toast.tostChild({
          type: 'error',
          text: '您还没有选择图片'
        });
      } else {
        _this.CutModal.addImg({ //从CutModal组件的作用域访问其方法掉起该组件
          resLo: {
            tempFilePaths: [UserFace]
          },
          success: function success(img) {
            _this.setState({
              UserFace: img
            });
          },
          fail: function fail() {
            _this.toast.tostChild({
              type: 'error',
              text: '您已经取消'
            });
          }
        });
      }
    }
  }, {
    key: "bigUserFace",
    value: function bigUserFace() {
      this.showBigFace();
    }
  }, {
    key: "saveUserFace",
    value: function saveUserFace() {
      //保存图片方法
      var UserFace = this.state.UserFace;
      if (UserFace == '') {
        this.toast.tostChild({
          type: 'error',
          text: '您还没有选择图片'
        });
      } else {
        this.toast.tostChild({ type: 'loading' });
        //此处调用接口上传头像
      }
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      ;
      Object.assign(this.__state, {
        noUserFace: noUserFace
      });
      return this.__state;
    }
  }]);

  return Index;
}(_index.Component), _class.properties = {}, _class.$$events = ["clickFace", "upImg", "saveUserFace", "getCutModal", "getImageModal", "getTost"], _temp2);
exports.default = Index;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Index, true));