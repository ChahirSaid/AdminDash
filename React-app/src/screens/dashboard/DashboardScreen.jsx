import React, { useEffect, useState } from 'react'
import { AreaCards, AreaCharts, AreaTable, AreaTop } from '../../components'

const Dashboard = () => {
  const [ordersData, setOrdersData] = useState(null)

  useEffect(() => {
    const fetchOrdersData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/orders')
        const data = await response.json()
        setOrdersData(data)
        console.log('data from dashboard:', data)
      } catch (error) {
        console.error('Error fetching orders data:', error)
      }
    }

    fetchOrdersData()
  }, [])

  const handleOrderStatusChange = (updatedOrdersData) => {
    console.log('Updated orders data received in Dashboard:', updatedOrdersData)
    setOrdersData(updatedOrdersData)
  }

  return (
    <div className="content-area">
      <AreaTop />
      {ordersData && (
        <>
          <AreaCards
            ordersData={ordersData}
            onOrderStatusChange={handleOrderStatusChange}
          />
          <AreaCharts ordersData={ordersData} />
        </>
      )}
      <AreaTable />
    </div>
  )
}

export default Dashboard
