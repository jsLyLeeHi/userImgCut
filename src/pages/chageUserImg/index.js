import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.scss'
import noUserFace from "../../images/noUserFace.png"
import Tost from "../../component/Tost/index"//轻提示组件二次封装
import ChooseImgModal from '../../component/chooseImgModal'
import PhotoCut from '../../component/photoCut'
export default class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            UserFace: '',//头像的链接
        }
    }
    config = {
        navigationBarTitleText: '修改头像'
    }
    componentWillMount() { }
    componentDidMount() { }
    componentWillUnmount() { }
    componentDidShow() { }
    componentDidHide() { }
    upImg() {
        const _this = this;
        this.ImageModal.showModal({//调用ChooseImgModal组件选择获取图片的方式--相册/相机
            camera() {
                let sourceType = ['camera'];
                _this.chooseImage(sourceType)
            },
            album() {
                let sourceType = ['album'];
                _this.chooseImage(sourceType)
            },
        })
    }
    chooseImage(sourceType) {//选择图片
        const _this = this;
        Taro.chooseImage({//选择图片
            count: 1,
            sourceType: sourceType,
            success(res) {
                //拿到图片之后调用裁切图片组件，成功之后它会返回此图片
                _this.CutModal.addImg({
                    resLo: res,
                    success(img) {
                        //接收到返回的图片修改视图层
                        _this.setState({
                            UserFace: img
                        })
                    },
                    fail() {
                        _this.toast.tostChild({
                            type: 'error',
                            text: '您已经取消'
                        })
                    }
                })
            },
            fail(res) {
                _this.toast.tostChild({
                    type: 'error',
                    text: '您已经取消'
                })
            }
        })
    }
    getTost(obj) {//获取toast组件的作用域
        this.toast = obj
    }
    getImageModal(obj) {//获取Imagemodal组件的作用域
        this.ImageModal = obj
    }
    getCutModal(obj) {
        this.CutModal = obj//获取getCutModal组件的作用域
    }
    clickFace() {
        const _this = this;
        const UserFace = this.state.UserFace;
        if (UserFace == '') {
            this.toast.tostChild({
                type: 'error',
                text: '您还没有选择图片'
            })
        } else {
            _this.CutModal.addImg({ //从CutModal组件的作用域访问其方法掉起该组件
                resLo: {
                    tempFilePaths: [UserFace],
                },
                success(img) {
                    _this.setState({
                        UserFace: img
                    })
                },
                fail() {
                    _this.toast.tostChild({
                        type: 'error',
                        text: '您已经取消'
                    })
                }
            })
        }
    }
    bigUserFace() {
        this.showBigFace()
    }
    saveUserFace() {//保存图片方法
        const UserFace = this.state.UserFace;
        if (UserFace == '') {
            this.toast.tostChild({
                type: 'error',
                text: '您还没有选择图片'
            })
        } else {
            this.toast.tostChild({ type: 'loading' })
            //此处调用接口上传头像
        }
    }
    render() {
        return (
            <View className='userImg'>
                <View className='header'>
                    <Image onClick={this.clickFace} className='userFace'
                        src={this.state.UserFace == '' ? noUserFace : this.state.UserFace}>
                    </Image>
                </View>
                <View className='chooseAlbum btn' onClick={this.upImg}>上传头像</View>
                <View className='bc btn' onClick={this.saveUserFace}>保存</View>
                <PhotoCut onGetCut={this.getCutModal} />
                <ChooseImgModal onGetModal={this.getImageModal}></ChooseImgModal>
                <Tost onTost={this.getTost} />
            </View>
        )
    }
}

