import Taro, { Component } from '@tarojs/taro'
import { AtIcon } from 'taro-ui'
import { View, Canvas } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {
    static defaultProps = {
        onGetCut: () => { }
    }
    constructor(props) {
        super(props)
        this.state = {
            isShow: false,
            success() { },
            fail() { },
            imgPath: '',//原始图片地址
            marl: 0,//图片左侧距离
            mart: 0,//图片顶部距离
            x: 0,//图片移动时左侧距离
            y: 0, //图片移动时顶部距离
            img_w: 0,//图片宽度
            img_h: 0,//图片高度
            box_w: 0,//盒子宽度
            box_h: 0,//盒子高度
            fram_w: 350,//裁切框的宽度
            fram_h: 350,//裁切框的高度
            shareTempFilePath: '',//最终裁切的图片

            startDistance: 0,//第一次两个手指之间的距离
            oldscaleA: 1,//缩放比例
        }
    }
    config = {
        navigationBarTitleText: ''
    }

    touchStart(e) {
        let touches = e.touches;
        if (touches.length == 1) {
            this.setState({
                marl: touches[0].pageX - this.state.x,
                mart: touches[0].pageY - this.state.y,
            })
        } else if (touches.length == 2) {
            this.setState({ ontFinger: false })
            let xMove = touches[1].clientX - touches[0].clientX;//手指在x轴移动距离
            let yMove = touches[1].clientY - touches[0].clientY;//手指在y轴移动距离
            let distance = Math.sqrt(xMove * xMove + yMove * yMove);//根据勾股定理算出两手指之间的距离 
            this.setState({
                startDistance: distance,
            })
        }
    }
    touchMove(e) {
        let touches = e.touches;
        if (touches.length == 1) {//单指移动
            let newX = touches[0].pageX - this.state.marl
            let newY = touches[0].pageY - this.state.mart
            this.setState({
                x: newX,
                y: newY
            }, () => {
                this.paintImg()
            })
        } else if (touches.length == 2) {//双指放大缩小
            let xMove = e.touches[1].clientX - e.touches[0].clientX;//手指在x轴移动距离
            let yMove = e.touches[1].clientY - e.touches[0].clientY;//手指在y轴移动距离
            let moveDistance = Math.sqrt(xMove * xMove + yMove * yMove);//根据勾股定理算出两手指之间的距离 
            let diffdistance = moveDistance - this.state.startDistance;
            let Scale = this.state.oldscaleA + 0.001 * diffdistance;
            let newX = this.state.x - (this.state.img_w * (Scale - 1)) / 2, newY = this.state.y - (this.state.img_h * (Scale - 1)) / 2;
            this.setState({
                x: newX,
                y: newY,
                img_w: this.state.img_w * Scale,//图片宽度
                img_h: this.state.img_h * Scale,//图片高度
                ontFinger: false
            }, () => {
                this.paintImg()
            })
        }
    }
    touchEnd() {

    }
    componentWillMount() {
        this.props.onGetCut(this)
        let fram_w = Taro.getSystemInfoSync().windowWidth * 0.9;
        this.setState({
            fram_w: fram_w,//裁切框的宽度
            fram_h: fram_w,//裁切框的高度
        })
    }
    componentDidMount() { }
    componentWillUnmount() { }
    componentDidHide() { }
    componentDidShow() {}

    getBoxSize(id) {
        return new Promise((success, fail) => {
            const queryImg = Taro.createSelectorQuery().in(this.$scope).select(`#${id}`);
            queryImg.boundingClientRect(function (res) {
                success(res)
            }).exec();
        })
    }
    setImg(resLo, boxSize) {
        const _this = this;
        Taro.getImageInfo({
            src: resLo.tempFilePaths[0],
            success(res) {
                let box_w = boxSize.width,
                    box_h = boxSize.height;
                let newImgw = res.width, newImgh = res.height;
                if (newImgw > box_w && newImgw > newImgh) {
                    let ratio = res.width / res.height;
                    newImgw = box_w * 0.9;
                    newImgh = newImgw / ratio;
                } else if (newImgh > box_h && newImgh > newImgw) {
                    let ratio = res.height / res.width;
                    newImgh = box_h * 0.9;
                    newImgw = newImgh / ratio;
                }
                _this.setState({
                    imgPath: res.path,
                    x: box_w / 2 - newImgw / 2,
                    y: box_h / 2 - newImgh / 2,
                    img_w: newImgw,
                    img_h: newImgh,
                    box_w: box_w,
                    box_h: box_h
                }, () => {
                    _this.paintImg()
                })
            }
        })
    }
    addImg(res) {//载入图片
        const _this = this;
        this.showModal().then(() => {
            _this.setState({
                success: res.success,
                fail: res.fail
            })
            _this.getBoxSize('cutBox').then((boxSize) => {
                _this.setImg(res.resLo, boxSize)
            })
        }
        )
    }
    showModal() {
        return new Promise((success, fail) => {
            this.setState({
                isShow: !this.state.isShow
            }, () => {
                success()
            })
        })
    }
    paintImg() {
        let x = this.state.x,
            y = this.state.y,
            w = this.state.img_w,
            h = this.state.img_h;

        let box_w = this.state.box_w,//盒子宽度
            box_h = this.state.box_h;//盒子高度
        let fram_w = this.state.fram_w,//裁切框的宽度
            fram_h = this.state.fram_h;//裁切框的宽度
        let path = this.state.imgPath;
        const ctx = Taro.createCanvasContext('shareImg', this.$scope)
        ctx.drawImage(path, x, y, w, h)
        ctx.setStrokeStyle('#f2383b')
        ctx.rect((box_w - fram_w) / 2, (box_h - fram_h) / 2, fram_w, fram_h)
        ctx.stroke()
        ctx.draw()
    }
    cutImgNow() { //裁切图片
        let _this = this;
        let box_w = this.state.box_w,//盒子宽度
            box_h = this.state.box_h;//盒子高度
        let fram_w = this.state.fram_w,//裁切框的宽度
            fram_h = this.state.fram_h;//裁切框的宽度
        Taro.canvasToTempFilePath({
            x: (box_w - fram_w) / 2,
            y: (box_h - fram_h) / 2,
            width: fram_w,
            height: fram_h,
            destWidth: fram_w,
            destHeight: fram_h,
            canvasId: 'shareImg',
            success(res) {
                _this.setState({
                    shareTempFilePath: res.tempFilePath
                })
                _this.showModal()
                _this.state.success(res.tempFilePath)
            },
            fail(res) {
                _this.state.fail(res)
                /* this.toast.tostChild({
                    type: 'success',
                    text: '图片绘制失败'
                }) */
            }
        }, this.$scope)
    }
    close() {
        this.showModal()
        this.state.fail()
    }
    render() {
        let isShow = this.state.isShow;
        return (
            <View>
                {
                    isShow ? (
                        <View className='photoCut'>
                            <View className='cutBox' id='cutBox' onTouchMove={this.touchMove} onTouchStart={this.touchStart} onTouchEnd={this.touchEnd}>
                                <Canvas className='myCanvas' canvasId='shareImg' />
                                <View className='iconBox'>
                                    <View className='photoSave btn' onClick={this.close}>
                                        <AtIcon value='close' size='30rpx' color='#fff'></AtIcon>
                                    </View>
                                    <View className='photoClose btn' onClick={this.cutImgNow}>
                                        <AtIcon value='check' size='30rpx' color='#F00'></AtIcon>
                                    </View>
                                </View>
                            </View>
                        </View>
                    ) : ''
                }
            </View>
        )
    }
}
