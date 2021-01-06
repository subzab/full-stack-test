import Link from 'next/link'
import Layout from '../../components/Layout'
import { Button } from 'antd'
import { Table, Space, Row } from 'antd'
import { getShops } from '../../api/shop'
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
    render: (text: string, record: Shop) => (
      <Link href={`/shop/${record._id}`}>
        <a>{text}</a>
      </Link>
    ),
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Phone Number',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_text: string, record: Shop) => (
      <Space size="middle">
        <Link href={`/shop/${record._id}/edit`}>
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

  const fetchShops = useCallback(() => {
    setloading(true)
    getShops()
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
    fetchShops()
  }, [fetchShops])

  return (
    <Layout title="Shop List">
      <h1>Shop List</h1>
      <ButtonContainer justify="end">
        <Button type="primary" size="large" onClick={() => router.push('/shop/create')}>
          Create
        </Button>
      </ButtonContainer>
      <Table columns={columns} dataSource={shops} rowKey="name" loading={loading} />
    </Layout>
  )
}

export default IndexPage
