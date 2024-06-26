import { useState, useEffect } from 'react'
import axios from 'axios'
import AreaTableAction from './AreaTableAction'
import './AreaTable.scss'

const TABLE_HEADS = [
  'Products',
  'Order ID',
  'Customer name',
  'Status',
  'Price',
  'Action'
]

const AreaTable = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/orders')
      console.log('Orders data:', response.data)
      setOrders(response.data.orders || [])
      setLoading(false)
    } catch (error) {
      console.error('Error fetching orders:', error)
      setLoading(false)
    }
  }

  const handleDelete = async (orderId) => {
    try {
      await axios.delete(`http://localhost:5000/api/orders/${orderId}`)
      fetchOrders()
    } catch (error) {
      console.error('Error deleting order:', error)
    }
  }

  return (
    <section className="content-area-table">
      <div className="data-table-info">
        <h4 className="data-table-title">Latest Orders</h4>
      </div>
      <div className="data-table-diagram">
        <table>
          <thead>
            <tr>
              {TABLE_HEADS.map((th, index) => (
                <th key={index}>{th}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={TABLE_HEADS.length}>Loading...</td>
              </tr>
            ) : !orders || orders.length === 0 ? (
              <tr>
                <td colSpan={TABLE_HEADS.length}>No orders found.</td>
              </tr>
            ) : (
              orders.map((order, index) => (
                <tr key={order.id}>
                  <td>{order.product_name}</td>
                  <td>{order.id}</td>
                  <td>{order.customer_name}</td>
                  <td>
                    <div className={`dt-status dot-${order.status}`}>
                      <span className="dt-status-dot"></span>
                      <span className="dt-status-text">{order.status}</span>
                    </div>
                  </td>
                  <td>{order.price ? `$${order.price.toFixed(2)}` : 'N/A'}</td>
                  <td className="dt-cell-action">
                    <AreaTableAction orderId={order.id} handleDelete={handleDelete} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default AreaTable
