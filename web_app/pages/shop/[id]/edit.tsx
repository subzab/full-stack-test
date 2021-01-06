import React, { useCallback, useEffect, useState } from 'react'
import Layout from '../../../components/Layout'
import { useRouter } from 'next/router'
import { Button, Form, Input, Spin } from 'antd'
import { Shop } from '../../../interfaces'
import { getShopById, updateShopById } from '../../../api/shop'

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}
const tailLayout = {
  wrapperCol: { offset: 6, span: 18 },
}
function edit() {
  const router = useRouter()

  const [shopData, setShopData] = useState<Shop | undefined>()
  const [loading, setloading] = useState<boolean>(false)
  const fetchShop = useCallback(() => {
    setloading(true)
    getShopById(String(router.query.id))
      .then((res) => {
        setShopData(res.data.data)
      })
      .catch((err: Error) => console.error(err))
      .finally(() => setloading(false))
  }, [])

  const onFinish = (values: any) => {
    setloading(true)
    updateShopById(String(router.query.id), values)
      .then(() => {
        router.push('/shop')
      })
      .catch((err: Error) => console.error(err))
      .finally(() => setloading(false))
  }

  const onFinishFailed = (errorInfo: any) => {
    console.error('Failed:', errorInfo)
  }

  useEffect(() => {
    fetchShop()
  }, [fetchShop])

  return (
    <Layout title="Edit Shop">
      {loading ? (
        <Spin size="large" spinning={loading} />
      ) : (
        <Form
          style={{ width: '70%' }}
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Shop Name"
            name="name"
            initialValue={shopData?.name}
            rules={[{ required: true, message: 'Please input Shop name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Shop Description"
            name="description"
            initialValue={shopData?.description}
            rules={[{ required: true, message: 'Please input Shop description!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phone"
            initialValue={shopData?.phone}
            rules={[{ required: true, message: 'Please input Phone number!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            initialValue={shopData?.address}
            rules={[{ required: true, message: 'Please input Shop address!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading && shopData}
            >
              Save
            </Button>
            <Button type="default" size="large" onClick={() => router.push('/shop')}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      )}
    </Layout>
  )
}

export default edit
