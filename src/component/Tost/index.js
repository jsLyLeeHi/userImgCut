import Taro, { Component } from '@tarojs/taro'
import { AtToast } from "taro-ui"
import { View } from '@tarojs/components'
export default class Index extends Component {
    static defaultProps = {

    }
    constructor(props) {
        super(props)
        this.state = {
            isOpened: false,
            type: 'text',
            text: '',
            timeVal: 2000,
            icon:''
        }
    }
    componentWillMount() { this.props.onTost(this); }
    componentDidMount() { }
    componentWillUnmount() { }
    componentDidShow() { }
    componentDidHide() { }
    tostChild(data = null) {
        if (data === null) {
            data = {
                isOpened: true,
                type: 'text',
                text: '',
                timeVal: 2
            }
        } else {
            if (!data.hasOwnProperty("isOpened")) {
                data['isOpened'] = true
            }
            if (!data.hasOwnProperty("type")) {
                data['type'] = 'text'
            }
            if (!data.hasOwnProperty("text")) {
                data['text'] = ''
            }
            if (!data.hasOwnProperty("timeVal")) {
                data['timeVal'] = 1.5
            }
            if (data.type == 'loading') {
                data.timeVal = 100
            }
            if (data.hasOwnProperty("icon")) { 
                data.type = 'cus'
                data.timeVal = 3
            }
        }
        if (data.type != 'loading') {
            setTimeout(() => {
                this.setState({
                    isOpened: false,
                    type: 'text',
                    text: '',
                    timeVal: 2
                })
            }, data.timeVal * 1000)
        }
        this.setState(data)
    }
    render() {
        return (
            <View>
                {this.state.type === 'text' ? (
                    <AtToast isOpened={this.state.isOpened} text={this.state.text == '' ? '内容' : this.state.text} duration={this.state.timeVal * 1000}></AtToast>
                ) : this.state.type === 'error' ? (
                    <AtToast isOpened={this.state.isOpened} status='error' text={this.state.text == '' ? '错误' : this.state.text} duration={this.state.timeVal * 1000}></AtToast>
                ) : this.state.type === 'success' ? (
                    <AtToast isOpened={this.state.isOpened} status='success' text={this.state.text == '' ? '成功' : this.state.text} duration={this.state.timeVal * 1000}></AtToast>
                ) : this.state.type === 'loading' ? (
                    <AtToast isOpened={this.state.isOpened} text={this.state.text == '' ? '加载中' : this.state.text} status='loading' duration={this.state.timeVal * 1000}></AtToast>
                ) : this.state.type === 'cus' ? (
                    <AtToast icon={this.state.icon} isOpened={this.state.isOpened} text={this.state.text == '' ? '成功' : this.state.text} duration={this.state.timeVal * 1000}></AtToast>
                ) :`没有此类型的组件`}

            </View>
        )
    }
}

