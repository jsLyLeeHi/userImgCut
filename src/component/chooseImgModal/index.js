import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
export default class Index extends Component {
    static defaultProps = {

    }
    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            camera: () => { },
            album: () => { },
        }
    }
    config = {
        navigationBarTitleText: ''
    }
    componentWillMount() {
        this.props.onGetModal(this)
    }
    componentDidMount() { }
    componentWillUnmount() { }
    showModal(obj = null) {
        if (obj != null) {
            let cancelType = obj.album instanceof Function,
                confirmType = obj.camera instanceof Function;
            this.setState({
                title: obj.title,
                cont: obj.cont,
                camera: confirmType ? obj.camera : () => { },
                album: cancelType ? obj.album : () => { }
            })
        }
        this.setState({
            showModal: !this.state.showModal
        })
    }
    closeModal() {
        this.showModal()
    }
    album() {
        this.state.album()
        this.showModal()
    }
    camera() {
        this.state.camera()
        this.showModal()
    }
    stopMp(e) {
        e.stopPropagation()
    }
    render() {
        return (
            <View>
                {
                    this.state.showModal ? (
                        <View className='lyModal' onClick={this.closeModal}>
                            <View className='modal' onClick={this.stopMp}>
                                <View className='cancel btn' onClick={this.album}>相册</View>
                                <View className='confirm btn' onClick={this.camera}>拍照</View>
                            </View>
                        </View>
                    ) : ''
                }
            </View>
        )
    }
}