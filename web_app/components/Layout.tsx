import React, { ReactNode, useEffect, useState } from 'react'
import Head from 'next/head'
import { Layout, Menu } from 'antd'
import Styled from 'styled-components'
import { useRouter } from 'next/router'
import Link from 'next/link'

type Props = {
  children?: ReactNode
  title?: string
}

const { Header, Content, Footer } = Layout

const Body = Styled(Content)`
  padding : 90px 30px 50px 30px;
  height: 100vh;
  .site-layout-content{
    background-color: #FFFFFF;
    padding : 20px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    min-height : 500px;
    border-radius : 20px;
  }
  h1{
    text-align : center;
    margin-bottom : 40px;
  }
  .ant-btn-default{
    margin-left : 20px;
  }
`

const LayoutHome = ({ children, title = 'Shop Manager' }: Props) => {
  const router = useRouter()
  const [activeMenu, setActiveMenu] = useState<string[]>([])

  useEffect(() => {
    setActiveMenu([router.pathname])
  }, [router.pathname])
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout className="layout">
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={activeMenu}
            defaultOpenKeys={activeMenu}
          >
            <Menu.Item key="/shop">
              <Link href="/shop" as="/shop">
                <a title="Shop List">
                  <span>Shop List</span>
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="/item">
              <Link href="/item" as="/item">
                <a title="Item list">
                  <span>Item list</span>
                </a>
              </Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Body>
          <div className="site-layout-content">{children}</div>
        </Body>
        <Footer style={{ textAlign: 'center' }}>
          Subtawee Hanyut ©2021
        </Footer>
      </Layout>
      ,
    </div>
  )
}

export default LayoutHome
