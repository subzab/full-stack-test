import Link from 'next/link'
import Layout from '../../components/Layout'
import { Button, Row } from 'antd'
import { Table, Space } from 'antd'
import { getItems, deleteItem } from '../../api/item'
import { Item } from '../../interfaces'
import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'

const ButtonContainer = styled(Row)`
  margin-bottom: 20px;
`

const IndexPage = () => {
  const router = useRouter()
  const [items, setItems] = useState<Item[]>([])
  const [loading, setloading] = useState<boolean>(false)

  const fetchItems = useCallback(() => {
    setloading(true)
    getItems()
      .then((res) => {
        setItems(res.data.data)
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        setloading(false)
      })
  }, [])

  const removeItem = (id: string) => {
    setloading(true)
    deleteItem(id)
      .then(() => {
        fetchItems()
      })
      .catch((err) => console.error(err))
      .finally(() => setloading(false))
  }
  useEffect(() => {
    fetchItems()
  }, [fetchItems])
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <p>{text}</p>,
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
          <Link href={`/item/${record._id}/edit`}>
            <a>Edit</a>
          </Link>

          <a onClick={() => removeItem(record._id)}>Delete</a>
        </Space>
      ),
    },
  ]
  return (
    <Layout title="Item List">
      <h1>Item List</h1>
      <ButtonContainer justify="end">
        <Button type="primary" size="large" onClick={() => router.push('/item/create')}>
          Create
        </Button>
      </ButtonContainer>
      <Table columns={columns} dataSource={items} rowKey="name" loading={loading} />
    </Layout>
  )
}

export default IndexPage
