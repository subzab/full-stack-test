import React, { useCallback, useEffect, useState } from 'react'
import { Button, Descriptions, Row, Select, Space, Spin, Table } from 'antd'
import Layout from '../../../components/Layout'
import { Item, Shop } from '../../../interfaces'
import { getShopById, updateShopById } from '../../../api/shop'
import { getItems } from '../../../api/item'
import { useRouter } from 'next/router'
import styled from 'styled-components'

const { Option } = Select

const ContainerRow = styled.div`
  width: 100%;
  margin-bottom: 20px;
  h3 {
    margin-right: 20px;
  }
`

function ShopInfo() {
  const router = useRouter()
  const [data, setdata] = useState<Shop | undefined>()
  const [loading, setloading] = useState<boolean>(false)
  const [itemList, setItemList] = useState<Item[]>([])

  const fetchData = useCallback(() => {
    setloading(true)
    getShopById(String(router.query.id))
      .then((res) => {
        setdata(res.data.data)
        getItemList(res.data.data.items)
      })
      .catch((err) => console.error(err))
      .finally(() => setloading(false))
  }, [])

  const getItemList = useCallback((items: Item[]) => {
    getItems()
      .then((res) => {
        const result = res?.data?.data.filter((val: Item) => {
          return items.map((s: Item) => s._id).indexOf(val._id) === -1
        })
        setItemList(result)
      })
      .catch((err) => console.error(err))
      .finally(() => setloading(false))
  }, [])

  useEffect(() => {
    fetchData()
  }, [])

  const renderMenu = (item: Item) => {
    return <Row>{`${item.name} ( ${item.category})`}</Row>
  }
  const onChange = (value: string) => {
    const item = itemList.find((val: Item) => val._id === value)
    if (data && data.items) {
      setdata({ ...data, items: [...data.items, item] as Item[] })
    }
    getItemList(data?.items as Item[])
  }

  const removeItem = (id: string) => {
    const arr = data?.items.filter((val) => val._id !== id)
    setdata({
      ...data,
      items: arr,
    } as Shop)
    getItemList(arr as Item[])
  }
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },

    {
      title: 'Action',
      key: 'action',
      render: (_text: string, record: Item) => (
        <Space size="middle">
          <a onClick={() => removeItem(record._id)}>Remove</a>
        </Space>
      ),
    },
  ]

  const onSave = () => {
    setloading(true)
    updateShopById(String(router.query.id), data as Shop)
      .then(() => fetchData())
      .catch((err) => console.error(err))
      .finally(() => setloading(false))
  }
  return (
    <Layout title={`Shop Info | ${data?.name}`}>
      <ContainerRow>
        {loading ? (
          <Spin spinning={loading} size="large" />
        ) : (
          <Descriptions title="User Info" layout="vertical">
            <Descriptions.Item label="Shop Name" labelStyle={{ fontWeight: 'bold' }}>
              {data?.name}
            </Descriptions.Item>
            <Descriptions.Item label="Description" labelStyle={{ fontWeight: 'bold' }}>
              {data?.description}
            </Descriptions.Item>
            <Descriptions.Item label="Telephone" labelStyle={{ fontWeight: 'bold' }}>
              {data?.phone}
            </Descriptions.Item>
            <Descriptions.Item
              label="Address"
              span={2}
              labelStyle={{ fontWeight: 'bold' }}
            >
              {data?.address}
            </Descriptions.Item>
          </Descriptions>
        )}
      </ContainerRow>
      <ContainerRow>
        <h2>Items </h2>
        <Row justify="end">
          <Row style={{ marginBottom: 20 }}>
            <h3>Add item : </h3>
            <Select
              showSearch
              placeholder="Select Item to add"
              style={{ width: 400 }}
              onChange={onChange}
            >
              {itemList.map((item: Item) => (
                <Option value={item._id}>{renderMenu(item)}</Option>
              ))}
            </Select>
          </Row>
        </Row>
        <Table
          columns={columns}
          dataSource={data?.items || []}
          rowKey="name"
          loading={loading}
        />
      </ContainerRow>
      <Row justify="center">
        <Button type="primary" size="large" onClick={() => onSave()}>
          Save
        </Button>
      </Row>
    </Layout>
  )
}

export default ShopInfo
