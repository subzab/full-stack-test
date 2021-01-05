import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { useRouter } from 'next/router'
import { Button, Form, Input, Spin, Select } from 'antd'
import { createItem } from '../../api/item'

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}
const { Option } = Select

const tailLayout = {
  wrapperCol: { offset: 6, span: 18 },
}
function Create() {
  const router = useRouter()
  const [loading, setloading] = useState<boolean>(false)

  const onFinish = (values: any) => {
    console.log(values)
    setloading(true)
    createItem(values)
      .then(() => {
        router.push('/item')
      })
      .catch((err: Error) => console.error(err))
      .finally(() => setloading(false))
  }

  const onFinishFailed = (errorInfo: any) => {
    console.error('Failed:', errorInfo)
  }

  return (
    <Layout title="Create New Item">
      <h1>Create New Item</h1>
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
            label="Item Name"
            name="name"
            rules={[{ required: true, message: 'Please input Item name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Item Category"
            name="category"
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
            <Button type="primary" htmlType="submit" size="large" loading={loading}>
              Create
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

export default Create
