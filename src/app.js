import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'

import './app.scss'
class App extends Component {

  config = {
    pages: [
      'pages/chageUserImg/index', 
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#f1373a',
      navigationBarTitleText: '图片裁切',
      navigationBarTextStyle: '#fff'
    },
    tabBar: {
      color: '#797979',
      selectedColor: '#f1373a',
      backgroundColor: '#fff',
      list: [
        {
          pagePath: 'pages/chageUserImg/index',
          iconPath: 'images/icon-index1.png',
          selectedIconPath: 'images/icon-index.png',
          text: '首页'
        }, {
          pagePath: 'pages/chageUserImg/index',
          iconPath: 'images/icon-index1.png',
          selectedIconPath: 'images/icon-index.png',
          text: '首页'
        },
      ]
    }
  }

  componentDidMount () {
    
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
