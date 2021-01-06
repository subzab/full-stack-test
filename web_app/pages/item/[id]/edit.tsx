import React, { useCallback, useEffect, useState } from 'react'
import Layout from '../../../components/Layout'
import { useRouter } from 'next/router'
import { Button, Form, Input, Spin, Select, Row } from 'antd'
import { Item } from '../../../interfaces'
import { getItemById, updateItemById } from '../../../api/item'

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}
const tailLayout = {
  wrapperCol: { offset: 6, span: 18 },
}

const { Option } = Select

function edit() {
  const router = useRouter()

  const [itemData, setItemData] = useState<Item | undefined>()
  const [loading, setloading] = useState<boolean>(false)

  const fetchItem = useCallback(() => {
    setloading(true)
    getItemById(String(router.query.id))
      .then((res) => {
        setItemData(res.data.data)
      })
      .catch((err: Error) => console.error(err))
      .finally(() => setloading(false))
  }, [])

  const onFinish = (values: any) => {
    setloading(true)
    updateItemById(String(router.query.id), values)
      .then(() => {
        router.push('/item')
      })
      .catch((err: Error) => console.error(err))
      .finally(() => setloading(false))
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  useEffect(() => {
    fetchItem()
  }, [fetchItem])

  return (
    <Layout title="Edit Item">
      {loading ? (
        <Row justify="center" align="middle">
          <Spin size="large" spinning={loading} />
        </Row>
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
            label="Item Name"
            name="name"
            initialValue={itemData?.name}
            rules={[{ required: true, message: 'Please input Item name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Item Category"
            name="category"
            initialValue={itemData?.category}
            rules={[{ required: true, message: 'Please Select Item category!' }]}
          >
            <Select showSearch style={{ width: 350 }} placeholder="Select a category">
              <Option value="ขนมขบเคี้ยว">ขนมขบเคี้ยว</Option>
              <Option value="นม">นม</Option>
              <Option value="เครื่องดื่มอัดลมและน้ำหวาน">
                เครื่องดื่มอัดลมและน้ำหวาน
              </Option>
              <Option value="อื่นๆ">อื่นๆ</Option>
            </Select>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading && itemData}
            >
              Save
            </Button>
            <Button type="default" size="large" onClick={() => router.push('/item')}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      )}
    </Layout>
  )
}

export default edit
