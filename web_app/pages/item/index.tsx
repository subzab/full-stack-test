import Link from 'next/link'
import Layout from '../../components/Layout'
import { Button, Row } from 'antd'
import { Table, Space } from 'antd'
import { getItems } from '../../api/item'
import { Shop } from '../../interfaces'
import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'

const ButtonContainer = styled(Row)`
  margin-bottom: 20px;
`
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
    render: (_text: string, record: Shop) => (
      <Space size="middle">
        <Link href={`/item/${record._id}/edit`}>
          <a>Edit</a>
        </Link>
      </Space>
    ),
  },
]
const IndexPage = () => {
  const router = useRouter()
  const [shops, setShops] = useState<Shop[]>([])
  const [loading, setloading] = useState<boolean>(false)

  const fetchItems = useCallback(() => {
    setloading(true)
    getItems()
      .then((res) => {
        setShops(res.data.data)
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        setloading(false)
      })
  }, [])
  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  return (
    <Layout title="Item List">
      <ButtonContainer justify="end">
        <Button type="primary" size="large" onClick={() => router.push('/item/create')}>
          Create
        </Button>
      </ButtonContainer>
      <Table columns={columns} dataSource={shops} rowKey="name" loading={loading} />
    </Layout>
  )
}

export default IndexPage
