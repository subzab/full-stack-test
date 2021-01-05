import React from 'react'
import App from 'next/app'

import '../styles/antd.less'

class MyApp extends App {
  render() {
    return <this.props.Component {...this.props.pageProps} />
  }
}

export default MyApp
